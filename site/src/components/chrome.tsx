import Link from "next/link";

import { LangLink } from "@/components/lang";
import { type Lang, REPO_URL, sitePath } from "@/lib/content";
import type { Dictionary } from "@/dictionaries/fr";

/** The AREA wordmark: one color per pillar, the same on every ground. */
export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="a1">A</span>
      <span className="r">R</span>
      <span className="e">E</span>
      <span className="a2">A</span>
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/**
 * The site header. On the home page the section links are in-page anchors; elsewhere they lead
 * back to the home page's sections.
 */
export function SiteHeader({ lang, dict, onHome }: { lang: Lang; dict: Dictionary; onHome: boolean }) {
  const home = sitePath(lang, "");
  const section = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label={dict.nav.label}>
        <Link href={home} className="brand">
          <Wordmark />
          <span className="brand-sub">Framework</span>
        </Link>
        <div className="nav-links">
          <Link href={section("pillars")}>{dict.nav.pillars}</Link>
          <Link href={section("mvt")}>{dict.nav.mvt}</Link>
          <Link href={section("apply")}>{dict.nav.apply}</Link>
          <Link href={section("compare")}>{dict.nav.compare}</Link>
          <Link href={sitePath(lang, "about")}>{dict.nav.docs}</Link>
          <a href={REPO_URL} className="github">
            <GitHubIcon />
            {dict.nav.github}
          </a>
        </div>
      </nav>
    </header>
  );
}

/** The site footer, with the same page in the other language. */
export function SiteFooter({
  lang,
  dict,
  version,
  alternates,
}: {
  lang: Lang;
  dict: Dictionary;
  version: string;
  alternates: Record<Lang, string>;
}) {
  return (
    <footer className="site-footer">
      <span>
        <Wordmark /> {version}, {dict.footer.license} <a href="https://igniters.studio">igniters</a>
      </span>
      <nav className="lang-switch" aria-label={dict.footer.languages}>
        <LangLink lang="en" href={alternates.en} current={lang === "en"}>
          English
        </LangLink>
        <LangLink lang="fr" href={alternates.fr} current={lang === "fr"}>
          Français
        </LangLink>
      </nav>
    </footer>
  );
}
