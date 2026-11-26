# Conventions

These conventions apply to every new event and every new property. They target the code you write, not the tracking already in place: an existing event whose meaning is right keeps its name (see [Renaming and evolving](#renaming-and-evolving)).

Event and property names are written in English, whatever the app's language.

## Events

**Format.** `snake_case`, lowercase. Letters, digits and underscores, starting with a letter. 40 characters at most.

**Grammar.** The object first, then the verb in the past participle: `onboarding_completed`, `paywall_shown`, `content_shared`. Putting the object first groups the events of one subject in a sorted list: all the `onboarding_*` events sit together.

This choice differs from the [Segment spec](https://www.twilio.com/docs/segment/connections/spec/mobile), which writes `Application Opened` in Title Case. `snake_case` goes through every tool without being transformed, including tools that reject spaces and capitals.

**An event describes an outcome.** It says what the user got or what the app did, not which button was touched.

| ✅ Do | ❌ Avoid | Why |
|---|---|---|
| `purchase_completed` | `buy_button_tapped` | The purchase can start from several buttons. The tap does not say whether the purchase went through |
| `permission_granted` + `permission_type: "camera"` | `camera_permission_granted` | The value goes in a property, otherwise each new permission creates an event |
| `request_submitted` + `screen_name: "home"` | `home_request_button_tapped` | The screen it came from is context, not an event |

An interaction becomes an event only when it is itself what the KPI measures. Advocacy is such a case: the app cannot see whether the user actually recommended the app, so the invitation started (`invite_shared`) is what is measured, without knowing whether it went through.

**A shared verb vocabulary.** The same verb has the same meaning everywhere. A new verb enters the vocabulary only with a meaning that overlaps none of the others. This closed vocabulary applies to event names. Property values do not follow this verb vocabulary, as with `roadmap_voted`.

| Verb | Meaning | Example |
|---|---|---|
| `started` | A flow begins | `onboarding_started`, `trial_started` |
| `completed` | The flow or the action succeeds | `onboarding_completed`, `purchase_completed` |
| `failed` | The flow fails for a technical or external reason | `purchase_failed` |
| `cancelled` | The user abandons a flow they had started | `purchase_cancelled` |
| `reached` | The user reaches a milestone defined by the app | `aha_moment_reached` |
| `shown` | The app presents an offer or a message it controls, whatever triggered it (a property says what) | `paywall_shown` |
| `dismissed` | The user closes what the app presented | `paywall_dismissed` |
| `viewed` | The user opens a screen or content on their own | `screen_viewed` |
| `opened` | The app comes to the foreground, or opens from a specific entry point | `app_opened`, `deep_link_opened` |
| `used` | The user uses a feature | `feature_used` |
| `granted` | The user accepts a permission or a consent | `permission_granted` + `permission_type: "notifications"`, `analytics_consent_granted` |
| `denied` | The user refuses a permission, or the system refuses it without a dialog. A consent refusal is never sent | `permission_denied` |
| `answered` | The user answers a closed question asked by the app | `satisfaction_prompt_answered`, `nps_answered` |
| `submitted` | The user sends content they composed | `request_submitted` |
| `contributed` | The user makes a contribution to the product | `co_creation_contributed` |
| `shared` | The user starts sharing something with another person. The app does not know whether it went through | `content_shared`, `invite_shared` |
| `applied` | A code is applied to the user's account, typed by the user or carried by a link | `referral_code_applied` |
| `received` | The user receives something from the app | `reward_received` |
| `triggered` | The app calls a system feature, which alone decides whether to show it | `review_prompt_triggered` |

`failed`, `cancelled` and `dismissed` are never mixed up: the first is a problem to fix, the second an abandonment, the third a refusal.

**Reserved names.** Some tools silently reject events and properties that carry a reserved name. AREA therefore forbids them everywhere, whatever the tool, so that one plan stays valid from one tool to another. The lists below combine those of Google Analytics 4 and Firebase, the strictest of the common tools:

- **Event names**: `ad_activeview`, `ad_click`, `ad_exposure`, `ad_query`, `ad_reward`, `adunit_exposure`, `app_background`, `app_clear_data`, `app_exception`, `app_install`, `app_remove`, `app_store_refund`, `app_store_subscription_cancel`, `app_store_subscription_convert`, `app_store_subscription_renew`, `app_update`, `app_upgrade`, `dynamic_link_app_open`, `dynamic_link_app_update`, `dynamic_link_first_open`, `error`, `firebase_campaign`, `firebase_in_app_message_action`, `firebase_in_app_message_dismiss`, `firebase_in_app_message_impression`, `first_open`, `first_visit`, `in_app_purchase`, `notification_dismiss`, `notification_foreground`, `notification_open`, `notification_receive`, `notification_send`, `os_update`, `screen_view`, `session_start`, `session_start_with_rollout`, `user_engagement`. Forbidden prefixes: `firebase_`, `google_`, `ga_`.
- **Event properties**: `cid`, `currency`, `customer_id`, `customerid`, `dclid`, `gclid`, `session_id`, `sessionid`, `sfmc_id`, `sid`, `srsltid`, `uid`, `user_id`, `userid`. Forbidden prefixes: `_`, `firebase_`, `google_`, `ga_`, `gtag.`.
- **User properties**: `cid`, `customer_id`, `customerid`, `first_open_after_install`, `first_open_time`, `first_visit_time`, `google_allow_ad_personalization_signals`, `last_advertising_id_reset`, `last_deep_link_referrer`, `last_gclid`, `lifetime_user_engagement`, `non_personalized_ads`, `session_id`, `session_number`, `sessionid`, `sfmc_id`, `sid`, `uid`, `user_id`, `userid`. Forbidden prefixes: `_`, `firebase_`, `google_`, `ga_`.

Watch out for close names: `notification_opened`, `screen_viewed` and `app_opened` are valid AREA events, distinct from the reserved names `notification_open`, `screen_view` and `first_open`. Never "fix" them into their reserved variant.

Sources: [GA4 reserved names](https://support.google.com/analytics/answer/13316687) and the Firebase `logEvent` references for [iOS](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics) and [Android](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics), checked on November 19, 2026. These lists change: check them again before each version.

## Properties

**Format.** `snake_case`, lowercase, 40 characters at most for an event property, 24 for a user property.

**Suffixes and prefixes.**

| Case | Rule | Example |
|---|---|---|
| Boolean | Prefix `is_` or `has_` | `is_trial`, `has_push_enabled` |
| Identifier | Suffix `_id` | `content_id` |
| Duration | In seconds, suffix `_seconds` | `run_duration_seconds` |
| Other measure | The unit as a suffix | `distance_m` |
| Date and time | Never as a property: the tool timestamps every event | |
| Derived value | Never as a property: a counter, the time between two events or a rank in the user's history ("Nth action") are computed in the tool from the events. The position of a step in a flow (`step_index`) is not one: only the app knows the order of its screens | |

A duration sent as a property is a measure only the app knows, such as the duration of a run. The time elapsed between two events is computed in the tool.

**Descriptive names, never abbreviated.** `permission_type` and `onboarding_version`, not `perm_type` or `version`. A generic name such as `type` or `source` means nothing once it leaves its event.

**Values of a closed list.** In lowercase `snake_case`, and the list is documented in the registry: `entry_point` is `icon`, `notification`, `link`, `widget`, `shortcut` or `other`, nothing else. Adding a value to a closed list is a minor version: a plan that follows the old list stays valid.

**One name, one meaning.** A property keeps the same meaning and the same type on every event. `screen_name` always means the name of a screen, never anything else. When two events need a related notion, each one has its own property: `link_source` for the origin of an incoming link, `consent_source` for where consent was given.

## The three scopes

| Scope | What it describes | When it is sent | Example |
|---|---|---|---|
| **Event property** | The context of this specific event | With that event | `permission_type`, `step_name` |
| **User property** | A lasting state of the user | Each time that state changes, from the app or from the server | `user_plan`, `is_trial` |
| **Common property** | A context shared by every event | Attached automatically to every event | Defined in the Foundations |

Information that does not change from one event to the next is not an event property: it is a user property or a common property. There is one exception: copying a user property onto an event when its value at the time of the event is needed. Many tools show the current value of a user property, not the value it had when the event was sent. `feature_used` therefore carries `user_plan`, to know whether the feature served a free or a paying user at that moment. The copy keeps the same name, and the registry lists the events that carry it.

A user property carries only one piece of information. `user_plan` gives the tier (`free`, `pro`), `is_trial` says whether the user is on a trial. Mixing them in a single value breaks segments as soon as a paid offer exists.

## Personal data

- No directly identifying data in a name or a property: no email, no name, no phone number, no address.
- The user identifier is a pseudonymous internal identifier, never an email. It is still personal data under the GDPR: it falls under consent, the right of access and the right to erasure.
- No free text typed by the user (search, message, form). If the content matters, send a category.
- No event before consent, when consent is required. The details are in [the Foundations](foundations.md#3-consent).

## Tool limits

AREA depends on no analytics tool, but it sets its constraints on the strictest of the common tools, so that a plan stays valid everywhere. Today, that is Firebase Analytics.

| Item | Limit |
|---|---|
| Event name | 40 characters |
| Properties per event | 25, common properties included |
| Event property name | 40 characters |
| Event property value | 100 characters |
| User properties | 25 |
| User property name | 24 characters |
| User property value | 36 characters |

Source: [Google Analytics for Firebase collection limits](https://support.google.com/firebase/answer/9237506), checked on November 16, 2026.

## Renaming and evolving

- **An event is renamed only if its meaning is wrong.** A rename breaks history and dashboards. An event with the right meaning but a non-compliant name keeps its name: the app's tracking plan records it as legacy, and states the AREA role it plays (see [Roles, not just names](mvt.md#roles-not-just-names) in Minimum Viable Tracking).
- **An event that changes meaning changes name.** Keeping the name would compare two different things in the same chart.
- **An abandoned event is first marked deprecated**, then removed in a later version.

## Stability and versions

Each registry entry (pillar, KPI, event, property, mechanic) has a stability level.

| Level | Meaning |
|---|---|
| `development` | May still change. Every new entry starts here |
| `stable` | Does not change without a new major version |
| `deprecated` | Not to be used anymore, removed in a later version |

**An entry becomes stable through use, not by decision.** It moves from `development` to `stable` when all three of these conditions are met:

1. It is implemented in at least two apps in production, at least one of them outside the team that maintains AREA.
2. Its KPIs have been read on real data in those apps.
3. No open feedback questions it.

Feedback is filed as an issue or a discussion in the repo, and every level change is recorded in the changelog with the feedback behind it.

An entry in `development` may change or disappear from one minor version to the next. A `stable` entry that must disappear first moves to `deprecated`, then is removed at the next major version.

AREA follows semantic versioning:

- **Major**: a change that breaks an existing plan, such as renaming or removing a stable entry, or a new calculation for a reference KPI.
- **Minor**: an addition that breaks nothing, including a new value in a closed list.
- **Patch**: a clarification of the text, with no effect on tracking.

**In version 0.x, AREA guarantees nothing.** Even a stable entry may still change from one minor version to the next. A tracking plan states which version of AREA it follows, to know what has changed since.
