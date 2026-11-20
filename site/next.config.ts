import type { NextConfig } from "next";

/**
 * The site is a static export served by GitHub Pages at
 * https://igniters-studio.github.io/area-framework/. `basePath` puts every route and asset under
 * that path; `trailingSlash` emits `/spec/mvt/index.html`, which Pages serves at `/spec/mvt/`.
 */
export const BASE_PATH = "/area-framework";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  experimental: {
    // Two root layouts (English, French), so the 404 page cannot come from a single layout.
    globalNotFound: true,
  },
};

export default nextConfig;
