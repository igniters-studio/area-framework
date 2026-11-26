# Engagement

*Traduction de v0.2.0. La version anglaise fait référence : [English](../../pillars/engagement.md).*

> Quand ils sont là, utilisent-ils l'app pour ce qu'elle sait faire de mieux ?

Ouvrir une app n'est pas l'utiliser. Un utilisateur peut revenir tous les jours, jeter un œil et repartir sans jamais faire ce pour quoi l'app existe. L'Engagement mesure l'usage réel : l'action cœur, sa fréquence, et les features qui comptent. Le pilier vient de [HEART](https://research.google.com/pubs/archive/36299.pdf), où il mesure l'implication de l'utilisateur. AREA le recentre sur l'action cœur, parce que c'est elle qui fait la valeur d'une app mobile.

**Objectif business type :** faire de l'action cœur une habitude, et savoir quelles features créent de la valeur.

## L'action cœur

L'action cœur est **l'action qui délivre la valeur de l'app**, celle que l'utilisateur répète parce qu'il en tire quelque chose. L'aha moment s'appuie sur elle (voir [Activation](activation.md#laha-moment)).

| App | Action cœur |
|---|---|
| Course à pied | Enregistrer une course |
| Budget | Catégoriser une dépense |
| Méditation | Terminer une séance |
| Prise de notes | Créer une note |
| E-commerce | Passer une commande |

Pour la trouver, deux questions. D'abord : si on demande à un utilisateur à quoi lui sert l'app, que répond-il ? Puis, dès que l'app a des données : qu'est-ce que font, plus que les autres, les utilisateurs qui restent ? La première donne une hypothèse, la seconde la confirme ou la corrige.

L'action cœur est un résultat obtenu, jamais une navigation : ouvrir l'app, afficher un écran ou parcourir une liste ne sont pas des actions cœur.

Une app peut avoir plusieurs types d'action cœur, par exemple enregistrer une course ou suivre un programme. Ils restent un seul event, distingués par la propriété `core_action_type`. Si les types ont des propriétés très différentes, l'app peut aussi garder un event par type et indiquer dans son plan de tracking qu'ils jouent tous le rôle de `core_action_completed` (voir [Des rôles, pas seulement des noms](../mvt.md#des-rôles-pas-seulement-des-noms) dans le Minimum Viable Tracking).

Comme l'aha moment, l'action cœur se définit avant le tracking. La Rétention se mesure dessus : sans action cœur, aucun des deux piliers ne se lit.

## KPI de référence : le taux d'usage cœur

| | |
|---|---|
| **Définition** | Part des utilisateurs actifs de la période qui réalisent au moins une fois l'action cœur |
| **Actifs** | Utilisateurs qui émettent au moins un `app_opened` ou un `core_action_completed` dans la période |
| **Numérateur** | Utilisateurs actifs qui émettent au moins un `core_action_completed` dans la période |
| **Période** | La semaine par défaut, le mois pour une app à usage peu fréquent |
| **Unité** | Des utilisateurs distincts |
| **Volume** | Le nombre d'utilisateurs qui ont réalisé l'action cœur dans la période. Un taux qui monte pendant que ce nombre baisse signale une base qui se réduit à ses fidèles |

Ce KPI répond directement à la question du pilier : parmi ceux qui viennent, combien se servent vraiment de l'app ?

| Verdict | Condition |
|---|---|
| **Mesurable** | L'action cœur est définie, `core_action_completed` part à chaque réalisation et depuis toutes les surfaces où elle se fait, `app_opened` est en place, et les Fondations sont respectées |
| **Partiel** | L'event manque sur une partie des surfaces (widget, action depuis une notification, extension de partage…), part sur autre chose qu'un résultat obtenu, ou l'une des Fondations est incomplète |
| **Non mesurable** | Aucune action cœur définie, ou aucun event qui la signale |

## KPI complémentaires

| KPI | Définition |
|---|---|
| **Fréquence de l'action cœur** | Pour chaque utilisateur, l'intervalle médian entre deux jours où il réalise l'action cœur. Plusieurs actions le même jour comptent pour un jour. Le KPI est la médiane de ces intervalles sur les utilisateurs actifs qui ont au moins deux jours d'action cœur dans la période : un seul jour ne donne aucun intervalle |
| **Part d'utilisateurs intensifs** | Part des utilisateurs actifs qui réalisent l'action cœur au moins N jours dans la période. N est propre à chaque app : il se fixe après avoir regardé la distribution réelle, puis il est noté dans le plan de tracking. Le changer ouvre une nouvelle série, qui ne se compare pas à l'ancienne |
| **Adoption d'une feature** | Part des utilisateurs actifs qui émettent `feature_used` pour cette feature dans la période |
| **Atteinte d'un écran** | Part des utilisateurs actifs qui affichent un écran donné dans la période, si l'app trace la navigation |

## Events

| Event | Quand | Propriétés | Obligatoire si |
|---|---|---|---|
| `core_action_completed` | À chaque réalisation de l'action cœur, première comprise, depuis toutes les surfaces où elle se fait | `core_action_type` | Toujours (socle) |
| `feature_used` | Quand l'utilisateur se sert d'une feature identifiée dans le plan de tracking | `feature_name`, `user_plan` | L'app a des features distinctes de l'action cœur |
| `screen_viewed` | L'utilisateur affiche un écran | `screen_name` | L'app analyse ses parcours écran par écran |

`screen_viewed` est le nom AREA de la vue d'écran. Certains outils ont leur propre event de vue d'écran, au nom réservé : la couche qui envoie les events peut traduire `screen_viewed` vers cet event natif, mais le plan de tracking ne connaît qu'un seul nom. Il ne sert à aucun KPI de référence : AREA mesure l'activité avec `app_opened`, pas avec des vues d'écran.

## Propriétés

| Propriété | Valeurs |
|---|---|
| `core_action_type` | Type d'action cœur, propre à l'app. Même propriété que sur `aha_moment_reached` |
| `feature_name` | Nom de la feature, propre à l'app : `export_pdf`, `set_goal`… La liste est fermée et documentée dans le plan de tracking |
| `user_plan` | Palier de l'offre au moment où la feature est utilisée, si l'app en a une payante. C'est une copie de la propriété utilisateur des Fondations : elle garde la valeur au moment de l'usage, quand la propriété utilisateur affiche souvent la valeur actuelle |
| `screen_name` | Nom de l'écran, propre à l'app. La liste est fermée et documentée dans le plan de tracking |

## Les questions auxquelles ce pilier répond

- Parmi les utilisateurs qui viennent, combien se servent de l'app pour ce qu'elle sait faire ?
- À quelle fréquence l'action cœur revient-elle ?
- Quelles features sont vraiment utilisées, et par qui ?
- Quelle part de mes utilisateurs en fait un usage intensif ?

## Les erreurs classiques

- Mesurer l'engagement en ouvertures d'app ou en durée de session. Un utilisateur peut ouvrir l'app tous les jours sans jamais réaliser l'action cœur.
- Choisir une navigation comme action cœur : afficher un écran, ouvrir un onglet.
- Envoyer `core_action_completed` depuis un seul écran, alors que l'action cœur se fait aussi depuis un widget, une notification ou une extension de partage. Sur mobile, ces surfaces comptent.
- Envoyer `feature_used` à l'affichage d'un écran. Ça double `screen_viewed` et ne dit pas si la feature a servi.
- Laisser `feature_name` ou `screen_name` libres. Sans liste fermée, chaque développeur invente ses valeurs et la même feature apparaît sous trois noms.
- Envoyer un compteur en propriété (« Nième action cœur »). Il se calcule dans l'outil.
- Lire le taux d'usage cœur sans son volume.
- Fixer le seuil des utilisateurs intensifs avant d'avoir regardé la distribution.
