# area-framework — CLAUDE.md

Public repo of the AREA Framework: the spec, its machine-readable registry and its website, published
on GitHub Pages at https://igniters-studio.github.io/area-framework/. Everything committed here is public.

## Layout

| Path | Contains |
| --- | --- |
| `spec/` | The spec in English: manifesto, conventions, foundations, pillars, Minimum Viable Tracking |
| `spec/fr/`, `references/fr/`, `*.fr.md` | The French translation |
| `registry/` | The spec in YAML: naming, pillars, mechanics, properties, events, KPIs (CC0 1.0) |
| `package/` | The npm package `area-framework`: the registry as JSON, generated TypeScript types and the validator (code Apache 2.0, data CC0 1.0). Decision: `docs/decisions/0001-publish-the-registry-on-npm.md` |
| `docs/decisions/` | Architecture decision records, in English only |
| `site/` | The website, a Next.js static export of the spec, with `llms.txt` (Apache 2.0) |
| `references/` | Reference points outside the spec, such as benchmarks |
| `.github/` | Pages workflow (release, publish, build, deploy), Registry workflow (every PR) and discussion forms |

## Sources of truth

- The registry wins over the prose on any event, property, value or KPI name.
- English is the reference. Every change to an English page goes with its French translation in the
  same PR. Kevin often drafts in French first: write both before committing.
- A French page's header « *Traduction de vX.Y.Z* » names the version it is up to date with.

## Commands

- Registry and package: in `package/`, `corepack enable`, `yarn install --immutable`, then `yarn check`
  (generated types, type checks, tests, validator, build). The validator alone: `yarn validate`.
- Site: in `site/`, `corepack enable`, `yarn install --immutable`, then `yarn check` (lint, types,
  build). Where corepack cannot reach repo.yarnpkg.com, set `COREPACK_NPM_REGISTRY=https://registry.npmjs.org`.
- Both green before every PR. For a change to the home page, look at the rendered page too.

## Writing rules

- The presentation of AREA (README, site, spec, changelog) names no product other than area-core,
  no app of the studio, and no example taken from a real app.
- The framework depends on no stack; its tooling starts with React Native and Expo.
- "Minimum Viable Tracking" in full, never MVT.
- "Core" only names the three core events (`app_opened`, `aha_moment_reached`,
  `core_action_completed`). The whole shared set is the "common base".
- Monetization, funnels, journeys and custom goals wait for the cross-cutting dimension: nothing of
  them enters the pillars or the registry until Kevin decides that version is ready.
- No amount or currency in any event.
- Every change to the spec, the registry or the site gets a line under `## [Unreleased]` in
  `CHANGELOG.md` (Keep a Changelog).

## Versions and releases

- Semantic versioning, by the rules of `spec/conventions.md`, "Stability and versions".
- A release is a PR that bumps `area_version` in every registry file, the README badges, the French
  headers that are up to date, `site/package.json` and `package/package.json` (the package build
  fails when its version differs from `area_version`), and turns `[Unreleased]` into
  `[X.Y.Z] - YYYY-MM-DD`. Procedure: the `area-release` skill.
- On merge, the `release` job of the Pages workflow creates the tag `vX.Y.Z` and the GitHub release
  from that changelog section, then the site is built and deployed, and the `publish` job publishes
  `area-framework@X.Y.Z` on npm with provenance (secret `NPM_TOKEN`), only from a registry identical
  to the tag. Never push a tag, create a release or publish on npm by hand.
- `llms.txt` links to the registry at the tag `v<area_version>`: a version must not reach `main`
  without its changelog section, or the release job fails and the site is not deployed.

## GitHub

- Issues are closed: visitors use Discussions (App feedback, Proposals, Q&A, with their forms in
  `.github/DISCUSSION_TEMPLATE/`). Pull requests are open to collaborators only.
- An open point or a backlog item goes in an issue of `igniters-studio/igniters` (the
  `igniters-issue` skill), never here. Public text never links to those private issues.
- Every PR targets `main`; never base a PR on another PR's branch.
- Commits: `type(scope): description`, always with a scope. Never merge a PR: Kevin does.
- Messages to Kevin in French; code, commits and identifiers in English.
