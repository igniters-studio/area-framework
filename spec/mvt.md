# Minimum Viable Tracking

Minimum Viable Tracking is the tracking AREA expects from every app to read its four pillars. It is built in three layers: the Foundations, a core of events shared by all apps, and the events of the mechanics the app contains. For a typical app, it has about a dozen events, and it yields more than fifteen KPIs.

**The rule:** every event exists because a KPI needs it. Only the Foundations event is an exception: `analytics_consent_granted` serves compliance and reliability, not a KPI. Minimum Viable Tracking does not try to track everything. It tries to answer, reliably, the questions every app asks itself.

## The three layers

| Layer | What it contains | For which apps |
|---|---|---|
| **Foundations** | Identity, common properties (`app_version`, `platform`, `environment`, `user_plan`…), consent and the separation of test data | All |
| **Core** | `app_opened`, `aha_moment_reached`, `core_action_completed` | All |
| **Mechanics** | The events of onboarding, the paywall, permissions, notifications, sharing, referral… | Each app, depending on what it contains. A mechanic that is present makes its events required |

## Few events, many KPIs

The richness of tracking does not come from the number of events. It comes from three things:

- **Properties.** The same `core_action_completed` can be read by action type, by app version, by platform, by offer tier.
- **Cohorts.** The same event is used to follow new users, activated users, paying users, users of a given version.
- **Time.** The delay between two events, or the interval between two occurrences of the same event, is a KPI in itself.

The three core events are thus enough, on their own, to compute a good share of AREA's KPIs:

| KPI | Pillar | Events used |
|---|---|---|
| Activation rate | Activation | `app_opened`, `aha_moment_reached` |
| Time to Aha | Activation | `app_opened`, `aha_moment_reached` |
| Core usage rate | Engagement | `app_opened`, `core_action_completed` |
| Core action frequency | Engagement | `app_opened`, `core_action_completed` |
| Power user ratio | Engagement | `app_opened`, `core_action_completed` |
| Core retention at D1, D7, D30 | Retention | `app_opened`, `core_action_completed` |
| Core retention of activated and non-activated users | Retention | `app_opened`, `aha_moment_reached`, `core_action_completed` |
| Returns by channel | Retention | `app_opened` |
| Open retention, to compare with the market | Retention | `app_opened` |

Each one can then be broken down by the Foundations properties: iOS or Android, free or paying, app version.

The mechanics add their own KPIs: onboarding completion, drop-off by step, paywall conversion, permission acceptance, feature adoption, declared satisfaction, referral.

## The core

| Event | What it signals | Properties |
|---|---|---|
| `app_opened` | The app comes to the foreground: launch or return from the background. It defines new users and return channels, and counts toward active users | `entry_point`, `is_first_launch` |
| `aha_moment_reached` | The user reaches the aha moment, as the app defined it (see [the aha moment](pillars/activation.md#the-aha-moment)) | `aha_version`, and `core_action_type` if the aha moment is about a core action |
| `core_action_completed` | Each completion of the core action, the first one included, from every surface where it happens (app screen, widget, notification, share extension…) | `core_action_type` |

| Property | Values |
|---|---|
| `entry_point` | What brought the app to the foreground: `icon`, `notification`, `link`, `widget`, `shortcut`, `other` |
| `is_first_launch` | `true` only for the first `app_opened` sent after the install. It stays true until that event could be sent, for example before consent. When consent is given, the app sends this `app_opened` right away, before `analytics_consent_granted` |

These three events are the only ones the pillars' reference KPIs depend on, with one exception: Advocacy needs at least a satisfaction question, an NPS or an invitation.

**Active users** of a period are those who emit at least one `app_opened` or one `core_action_completed`. The second one counts because the core action can happen without opening the app, from a widget, a notification action or an extension.

**New users** of a period are those whose `app_opened` with `is_first_launch` falls in that period. A user reset on sign-out, or an existing app that adopts AREA (see [below](#adopting-area-in-an-existing-app)), therefore does not create false new users.

**Before writing a line of code**, two answers are needed: what is the app's [core action](pillars/engagement.md#the-core-action), and what is its [aha moment](pillars/activation.md#the-aha-moment). Without them, two of the three core events make no sense.

## Roles, not just names

`aha_moment_reached` and `core_action_completed` name a role as much as an event: what they signal depends on the app. A running app records a run, a budgeting app categorizes an expense. In a new app, these roles carry the AREA names, and what varies from one app to another goes in `core_action_type`.

In an existing app, the event that already plays a role can keep its name (see [Renaming and evolving](conventions.md#renaming-and-evolving) in the conventions). The app's tracking plan then states which event plays which role: `workout_saved` plays the role of `core_action_completed`. The KPIs are computed the same way, on the event stated.

## Adopting AREA in an existing app

On the day a version of the app introduces AREA, its users are not new. Three precautions keep them from becoming new in the data:

- **`is_first_launch` is `true` only after a real install.** A user who updates the app is not at their first launch: the app knows it when it finds local data from a previous version.
- **Cohort KPIs are read only on cohorts that entered after the switch.** Older cohorts have no tracked aha moment.
- **The aha moment of existing users is not rebuilt.** Their first core action after the switch is not their aha moment: the app sends `aha_moment_reached` only to users who entered after the switch.

## Reading KPIs

A well-tracked KPI can still be misread. These rules apply to every pillar:

- **Distinct users, never events.** A ratio counts people: a user who shares ten times counts once.
- **A rate always comes with its volume.** A core usage rate that rises while the number of users shrinks is not good news. Each reference KPI is read with the number of users it counts.
- **Cohorts that have matured.** D30 retention is read only on cohorts that entered more than 30 days ago, and an activation rate only on those whose activation window has closed.
- **A large enough sample.** On a cohort of a few hundred users, a gap of a few points is noise. Before concluding, check whether the gap holds over several cohorts.
- **Compare versions on their new users.** Breaking all users down by `app_version` mixes the effect of the version with the effect of the population: the first to update are also the most engaged. Compare instead the cohorts of new users who arrived on each version.
- **A correlation is not a cause.** Gaps between cohorts (activated and non-activated, referred and others, contributors and others) say where to look. To know whether a change has an effect, you need an experiment: an A/B test, or a control group that does not get the change.
- **The consent rate alongside.** The KPIs only describe the users who accepted measurement (see [consent](foundations.md#3-consent)).

## Mechanics

These events are not optional: they become required as soon as the mechanic exists in the app. An app that asks for permissions must track grants and refusals, an app that sends notifications must track when they are opened.

| Mechanic | Events | Pillar |
|---|---|---|
| Consent required | `analytics_consent_granted` | Foundations |
| Onboarding | `onboarding_started`, `onboarding_completed`, and `onboarding_step_completed` if it has several steps | Activation |
| Paywall | `paywall_shown`, `purchase_completed`, and `trial_started` if the app offers a trial | Activation |
| Permissions | `permission_granted`, `permission_denied` | Activation |
| Navigation, if the app analyzes its flows screen by screen | `screen_viewed` | Engagement |
| Features beyond the core action | `feature_used` | Engagement |
| Notifications | `notification_opened` | Retention |
| Incoming links | `deep_link_opened` | Retention |
| Satisfaction question | `satisfaction_prompt_answered` | Advocacy |
| NPS | `nps_answered` | Advocacy |
| Review prompt | `review_prompt_triggered` | Advocacy |
| Invitation or referral | `invite_shared`, `referral_code_applied` if the app has a referral program, `referral_link_opened` if it has referral links | Advocacy |
| Content sharing | `content_shared` | Advocacy |
| Co-creation | `co_creation_contributed` | Advocacy |
| Rewards | `reward_received` | Advocacy |

The details of each event and its properties are on its pillar's page, or in the [Foundations](foundations.md#3-consent) for `analytics_consent_granted`. `app_opened` is described above, in [the core](#the-core).

## An example: a typical app

An app with a multi-step onboarding, permissions, notifications, a few features beyond the core action, a satisfaction question and a review prompt:

| Layer | Events |
|---|---|
| Core | `app_opened`, `aha_moment_reached`, `core_action_completed` |
| Onboarding | `onboarding_started`, `onboarding_step_completed`, `onboarding_completed` |
| Permissions | `permission_granted`, `permission_denied` |
| Features | `feature_used` |
| Notifications | `notification_opened` |
| Advocacy | `satisfaction_prompt_answered`, `review_prompt_triggered` |

Twelve events, with the Foundations underneath. They are enough to read the four pillars, to break every KPI down by platform, version and offer tier, and to answer the questions below. With a paywall, two or three more events (`trial_started` if the app offers a trial).

## What Minimum Viable Tracking can answer

- What share of my new users sees the app's value, how fast, and at which step do I lose them?
- Among those who come, how many use the app for what it does, and how often?
- How many come back to do it again, and through which channel?
- Do users who arrived on the latest version activate better than those on the previous one? Do paying users behave differently from free users?
- What share of my users says they are ready to recommend the app?

## What the tracking plan contains

The tracking plan is the app's document that says what it tracks and why. AREA does not impose its format: a document, a spreadsheet or a file next to the code will do, as long as it is versioned with the app and kept up to date. It contains:

- **The version of AREA** the app follows.
- **The business goal of each pillar**, written for the app.
- **The core action**, and the list of its `core_action_type` values.
- **The aha moment**, with its `aha_version` and the history of its definitions.
- **The windows and thresholds chosen**: the activation window, reading retention by day or by window, the power user threshold.
- **The mechanics present in the app**, and so the events that become required.
- **The app's own closed lists**: `feature_name`, `screen_name`, `step_name`, `content_type`.
- **Legacy events**, and the AREA role each one plays.
- **Setup changes** that affect a KPI, such as how often the satisfaction question is asked.
- **The app's own questions**, and the events that answer them.

## Beyond: the app's own questions

Minimum Viable Tracking answers the questions every app asks itself. Each app also has its own: why users drop out of a given form, whether a new feature is adopted. They are handled with app-specific events, following the same rule: every event exists because it answers a question written in the tracking plan. Volume never justifies an event.
