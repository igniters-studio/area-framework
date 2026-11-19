#!/usr/bin/env python3
"""Validate the AREA registry against its own rules.

Usage: python3 scripts/validate_registry.py [path/to/registry]

Checks that no key is empty (a sign of malformed YAML), naming (patterns, lengths,
reserved names, verb vocabulary), referential integrity between files, and the rule
that every event serves a KPI.
Exits with status 1 when an error is found. Requires PyYAML.
"""
import re
import sys
from pathlib import Path

import yaml

FILES = ["naming", "pillars", "mechanics", "events", "properties", "kpis"]
STABILITY = {"development", "stable", "deprecated"}
EVENT_LAYERS = {"core", "foundations", "mechanic"}
SCOPES = {"common", "user", "event"}

errors, warnings = [], []


def error(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def load(root):
    data = {}
    for name in FILES:
        path = root / f"{name}.yaml"
        if not path.exists():
            error(f"missing file: {path}")
            continue
        data[name] = yaml.safe_load(path.read_text(encoding="utf-8"))
    return data


def check_nulls(node, where):
    # An unquoted comma inside a flow mapping, e.g. { notes: a, b }, ends the entry:
    # "b" becomes a key with no value. YAML loads it as null without complaint.
    if isinstance(node, dict):
        for key, value in node.items():
            path = f"{where}.{key}"
            if key is None or value is None:
                error(f"{path}: empty key or value, check the YAML (quote text that contains a comma or a colon)")
            else:
                check_nulls(value, path)
    elif isinstance(node, list):
        for i, item in enumerate(node):
            if item is None:
                error(f"{where}[{i}]: empty item")
            else:
                check_nulls(item, f"{where}[{i}]")


def check_versions(data):
    versions = {name: d.get("area_version") for name, d in data.items()}
    if len(set(versions.values())) != 1:
        error(f"area_version differs between files: {versions}")


def check_name(kind, name, pattern, max_len, reserved_names, reserved_prefixes):
    if not re.match(pattern, name):
        error(f"{kind} {name}: does not match {pattern}")
    if len(name) > max_len:
        error(f"{kind} {name}: {len(name)} characters, max {max_len}")
    if name in reserved_names:
        error(f"{kind} {name}: reserved name")
    for prefix in reserved_prefixes:
        if name.startswith(prefix):
            error(f"{kind} {name}: reserved prefix {prefix}")


def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "registry"
    data = load(root)
    if errors:
        report()
        return
    for name, d in data.items():
        check_nulls(d, name)
    check_versions(data)

    naming = data["naming"]
    reserved = naming["reserved"]
    verbs = set(naming["events"]["verbs"])
    pillars = {p["id"]: p for p in data["pillars"]["pillars"]}
    mechanics = {m["id"]: m for m in data["mechanics"]["mechanics"]}
    events = {e["name"]: e for e in data["events"]["events"]}
    props = {p["name"]: p for p in data["properties"]["properties"]}
    kpis = {k["id"]: k for k in data["kpis"]["kpis"]}
    definitions = set(data["kpis"].get("definitions", {}))

    # Mechanics
    for mid, m in mechanics.items():
        if "pillar" in m and m["pillar"] not in pillars:
            error(f"mechanic {mid}: unknown pillar {m['pillar']}")
        if "pillar" not in m and m.get("layer") != "foundations":
            error(f"mechanic {mid}: needs a pillar or layer: foundations")
        if m.get("stability") not in STABILITY:
            error(f"mechanic {mid}: invalid stability")
        if not any(e.get("mechanic") == mid for e in events.values()):
            error(f"mechanic {mid}: no event attached")

    # Events
    ev_rules = naming["events"]
    for name, e in events.items():
        check_name("event", name, ev_rules["pattern"], ev_rules["max_length"],
                   set(reserved["event_names"]["names"]), reserved["event_names"]["prefixes"])
        verb = name.rsplit("_", 1)[-1]
        if verb not in verbs:
            error(f"event {name}: verb '{verb}' is not in the vocabulary")
        if e.get("layer") not in EVENT_LAYERS:
            error(f"event {name}: invalid layer {e.get('layer')}")
        if "pillar" in e and e["pillar"] not in pillars:
            error(f"event {name}: unknown pillar {e['pillar']}")
        if e.get("layer") in {"mechanic", "foundations"} and e.get("mechanic") not in mechanics:
            error(f"event {name}: unknown mechanic {e.get('mechanic')}")
        if e.get("stability") not in STABILITY:
            error(f"event {name}: invalid stability")
        for group in ("required", "optional"):
            for p in (e.get("properties") or {}).get(group, []):
                if p not in props:
                    error(f"event {name}: unknown property {p}")
                elif props[p]["scope"] == "user" and name not in props[p].get("copied_on", []):
                    error(f"event {name}: carries user property {p} without copied_on")

    # Properties
    pr_rules = naming["properties"]
    for name, p in props.items():
        scope = p.get("scope")
        if scope not in SCOPES:
            error(f"property {name}: invalid scope {scope}")
            continue
        if scope == "user":
            check_name("user property", name, pr_rules["pattern"], pr_rules["max_length"]["user_property"],
                       set(reserved["user_properties"]["names"]), reserved["user_properties"]["prefixes"])
        else:
            check_name("property", name, pr_rules["pattern"], pr_rules["max_length"]["event_property"],
                       set(reserved["event_properties"]["names"]), reserved["event_properties"]["prefixes"])
        if p.get("type") == "boolean" and not name.startswith(tuple(pr_rules["rules"]["boolean"]["prefix"])):
            error(f"property {name}: boolean without is_ or has_ prefix")
        if p.get("type") == "enum" and not p.get("values"):
            error(f"property {name}: enum without values")
        if p.get("stability") not in STABILITY:
            error(f"property {name}: invalid stability")
        for ev in p.get("copied_on", []):
            if ev not in events:
                error(f"property {name}: copied_on unknown event {ev}")
        used = any(name in (e.get("properties") or {}).get(g, []) for e in events.values() for g in ("required", "optional"))
        if scope == "event" and not used:
            error(f"property {name}: no event carries it")

    # KPIs
    references = {}
    used_events = set()
    for kid, k in kpis.items():
        if k.get("pillar") not in pillars:
            error(f"kpi {kid}: unknown pillar {k.get('pillar')}")
        if k.get("reference"):
            references.setdefault(k["pillar"], []).append(kid)
            for field in ("verdicts", "volume"):
                if field not in k:
                    error(f"kpi {kid}: reference KPI without {field}")
        for field in ("cohort", "population"):
            if field in k and k[field] not in definitions:
                error(f"kpi {kid}: {field} {k[field]} is not in definitions")
        for ev in k.get("inputs", []) + k.get("optional_inputs", []):
            if ev not in events:
                error(f"kpi {kid}: unknown input event {ev}")
            used_events.add(ev)
        for p in k.get("requires_properties", []):
            if p not in props:
                error(f"kpi {kid}: unknown property {p}")
        for mid in (k.get("requires_mechanics") or {}).get("any_of", []):
            if mid not in mechanics:
                error(f"kpi {kid}: unknown mechanic {mid}")
        num = k.get("numerator")
        if isinstance(num, dict):
            terms = num.get("any_of", [num])
            for t in terms:
                if t.get("event") not in k.get("inputs", []):
                    error(f"kpi {kid}: numerator event {t.get('event')} is not in inputs")
                for p in (t.get("where") or {}):
                    if p not in props:
                        error(f"kpi {kid}: numerator filters on unknown property {p}")
                    elif p not in k.get("requires_properties", []):
                        error(f"kpi {kid}: numerator property {p} missing from requires_properties")
        if k.get("stability") not in STABILITY:
            error(f"kpi {kid}: invalid stability")
    for pid, p in pillars.items():
        refs = references.get(pid, [])
        if refs != [p["reference_kpi"]]:
            error(f"pillar {pid}: reference KPI should be {p['reference_kpi']}, found {refs}")
    for name, e in events.items():
        if e.get("layer") != "foundations" and name not in used_events:
            error(f"event {name}: no KPI uses it")

    report()


def report():
    for w in warnings:
        print(f"warning: {w}")
    for e in errors:
        print(f"error: {e}")
    if errors:
        print(f"{len(errors)} error(s)")
        sys.exit(1)
    print("registry OK")


if __name__ == "__main__":
    main()
