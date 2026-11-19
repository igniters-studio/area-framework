# Engagement

> When they are there, do they use the app for what it does best?

Opening an app is not using it. A user can come back every day, take a look and leave without ever doing what the app exists for. Engagement measures real usage: the core action, how often it happens, and the features that matter. The pillar comes from [HEART](https://research.google.com/pubs/archive/36299.pdf), where it measures how involved the user is. AREA refocuses it on the core action, because that is what makes a mobile app valuable.

**Typical business goal:** make the core action a habit, and know which features create value.

## The core action

The core action is **the action that delivers the app's value**, the one the user repeats because they get something out of it. The aha moment relies on it (see [Activation](activation.md#the-aha-moment)).

| App | Core action |
|---|---|
| Running | Record a run |
| Budgeting | Categorize an expense |
| Meditation | Finish a session |
| Note-taking | Create a note |
| E-commerce | Place an order |

Two questions help find it. First: if you ask a user what the app does for them, what do they answer? Then, once the app has data: what do the users who stay do more than the others? The first gives a hypothesis, the second confirms or corrects it.

The core action is an outcome, never navigation: opening the app, displaying a screen or scrolling through a list are not core actions.

An app can have several types of core action, for example recording a run or following a program. They stay a single event, told apart by the `core_action_type` property. If the types have very different properties, the app can also keep one event per type and state in its tracking plan that they all play the role of `core_action_completed` (see [Roles, not just names](../mvt.md#roles-not-just-names) in Minimum Viable Tracking).

Like the aha moment, the core action is defined before the tracking. Retention is measured on it: without a core action, neither pillar can be read.

## Reference KPI: core usage rate

| | |
|---|---|
| **Definition** | Share of active users of the period who complete the core action at least once |
| **Active users** | Users who emit at least one `app_opened` or one `core_action_completed` in the period |
| **Numerator** | Active users who emit at least one `core_action_completed` in the period |
| **Period** | The week by default, the month for a low-frequency app |
| **Unit** | Distinct users |
| **Volume** | The number of users who completed the core action in the period. A rate that rises while this number falls signals a user base shrinking to its most loyal users |

This KPI answers the pillar's question directly: among those who come, how many really use the app?

| Verdict | Condition |
|---|---|
| **Measurable** | The core action is defined, `core_action_completed` is sent on every completion and from every surface where it happens, `app_opened` is in place, and the Foundations are met |
| **Partial** | The event is missing on some surfaces (widget, notification action, share extension…), fires on something other than an outcome, or one of the Foundations is incomplete |
| **Not measurable** | No core action is defined, or no event signals it |

## Secondary KPIs

| KPI | Definition |
|---|---|
| **Core action frequency** | For each user, the median interval between two days on which they complete the core action. Several actions on the same day count as one day. The KPI is the median of these intervals over active users who have at least two days with a core action in the period: a single day gives no interval |
| **Power user ratio** | Share of active users who complete the core action on at least N days of the period. N is specific to each app: it is set after looking at the actual distribution, then recorded in the tracking plan. Changing it starts a new series, never compared with the previous one |
| **Feature adoption rate** | Share of active users who emit `feature_used` for this feature in the period |
| **Screen reach** | Share of active users who display a given screen in the period, if the app tracks navigation |

## Events

| Event | When | Properties | Required if |
|---|---|---|---|
| `core_action_completed` | On each completion of the core action, the first one included, from every surface where it happens | `core_action_type` | Always (core) |
| `feature_used` | When the user uses a feature listed in the tracking plan | `feature_name`, `user_plan` | The app has features beyond the core action |
| `screen_viewed` | The user displays a screen | `screen_name` | The app analyzes its flows screen by screen |

`screen_viewed` is the AREA name of the screen view. Some tools have their own screen view event, with a reserved name: the layer that sends events can translate `screen_viewed` into that native event, but the tracking plan knows only one name. No reference KPI uses it: AREA measures activity with `app_opened`, not with screen views.

## Properties

| Property | Values |
|---|---|
| `core_action_type` | Type of core action, specific to the app. Same property as on `aha_moment_reached` |
| `feature_name` | Name of the feature, specific to the app: `export_pdf`, `set_goal`… The list is closed and documented in the tracking plan |
| `user_plan` | Tier of the offer when the feature is used, if the app has a paid one. It is a copy of the Foundations user property: it keeps the value at the time of use, whereas the user property often shows the current value |
| `screen_name` | Name of the screen, specific to the app. The list is closed and documented in the tracking plan |

## Questions this pillar answers

- Among the users who come, how many use the app for what it does?
- How often does the core action come back?
- Which features are really used, and by whom?
- What share of my users are heavy users?

## Common mistakes

- Measuring engagement in app opens or session length. A user can open the app every day without ever completing the core action.
- Choosing navigation as the core action: displaying a screen, opening a tab.
- Sending `core_action_completed` from a single screen, when the core action also happens from a widget, a notification or a share extension. On mobile, these surfaces count.
- Sending `feature_used` when a screen is displayed. It duplicates `screen_viewed` and does not say whether the feature was used.
- Leaving `feature_name` or `screen_name` open. Without a closed list, each developer invents their own values and the same feature shows up under three names.
- Sending a counter as a property ("Nth core action"). It is computed in the tool.
- Reading the core usage rate without its volume.
- Setting the power user threshold before looking at the distribution.
