# Retention

> Do they come back to do what the app exists for?

Retention is the most honest signal of an app's value. Thousands of installs are worth nothing if nobody comes back the following week. In AREA, coming back does not mean reopening the app: a user is retained when they come back to complete the core action (see [the core action](engagement.md#the-core-action)).

**Typical business goal:** bring users back, for a long time, for what the app gives them.

## Coming back means doing the core action again

| App | A retained user… |
|---|---|
| Running | …records a new run |
| Budgeting | …categorizes new expenses |
| Meditation | …finishes a new session |
| Note-taking | …creates a new note |
| E-commerce | …places a new order |

Measuring retention on app opens inflates it: a notification opened out of habit would count as a return. Measuring it on the core action keeps only the returns that have value.

## Reference KPI: core retention

| | |
|---|---|
| **Definition** | Share of a cohort's new users who complete the core action N days after their first launch |
| **Cohort** | New users of the period: their `app_opened` with `is_first_launch` falls in the period |
| **Return** | At least one `core_action_completed` on day N after the first launch |
| **Reading points** | D1, D7 and D30 |
| **Calculation** | Classic retention: the user counts on day N if they come back that day, as in market benchmarks. A day is 24 hours from the first launch |
| **Unit** | Distinct users |
| **Volume** | The number of users retained at each reading point |

Day-by-day retention also measures frequency: an app used once a week looks bad at D1, even if all its users come back. **For a low-frequency app**, retention is therefore read by window rather than by day: week 1, week 4, month 3, with the user counting if they come back at least once in the window. The choice between day and window is made once, based on the app's usage cycle, and is recorded in the tracking plan.

| Verdict | Condition |
|---|---|
| **Measurable** | The core action is defined, `core_action_completed` is sent from all its surfaces (app screen, widget, notification…), `app_opened` is in place with `is_first_launch`, and the Foundations are met |
| **Partial** | `core_action_completed` is missing on some surfaces, `is_first_launch` is missing, or one of the Foundations is incomplete |
| **Not measurable** | No core action is defined, or retention can only be measured on app opens |

An app without accounts is not penalized: its verdict only states that retention counts installs, and that it is underestimated with each reinstall.

## Activated and non-activated users

A single curve says little. Splitting it in two says where to look.

| Cohort | Starting point | Who | Return |
|---|---|---|---|
| **Activated** | The first launch | New users who reach the aha moment within the activation window | `core_action_completed` |
| **Non-activated** | The first launch | The other new users of the same period | `core_action_completed` |

Both cohorts start on the same day, and retention is read after the activation window closes: at D7 and D30 for a 7-day window. Comparing activated users with all users, or starting their curve at the aha moment, would give a gap that partly comes from the calculation itself.

| What you see | What it suggests | Hypothesis to test first |
|---|---|---|
| Activated users stay much more than non-activated users | The value they saw seems to matter for coming back | Bring more users to the aha moment, then check that the whole cohort's retention follows |
| Both curves are low and close | Even those who saw the value do not come back | The problem is probably in the value itself, more than in the path to it |

**This gap is a correlation, not a cause.** Users who reach the aha moment are also, on average, the most motivated at the start. Part of their better retention was theirs before they even opened the app. The gap says where to look, it does not promise a gain: "10% more activated users" will not necessarily give 10% more retention. Only an experiment proves it: a change tested against a control group or, failing that, a rise in the activation rate followed by a rise in the retention of the whole cohort.

**Market benchmarks do not measure the same thing.** They count the users who open the app on day N, over installs. To compare with them, AREA computes an open retention (see [the secondary KPIs](#secondary-kpis)). Core retention is always lower, since a return without a core action does not count: comparing it with benchmarks would cause needless worry. Conversely, comparing the activated cohort, which is higher by construction, would give false comfort.

## Secondary KPIs

| KPI | Definition |
|---|---|
| **Open retention** | Share of the cohort that emits at least one `app_opened` on day N. This is the figure to compare with market benchmarks, with two known gaps: the cohort does not count installs that were never opened, and it only contains the users who accepted measurement (see [consent](../foundations.md#3-consent)) |
| **Core retention of activated and non-activated users** | The core retention of both cohorts, read after the activation window closes (D7 and D30 for the default window) |
| **Returns by channel** | Split of the `app_opened` that are not a first launch, by `entry_point`: the icon, a widget or a shortcut, a notification, a link. A growing share of opens from the icon suggests the app is becoming a habit, with no need for reminders |

## Events

Retention is measured with the core events: `app_opened`, `aha_moment_reached` and `core_action_completed`. The events specific to this pillar say which notification or which link brought the user back, when `entry_point` only says it was a notification or a link.

| Event | When | Properties | Required if |
|---|---|---|---|
| `notification_opened` | The user taps a notification from the app, whether it opens the app or the app is already in the foreground | `notification_type`, `delivery_type` | The app sends notifications |
| `deep_link_opened` | The app opens from an external link. A referral link sends [`referral_link_opened`](advocacy.md#referrals) instead | `link_source` | The app receives incoming links |

## Properties

| Property | Values |
|---|---|
| `notification_type` | `reminder`, `re_engagement`, `streak_reminder`, `social`, `promotional`, `content_update`, `transactional`. The server or the code that creates the notification puts this value in it, so that the app can read it when the notification is opened |
| `delivery_type` | `local` (scheduled on the device), `push` (sent by a server) |
| `link_source` | `email`, `social`, `qr_code`, `other`. No `push` value: a notification that opens a link sends `notification_opened`, so the same return is not counted twice. No `referral` value either: a referral link sends `referral_link_opened` |

## Questions this pillar answers

- What share of my users comes back at D1, D7, D30, and which ones?
- Do activated users come back more than the others?
- Through which channels do they come back?
- What share of returns goes through a notification? To know whether a notification really brings users back, you need a control group that does not receive it.

## Common mistakes

- Steering retention on app opens or on sessions. Open retention is for comparing with the market, not for deciding.
- Reading a single curve, without separating activated and non-activated users.
- Comparing activated users with all users, or starting their curve at the aha moment.
- Comparing core retention, or the activated cohort, with market benchmarks, which count app opens since install.
- Reading the retention of a low-frequency app day by day.
- Presenting the gap between activated and non-activated users as a guaranteed gain.
- Reading D30 retention on a cohort that entered less than 30 days ago.
- Counting sessions when tools do not measure them the same way from one app to another. Depending on the tool, sessions are captured automatically, configurable or absent.
