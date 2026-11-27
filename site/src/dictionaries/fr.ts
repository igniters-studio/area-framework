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
      "Un framework de tracking pour les apps mobiles : quoi tracker et pourquoi, à partir des objectifs business.",
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
    badge: "Open source · voir les nouveautés",
    title: "L'usage d'une app est son levier de croissance le plus sous-exploité.",
    lead: "AREA dit quoi tracker et pourquoi : quatre piliers pour piloter n'importe quelle app mobile, un KPI de référence pour chacun, et les events qui les rendent lisibles. Puis tout ce que l'app veut savoir de plus.",
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
    lead: "Pas par manque de bonne volonté : sur mobile, le plan de mesure déraille souvent de la même façon.",
    badLabel: "À éviter",
    goodLabel: "Avec AREA",
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
        text: "Clics, pages vues, sessions : sur mobile, on arrive par une notification, un widget ou un deeplink.",
      },
    ],
    planTitle: "Un plan de mesure type",
    planNote: "Des noms inventés, typiques d'un plan qui suit les écrans",
    areaTitle: "La même app avec AREA",
    areaNote:
      "Les trois events du socle, puis ceux des mécaniques que l'app contient vraiment : une douzaine en tout.",
  },
  pillars: {
    title: "Quatre piliers pour piloter une app mobile.",
    lead: "Les piliers sont les mêmes pour toutes les apps. Ce que chaque app définit, ce sont ses objectifs dans chacun d'eux : AREA propose pour chaque pilier un objectif type, la question qui en découle, le KPI de référence qui y répond et les events qui le calculent.",
    goalLabel: "Objectif type",
    items: {
      activation: {
        name: "Activation",
        goal: "Amener le plus de nouveaux utilisateurs possible jusqu'à la valeur de l'app, le plus vite possible.",
        question: "Les nouveaux utilisateurs atteignent-ils le moment où l'app prouve sa valeur ?",
        kpi: "Taux d'activation",
        note: "",
      },
      retention: {
        name: "Rétention",
        goal: "Faire revenir les utilisateurs, longtemps, pour ce que l'app leur apporte.",
        question: "Reviennent-ils faire ce pour quoi l'app existe ?",
        kpi: "Rétention cœur",
        note: "",
      },
      engagement: {
        name: "Engagement",
        goal: "Faire de l'action cœur une habitude, et savoir quelles features créent de la valeur.",
        question: "Quand ils sont là, utilisent-ils l'app pour ce qu'elle sait faire de mieux ?",
        kpi: "Taux d'usage cœur",
        note: "",
      },
      advocacy: {
        name: "Advocacy",
        goal: "Faire des utilisateurs satisfaits un levier de croissance organique et d'amélioration du produit.",
        question: "Sont-ils prêts à la recommander ?",
        kpi: "Taux d'intention de recommandation",
        note: "Se lit dès que l'app pose une question de satisfaction, un NPS ou propose une invitation. Toutes ne le font pas.",
      },
    },
    chainTitle: "Pas un event sans raison d'être.",
    chainLead:
      "Un event existe parce qu'un KPI en a besoin, un KPI parce qu'il répond à une question, une question parce qu'un objectif en dépend. C'est l'approche Goal-Question-Metric, poussée jusqu'à l'event.",
    down: "Se conçoit de l'objectif vers l'event",
    up: "Se lit de l'event vers l'objectif",
    chain: {
      goalLabel: "Objectif",
      goal: "Faire revenir les utilisateurs, longtemps, pour ce que l'app leur apporte.",
      goalBack: "Objectif tenu, ou pas",
      pillarLabel: "Pilier et question",
      pillar: "Rétention",
      pillarBack: "Question tranchée",
      kpiLabel: "KPI de référence",
      kpi: "Rétention cœur à J1, J7 et J30",
      kpiBack: "28 % à J7",
      eventLabel: "Event",
      eventBack: "Envoyé par l'app, à chaque course",
    },
    chart: {
      title: "Au bout de la chaîne, dans l'outil d'analytics de l'équipe",
      note: "Données fictives",
      kpi: "Rétention cœur, par cohorte",
      activated: "Activés",
      notActivated: "Non activés",
      days: ["J0", "J1", "J7", "J14", "J30"],
      label:
        "Graphique fictif : la rétention cœur des utilisateurs activés reste autour de 40 % à J30, celle des non activés tombe sous 10 %",
      caption:
        "AREA s'assure que les bons events remontent, bien nommés, au bon moment. Le KPI, lui, se lit dans l'outil d'analytics ou de BI de l'équipe.",
    },
  },
  mvt: {
    layersTitle: "Peu d'events, bien choisis, suffisent pour décider.",
    layersLead:
      "Le Minimum Viable Tracking est le plus petit plan qui rend les piliers lisibles. Trois couches, dont deux identiques dans toutes les apps. Pas besoin de 300 events : la richesse vient des propriétés, des cohortes et du temps.",
    foundations: "1. Fondations",
    foundationsNote: "Toutes les apps",
    foundationsText:
      "L'identité, les propriétés communes, le consentement et la séparation des données de test.",
    core: "2. Socle",
    coreNote: "Trois events obligatoires dans toute app",
    mechanics: "3. Mécaniques",
    mechanicsNote: "Selon l'app",
    mechanicsText:
      "Une mécanique, c'est une fonction que l'app a ou n'a pas : un onboarding, des notifications, une demande d'autorisation, un parrainage… Si l'app l'a, ses events entrent dans le plan.",
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
    fanTitle: "Rien qu'avec les trois events du socle",
    fanLead: (kpis: number, pillars: number) =>
      `Un exemple : ${spell(kpis)} KPI déjà calculables sur ${spell(pillars)} piliers, à découper ensuite par plateforme, offre ou version de l'app. Les mécaniques et les questions propres à l'app en ajoutent bien d'autres.`,
    fanLabel: "Les trois events du socle et les KPI qu'ils calculent à eux seuls",
  },
  apply: {
    title: "Appliquer AREA, en six étapes.",
    steps: [
      {
        title: "Fixer les objectifs de l'app, pilier par pilier",
        text: "En partant des objectifs types qu'AREA propose : chaque app écrit les siens, et c'est eux qui disent pourquoi un pilier compte.",
      },
      {
        title: "Définir l'action cœur, puis l'aha moment",
        text: "L'action pour laquelle l'app existe, et le moment où un nouvel utilisateur en perçoit la valeur. L'aha moment reste une hypothèse à vérifier sur les données.",
      },
      {
        title: "En déduire les KPI",
        text: "Les quatre KPI de référence d'abord, puis ceux des questions propres à l'app.",
      },
      {
        title: "Lister les mécaniques de l'app",
        text: "Onboarding, autorisations, notifications, partage, parrainage… Chacune apporte ses events.",
      },
      {
        title: "Poser les Fondations et implémenter le Minimum Viable Tracking",
        text: "Identité, propriétés communes, consentement, puis les events, selon les conventions de nommage.",
      },
      {
        title: "Vérifier que chaque KPI est mesurable",
        text: "Mesurable, partiel ou non mesurable : AREA dit si les bons events remontent. La lecture se fait ensuite dans l'outil d'analytics ou de BI de l'équipe. Jamais d'event sans question.",
      },
    ],
  },
  compare: {
    title: "AREA, AARRR, HEART : trois frameworks, trois usages.",
    lead: "AARRR (les « pirate metrics » de Dave McClure) et HEART (Google) sont les deux frameworks les plus cités pour mesurer un produit. Ils disent quoi mesurer, pas quels events envoyer : chaque équipe construit son plan de mesure. AREA va jusqu'aux events, avec une structure commune à toutes les apps mobiles.",
    criterion: "Critère",
    rows: [
      {
        label: "Pour mesurer",
        aarrr: "La croissance d'une startup, de l'acquisition au revenu",
        heart: "L'expérience utilisateur",
        area: "L'usage d'une app mobile",
      },
      {
        label: "De l'objectif aux events",
        aarrr: "Par un plan de mesure, à construire pour chaque projet",
        heart: "Par un plan de mesure, à construire pour chaque produit ou feature",
        area: "Intégré au framework : une base commune de KPI et d'events, la même pour toutes les apps mobiles",
      },
      {
        label: "Acquisition et revenu",
        aarrr: "Au cœur du modèle",
        heart: "Adoption seulement",
        area: "Hors des piliers. Les parcours propres au modèle économique (la monétisation, par exemple) arrivent dans une prochaine version",
      },
      {
        label: "Pensé pour le mobile",
        aarrr: "Générique",
        heart: "Générique",
        area: "Oui",
      },
    ],
  },
  origin: {
    title: "D'où vient AREA",
    quote:
      "« Je cherchais un framework de tracking pour être capable de mesurer simplement et de manière standard l'usage réel des apps de ma factory. Aucune des solutions existantes ne proposait une base commune, prête à poser dans n'importe quelle app mobile. Alors j'en ai écrit un. »",
    author: "Kevin Tersigni, créateur d'AREA et fondateur du studio igniters.",
    more: "Lire l'histoire",
  },
  cta: {
    title: "Open source, versionné, disponible dès aujourd'hui.",
    productTitle: "Pour les équipes produit et les founders",
    productText:
      "Mettez-vous d'accord sur les objectifs de chaque pilier et leurs KPI, puis donnez à vos développeurs un plan de tracking qui répond à vos questions.",
    productLink: "Lire la spec",
    studioTitle: "Pour les studios et les agences",
    studioText:
      "Le même plan de tracking dans toutes les apps du portefeuille : des KPI qui portent le même nom et la même définition d'une app à l'autre, et un registre versionné qui dit quelle version chaque app suit. Le plan ne se réécrit plus à chaque client.",
    studioLink: "Voir le registre",
    devTitle: "Pour les développeurs",
    devText:
      "Donnez llms.txt à votre agent de code : il pointe vers le registre YAML des events, des propriétés et des KPI, et vers la spec, figés sur cette version. Puis demandez-lui, par exemple :",
    devPrompt:
      "Lis https://igniters-studio.github.io/area-framework/llms.txt et le registre AREA qu'il cite. Puis pose-moi d'abord les questions sur l'action cœur et l'aha moment de cette app, sans les deviner. Ensuite liste ses mécaniques, écris son plan de tracking selon le Minimum Viable Tracking, et implémente-le derrière le wrapper analytics de l'app s'il en a un.",
    copy: "Copier",
    copied: "Copié",
    devLink: "Voir sur GitHub",
    nextLabel: "En préparation :",
    next: [
      {
        name: "area-core",
        status: " :",
        text: "une boîte à outils open source (Apache 2.0) qui applique AREA au repo d'une app React Native ou Expo, en local, avec l'agent de code du développeur : checks déterministes (conventions de nommage, Minimum Viable Tracking et son score), skills d'audit et de recommandations, et un serveur MCP qui sert le framework aux agents de code.",
      },
    ],
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
