import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found — AREA Framework",
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** The 404 page of the whole site: two root layouts (English, French) leave no single one to use. */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main id="top" className="wrap section" style={{ gap: 24 }}>
          <h1 className="h2">Page not found</h1>
          <p className="lead">
            <a href={`${BASE_PATH}/`}>Back to the home page</a>
          </p>
          <p className="lead" lang="fr">
            Page introuvable. <a href={`${BASE_PATH}/fr/`}>Retour à l&apos;accueil</a>
          </p>
        </main>
      </body>
    </html>
  );
}
