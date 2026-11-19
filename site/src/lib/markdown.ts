import "server-only";

import { posix } from "node:path";

import type { Element, ElementContent, Root } from "hast";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { pageByFile, REPO_URL, sitePath } from "./content";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Where a link written in a repo file leads on the site. */
export function rewriteHref(href: string, fromFile: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#")) return href;
  const [rawPath, hash] = href.split("#", 2);
  const anchor = hash ? `#${hash}` : "";
  const resolved = posix.normalize(posix.join(posix.dirname(fromFile), rawPath));
  const target = pageByFile(resolved);
  if (target) return `${BASE_PATH}${sitePath(target.lang, target.page.route)}${anchor}`;
  // Anything the site does not render (licenses, registry, changelog) opens on GitHub.
  const kind = rawPath.endsWith("/") || !posix.extname(resolved) ? "tree" : "blob";
  return `${REPO_URL}/${kind}/main/${resolved}${anchor}`;
}

function text(node: ElementContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(text).join("");
  return "";
}

/**
 * A ```mermaid flowchart of the repo (`G[Business goal] --> P[Pillar] --> …`) becomes the same
 * chain in HTML: the site loads no diagram library.
 */
function chainFromMermaid(source: string): Element {
  const labels = [...source.matchAll(/\w+\[([^\]]+)\]/g)].map((match) => match[1]);
  const children: ElementContent[] = [];
  labels.forEach((label, index) => {
    if (index > 0) {
      children.push({
        type: "element",
        tagName: "span",
        properties: { className: ["chain-arrow"], ariaHidden: "true" },
        children: [{ type: "text", value: "→" }],
      });
    }
    children.push({
      type: "element",
      tagName: "span",
      properties: { className: ["chain-step"] },
      children: [{ type: "text", value: label }],
    });
  });
  return {
    type: "element",
    tagName: "p",
    properties: { className: ["chain"], ariaLabel: labels.join(" → ") },
    children,
  };
}

function siteTransforms(fromFile: string) {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "a" && typeof node.properties.href === "string") {
        node.properties.href = rewriteHref(node.properties.href, fromFile);
      }
      if (node.tagName === "pre" && parent && typeof index === "number") {
        const code = node.children[0];
        const className = code?.type === "element" ? code.properties.className : undefined;
        if (Array.isArray(className) && className.includes("language-mermaid") && code) {
          parent.children[index] = chainFromMermaid(text(code));
        }
      }
      if (node.tagName === "table" && parent && typeof index === "number") {
        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: { className: ["table-wrap"] },
          children: [node],
        };
        return "skip";
      }
    });
  };
}

export interface RenderedDoc {
  title: string;
  html: string;
}

/** The repo file `file`, rendered for the site: GitHub anchors, site links, no diagram library. */
export function renderMarkdown(source: string, file: string): RenderedDoc {
  const titleMatch = /^#\s+(.+)$/m.exec(source);
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => siteTransforms(file))
    .use(rehypeStringify)
    .processSync(source)
    .toString();
  return { title: titleMatch ? titleMatch[1].trim() : file, html };
}
