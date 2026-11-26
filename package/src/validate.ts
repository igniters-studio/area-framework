/**
 * Validates the AREA registry against its own rules.
 *
 * Checks that no key is empty (a sign of malformed YAML), naming (patterns, lengths, reserved
 * names, verb vocabulary), referential integrity between files, and the rule that every event
 * serves a KPI. Pure: it reads data already parsed, so it runs anywhere, an app included.
 */

import { REGISTRY_FILES } from './schema.ts';

export interface ValidationResult {
  readonly errors: string[];
  readonly warnings: string[];
}

const STABILITY = new Set(['development', 'stable', 'deprecated']);
const EVENT_LAYERS = new Set(['core', 'foundations', 'mechanic']);
const SCOPES = new Set(['common', 'user', 'event']);

// The registry is checked as untrusted data: any field may be missing or of the wrong type.
type Loose = any;

/** Formats a value the way the messages have always shown it (None, ['a', 'b'], {'k': 'v'}). */
export function show(value: unknown): string {
  if (value === undefined || value === null) return 'None';
  if (value === true) return 'True';
  if (value === false) return 'False';
  if (typeof value === 'string') return value;
  return repr(value);
}

function repr(value: unknown): string {
  if (value === undefined || value === null) return 'None';
  if (typeof value === 'string') return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  if (Array.isArray(value)) return `[${value.map(repr).join(', ')}]`;
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    return `{${entries.map(([k, v]) => `${repr(k)}: ${repr(v)}`).join(', ')}}`;
  }
  return show(value);
}

function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
}

function isDict(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asList(value: unknown): Loose[] {
  return Array.isArray(value) ? value : [];
}

function get(node: Loose, key: string): Loose {
  return isDict(node) ? node[key] : undefined;
}

/**
 * Validates parsed registry files, keyed by file name (`naming`, `pillars`, `mechanics`, `events`,
 * `properties`, `kpis`). A missing file is reported by the loader, with its path.
 */
export function validateRegistry(files: { readonly [name: string]: unknown }): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const error = (msg: string) => errors.push(msg);

  const data: Record<string, Loose> = {};
  for (const name of REGISTRY_FILES) {
    if (!(name in files)) {
      error(`missing file: ${name}`);
      continue;
    }
    data[name] = files[name];
  }
  if (errors.length) return { errors, warnings };

  // An unquoted comma inside a flow mapping, e.g. { notes: a, b }, ends the entry: "b" becomes a
  // key with no value. YAML loads it as null without complaint.
  const checkEmpty = (node: unknown, where: string): void => {
    if (isDict(node)) {
      for (const [key, value] of Object.entries(node)) {
        const path = `${where}.${key}`;
        if (isEmpty(key) || isEmpty(value)) {
          error(`${path}: empty key or value, check the YAML (quote text that contains a comma or a colon)`);
        } else {
          checkEmpty(value, path);
        }
      }
    } else if (Array.isArray(node)) {
      node.forEach((item, i) => {
        if (isEmpty(item)) error(`${where}[${i}]: empty item`);
        else checkEmpty(item, `${where}[${i}]`);
      });
    }
  };
  for (const [name, d] of Object.entries(data)) checkEmpty(d, name);
  if (errors.length) return { errors, warnings }; // the other checks assume well-formed entries

  const versions: Record<string, unknown> = {};
  for (const [name, d] of Object.entries(data)) versions[name] = get(d, 'area_version');
  if (new Set(Object.values(versions).map((v) => repr(v))).size !== 1) {
    error(`area_version differs between files: ${repr(versions)}`);
  }

  const checkName = (
    kind: string,
    name: string,
    pattern: string,
    maxLen: number,
    reservedNames: Set<string>,
    reservedPrefixes: readonly string[],
  ): void => {
    if (!new RegExp(pattern).test(name)) error(`${kind} ${name}: does not match ${pattern}`);
    if (name.length > maxLen) error(`${kind} ${name}: ${name.length} characters, max ${maxLen}`);
    if (reservedNames.has(name)) error(`${kind} ${name}: reserved name`);
    for (const prefix of reservedPrefixes) {
      if (name.startsWith(prefix)) error(`${kind} ${name}: reserved prefix ${prefix}`);
    }
  };

  const naming = data.naming;
  const reserved = naming.reserved;
  const verbs = new Set(Object.keys(naming.events.verbs));
  const byKey = (list: Loose[], key: string) => new Map<string, Loose>(list.map((item) => [item[key], item]));
  const pillars = byKey(data.pillars.pillars, 'id');
  const mechanics = byKey(data.mechanics.mechanics, 'id');
  const events = byKey(data.events.events, 'name');
  const props = byKey(data.properties.properties, 'name');
  const kpis = byKey(data.kpis.kpis, 'id');
  const definitions = new Set(Object.keys(get(data.kpis, 'definitions') ?? {}));
  const eventProps = (e: Loose, group: string): Loose[] => asList(get(get(e, 'properties') || {}, group));

  // Mechanics
  for (const [mid, m] of mechanics) {
    if ('pillar' in m && !pillars.has(m.pillar)) error(`mechanic ${mid}: unknown pillar ${show(m.pillar)}`);
    if (!('pillar' in m) && m.layer !== 'foundations') error(`mechanic ${mid}: needs a pillar or layer: foundations`);
    if (!STABILITY.has(m.stability)) error(`mechanic ${mid}: invalid stability`);
    if (![...events.values()].some((e) => e.mechanic === mid)) error(`mechanic ${mid}: no event attached`);
  }

  // Events
  const evRules = naming.events;
  for (const [name, e] of events) {
    checkName(
      'event',
      name,
      evRules.pattern,
      evRules.max_length,
      new Set(reserved.event_names.names),
      reserved.event_names.prefixes,
    );
    const verb = name.slice(name.lastIndexOf('_') + 1);
    if (!verbs.has(verb)) error(`event ${name}: verb '${verb}' is not in the vocabulary`);
    if (!EVENT_LAYERS.has(e.layer)) error(`event ${name}: invalid layer ${show(e.layer)}`);
    if ('pillar' in e && !pillars.has(e.pillar)) error(`event ${name}: unknown pillar ${show(e.pillar)}`);
    if ((e.layer === 'mechanic' || e.layer === 'foundations') && !mechanics.has(e.mechanic)) {
      error(`event ${name}: unknown mechanic ${show(e.mechanic)}`);
    }
    if (!STABILITY.has(e.stability)) error(`event ${name}: invalid stability`);
    for (const group of ['required', 'optional']) {
      for (const p of eventProps(e, group)) {
        if (!props.has(p)) error(`event ${name}: unknown property ${show(p)}`);
        else if (props.get(p).scope === 'user' && !asList(props.get(p).copied_on).includes(name)) {
          error(`event ${name}: carries user property ${p} without copied_on`);
        }
      }
    }
  }

  // Properties
  const prRules = naming.properties;
  for (const [name, p] of props) {
    const scope = p.scope;
    if (!SCOPES.has(scope)) {
      error(`property ${name}: invalid scope ${show(scope)}`);
      continue;
    }
    if (scope === 'user') {
      checkName(
        'user property',
        name,
        prRules.pattern,
        prRules.max_length.user_property,
        new Set(reserved.user_properties.names),
        reserved.user_properties.prefixes,
      );
    } else {
      checkName(
        'property',
        name,
        prRules.pattern,
        prRules.max_length.event_property,
        new Set(reserved.event_properties.names),
        reserved.event_properties.prefixes,
      );
    }
    const booleanPrefixes: string[] = prRules.rules.boolean.prefix;
    if (p.type === 'boolean' && !booleanPrefixes.some((prefix) => name.startsWith(prefix))) {
      error(`property ${name}: boolean without is_ or has_ prefix`);
    }
    if (p.type === 'enum' && (!p.values || p.values.length === 0)) error(`property ${name}: enum without values`);
    if (!STABILITY.has(p.stability)) error(`property ${name}: invalid stability`);
    for (const ev of asList(p.copied_on)) {
      if (!events.has(ev)) error(`property ${name}: copied_on unknown event ${show(ev)}`);
    }
    const used = [...events.values()].some((e) =>
      ['required', 'optional'].some((g) => eventProps(e, g).includes(name)),
    );
    if (scope === 'event' && !used) error(`property ${name}: no event carries it`);
  }

  // KPIs
  const references = new Map<string, string[]>();
  const usedEvents = new Set<string>();
  for (const [kid, k] of kpis) {
    if (!pillars.has(k.pillar)) error(`kpi ${kid}: unknown pillar ${show(k.pillar)}`);
    if (k.reference) {
      if (!references.has(k.pillar)) references.set(k.pillar, []);
      references.get(k.pillar)!.push(kid);
      for (const field of ['verdicts', 'volume']) {
        if (!(field in k)) error(`kpi ${kid}: reference KPI without ${field}`);
      }
    }
    for (const field of ['cohort', 'population']) {
      if (field in k && !definitions.has(k[field])) error(`kpi ${kid}: ${field} ${show(k[field])} is not in definitions`);
    }
    for (const ev of [...asList(k.inputs), ...asList(k.optional_inputs)]) {
      if (!events.has(ev)) error(`kpi ${kid}: unknown input event ${show(ev)}`);
      usedEvents.add(ev);
    }
    for (const p of asList(k.requires_properties)) {
      if (!props.has(p)) error(`kpi ${kid}: unknown property ${show(p)}`);
    }
    for (const mid of asList(get(k.requires_mechanics || {}, 'any_of'))) {
      if (!mechanics.has(mid)) error(`kpi ${kid}: unknown mechanic ${show(mid)}`);
    }
    const num = k.numerator;
    if (isDict(num)) {
      const terms: Loose[] = 'any_of' in num ? asList(num.any_of) : [num];
      for (const t of terms) {
        if (!asList(k.inputs).includes(get(t, 'event'))) {
          error(`kpi ${kid}: numerator event ${show(get(t, 'event'))} is not in inputs`);
        }
        for (const p of Object.keys(get(t, 'where') || {})) {
          if (!props.has(p)) error(`kpi ${kid}: numerator filters on unknown property ${p}`);
          else if (!asList(k.requires_properties).includes(p)) {
            error(`kpi ${kid}: numerator property ${p} missing from requires_properties`);
          }
        }
      }
    }
    if (!STABILITY.has(k.stability)) error(`kpi ${kid}: invalid stability`);
  }
  for (const [pid, p] of pillars) {
    const refs = references.get(pid) ?? [];
    if (refs.length !== 1 || refs[0] !== p.reference_kpi) {
      error(`pillar ${pid}: reference KPI should be ${show(p.reference_kpi)}, found ${repr(refs)}`);
    }
  }
  for (const [name, e] of events) {
    if (e.layer !== 'foundations' && !usedEvents.has(name)) error(`event ${name}: no KPI uses it`);
  }

  return { errors, warnings };
}
