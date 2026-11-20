import "server-only";

import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * The pages the site renders from the repo's Markdown, in both languages. The repo is the source:
 * the site never copies its text, it reads it at build time.
 */

export type Lang = "en" | "fr";

/** The repo root, one level above `site/`, where `next build` runs. */
export const REPO_ROOT = resolve(process.cwd(), "..");

export const REPO_URL = "https://github.com/igniters-studio/area-framework";

export interface DocPage {
  /** Stable id, shared by both languages. */
  id: string;
  /** Path of the Markdown file in the repo, per language. */
  file: Record<Lang, string>;
  /** Route under the language root, without slashes at either end. */
  route: string;
  /** Group in the side navigation. */
  group: "start" | "spec" | "pillars" | "references";
}

export const DOC_PAGES: readonly DocPage[] = [
  { id: "about", file: { en: "README.md", fr: "README.fr.md" }, route: "about", group: "start" },
  {
    id: "manifesto",
    file: { en: "spec/manifesto.md", fr: "spec/fr/manifesto.md" },
    route: "spec/manifesto",
    group: "spec",
  },
  { id: "mvt", file: { en: "spec/mvt.md", fr: "spec/fr/mvt.md" }, route: "spec/mvt", group: "spec" },
  {
    id: "foundations",
    file: { en: "spec/foundations.md", fr: "spec/fr/foundations.md" },
    route: "spec/foundations",
    group: "spec",
  },
  {
    id: "conventions",
    file: { en: "spec/conventions.md", fr: "spec/fr/conventions.md" },
    route: "spec/conventions",
    group: "spec",
  },
  ...(["activation", "retention", "engagement", "advocacy"] as const).map(
    (pillar): DocPage => ({
      id: pillar,
      file: { en: `spec/pillars/${pillar}.md`, fr: `spec/fr/pillars/${pillar}.md` },
      route: `spec/pillars/${pillar}`,
      group: "pillars",
    })
  ),
  {
    id: "benchmarks",
    file: { en: "references/benchmarks.md", fr: "references/fr/benchmarks.md" },
    route: "references/benchmarks",
    group: "references",
  },
];

/** The site path of a route in a language, with the trailing slash the export uses. */
export function sitePath(lang: Lang, route: string): string {
  const prefix = lang === "fr" ? "/fr" : "";
  return route ? `${prefix}/${route}/` : `${prefix}/`;
}

export function pageByRoute(route: string): DocPage | undefined {
  return DOC_PAGES.find((page) => page.route === route);
}

/** Every repo file the site renders, mapped to its page and language. */
export function pageByFile(file: string): { page: DocPage; lang: Lang } | undefined {
  for (const page of DOC_PAGES) {
    for (const lang of ["en", "fr"] as const) {
      if (page.file[lang] === file) return { page, lang };
    }
  }
  return undefined;
}

export function readRepoFile(file: string): string {
  return readFileSync(join(REPO_ROOT, file), "utf8");
}
