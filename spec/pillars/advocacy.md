# Advocacy

> Are they ready to recommend it?

A satisfied user is the cheapest growth channel: they recommend the app, share it, help improve it. Advocacy measures this willingness. It takes two forms: **recommending** the app to people around you, and **contributing** to how it evolves by suggesting or voting for features. The pillar takes up the idea of Referral from AARRR, measured where the app can see it.

**Typical business goal:** turn satisfied users into a lever for organic growth and product improvement.

## Measuring intent, not the act

The act of recommending happens outside the app, where it sees nothing. The store review prompt is the best example: the app can trigger it, but it never knows whether the dialog was shown, or whether the user left a rating. The stores may even decide not to show it.

Advocacy therefore measures **the intent captured in the app**. The reference KPI keeps only explicit intents: a positive answer to a satisfaction question, an NPS score of 9 or 10, an invitation started. Content shares and contributions are more diffuse signals: sharing your run recommends the run as much as the app, and feedback can be a complaint. They have their own KPIs, alongside. What becomes of the intent outside the app (a rating, an install through a referral) is not measured by this pillar.

| App | Explicit intent signal |
|---|---|
| Running | Invites a friend to a challenge |
| Budgeting | Gives 9 or 10 to the NPS question |
| Meditation | Invites someone close to meditate with them |
| Note-taking | Answers a satisfaction question positively |
| E-commerce | Refers a friend |

The pillar applies to every app, but it can only be measured if the app offers at least one of these means: a satisfaction question, an NPS, an invitation. An app that offers none cannot measure its Advocacy: it is a product finding, not a missing event.

## Reference KPI: advocacy intent rate

| | |
|---|---|
| **Definition** | Share of active users of the period who express an explicit intent to recommend at least once |
| **Active users** | Users who emit at least one `app_opened` or one `core_action_completed` in the period |
| **Numerator** | Active users who emit at least one of these signals: `satisfaction_prompt_answered` with a positive answer, `nps_answered` with a score of 9 or 10, `invite_shared` |
| **Period** | The month, or the quarter for a low-frequency app |
| **Unit** | Distinct users |
| **Volume** | The number of users who expressed an intent in the period |

This rate also depends on how often the app asks its questions: asking the satisfaction question twice as often will raise the KPI without anything having changed. It can therefore only be compared over time with the same frequency and the same moments. Any change is recorded in the tracking plan. Comparing it from one app to another makes no sense. An invitation started and then abandoned also counts as an intent: the app does not see what comes next.

| Verdict | Condition |
|---|---|
| **Measurable** | At least one satisfaction question, NPS or invitation exists, and its events say what the user did (answer given, share started) |
| **Partial** | A satisfaction question, an NPS or an invitation exists, but its events fire before the user acts (the question shown instead of the answer given, the invite screen opened instead of the share started), or are missing on some surfaces |
| **Not measurable** | No satisfaction question, no NPS and no invitation. Content sharing, co-creation or the review prompt alone are not enough |

## Secondary KPIs

| KPI | Definition |
|---|---|
| **Declared satisfaction** | Share of users asked who answer `satisfaction_prompt_answered` positively, by `trigger_context` |
| **NPS** | Share of scores of 9 and 10 minus share of scores from 0 to 6, on `nps_answered`, if the app measures it |
| **Share rate** | Share of active users who start at least one content share (`content_shared`) in the period |
| **Contribution rate** | Share of active users who emit at least one `co_creation_contributed` in the period |
| **Contributor retention gap** | Core retention of new users who contribute within their first N days (the activation window), read after those N days and compared with the other new users of the same period. Comparing with everyone who ever contributed would skew the gap: a user who contributes at D25 is by definition still there at D25. It is a correlation: contributors were probably already the most engaged |
| **Review prompt rate** | Share of active users for whom the app called the review prompt in the period, by `trigger_context`. It says whether the app asks at the right moments, without asking too often |

## Events

| Event | When | Properties | Required if |
|---|---|---|---|
| `satisfaction_prompt_answered` | The user answers a satisfaction question asked in the app | `satisfaction_answer`, `trigger_context` | The app asks the question |
| `nps_answered` | The user gives an NPS score | `nps_score`, `trigger_context` | The app measures NPS |
| `review_prompt_triggered` | The app calls the store's review prompt. The store decides whether to show it | `trigger_context` | The app asks for a rating |
| `invite_shared` | The user starts sharing an invitation or their referral link | `share_method` | The app has an invitation or a referral program |
| `content_shared` | The user starts sharing content from the app | `content_type`, `share_method` | The app allows sharing |
| `co_creation_contributed` | The user suggests an idea, votes for a feature or sends feedback | `co_creation_action` | The app includes a co-creation tool |

At least one satisfaction question, NPS or invitation is needed for the reference KPI to be measurable.

**When is a share event sent?** When the share starts: the share sheet opens, the link is copied, or the app's own share is sent. The rule is the same on iOS and Android. Platforms and libraries do not all say whether the share went through, or to which target. Counting only the start of the share measures the same thing everywhere: an intent to share, comparable from one platform to another.

## Properties

| Property | Values |
|---|---|
| `satisfaction_answer` | `positive`, `negative` |
| `trigger_context` | The moment chosen by the app: `post_aha_moment`, `post_positive_event`, `day_7`, `day_30` (7 or 30 days after the first launch) |
| `nps_score` | Integer from 0 to 10 |
| `share_method` | The means: `share_sheet` (the system share sheet), `link_copied`, `in_app` (a sharing feature of the app itself) |
| `content_type` | Type of content shared, specific to the app: `run`, `product`, `note`… |
| `co_creation_action` | `feature_requested`, `roadmap_voted`, `feedback_submitted` |

## The review prompt

The satisfaction question and the review prompt are two independent mechanics. **The review prompt is never conditioned on a positive answer.** The [Google Play In-App Review API documentation](https://developer.android.com/guide/playcore/in-app-review) forbids asking the user any question before or during the review prompt, including "Do you like the app?". It also advises against triggering it from a button: the store may show nothing, and the user thinks the app is broken. A "Rate the app" button in the settings should open the app's store page instead.

The app therefore chooses when to ask based on what the user does, for example right after the aha moment, right after a positive moment, or 7 or 30 days after the first launch, and `trigger_context` says which.

## Questions this pillar answers

- What share of my users says they are ready to recommend the app?
- Are my users satisfied, and at which point of their journey?
- What do my users share?
- Do my contributors stay longer than the others?
- Does my referral program bring users who activate?

## Referrals

Many apps turn recommendation into an acquisition lever, and reward the referrer with a discount, a free month or points. A good part of this journey happens in the app:

1. The referrer starts an invitation: `invite_shared`.
2. The referred user opens the app from a referral link: `referral_link_opened`. The link often leads first to a web page that presents the offer. The app does not see this page: the event is sent when the app opens.
3. The referral is attached to the referred user's account: `referral_code_applied`. The code, typed by the referred user or carried by the link, identifies the referrer, which links the two users.
4. The referred user reaches the aha moment, or not: `aha_moment_reached`, read on referred users.
5. The app rewards the referrer: `reward_received`.

Opening the link and attaching the referral are two separate steps: a referred user can open the link, see the offer, and never go further. A referral link sends `referral_link_opened` instead of `deep_link_opened`, so the same open is not counted twice.

A code typed by hand can be measured without any attribution tool. A referral link, on the other hand, must survive the app install: it needs a deferred link, provided by an attribution tool or a link service.

| Event | When | Properties | Required if |
|---|---|---|---|
| `referral_link_opened` | The app opens from a referral link, directly or after an install through a deferred link | | The app has referral links |
| `referral_code_applied` | The referral is attached to the referred user's account, through a code typed or carried by the link | `referral_source` | The app has a referral program |
| `reward_received` | The user receives a reward from the app | `reward_reason`, `reward_type` | The app rewards its users |

| Property | Values |
|---|---|
| `referral_source` | `code` (typed by the referred user), `link` (carried by the referral link) |
| `reward_reason` | `referral`, `contribution`, `other` |
| `reward_type` | `discount`, `free_period`, `credit`, `points` |

`reward_received` is generic on purpose: it also covers rewards granted for a contribution, such as an idea added to the roadmap. It never sends an amount, since revenue is out of scope. It can be sent by the server, when the server grants the reward.

| KPI | Definition |
|---|---|
| **Referral rate** | Share of active users who start at least one invitation in the period |
| **Referral link conversion** | Share of users who emit `referral_link_opened` and then `referral_code_applied` within the following 30 days, read at D7 and D30 counted from `referral_link_opened`. The gap between D7 and D30 says whether a reminder to the referred user is worth it |
| **Referred users per referrer** | Number of users whose referral is attached to their account (`referral_code_applied`), over the number of users who started at least one invitation, on the same rolling 30-day window. Indicative: an invitation and the code that follows may fall in two windows |
| **Activation of referred users** | Activation rate of referred users, compared with that of the other new users of the same period. As always, it is a correlation: a referred user often arrives with a recommendation that already motivates them |
| **Rewarded referrers** | Number of distinct referrers who receive a reward for a referral in the period |

Still out of the app's reach: linking an install to an invitation when the referred user applies no code and opens no link. That is the job of attribution tools.

## Common mistakes

- Conditioning the review prompt on a positive answer to a satisfaction question. Google Play forbids it.
- Triggering the review prompt from a button.
- Presenting `review_prompt_triggered` as a rating obtained. The app never knows whether the user left a rating.
- Counting a visit to the roadmap or the changelog as a contribution. It is reading.
- Sending the free-text comment of an NPS or a feedback as a property. It is free text, which the conventions forbid.
- Comparing the advocacy intent rate after changing how often the questions are asked.
- Reading `referral_link_opened` as a number of installs that came from referrals. It counts opens from a link; installs belong to attribution.
- Granting a reward without an event: you can then never know how many referrers the program actually rewarded.
- Sending the amount of a reward as a property. The type is enough, the amount belongs to revenue.
