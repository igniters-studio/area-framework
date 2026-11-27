"use client";

import { useEffect } from "react";

/**
 * Reveals the home page's `[data-reveal]` blocks as they scroll into view. Without JavaScript, or
 * with reduced motion, everything stays visible: the hiding styles only apply under
 * `html.reveal-ready` and `prefers-reduced-motion: no-preference`.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window) || targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    root.classList.add("reveal-ready");
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
  return null;
}
