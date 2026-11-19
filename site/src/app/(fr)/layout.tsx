import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://igniters-studio.github.io"),
};

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a href="#top" className="skip-link">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
