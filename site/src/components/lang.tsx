"use client";

import Link from "next/link";

import { LANG_KEY } from "@/lib/lang-key";

/** A language switch link that remembers the choice, so the home page stops redirecting. */
export function LangLink({
  lang,
  href,
  current,
  children,
}: {
  lang: "en" | "fr";
  href: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      hrefLang={lang}
      lang={lang}
      aria-current={current ? "true" : undefined}
      onClick={() => {
        try {
          localStorage.setItem(LANG_KEY, lang);
        } catch {
          // Storage blocked: the choice holds for this visit only.
        }
      }}
    >
      {children}
    </Link>
  );
}
