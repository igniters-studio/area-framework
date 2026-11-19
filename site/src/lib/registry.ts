import "server-only";

import { parse } from "yaml";

import { type Lang, readRepoFile } from "./content";

/**
 * Figures the home page shows, read from the registry and the spec at build time, so that the
 * site never states a count or a link the repo does not hold.
 */

export type PillarId = "activation" | "retention" | "engagement" | "advocacy";

interface Mechanic {
  id: string;
  name: string;
  layer?: string;
  pillar?: string;
}

export function areaVersion(): string {
  const naming = parse(readRepoFile("registry/naming.yaml")) as { area_version: string };
  return naming.area_version;
}

/** The mechanics that belong to a pillar (consent belongs to the Foundations). */
export function pillarMechanics(): Mechanic[] {
  const file = parse(readRepoFile("registry/mechanics.yaml")) as { mechanics: Mechanic[] };
  return file.mechanics.filter((mechanic) => mechanic.layer !== "foundations");
}

export interface CoreKpi {
  name: string;
  pillar: PillarId;
  pillarLabel: string;
  events: string[];
}

const PILLAR_BY_LABEL: Record<string, PillarId> = {
  activation: "activation",
  retention: "retention",
  rétention: "retention",
  engagement: "engagement",
  advocacy: "advocacy",
};

/**
 * The KPIs the three core events compute on their own: the first table of `mvt.md` whose header
 * starts with "KPI" (KPI | Pillar | Events used).
 */
export function coreKpis(lang: Lang): CoreKpi[] {
  const source = readRepoFile(lang === "fr" ? "spec/fr/mvt.md" : "spec/mvt.md");
  const lines = source.split("\n");
  const start = lines.findIndex((line) => /^\|\s*KPI\s*\|/.test(line));
  if (start === -1) throw new Error("mvt.md: no KPI table found");
  const rows: CoreKpi[] = [];
  for (const line of lines.slice(start + 2)) {
    if (!line.startsWith("|")) break;
    const [name, pillarLabel, events] = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    const pillar = PILLAR_BY_LABEL[pillarLabel.toLowerCase()];
    if (!pillar) throw new Error(`mvt.md: unknown pillar "${pillarLabel}"`);
    rows.push({
      name,
      pillar,
      pillarLabel,
      events: [...events.matchAll(/`([a-z_]+)`/g)].map((match) => match[1]),
    });
  }
  return rows;
}
