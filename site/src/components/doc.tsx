import Link from "next/link";

import type { Dictionary } from "@/dictionaries/fr";
import { DOC_PAGES, type DocPage, type Lang, readRepoFile, REPO_URL, sitePath } from "@/lib/content";
import { markdownTitle, renderMarkdown } from "@/lib/markdown";

const GROUPS = ["start", "spec", "pillars", "references"] as const;

/** Title of a page in a language: the first heading of its Markdown file. */
export function docTitle(page: DocPage, lang: Lang): string {
  return markdownTitle(readRepoFile(page.file[lang]), page.file[lang]);
}

/** A spec page: the repo's Markdown, rendered, with the list of every page beside it. */
export function Doc({ page, lang, dict }: { page: DocPage; lang: Lang; dict: Dictionary }) {
  const file = page.file[lang];
  const { html } = renderMarkdown(readRepoFile(file), file);
  return (
    <div className="doc-layout">
      <nav className="doc-nav" aria-label={dict.docs.navLabel}>
        {GROUPS.map((group) => (
          <div key={group}>
            <h2>{dict.docs.groups[group]}</h2>
            <ul>
              {DOC_PAGES.filter((other) => other.group === group).map((other) => (
                <li key={other.id}>
                  <Link
                    href={sitePath(lang, other.route)}
                    aria-current={other.id === page.id ? "page" : undefined}
                  >
                    {other.id === "about" ? dict.docs.overview : docTitle(other, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <main id="top" className="doc">
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        <p className="doc-source">
          <a href={`${REPO_URL}/blob/main/${file}`}>{dict.docs.editOnGitHub}</a>
        </p>
      </main>
    </div>
  );
}
