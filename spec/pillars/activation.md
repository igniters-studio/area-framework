# Activation

> Do new users reach the moment when the app proves its value?

A user who has not seen the app's value will not come back, however good the product is. Activation measures this step: the moment when the user first gets what the app promises. This pillar relies on the core action, defined with [Engagement](engagement.md#the-core-action). [Retention](retention.md#activated-and-non-activated-users) in turn relies on Activation to separate activated users from non-activated users.

**Typical business goal:** bring as many new users as possible to the app's value, as fast as possible. Each app writes its own (see [Applying AREA](../../README.md#applying-area) in the README).

## The aha moment

The aha moment is the milestone after which a user has seen the app's value. **It is a hypothesis that each app sets, then checks against its data.**

At first, the simplest hypothesis is the **first completion of the core action**, the action the app exists for (see [the core action](engagement.md#the-core-action)). An app can choose a more precise milestone when the first action is not enough to see the value. For example:

| App | Aha moment |
|---|---|
| Running | First run recorded |
| Budgeting | First expense categorized |
| Meditation | First session finished |
| Note-taking | First note created, then found again. Creating a note is the core action, but its value shows when you find it again |
| E-commerce | First order placed |

The aha moment is not the end of onboarding. A user can finish onboarding without ever touching what makes the app valuable.

Every app has a path to the aha moment, even without onboarding. AREA does not prescribe onboarding: it asks that this path be defined and measured. Onboarding is only one way to shorten it.

It is defined **before** writing a single line of tracking, because it is specific to each app and no tool can guess it. An app with no defined aha moment can measure neither its activation nor the retention of its activated users. This is not one missing event among others: it is an unanswered product question, and no tracking will replace the answer.

## Checking the aha moment

A hypothesis gets checked. After a few weeks of data:

1. Split new users by what they did in the activation window: no core action, one, two, three or more.
2. Compare their D30 core retention.
3. If retention jumps sharply from a given threshold, the aha moment is probably that threshold, for example "three runs recorded in the first week", rather than the first action.
4. Update the definition in the tracking plan, with a new `aha_version`.

Like any gap between cohorts, this jump is a correlation: it points to the best candidate, it does not prove that pushing users to the threshold will make them stay. The check is done again when the product changes a lot.

Changing the definition changes the KPI. `aha_version` makes sure two definitions are never mixed in the same curve.

## Reference KPI: activation rate

| | |
|---|---|
| **Definition** | Share of new users who reach the aha moment within the activation window |
| **Cohort** | New users of the period: their `app_opened` with `is_first_launch` falls in the period |
| **Numerator** | Users of the cohort who emit `aha_moment_reached` within N days of their first launch |
| **Window N** | 7 days by default. A daily app can shorten it to 1 day, an occasional app can lengthen it. Once chosen, it is recorded in the tracking plan. Changing it starts a new series, never compared with the previous one |
| **Unit** | Distinct users. Only the first occurrence of `aha_moment_reached` counts |
| **Volume** | The number of activated users in the cohort |

The verdict says whether this KPI can be read reliably from the tracking in place:

| Verdict | Condition |
|---|---|
| **Measurable** | The aha moment is defined and versioned, `aha_moment_reached` is sent from every surface where it can be reached (app screen, widget, notification…), `app_opened` is in place with `is_first_launch`, and the Foundations are met |
| **Partial** | The event is missing on some surfaces, `is_first_launch` is missing, or one of the Foundations is incomplete |
| **Not measurable** | No aha moment is defined, or no event signals it |

An app without accounts is not penalized: its verdict only states that it counts installs (see [identity](../foundations.md#1-identity) in the Foundations).

## Secondary KPIs

| KPI | Definition |
|---|---|
| **Time to Aha** | Median time between the first launch and `aha_moment_reached`, among users activated within the window. It is published with the share of the cohort that did not reach it; otherwise a falling median can hide more drop-outs. Computed in the tool, never sent as a property |
| **Onboarding completion rate** | Users who emit `onboarding_completed`, over those who emit `onboarding_started`, by `onboarding_version` |
| **Drop-off by onboarding step** | Share of users lost at each onboarding step, read with `step_name` and `onboarding_version`, if the onboarding has several steps |
| **Paywall conversion** | Share of users exposed to the paywall who start a trial or buy within 24 hours (default window), by `paywall_trigger` |
| **Permission acceptance rate** | Users who grant the permission, over those who granted or denied it, by `permission_type` |

## Events

| Event | When | Properties | Required if |
|---|---|---|---|
| `aha_moment_reached` | The user reaches the aha moment defined by the app | `aha_version`, `core_action_type` if the aha moment is about a core action | Always (core) |
| `onboarding_started` | The user starts onboarding | `onboarding_version` | The app has an onboarding |
| `onboarding_step_completed` | An onboarding step is completed | `onboarding_version`, `step_name`, `step_index`, `step_total` | The onboarding has several steps |
| `onboarding_completed` | All the steps are completed | `onboarding_version` | The app has an onboarding |
| `paywall_shown` | The app presents its paid offer | `paywall_trigger` | The app has a paywall |
| `trial_started` | The user starts a free trial | `user_plan` | The app offers a trial |
| `purchase_completed` | The user buys a subscription or a product offered by the paywall. An order in a commerce app is not one: it is the core action | `user_plan`, `purchase_type` | The app has a paywall |
| `permission_granted` | The user grants a permission | `permission_type`, and `permission_scope` if the platform exposes a scope | The app asks for permissions |
| `permission_denied` | The user denies a permission | `permission_type` | The app asks for permissions |

`aha_moment_reached` can be sent more than once without skewing the KPI, since only its first occurrence counts. There is therefore no need to keep server-side state to send it only once.

## Properties

| Property | Values |
|---|---|
| `aha_version` | Version of the aha moment definition: `v1`, `v2`… |
| `core_action_type` | Type of core action, specific to the app. Same property as on `core_action_completed` |
| `onboarding_version` | Version of the onboarding flow, to compare two versions: `v1`, `v2`… |
| `step_name` | Name of the step, specific to the app: `profile_setup`, `goal_selection`… |
| `step_index`, `step_total` | Position of the step and total number of steps |
| `paywall_trigger` | What made the paywall appear: `onboarding`, `feature_lock`, `usage_limit`, `settings` |
| `user_plan` | Tier of the offer at the time of the event: on `trial_started` and `purchase_completed`, the tier just obtained. Copy of the Foundations user property |
| `purchase_type` | `subscription`, `one_time` |
| `permission_type` | `notifications`, `location`, `health`, `camera`, `microphone`, `contacts`, `photos`, `app_tracking` |
| `permission_scope` | What the user granted, sent whenever the platform exposes a scope: `full` (complete permission), `limited` (selected photos, approximate location), `provisional` (iOS provisional notifications), `once` (this time only) |

## The paywall and purchases

AREA measures the purchase decisions made in the app: the paywall shown, the trial started, the purchase made. It never measures money: no amount, no currency. Revenue, renewals and refunds are read at the payment provider, which receives the same user identifier (see [identity](../foundations.md#1-identity) in the Foundations).

**When the paywall blocks access**, nobody reaches the aha moment without paying or starting a trial first. The paywall becomes a step of activation: whatever breaks it breaks activation, and Time to Aha grows by this required step.

## Questions this pillar answers

- What share of my new users sees the app's value?
- How long does it take them to get there?
- At which onboarding step do I lose the most users?
- Does my paywall convert, and how does that depend on what triggers it?
- Which permissions are denied most often?

## Common mistakes

- Taking the end of onboarding for the aha moment.
- Never checking the aha moment, or changing its definition without changing `aha_version`.
- Tracking only granted permissions. Without the denials, no acceptance rate can be computed. On Android, after two denials, the system denies without showing a dialog anymore: `permission_denied` is still sent, and the rate then measures a decision, not a display.
- Sending Time to Aha as a property. It is a KPI the tool computes from the events.
- Sending an amount or a currency with `purchase_completed`. Revenue is read at the payment provider.
- Counting activation in sessions rather than in users.
