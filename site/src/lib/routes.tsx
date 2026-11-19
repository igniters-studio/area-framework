import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { Doc, docTitle } from "@/components/doc";
import { Home } from "@/components/home";
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

function languageMetadata(route: string): Metadata["alternates"] {
  return { languages: alternates(route) };
}

export function homeMetadata(lang: Lang): Metadata {
  const dict = dictionaries[lang];
  return { title: dict.meta.title, description: dict.meta.description, alternates: languageMetadata("") };
}

export function HomeRoute({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <>
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
