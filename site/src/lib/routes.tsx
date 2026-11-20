import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { Doc, docTitle } from "@/components/doc";
import { Home } from "@/components/home";
import { LANG_KEY } from "@/lib/lang-key";
import { en } from "@/dictionaries/en";
import { type Dictionary, fr } from "@/dictionaries/fr";
import { DOC_PAGES, type Lang, pageByRoute, sitePath } from "@/lib/content";
import { areaVersion } from "@/lib/registry";

/**
 * The page bodies, shared by the English routes (`app/(en)`) and the French ones
 * (`app/(fr)/fr`): each route file only says its language.
 */

export const dictionaries: Record<Lang, Dictionary> = { en, fr };

function alternates(route: string): Record<Lang, string> {
  return { en: sitePath("en", route), fr: sitePath("fr", route) };
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Metadata URLs resolve against `metadataBase` without the base path (unlike `next/link`), so the
 * base path is added here.
 */
function languageMetadata(route: string): Metadata["alternates"] {
  const paths = alternates(route);
  return {
    languages: { en: `${BASE_PATH}${paths.en}`, fr: `${BASE_PATH}${paths.fr}` },
  };
}

export function homeMetadata(lang: Lang): Metadata {
  const dict = dictionaries[lang];
  return { title: dict.meta.title, description: dict.meta.description, alternates: languageMetadata("") };
}

/**
 * On the English home page (the site's root), a browser that prefers French goes to the French
 * home page, unless the visitor chose a language with the switch. Without storage, no redirect:
 * a visitor who wants English must be able to stay there. Inline, so it runs before the page shows.
 */
const PREFERRED_LANGUAGE = `(function(){try{if(localStorage.getItem(${JSON.stringify(LANG_KEY)}))return;}catch(e){return;}var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";if(/^fr(-|$)/i.test(l))location.replace(${JSON.stringify(`${BASE_PATH}/fr/`)});})();`;

export function HomeRoute({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <>
      {lang === "en" && <script dangerouslySetInnerHTML={{ __html: PREFERRED_LANGUAGE }} />}
      <SiteHeader lang={lang} dict={dict} onHome />
      <Home lang={lang} dict={dict} />
      <SiteFooter lang={lang} dict={dict} version={areaVersion()} alternates={alternates("")} />
    </>
  );
}

export function docParams(): { slug: string[] }[] {
  return DOC_PAGES.map((page) => ({ slug: page.route.split("/") }));
}

export function docMetadata(lang: Lang, slug: string[]): Metadata {
  const page = pageByRoute(slug.join("/"));
  if (!page) return {};
  const dict = dictionaries[lang];
  return {
    title: `${docTitle(page, lang)} — ${dict.meta.title}`,
    description: dict.meta.description,
    alternates: languageMetadata(page.route),
  };
}

export function DocRoute({ lang, slug }: { lang: Lang; slug: string[] }) {
  const page = pageByRoute(slug.join("/"));
  if (!page) notFound();
  const dict = dictionaries[lang];
  return (
    <>
      <SiteHeader lang={lang} dict={dict} onHome={false} />
      <Doc page={page} lang={lang} dict={dict} />
      <SiteFooter lang={lang} dict={dict} version={areaVersion()} alternates={alternates(page.route)} />
    </>
  );
}
