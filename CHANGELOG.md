# Changelog

All notable changes to AREA are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and AREA follows
[semantic versioning](https://semver.org/).

## [Unreleased]

### Changed

- **Tooling teaser** (README in both languages, home page of the website): the coming tooling is
  area-core, an open-source toolkit, under Apache 2.0, that applies AREA to an app's repo with the
  developer's own coding agent: deterministic checks, audit and fix-recommendation skills, and the
  MCP server. It starts with React Native and Expo apps; native iOS, native Android and Flutter
  follow. The framework itself depends on no stack. The presentation of AREA names no other product.
- **"Core" keeps one meaning** (README, manifesto, home page): the three core events of Minimum
  Viable Tracking. The whole set of shared KPIs and events is now the "common base".
- **Revenue** (README, Limits): a subscription service or the analytics tool may already report
  revenue; AREA coexists with it and sends no amount of its own.
- **Home page**: a promise-led hero, a card for studios and agencies, founders named with product
  teams, a note on when Advocacy can be read, "Generic" instead of "No" for AARRR and HEART on
  mobile, and a developer prompt that asks for the core action and the aha moment before
  implementing.

### Added

- **Contributing guide** (`CONTRIBUTING.md`, `CONTRIBUTING.fr.md`), with what helps most and notes
  per stack for native iOS, native Android and Flutter.
- **Issue templates**: app feedback, change proposal, inconsistency.

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
