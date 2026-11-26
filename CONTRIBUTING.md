# Contributing to AREA

*Also in French: [Français](CONTRIBUTING.fr.md).*

AREA moves forward through feedback from the apps that apply it. That feedback is also what moves its entries from `development` to `stable` (see [Stability and versions](spec/conventions.md#stability-and-versions)). Issues and pull requests can be written in English or in French.

## What helps most

### Feedback from an app

You apply AREA in an app, in production or in development: tell us what held and what got stuck. Which pillar you could read, with which verdict, which event you had to adapt, which definition made you hesitate. Open an "App feedback" issue.

Feedback from apps in production matters most: an entry becomes `stable` once it runs in at least two apps in production, one of them outside the team that maintains AREA.

### An event, property or KPI that does not fit your app

Describe the app, what you wanted to measure, and why the registry entry is not enough. Open a "Change proposal" issue before any pull request: a registry change affects every app that follows it, so it is discussed first.

### An inconsistency

Between the spec and the registry, between two pages, between English and French: an "Inconsistency" issue is enough. For a typo or a translation, a direct pull request is fine.

## Stacks

AREA depends on no stack: its events describe what the user gets, not the code that sends them. Its tooling starts with React Native and Expo apps.

Feedback from native iOS, native Android and Flutter apps is welcome. It covers what changes from one stack to another, without adding events:

- where to send `app_opened` to cover both launch and return from the background;
- how to know the `entry_point` of an open from a notification, a link or a widget, including a cold start;
- how to set `is_first_launch` before and after consent;
- how to send `core_action_completed` from a widget, a notification action or an extension.

One note per stack, with a short example, helps other teams as much as it helps AREA prepare its tooling for that stack.

## Pull requests

- **Registry first.** A change to an event, a property or a KPI changes `registry/`, then the spec pages that describe it. The registry is the source of truth.
- **English first.** The English version is the reference; the French translation follows in the same pull request, or is flagged as to do.
- **Validate the registry** before opening the pull request: `uv run --with pyyaml python3 scripts/validate_registry.py`.
- **The changelog** gets a line under `[Unreleased]`.

## License of contributions

A contribution is published under the license of the part of the repo it touches: [CC BY 4.0](LICENSE) for the text, [CC0 1.0](registry/LICENSE) for the registry, [Apache 2.0](scripts/LICENSE) for the script and the website.
