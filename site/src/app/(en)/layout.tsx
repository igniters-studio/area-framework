import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://igniters-studio.github.io"),
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
