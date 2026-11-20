# AREA Framework

**A tracking framework for mobile apps that starts from business goals, not from events.**

`v0.1.0` · Text [CC BY 4.0](LICENSE), registry [CC0 1.0](registry/LICENSE) · English · [Français](README.fr.md)

```mermaid
flowchart LR
  G[Business goal] --> P[Pillar] --> K[KPI] --> E[Events]
```

Every event exists because a KPI needs it, every KPI because it answers a pillar's question, every pillar because a business goal depends on it.

## Why AREA

Many mobile apps track a lot and learn little. Events pile up with each feature, the usual frameworks stop before they reach events, and event specs say what to send without saying why. The details are in the [manifesto](spec/manifesto.md).

### Where AREA comes from

I build mobile apps, and I wanted to add tracking to each of them the same way: one method that works from one app to the next, not a plan rebuilt every time. I looked for a framework. I found [AARRR](https://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-long-version) (Acquisition, Activation, Retention, Referral, Revenue), built for startup growth, [HEART](https://research.google.com/pubs/archive/36299.pdf) (Happiness, Engagement, Adoption, Retention, Task success), built for the user experience of a product or a feature, and event specs that say what to send without saying why. The first two go from the goal to the metric, then leave each project to build its own events. None offered a common core, ready to set up in any mobile app. So I wrote one.

The next question came right away: how do I keep the tracking right over time? What happens when I add a feature, change the interface, or remove a feature? How do I make tracking a decision tool that lives with the project, rather than a plan that is out of date after the first sprint? Part of the answer lies in tooling (see [below](#tooling)). AREA itself applies without any tool.

— Kevin Tersigni

## The four pillars

| Pillar | The question it answers | Reference KPI |
|---|---|---|
| [**Activation**](spec/pillars/activation.md) | Do new users reach the moment when the app proves its value? | Activation rate |
| [**Retention**](spec/pillars/retention.md) | Do they come back to do what the app exists for? | Core retention |
| [**Engagement**](spec/pillars/engagement.md) | When they are there, do they use the app for what it does best? | Core usage rate |
| [**Advocacy**](spec/pillars/advocacy.md) | Are they ready to recommend it? | Advocacy intent rate |

Each reference KPI is read with its volume, and comes with a verdict: measurable, partial or not measurable with the tracking in place.

## Applying AREA

1. **Write the business goal of each pillar** for your app. The pillar pages give a typical example: each app writes its own, and that goal says why the pillar matters.
2. **Define the core action** of the app, then its **aha moment**, as a hypothesis to check against the data. Everything else depends on them ([Engagement](spec/pillars/engagement.md), [Activation](spec/pillars/activation.md)).
3. **List the mechanics** of the app: onboarding, paywall, permissions, notifications, sharing, referral… Each one brings its events ([Minimum Viable Tracking](spec/mvt.md)).
4. **Set up the Foundations**: identity, common properties, consent, separation of test data ([Foundations](spec/foundations.md)).
5. **Implement Minimum Viable Tracking** following the [conventions](spec/conventions.md).
6. **Read the four reference KPIs**, their volume and their verdict, then check the aha moment and add the app's own questions. A partial or not measurable verdict says what to fix first. Never an event without a question.

## When to use AREA

- **Before the first line of code of a new app**, to write the tracking plan.
- **To audit an existing app**: can its tracking read the four pillars? Its existing events can keep their names and play the roles of the core ([Minimum Viable Tracking](spec/mvt.md#roles-not-just-names)).
- **With each new feature**, to attach it to the pillars rather than invent its own metrics.

AREA works at the scale of the whole app. A feature does not get its own framework: it attaches to the four pillars, and its own questions are added beyond Minimum Viable Tracking.

## Minimum Viable Tracking in brief

[Minimum Viable Tracking](spec/mvt.md) is the tracking AREA expects from every app. It is built in three layers: the Foundations, a core of three events shared by all apps (`app_opened`, `aha_moment_reached`, `core_action_completed`), and the events of the mechanics the app contains. For a typical app, about a dozen events are enough to read the four pillars.

## AREA and other frameworks

AREA does not replace existing frameworks. It borrows a lot from them, and adds what they leave to each project: the event plan.

| | AARRR | HEART | AREA |
|---|---|---|---|
| Measures | Startup growth, from acquisition to revenue | User experience | The tracking of a mobile app |
| Scale | The business | The product or a feature | The whole app |
| What AREA borrows from it | Activation, Retention, and Referral, which became Advocacy | Engagement, and the goal → signal → metric chain | |
| From goals to events | Through a measurement plan, built for each project | Through a measurement plan (goals, signals, metrics), built for each product or feature | Built into the framework: a common core of KPIs and events, the same for every mobile app |
| Acquisition and revenue | At the heart of the model | Adoption only | Purchase decisions in the app; neither acquisition nor amounts |
| Designed for mobile | No | No | Yes |

**The difference fits in one line: with AARRR or HEART, each project builds its measurement plan; with AREA, the structure of the plan already exists.** Each app writes its goals, defines its core action and its aha moment. The rest of the core (the reference KPIs, their verdicts, the events and their properties) is part of the framework. A team no longer has to reinvent it: it sets it up, then spends its time on what is specific to its app.

AREA also owes a lot to other work. The North Star Framework made popular the idea of one action that carries the product's value, and Reforge the split of activation into three moments: setup (the app is ready to serve), aha (the user sees its value) and habit (the user makes it a habit). On the event side, the Segment spec and its [Native Mobile Spec](https://www.twilio.com/docs/segment/connections/spec/mobile), like the taxonomy guides of Amplitude and Mixpanel, set out the idea of a shared event vocabulary. AREA connects the two worlds: it starts from the questions that steer the product and goes down to the events, with a core shared by mobile apps.

## Limits

- **AREA measures neither acquisition nor revenue.** It tracks the purchase decisions made in the app, never the amounts. Acquisition belongs to attribution tools, revenue to the payment provider.
- **It only measures what the app sees.** Perceived quality, a store review, how easy a flow is: these are also measured with surveys and user tests.
- **It does not find the core action for you.** It is a product decision, and everything else depends on it. The aha moment stays a hypothesis until it has been checked against the data.
- **It says whether the KPIs can be read, not what to decide.** No targets, no priority between the pillars: that is the team's job.
- **Its gaps between cohorts are correlations**, not promised gains. Proving an effect takes an experiment.
- **Its KPIs only describe the users who accepted measurement**, when consent is required.
- **It is designed for mobile.** The web is not covered in this version.
- **It does not apply as is to every app.** A few cases need adapting:
  - apps with passive value (VPN, backup, call blocking), which deliver their value without any user action;
  - digital wellbeing apps, for which less usage can be a success;
  - marketplaces, where buyers and sellers each have their own core action and aha moment;
  - ad-funded apps, which live on usage volume more than on the core action.
- **It is young.** All its entries are in `development`, and in version 0.x AREA guarantees nothing: everything can still change.

## What comes next

AREA is a core, and this core is not finished. The next step is a dimension that cuts across the four pillars, so that each app can add its own goals: a conversion flow specific to its business model, a feature launch, a goal set by the team. Each will be described in AREA's grammar, with its KPIs and events, on the same core.

On the tooling side, two tools will follow this first version, in this order:

- **area-core** (coming soon): an open-source toolkit, under Apache 2.0, that applies AREA to an app's repo, locally, with the developer's own coding agent. It brings deterministic checks that need no LLM (naming conventions, [Minimum Viable Tracking](spec/mvt.md), the core score), skills that audit the tracking and recommend fixes, and the MCP server that serves the framework to coding agents.
- **[supertrack](https://igniters.studio)** (in development): a SaaS that audits an app's tracking from its codebase and keeps it in line with the app's business goals over time, with a check on every pull request, a history across several apps, and answers for non-developers.

## Tooling

AREA can be checked without any particular tool:

- **Verdicts are checked by hand.** Each pillar page lists the conditions of each verdict: measurable, partial, not measurable.
- **The registry is validated with a script** shipped in this repo. It needs PyYAML: `pip install pyyaml`, then `python3 scripts/validate_registry.py`, or in one command with uv: `uv run --with pyyaml python3 scripts/validate_registry.py`. It checks empty keys and values (a sign of malformed YAML), naming, reserved names, the verb vocabulary and consistency between the registry files.

The author builds area-core and supertrack, announced in [What comes next](#what-comes-next). AREA depends on neither of them, and any other tool can build on the registry.

## Repository contents

```
spec/          The spec: manifesto, conventions, foundations, pillars, Minimum Viable Tracking
spec/fr/       The French translation of the spec
registry/      The spec in machine-readable form (YAML)
scripts/       The script that validates the registry
site/          The website, a static export of the spec published on GitHub Pages
references/    Reference points that are not part of the spec, such as benchmarks
```

## Versions and stability

AREA follows semantic versioning. Each registry entry has a stability level, and an entry becomes stable through use: when it is implemented in at least two apps in production, at least one of them outside the team that maintains AREA, when its KPIs have been read on real data, and when no feedback questions it. The full rule is in the [conventions](spec/conventions.md#stability-and-versions), and every change is recorded in the [changelog](CHANGELOG.md).

## Contributing

Feedback from apps that apply AREA is what moves it forward, and what moves its entries to `stable`. A question, an inconsistency, an event that does not fit your app: open an issue or a discussion.

## License and citation

- **The text** of AREA (`spec/`, `references/`, this README) is published under the [CC BY 4.0](LICENSE) license. You can reuse it, adapt it and use it commercially, as long as you credit the source and state your changes.
- **The registry** (`registry/`) is published under the [CC0 1.0](registry/LICENSE) license: event, property and KPI names can be reused in your code and tracking plans with no conditions at all.
- **The script** (`scripts/`) and **the website's code** (`site/`) are published under the [Apache 2.0](scripts/LICENSE) license.

> AREA Framework, Kevin Tersigni, igniters — https://github.com/igniters-studio/area-framework
