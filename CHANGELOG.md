# Changelog

All notable changes to AREA are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and AREA follows
[semantic versioning](https://semver.org/).

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
