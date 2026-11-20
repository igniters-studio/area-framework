import { DOC_PAGES, readRepoFile } from "@/lib/content";
import { markdownTitle } from "@/lib/markdown";
import { areaVersion } from "@/lib/registry";

export const dynamic = "force-static";

const RAW = "https://raw.githubusercontent.com/igniters-studio/area-framework";

const REGISTRY = [
  ["events.yaml", "Every event: layer, pillar, mechanic, when to send it, required and optional properties"],
  ["properties.yaml", "Every property: scope, type, closed list of values"],
  ["mechanics.yaml", "The mechanics an app can have, and the pillar of each"],
  ["kpis.yaml", "Every KPI: definition, inputs, volume, verdicts"],
  ["pillars.yaml", "The four pillars, their question and their reference KPI"],
  ["naming.yaml", "Naming rules, verb vocabulary, reserved names, tool limits"],
] as const;

/**
 * llms.txt (https://llmstxt.org): what a coding agent reads to apply AREA. Links point to the
 * Markdown and YAML of the repo at the tag of the current version, so they never move under it.
 */
export function GET() {
  const version = areaVersion();
  const tag = `${RAW}/v${version}`;
  const docs = DOC_PAGES.map((page) => {
    const title = markdownTitle(readRepoFile(page.file.en), page.file.en);
    return `- [${title}](${tag}/${page.file.en})`;
  });
  const body = [
    "# AREA Framework",
    "",
    "> A tracking framework for mobile apps that starts from business goals, not from events. Four pillars (Activation, Retention, Engagement, Advocacy), a reference KPI for each, and Minimum Viable Tracking: the Foundations, three core events (app_opened, aha_moment_reached, core_action_completed), then the events of the mechanics the app has.",
    "",
    `Version ${version}. The registry is the source of truth for every event, property, value and KPI name. Never write the abbreviation MVT: always Minimum Viable Tracking.`,
    "",
    "## Registry",
    "",
    ...REGISTRY.map(([file, text]) => `- [${file}](${tag}/registry/${file}): ${text}`),
    "",
    "## Spec",
    "",
    ...docs,
    "",
    "## Optional",
    "",
    `- [French translation](${tag}/README.fr.md): the same spec in French, under spec/fr/`,
    `- [Changelog](${tag}/CHANGELOG.md)`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
