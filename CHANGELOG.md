# Changelog

All notable changes to AREA are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and AREA follows
[semantic versioning](https://semver.org/).

## [Unreleased]

### Changed

- **Home page of the website, rewritten**: a hero on why usage matters (what to track and why),
  each pillar's typical goal on its card, Advocacy stated as readable only with a satisfaction
  question, an NPS or an invitation, the goal-to-event chain framed as Goal-Question-Metric with an
  illustrative retention chart, Minimum Viable Tracking with its three required core events and
  mechanics explained, six steps that end on checking each KPI is measurable, a short introduction
  to AARRR and HEART, practices to avoid and the AREA way marked as such, colors of the pillars
  throughout, and scroll reveals that respect reduced motion.
- **French**: "deeplink" instead of "lien profond" (manifesto, home page).
- **README and header image, aligned with the home page** (both languages): the same promise, the
  Goal-Question-Metric framing, each pillar's typical goal, Advocacy readable only with its
  mechanics, the six steps, Minimum Viable Tracking with its three required core events, the
  origin story's new opening and signature. In French, « La suite » replaces « Ce qui vient
  ensuite ».

### Added

- **npm package `area-framework`**: the registry as JSON and TypeScript types generated from it
  (events, properties and their closed lists, KPIs), with the registry validator, now in TypeScript
  (`npx area-framework validate`) and run on every pull request. It replaces
  `scripts/validate_registry.py`.

## [0.2.0] - 2026-11-26

### Changed

- **Tooling teaser** (README in both languages, home page of the website): the coming tooling is
  area-core, an open-source toolkit, under Apache 2.0, that applies AREA to an app's repo with the
  developer's own coding agent: deterministic checks, audit and fix-recommendation skills, and the
  MCP server. It starts with React Native and Expo apps; native iOS, native Android and Flutter
  follow. The framework itself depends on no stack. The presentation of AREA names no other product.
- **"Core" keeps one meaning** (README, manifesto, home page): the three core events of Minimum
  Viable Tracking. The whole set of shared KPIs and events is now the "common base".
- **Home page**: a promise-led hero, a card for studios and agencies, founders named with product
  teams, a note on when Advocacy can be read, "Generic" instead of "No" for AARRR and HEART on
  mobile, and a developer prompt that asks for the core action and the aha moment before
  implementing.

### Removed

- **The paywall is no longer part of the four pillars** (breaking): not every app has a paid
  offer. The `paywall` mechanic, the events `paywall_shown`, `trial_started` and
  `purchase_completed`, the properties `paywall_trigger` and `purchase_type`, and the
  `paywall_conversion_rate` KPI leave the registry and the Activation pillar. Purchase decisions
  will come back with the cross-cutting dimension of a later version. `user_plan` and `is_trial`
  stay in the Foundations. The Activation page keeps how a paywall placed before the aha moment
  weighs on activation.

### Added

- **Contributing guide** (`CONTRIBUTING.md`, `CONTRIBUTING.fr.md`), with what helps most and notes
  per stack for native iOS, native Android and Flutter.
- **Discussion forms** for the App feedback, Proposals and Q&A categories. Contributions now go
  through the repo's Discussions; issues are closed and pull requests are open to collaborators
  only.

## [0.1.0] - 2026-11-20

First public version of AREA. Every registry entry is in `development`.

### Added

- **Manifesto**: why AREA starts from business goals rather than from events.
- **Conventions**: naming of events and properties, verb vocabulary, reserved names, stability and
  versions.
- **Foundations**: identity, common properties, consent, separation of test data.
- **Four pillars**, each with its reference KPI, its volume and its verdicts (measurable, partial,
  not measurable):
  - Activation: activation rate;
  - Retention: core retention;
  - Engagement: core usage rate;
  - Advocacy: advocacy intent rate.
- **Minimum Viable Tracking** in three layers: the Foundations, a core of three events
  (`app_opened`, `aha_moment_reached`, `core_action_completed`), and the events attached to the
  app's mechanics.
- **YAML registry** (`registry/`): naming, pillars, mechanics, properties, events and KPIs, in
  machine-readable form.
- **Validation script** for the registry (`scripts/validate_registry.py`).
- **Benchmarks** (`references/`), outside the spec.
- **Website** (`site/`): the spec in both languages, with a home page and `llms.txt`, built as a
  static export from the repo's Markdown and registry, published on GitHub Pages.
- **Two languages**: English, the reference version, and a French translation (`spec/fr/`,
  `references/fr/`, `README.fr.md`).
