# Foundations

The foundations measure nothing on their own. They make the KPIs reliable: if one of them is broken, every pillar is broken too, however good the events are. They are therefore checked before the pillars.

There are four of them: identity, common properties, consent and the separation of test data.

## 1. Identity

Activation and retention count users, not sessions. So you need to know who does what, from one launch to the next.

Whatever the case, four rules apply:

- **Every event carries an identifier**, from the first launch.
- **The user identifier comes from the authentication system**, whether it is the app's backend or a hosted authentication service. It is never an email (see [personal data](conventions.md#personal-data) in the conventions). The same identifier is passed to the payment provider, to link purchases to user journeys.
- **When the identifier changes, the old one is linked to the new one.** The journey made before the change then counts for the same user.
- **On sign-out, the identity is reset.** Otherwise, the next person on the same device inherits the previous person's history.

How they apply depends on how the app handles its users:

| Case | Before the account | When the user creates an account or signs in | What the KPIs measure |
|---|---|---|---|
| **Standard accounts** | Anonymous identifier from the analytics tool, stable for the install | The app passes the user identifier and links it to the anonymous identifier | Users, across all their devices |
| **Anonymous access, then optional account** | Identifier provided by the authentication system from the first launch | If the system keeps the same identifier when it converts the account, nothing to do. Otherwise, the old one is linked to the new one | Users for those with an account, installs for the others |
| **No account** | Anonymous identifier from the analytics tool | Not applicable | Installs |

When the KPIs count installs, a user who changes phones or reinstalls the app counts as a new one. This is not a tracking flaw: it is the limit of an app without accounts, and it is stated next to each KPI.

The app's extensions (widget, share extension, watch) send their events with the same identifier as the app. On iOS, it is shared through an App Group; otherwise each extension shows up as a separate user.

**What breaks without it:** users are counted twice, retention is underestimated and onboarding is attached to no one.

## 2. Common properties

Some information comes with every event, so that every KPI can be broken down the same way. It does not matter whether the tool collects it automatically or the app sends it: it must exist.

The table below is a minimum. Each app can add more as needed, following the conventions and the tool limits (25 properties per event, 25 user properties). The most useful ones are those the tool cannot guess: `app_language` when the language chosen in the app differs from the device's, `market` when offers change by country, `experiment_variant` when an A/B test is running, or `update_id` when the app ships updates without going through the stores. With Expo Updates or CodePush, `app_version` does not change: `update_id` is then the only way to tell two versions of the code apart.

| Property | Scope | Meaning | Values |
|---|---|---|---|
| `app_version` | Common | Version of the app that sends the event | `2.4.1` |
| `platform` | Common | The device's operating system | `ios`, `android` |
| `environment` | Common | Runtime environment | `production`, `staging` for distributed test builds (TestFlight, Play Store internal testing), `development` for local builds and simulators |
| `user_plan` | User | Tier of the offer, if the app has a paid one | `free`, `pro`… |
| `is_trial` | User | The user is on a trial, if the app offers one | `true`, `false` |
| `is_internal` | User | The user or the device belongs to the team | `true`, `false` |

A user property is updated every time the state changes, not only at launch. A `user_plan` still set to `free` after a purchase skews every segment. When the change happens outside the app (a renewal, a cancellation, a refund), the server updates the property, or the app does it at its next launch.

**What breaks without them:** no way to compare two versions of the app, to separate iOS from Android, or to read a KPI for paying users only.

## 3. Consent

- **When regulations require consent** for audience measurement, no event is sent before the user has given it. Events emitted before are dropped, never queued to be sent later.
- **The first launch is not lost for all that.** `app_opened` carries `is_first_launch` (see [the core](mvt.md#the-core) of Minimum Viable Tracking), and this flag stays true until the first `app_opened` could be sent. When consent is given, the app sends this first `app_opened` right away, with `is_first_launch: true`, then `analytics_consent_granted`: the user enters the cohorts at that moment.
- **Consent is tracked, refusal never.** The app sends `analytics_consent_granted` just after consent and the `app_opened` it unblocks, with `consent_source` (`prompt` or `settings`). A refusal is not sent, since nothing may be sent without consent.
- **The consent rate comes from elsewhere.** The analytics data only contains those who accepted, so it cannot compute it. It is read in the consent management tool, or in an aggregate counter that contains no identifier.
- **The KPIs only describe users who consented.** Those who accept are often more engaged than the others: an activation measured on 60% of users is probably higher than the real one. The consent rate therefore goes with every reading of the KPIs, and with every comparison to market benchmarks, which do not have this filter.
- **The choice applies to every SDK**, including those that send their own events (payment, paywall, in-app messaging).
- **A change of mind applies at once**, without waiting for the next app launch. A withdrawn consent looks like a user leaving in the data: the trend of the consent rate helps tell them apart.
- **iOS App Tracking Transparency is a different matter.** It covers advertising tracking across apps, not audience measurement. Its answer is tracked as a permission (`permission_type: "app_tracking"`), and never replaces analytics consent.

**What breaks without it:** collection is not compliant, and the KPIs mix measured and unmeasured users without anyone being able to see it.

## 4. Separating test data

- **Development builds, test builds and simulators send nothing to production data.** The best option is a separate project or stream per environment. Failing that, the `environment` property is set everywhere, and the KPIs always filter on `production`.
- **The environment is detected at runtime, not at build time.** A TestFlight build is the same binary as the App Store one, and a Play Store internal testing build is compiled like a production build. Read where the install actually comes from (the sandbox receipt on iOS, the install source on Android) or set the environment explicitly.
- **The team is flagged** with `is_internal`, to be excluded from the KPIs without being removed from the data. The flag is set from the install, through a hidden setting or a dedicated build, not only when a team account signs in.

**What breaks without it:** the team's tests inflate activation and skew every rate. This is especially true at the app's launch, when real users are still few, and with each new feature: the team is then the first, and sometimes the only, group to use it, at the very moment its adoption needs to be read.

## Common mistakes

- Identifying the user with their email.
- Forgetting to reset the identity on sign-out.
- Identifying the user before the authentication system has confirmed the sign-in.
- With anonymous access, creating a brand new account instead of converting the existing access, or not telling the analytics tool that the identifier changed: onboarding and the first launches disappear from the user's history.
- Counting on the analytics tool to reconcile everything. Not all tools merge history the same way: some attach past events to the new identifier, others only the following ones. The safest option is still a stable identifier from the first launch.
- Letting beta builds (TestFlight, Play Store internal testing) send to production because a setting relies on the build type.
- Letting a third-party SDK send its events before consent, or without the user identifier.
- Setting a user property at launch and never updating it again.
- Computing a consent rate from the analytics data. It only contains those who accepted.
