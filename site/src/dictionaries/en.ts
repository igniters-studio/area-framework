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
    description: "A tracking framework for mobile apps that starts from business goals, not from events.",
  },
  nav: {
    label: "Main",
    pillars: "Pillars",
    mvt: "Minimum Viable Tracking",
    apply: "Apply",
    compare: "Compare",
    docs: "Spec",
    github: "GitHub",
  },
  hero: {
    badge: "First public version, open source",
    title: "Four KPIs to steer a mobile app. About a dozen events to read them.",
    lead: "A tracking framework that starts from business goals, not from events: four pillars every mobile app shares, a reference KPI for each, and the minimum tracking that makes them readable. Defined once, for every app.",
    primary: "Discover the framework",
    secondary: "View on GitHub",
    panelTitle: "Running app, first week",
    panelNote: "Fictional figures",
    panelLabel: "A sample app's events feeding the four AREA reference KPIs, with fictional figures",
    stream: {
      firstLaunch: "first launch",
      steps: "3 steps",
      day1: "Day 1",
      day3: "Day 3",
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
    lead: "The problem is not a lack of method. On a mobile app, the measurement plan often goes wrong in the same ways.",
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
        text: "Clicks, page views, sessions: on mobile, users arrive through a notification, a widget or a deep link.",
      },
    ],
    planTitle: "A typical measurement plan",
    planNote: "Made-up names, typical of a plan that follows the screens",
    areaTitle: "The same app with AREA",
    areaNote: "Three core events, then those of the mechanics the app actually has: about a dozen in all.",
  },
  pillars: {
    title: "Four pillars, shared by every mobile app.",
    lead: "Defined first, each with its question and its reference KPI. Each reference KPI is read with its volume, and comes with a verdict: measurable, partial or not measurable with the tracking in place. Advocacy can be read as soon as the app asks a satisfaction question, an NPS or offers an invitation.",
    items: {
      activation: {
        name: "Activation",
        question: "Do new users reach the moment when the app proves its value?",
        kpi: "Activation rate",
      },
      retention: {
        name: "Retention",
        question: "Do they come back to do what the app exists for?",
        kpi: "Core retention",
      },
      engagement: {
        name: "Engagement",
        question: "When they are there, do they use the app for what it does best?",
        kpi: "Core usage rate",
      },
      advocacy: {
        name: "Advocacy",
        question: "Are they ready to recommend it?",
        kpi: "Advocacy intent rate",
      },
    },
    chainTitle: "Every event knows why it exists.",
    chainLead:
      "Every event exists because a KPI needs it, every KPI because it answers a pillar's question, every pillar because a business goal depends on it.",
    down: "You design it, top-down",
    up: "The data comes back, bottom-up",
    chain: {
      goalLabel: "Business goal",
      goal: "Bring users back, for a long time, for what the app gives them.",
      goalBack: "Back up: on track or not",
      pillarLabel: "Pillar",
      pillar: "Retention",
      pillarBack: "Back up: question answered",
      kpiLabel: "Reference KPI",
      kpi: "Core retention at D1, D7 and D30",
      kpiBack: "Back up: 28% at D7",
      eventLabel: "Event",
      eventBack: "Sent by the app, every run",
    },
  },
  mvt: {
    title: (kpis: number, pillars: number) =>
      `Three core events. ${spell(kpis, true)} KPIs across ${spell(pillars)} pillars.`,
    lead: "The richness of tracking does not come from the number of events: it comes from properties, cohorts and time. Each KPI can then be broken down by the Foundations properties: iOS or Android, free or paying, app version.",
    fanLabel: "The three core events and the KPIs they compute on their own",
    layersTitle: "Minimum Viable Tracking, in three layers.",
    layersLead:
      "The Foundations make the KPIs reliable, the core makes them readable, then each mechanic the app contains brings its events. For a typical app, about a dozen events are enough to read the four pillars.",
    foundations: "1. Foundations",
    foundationsNote: "All apps",
    foundationsText: "Identity, common properties, consent and the separation of test data.",
    core: "2. Core",
    coreNote: "All apps",
    mechanics: "3. Mechanics",
    mechanicsNote: "A mechanic that is present makes its events required",
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
  },
  apply: {
    title: "Applying AREA, in six steps.",
    steps: [
      {
        title: "Write the business goal of each pillar",
        text: "The pillar pages give a typical example: each app writes its own, and that goal says why the pillar matters.",
      },
      {
        title: "Define the core action, then the aha moment",
        text: "The aha moment is a hypothesis to check against the data. Everything else depends on them.",
      },
      {
        title: "List the mechanics of the app",
        text: "Onboarding, paywall, permissions, notifications, sharing, referral… Each one brings its events.",
      },
      {
        title: "Set up the Foundations",
        text: "Identity, common properties, consent, separation of test data.",
      },
      {
        title: "Implement Minimum Viable Tracking",
        text: "Following the conventions.",
      },
      {
        title: "Read the four reference KPIs",
        text: "Their volume and their verdict, then check the aha moment and add the app's own questions. Never an event without a question.",
      },
    ],
  },
  compare: {
    title:
      "With AARRR or HEART, each project builds its measurement plan; with AREA, the structure of the plan already exists.",
    criterion: "Criterion",
    rows: [
      {
        label: "Measures",
        aarrr: "Startup growth, from acquisition to revenue",
        heart: "User experience",
        area: "The tracking of a mobile app",
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
        area: "Purchase decisions in the app; neither acquisition nor amounts",
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
      "“I looked for a framework. None offered a common base, ready to set up in any mobile app. So I wrote one.”",
    author: "Kevin Tersigni, creator of AREA.",
    more: "Read the full story",
  },
  cta: {
    title: "Open, versioned, ready to apply.",
    productTitle: "For product teams and founders",
    productText:
      "Agree on the four pillars and their reference KPIs, then hand your developers a tracking plan that answers your questions.",
    productLink: "Read the spec",
    studioTitle: "For studios and agencies",
    studioText:
      "The same tracking plan in every app of the portfolio: KPIs with the same name and the same definition from one app to the next, and a versioned registry that says which version each app follows. The plan is no longer rewritten for each client.",
    studioLink: "View the registry",
    devTitle: "For developers",
    devText:
      "Give your coding agent llms.txt: it links the YAML registry of events, properties and KPIs and the spec, pinned to this version. Then ask, for example:",
    devPrompt:
      "Read https://igniters-studio.github.io/area-framework/llms.txt and the AREA registry it links. Then first ask me about this app's core action and aha moment, without guessing them. Next, list its mechanics, write its tracking plan following Minimum Viable Tracking, and implement it behind the app's analytics wrapper if it has one.",
    copy: "Copy",
    copied: "Copied",
    devLink: "View on GitHub",
    nextLabel: "Coming next:",
    // In release order: area-core first, then supertrack.
    next: [
      {
        name: "area-core",
        status: "(coming soon):",
        text: "an open-source toolkit (Apache 2.0) that applies AREA to the repo of a React Native or Expo app, locally, with the developer's own coding agent: deterministic checks (naming conventions, Minimum Viable Tracking and its score), audit and fix-recommendation skills, and an MCP server that serves the framework to coding agents.",
      },
      {
        name: "supertrack",
        status: "(in development):",
        text: "a SaaS for React Native and Expo apps that connects to the GitHub repository, audits the tracking on the four pillars, suggests the missing code and checks it on every pull request.",
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
