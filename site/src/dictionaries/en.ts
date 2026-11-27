import type { Dictionary } from "./fr";

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

/** A count in letters; `capital` for the start of a sentence. */
function spell(count: number, capital = false): string {
  const word = WORDS[count] ?? String(count);
  return capital ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

/**
 * Home page copy, English: the reference version of AREA. The wording comes from the spec
 * (README.md, spec/manifesto.md, spec/mvt.md and the pillar pages); where the design said it
 * differently, the spec wins.
 */
export const en: Dictionary = {
  meta: {
    title: "AREA Framework",
    description:
      "A tracking framework for mobile apps: what to track and why, starting from business goals.",
  },
  nav: {
    label: "Main navigation",
    pillars: "Pillars",
    mvt: "Minimum Viable Tracking",
    apply: "Apply",
    compare: "Compare",
    docs: "Spec",
    github: "GitHub",
  },
  hero: {
    badge: "Open source · see what's new",
    title: "An app's usage is its most underused growth lever.",
    lead: "AREA tells you what to track and why: four pillars to steer any mobile app, a reference KPI for each, and the events that make them readable. Then everything else the app wants to know.",
    primary: "Discover the framework",
    secondary: "View on GitHub",
    panelTitle: "Running app, first week",
    panelNote: "Illustrative figures",
    panelLabel:
      "The events of an example app feeding AREA's four reference KPIs, with illustrative figures",
    stream: {
      firstLaunch: "first launch",
      steps: "3 steps",
      day1: "D1",
      day3: "D3",
    },
    kpis: {
      activation: "Activation rate",
      retention: "Core retention, D7",
      engagement: "Core usage rate",
      advocacy: "Advocacy intent rate",
    },
  },
  problem: {
    title: "Many mobile apps track a lot and learn little.",
    lead: "Not for lack of good will: on mobile, the measurement plan often goes off the rails in the same ways.",
    badLabel: "Avoid",
    goodLabel: "With AREA",
    items: [
      {
        term: "The measurement plan follows the app's screen tree.",
        text: "Each feature gets its goals, its metrics and its events. Data volume replaces understanding.",
      },
      {
        term: "The essentials stay vague.",
        text: "The action that proves the app's value is not defined, while dozens of secondary metrics are detailed.",
      },
      {
        term: "Events describe taps, not outcomes.",
        text: "They break at the first redesign, and do not say whether the user got what they came for.",
      },
      {
        term: "Web habits are copied as is.",
        text: "Clicks, page views, sessions: on mobile, users arrive through a notification, a widget or a deeplink.",
      },
    ],
    planTitle: "A typical measurement plan",
    planNote: "Made-up names, typical of a plan that follows the screens",
    areaTitle: "The same app with AREA",
    areaNote: "The three core events, then those of the mechanics the app actually has: about a dozen in all.",
  },
  pillars: {
    title: "Four pillars to steer a mobile app.",
    lead: "The pillars are the same for every app. What each app defines is its goals within them: for each pillar, AREA offers a typical goal, the question it raises, the reference KPI that answers it and the events that compute it.",
    goalLabel: "Typical goal",
    items: {
      activation: {
        name: "Activation",
        goal: "Bring as many new users as possible to the app's value, as fast as possible.",
        question: "Do new users reach the moment the app proves its value?",
        kpi: "Activation rate",
        note: "",
      },
      retention: {
        name: "Retention",
        goal: "Bring users back, for a long time, for what the app gives them.",
        question: "Do they come back to do what the app is for?",
        kpi: "Core retention",
        note: "",
      },
      engagement: {
        name: "Engagement",
        goal: "Make the core action a habit, and know which features create value.",
        question: "When they are here, do they use the app for what it does best?",
        kpi: "Core usage rate",
        note: "",
      },
      advocacy: {
        name: "Advocacy",
        goal: "Turn satisfied users into a lever for organic growth and product improvement.",
        question: "Are they willing to recommend it?",
        kpi: "Advocacy intent rate",
        note: "Readable as soon as the app asks a satisfaction question, an NPS or offers an invitation. Not every app does.",
      },
    },
    chainTitle: "No event without a reason to exist.",
    chainLead:
      "An event exists because a KPI needs it, a KPI because it answers a question, a question because a goal depends on it. It is the Goal-Question-Metric approach, taken all the way down to the event.",
    down: "Designed from the goal down to the event",
    up: "Read from the event back up to the goal",
    chain: {
      goalLabel: "Goal",
      goal: "Bring users back, for a long time, for what the app gives them.",
      goalBack: "Goal met, or not",
      pillarLabel: "Pillar and question",
      pillar: "Retention",
      pillarBack: "Question answered",
      kpiLabel: "Reference KPI",
      kpi: "Core retention at D1, D7 and D30",
      kpiBack: "28% at D7",
      eventLabel: "Event",
      eventBack: "Sent by the app, every run",
    },
    chart: {
      title: "At the end of the chain, in the team's analytics tool",
      note: "Illustrative data",
      kpi: "Core retention, by cohort",
      activated: "Activated",
      notActivated: "Not activated",
      days: ["D0", "D1", "D7", "D14", "D30"],
      label:
        "Illustrative chart: core retention of activated users stays around 40% at D30, while non-activated users fall below 10%",
      caption:
        "AREA makes sure the right events come in, well named, at the right moment. The KPI itself is read in the team's analytics or BI tool.",
    },
  },
  mvt: {
    layersTitle: "A few well-chosen events are enough to decide.",
    layersLead:
      "Minimum Viable Tracking is the smallest plan that makes the pillars readable. Three layers, two of them the same in every app. No need for 300 events: richness comes from properties, cohorts and time.",
    foundations: "1. Foundations",
    foundationsNote: "Every app",
    foundationsText: "Identity, common properties, consent and the separation of test data.",
    core: "2. Core",
    coreNote: "Three events, required in every app",
    mechanics: "3. Mechanics",
    mechanicsNote: "Depends on the app",
    mechanicsText:
      "A mechanic is a feature the app either has or doesn't: an onboarding, notifications, a permission request, a referral… If the app has it, its events join the plan.",
    mechanicNames: {
      onboarding: "Onboarding",
      permissions: "Permissions",
      notifications: "Notifications",
      content_sharing: "Content sharing",
      referral: "Invitation or referral",
      review_prompt: "Review prompt",
    },
    more: (count: number) => `and ${count} more`,
    readMore: "Read Minimum Viable Tracking",
    fanTitle: "With the three core events alone",
    fanLead: (kpis: number, pillars: number) =>
      `An example: ${spell(kpis)} KPIs already computable across ${spell(pillars)} pillars, then split by platform, offer or app version. Mechanics and the app's own questions add many more.`,
    fanLabel: "The three core events and the KPIs they compute on their own",
  },
  apply: {
    title: "Applying AREA, in six steps.",
    steps: [
      {
        title: "Set the app's goals, pillar by pillar",
        text: "Starting from the typical goals AREA offers: each app writes its own, and they say why a pillar matters.",
      },
      {
        title: "Define the core action, then the aha moment",
        text: "The action the app exists for, and the moment a new user sees its value. The aha moment stays a hypothesis to check against the data.",
      },
      {
        title: "Derive the KPIs",
        text: "The four reference KPIs first, then those of the app's own questions.",
      },
      {
        title: "List the app's mechanics",
        text: "Onboarding, permissions, notifications, sharing, referral… Each one brings its events.",
      },
      {
        title: "Set up the Foundations and implement Minimum Viable Tracking",
        text: "Identity, common properties, consent, then the events, following the naming conventions.",
      },
      {
        title: "Check that every KPI is measurable",
        text: "Measurable, partial or not measurable: AREA says whether the right events come in. Reading them then happens in the team's analytics or BI tool. Never an event without a question.",
      },
    ],
  },
  compare: {
    title: "AREA, AARRR, HEART: three frameworks, three uses.",
    lead: "AARRR (Dave McClure's \"pirate metrics\") and HEART (Google) are the two most cited frameworks for measuring a product. They say what to measure, not which events to send: each team builds its own measurement plan. AREA goes all the way to the events, with a structure shared by every mobile app.",
    criterion: "Criterion",
    rows: [
      {
        label: "To measure",
        aarrr: "A startup's growth, from acquisition to revenue",
        heart: "User experience",
        area: "How a mobile app is used",
      },
      {
        label: "From goals to events",
        aarrr: "Through a measurement plan, built for each project",
        heart: "Through a measurement plan, built for each product or feature",
        area: "Built into the framework: a common base of KPIs and events, the same for every mobile app",
      },
      {
        label: "Acquisition and revenue",
        aarrr: "At the heart of the model",
        heart: "Adoption only",
        area: "Outside the pillars. Journeys specific to the business model (monetization, for instance) come in a later version",
      },
      {
        label: "Designed for mobile",
        aarrr: "Generic",
        heart: "Generic",
        area: "Yes",
      },
    ],
  },
  origin: {
    title: "Where AREA comes from",
    quote:
      "“I was looking for a tracking framework to measure the real usage of my factory's apps, simply and in a standard way. None of the existing ones offered a common base, ready to set up in any mobile app. So I wrote one.”",
    author: "Kevin Tersigni, creator of AREA and founder of the igniters studio.",
    more: "Read the full story",
  },
  cta: {
    title: "Open source, versioned, available today.",
    productTitle: "For product teams and founders",
    productText:
      "Agree on each pillar's goals and their KPIs, then give your developers a tracking plan that answers your questions.",
    productLink: "Read the spec",
    studioTitle: "For studios and agencies",
    studioText:
      "The same tracking plan in every app of the portfolio: KPIs with the same name and the same definition from one app to the next, and a versioned registry that says which version each app follows. The plan is no longer rewritten for each client.",
    studioLink: "View the registry",
    devTitle: "For developers",
    devText:
      "Give llms.txt to your coding agent: it points to the YAML registry of events, properties and KPIs, and to the spec, frozen at this version. Then ask it, for instance:",
    devPrompt:
      "Read https://igniters-studio.github.io/area-framework/llms.txt and the AREA registry it lists. Then first ask me about this app's core action and aha moment, without guessing them. Next, list its mechanics, write its tracking plan following Minimum Viable Tracking, and implement it behind the app's analytics wrapper if it has one.",
    copy: "Copy",
    copied: "Copied",
    devLink: "View on GitHub",
    nextLabel: "In the works:",
    next: [
      {
        name: "area-core",
        status: ":",
        text: "an open-source toolkit (Apache 2.0) that applies AREA to the repo of a React Native or Expo app, locally, with the developer's own coding agent: deterministic checks (naming conventions, Minimum Viable Tracking and its score), audit and fix-recommendation skills, and an MCP server that serves the framework to coding agents.",
      },
    ],
    star: "Follow the repo on GitHub",
  },
  footer: {
    license: "text under CC BY 4.0, registry under CC0 1.0, by",
    languages: "Language",
  },
  docs: {
    navLabel: "Spec pages",
    groups: {
      start: "Start",
      spec: "Spec",
      pillars: "Pillars",
      references: "References",
    },
    home: "Home",
    overview: "Overview",
    editOnGitHub: "View this file on GitHub",
  },
  notFound: {
    title: "Page not found",
    back: "Back to the home page",
  },
};
