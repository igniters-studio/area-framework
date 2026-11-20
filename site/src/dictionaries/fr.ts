/**
 * Home page copy, French. The source type: `en.ts` is typed on it, so a missing key fails `tsc`.
 * The wording comes from the spec (README.fr.md, spec/fr/manifesto.md, spec/fr/mvt.md and the
 * pillar pages); where the design said it differently, the spec wins.
 */
const WORDS = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix",
  "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt",
];

/** A count in letters; `capital` for the start of a sentence. */
function spell(count: number, capital = false): string {
  const word = WORDS[count] ?? String(count);
  return capital ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

export const fr = {
  meta: {
    title: "AREA Framework",
    description:
      "Un framework de tracking pour les apps mobiles, qui part des objectifs business et non des events.",
  },
  nav: {
    label: "Navigation principale",
    pillars: "Piliers",
    mvt: "Minimum Viable Tracking",
    apply: "Appliquer",
    compare: "Comparer",
    docs: "Spec",
    github: "GitHub",
  },
  hero: {
    badge: "Première version publique, open source",
    title: "Un framework de tracking pour les apps mobiles, qui part des objectifs business et non des events.",
    lead: "Quatre piliers communs à toutes les apps mobiles, un KPI de référence pour chacun, et le tracking minimum qui les rend lisibles. Défini une fois, pour toutes les apps.",
    primary: "Découvrir le framework",
    secondary: "Voir sur GitHub",
    panelTitle: "App de course, première semaine",
    panelNote: "Chiffres fictifs",
    panelLabel:
      "Les events d'une app d'exemple qui alimentent les quatre KPI de référence d'AREA, avec des chiffres fictifs",
    stream: {
      firstLaunch: "premier lancement",
      steps: "3 étapes",
      day1: "J1",
      day3: "J3",
    },
    kpis: {
      activation: "Taux d'activation",
      retention: "Rétention cœur, J7",
      engagement: "Taux d'usage cœur",
      advocacy: "Taux d'intention de recommandation",
    },
  },
  problem: {
    title: "Beaucoup d'apps mobiles traquent beaucoup et en apprennent peu.",
    lead: "Le problème ne vient pas d'un manque de méthode. Sur une app mobile, le plan de mesure déraille souvent de la même façon.",
    items: [
      {
        term: "Le plan de mesure suit l'arborescence de l'app.",
        text: "Chaque feature reçoit ses objectifs, ses métriques et ses events. Le volume de données remplace la compréhension.",
      },
      {
        term: "L'essentiel reste flou.",
        text: "L'action qui prouve la valeur de l'app n'est pas définie, pendant que des dizaines de métriques secondaires sont détaillées.",
      },
      {
        term: "Les events décrivent des taps, pas des résultats.",
        text: "Ils cassent au premier redesign, et ne disent pas si l'utilisateur a obtenu ce qu'il venait chercher.",
      },
      {
        term: "Les réflexes du web sont transposés tels quels.",
        text: "Clics, pages vues, sessions : sur mobile, on arrive par une notification, un widget ou un lien profond.",
      },
    ],
    planTitle: "Un plan de mesure type",
    planNote: "140 events, pour l'exemple",
    areaTitle: "La même app avec AREA",
    areaNote:
      "Trois events du socle, puis ceux des mécaniques que l'app contient vraiment : une douzaine en tout.",
  },
  pillars: {
    title: "Quatre piliers, communs à toutes les apps mobiles.",
    lead: "Définis en premier, chacun avec sa question et son KPI de référence. Chaque KPI de référence se lit avec son volume, et s'accompagne d'un verdict : mesurable, partiel ou non mesurable avec le tracking en place.",
    items: {
      activation: {
        name: "Activation",
        question: "Les nouveaux utilisateurs atteignent-ils le moment où l'app prouve sa valeur ?",
        kpi: "Taux d'activation",
      },
      retention: {
        name: "Rétention",
        question: "Reviennent-ils faire ce pour quoi l'app existe ?",
        kpi: "Rétention cœur",
      },
      engagement: {
        name: "Engagement",
        question: "Quand ils sont là, utilisent-ils l'app pour ce qu'elle sait faire de mieux ?",
        kpi: "Taux d'usage cœur",
      },
      advocacy: {
        name: "Advocacy",
        question: "Sont-ils prêts à la recommander ?",
        kpi: "Taux d'intention de recommandation",
      },
    },
    chainTitle: "Chaque event sait pourquoi il existe.",
    chainLead:
      "Chaque event existe parce qu'un KPI en a besoin, chaque KPI parce qu'il répond à la question d'un pilier, chaque pilier parce qu'un objectif business en dépend.",
    down: "Le plan se conçoit de haut en bas",
    up: "Les données remontent, de bas en haut",
    chain: {
      goalLabel: "Objectif business",
      goal: "Faire revenir les utilisateurs, longtemps, pour ce que l'app leur apporte.",
      goalBack: "Retour : objectif tenu ou non",
      pillarLabel: "Pilier",
      pillar: "Rétention",
      pillarBack: "Retour : question tranchée",
      kpiLabel: "KPI de référence",
      kpi: "Rétention cœur à J1, J7 et J30",
      kpiBack: "Retour : 28 % à J7",
      eventLabel: "Event",
      eventBack: "Envoyé par l'app, à chaque course",
    },
  },
  mvt: {
    title: (kpis: number, pillars: number) =>
      `Trois events du socle. ${spell(kpis, true)} KPI sur ${spell(pillars)} piliers.`,
    lead: "La richesse d'un tracking ne vient pas du nombre d'events : elle vient des propriétés, des cohortes et du temps. Chaque KPI se découpe ensuite par les propriétés des Fondations : iOS ou Android, gratuit ou payant, version de l'app.",
    fanLabel: "Les trois events du socle et les KPI qu'ils calculent à eux seuls",
    layersTitle: "Le Minimum Viable Tracking, en trois couches.",
    layersLead:
      "Les Fondations rendent les KPI fiables, le socle les rend lisibles, puis chaque mécanique que l'app contient apporte ses events. Pour une app courante, une douzaine d'events suffit à lire les quatre piliers.",
    foundations: "1. Fondations",
    foundationsNote: "Toutes les apps",
    foundationsText:
      "L'identité, les propriétés communes, le consentement et la séparation des données de test.",
    core: "2. Socle",
    coreNote: "Toutes les apps",
    mechanics: "3. Mécaniques",
    mechanicsNote: "Une mécanique présente rend ses events obligatoires",
    mechanicNames: {
      onboarding: "Onboarding",
      permissions: "Autorisations",
      notifications: "Notifications",
      content_sharing: "Partage de contenu",
      referral: "Invitation ou parrainage",
      review_prompt: "Demande de note",
    },
    more: (count: number) => `et ${count} autres`,
    readMore: "Lire le Minimum Viable Tracking",
  },
  apply: {
    title: "Appliquer AREA, en six étapes.",
    phases: { frame: "Cadrer", instrument: "Instrumenter", read: "Lire" },
    steps: [
      {
        title: "Écrire l'objectif business de chaque pilier",
        text: "Les pages des piliers en donnent un exemple type : chaque app écrit le sien, et c'est lui qui dit pourquoi le pilier compte.",
      },
      {
        title: "Définir l'action cœur, puis l'aha moment",
        text: "L'aha moment est une hypothèse à vérifier sur les données. Tout le reste en dépend.",
      },
      {
        title: "Lister les mécaniques de l'app",
        text: "Onboarding, paywall, autorisations, notifications, partage, parrainage… Chacune apporte ses events.",
      },
      {
        title: "Poser les Fondations",
        text: "Identité, propriétés communes, consentement, séparation des données de test.",
      },
      {
        title: "Implémenter le Minimum Viable Tracking",
        text: "En suivant les conventions.",
      },
      {
        title: "Lire les quatre KPI de référence",
        text: "Leur volume et leur verdict, puis vérifier l'aha moment et ajouter les questions propres à l'app. Jamais d'event sans question.",
      },
    ],
  },
  compare: {
    title:
      "Avec AARRR ou HEART, chaque projet construit son plan de mesure ; avec AREA, la structure du plan existe déjà.",
    criterion: "Critère",
    rows: [
      {
        label: "Pour mesurer",
        aarrr: "La croissance d'une startup, de l'acquisition au revenu",
        heart: "L'expérience utilisateur",
        area: "Le tracking d'une app mobile",
      },
      {
        label: "De l'objectif aux events",
        aarrr: "Par un plan de mesure, à construire pour chaque projet",
        heart: "Par un plan de mesure, à construire pour chaque produit ou feature",
        area: "Intégré au framework : un socle commun de KPI et d'events, le même pour toutes les apps mobiles",
      },
      {
        label: "Acquisition et revenu",
        aarrr: "Au cœur du modèle",
        heart: "Adoption seulement",
        area: "Les décisions d'achat dans l'app ; ni l'acquisition ni les montants",
      },
      {
        label: "Pensé pour le mobile",
        aarrr: "Non",
        heart: "Non",
        area: "Oui",
      },
    ],
  },
  origin: {
    title: "D'où vient AREA",
    quote:
      "« J'ai cherché un framework. Aucun ne proposait un socle commun, prêt à poser dans n'importe quelle app mobile. Alors j'en ai écrit un. »",
    author: "Kevin Tersigni, créateur d'AREA.",
    more: "Lire l'histoire",
  },
  cta: {
    title: "Ouvert, versionné, prêt à appliquer.",
    productTitle: "Pour les équipes produit",
    productText:
      "Mettez-vous d'accord sur les quatre piliers et leurs KPI de référence, puis donnez à vos développeurs un plan de tracking qui répond à vos questions.",
    productLink: "Lire la spec",
    devTitle: "Pour les développeurs",
    devText:
      "Donnez llms.txt à votre agent de code : il pointe vers le registre YAML des events, des propriétés et des KPI, et vers la spec, figés sur cette version. Puis demandez-lui, par exemple :",
    devPrompt:
      "Lis https://igniters-studio.github.io/area-framework/llms.txt et le registre AREA qu'il cite. Puis liste les mécaniques de cette app, écris son plan de tracking selon le Minimum Viable Tracking, et implémente-le derrière notre wrapper analytics.",
    copy: "Copier",
    copied: "Copié",
    devLink: "Voir sur GitHub",
    nextLabel: "Ce qui vient ensuite :",
    next: "un skill pour les agents de code et un serveur MCP, publics eux aussi, pour appliquer AREA depuis l'environnement de développement d'une app.",
    star: "Suivre le repo sur GitHub",
  },
  footer: {
    license: "texte sous licence CC BY 4.0, registre sous CC0 1.0, par",
    languages: "Langue",
  },
  docs: {
    navLabel: "Pages de la spec",
    groups: {
      start: "Commencer",
      spec: "Spec",
      pillars: "Piliers",
      references: "Repères",
    },
    home: "Accueil",
    overview: "Présentation",
    editOnGitHub: "Voir ce fichier sur GitHub",
  },
  notFound: {
    title: "Page introuvable",
    back: "Retour à l'accueil",
  },
};

export type Dictionary = typeof fr;
