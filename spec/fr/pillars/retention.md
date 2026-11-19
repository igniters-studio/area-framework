# Rétention

> Reviennent-ils faire ce pour quoi l'app existe ?

La rétention est le signal le plus honnête de la valeur d'une app. Des milliers d'installations ne valent rien si personne ne revient la semaine suivante. Dans AREA, revenir ne veut pas dire rouvrir l'app : un utilisateur est retenu quand il revient réaliser l'action cœur (voir [l'action cœur](engagement.md#laction-cœur)).

**Objectif business type :** faire revenir les utilisateurs, longtemps, pour ce que l'app leur apporte.

## Revenir, c'est refaire l'action cœur

| App | Un utilisateur retenu… |
|---|---|
| Course à pied | …enregistre une nouvelle course |
| Budget | …catégorise de nouvelles dépenses |
| Méditation | …termine une nouvelle séance |
| Prise de notes | …crée une nouvelle note |
| E-commerce | …passe une nouvelle commande |

Mesurer la rétention sur l'ouverture de l'app la gonfle : une notification ouverte par réflexe compterait comme un retour. La mesurer sur l'action cœur ne garde que les retours qui ont de la valeur.

## KPI de référence : la rétention cœur

| | |
|---|---|
| **Définition** | Part des nouveaux utilisateurs d'une cohorte qui réalisent l'action cœur N jours après leur premier lancement |
| **Cohorte** | Nouveaux utilisateurs de la période : leur `app_opened` avec `is_first_launch` tombe dans la période |
| **Retour** | Au moins un `core_action_completed` le jour N après le premier lancement |
| **Points de lecture** | J1, J7 et J30 |
| **Calcul** | Rétention classique : l'utilisateur compte au jour N s'il revient ce jour-là, comme dans les benchmarks du marché. Un jour, c'est 24 heures à partir du premier lancement |
| **Unité** | Des utilisateurs distincts |
| **Volume** | Le nombre d'utilisateurs retenus à chaque point de lecture |

La rétention au jour près mesure aussi la fréquence : une app utilisée une fois par semaine paraît mauvaise à J1, même si ses utilisateurs reviennent tous. **Pour une app à usage peu fréquent**, la rétention se lit donc par fenêtre plutôt que par jour : semaine 1, semaine 4, mois 3, l'utilisateur comptant s'il revient au moins une fois dans la fenêtre. Le choix entre jour et fenêtre se fait une fois, selon le cycle d'usage de l'app, et se note dans le plan de tracking.

| Verdict | Condition |
|---|---|
| **Mesurable** | L'action cœur est définie, `core_action_completed` part depuis toutes ses surfaces, `app_opened` est en place avec `is_first_launch`, et les Fondations sont respectées |
| **Partiel** | `core_action_completed` manque sur une partie des surfaces, `is_first_launch` est absent, ou l'une des Fondations est incomplète |
| **Non mesurable** | Aucune action cœur définie, ou la rétention n'est mesurable que sur l'ouverture de l'app |

Une app sans compte n'est pas pénalisée : son verdict précise seulement que la rétention porte sur des installations, et qu'elle est sous-estimée à chaque réinstallation.

## Activés et non activés

Une seule courbe dit peu de choses. En séparer deux dit où regarder.

| Cohorte | Point de départ | Qui | Retour |
|---|---|---|---|
| **Activés** | Le premier lancement | Les nouveaux utilisateurs qui atteignent l'aha moment dans la fenêtre d'activation | `core_action_completed` |
| **Non activés** | Le premier lancement | Les autres nouveaux utilisateurs de la même période | `core_action_completed` |

Les deux cohortes partent du même jour, et la rétention se lit après la fin de la fenêtre d'activation : à J7 et J30 pour une fenêtre de 7 jours. Comparer les activés à l'ensemble des utilisateurs, ou faire partir leur courbe de l'aha moment, donnerait un écart qui tient en partie au calcul lui-même.

| Ce qu'on observe | Ce que ça suggère | Hypothèse à tester en premier |
|---|---|---|
| Les activés restent nettement plus que les non activés | La valeur perçue semble compter pour revenir | Amener plus d'utilisateurs jusqu'à l'aha moment, et vérifier ensuite que la rétention de toute la cohorte suit |
| Les deux courbes sont basses et proches | Même ceux qui ont perçu la valeur ne reviennent pas | Le problème est probablement dans la valeur elle-même, plus que dans le chemin pour y arriver |

**Cet écart est une corrélation, pas une cause.** Les utilisateurs qui atteignent l'aha moment sont aussi, en moyenne, les plus motivés au départ. Une partie de leur meilleure rétention leur appartenait avant même d'ouvrir l'app. L'écart dit où regarder, il ne promet pas de gain : « 10 % d'activés en plus » ne donnera pas forcément 10 % de rétention en plus. Seule une expérience le prouve : un changement testé contre un groupe témoin, ou à défaut une hausse du taux d'activation suivie d'une hausse de la rétention de toute la cohorte.

**Les benchmarks du marché ne mesurent pas la même chose.** Ils comptent les utilisateurs qui ouvrent l'app au jour N, rapportés aux installations. Pour s'y comparer, AREA calcule une rétention d'ouverture (voir [les KPI complémentaires](#kpi-complémentaires)). La rétention cœur, elle, est toujours plus basse, puisqu'un retour sans action cœur ne compte pas : la comparer aux benchmarks donnerait une inquiétude injustifiée. À l'inverse, comparer la cohorte des activés, structurellement plus haute, donnerait une satisfaction trompeuse.

## KPI complémentaires

| KPI | Définition |
|---|---|
| **Rétention d'ouverture** | Part de la cohorte qui émet au moins un `app_opened` le jour N. C'est le chiffre à comparer aux benchmarks du marché, avec deux écarts connus : la cohorte ne compte pas les installations jamais ouvertes, et elle ne contient que les utilisateurs qui ont accepté la mesure (voir [le consentement](../foundations.md#3-le-consentement)) |
| **Rétention des activés et des non activés** | La rétention cœur des deux cohortes, à J7 et J30 |
| **Retours par canal** | Répartition des `app_opened` qui ne sont pas un premier lancement, par `entry_point` : l'icône, un widget ou un raccourci, une notification, un lien. Une part d'ouvertures depuis l'icône qui grandit suggère que l'app devient une habitude, sans qu'on ait besoin de la rappeler |

## Events

La rétention se mesure avec les events du socle : `app_opened`, `aha_moment_reached` et `core_action_completed`. Les events propres à ce pilier précisent quelle notification ou quel lien a ramené l'utilisateur, quand `entry_point` dit seulement qu'il s'agissait d'une notification ou d'un lien.

| Event | Quand | Propriétés | Obligatoire si |
|---|---|---|---|
| `notification_opened` | L'utilisateur touche une notification de l'app, qu'elle ouvre l'app ou que l'app soit déjà au premier plan | `notification_type`, `delivery_type` | L'app envoie des notifications |
| `deep_link_opened` | L'app s'ouvre depuis un lien externe | `link_source` | L'app reçoit des liens entrants |

## Propriétés

| Propriété | Valeurs |
|---|---|
| `notification_type` | `reminder`, `re_engagement`, `streak_reminder`, `social`, `promotional`, `content_update`, `transactional`. Le serveur ou le code qui crée la notification y place cette valeur, pour que l'app la lise à l'ouverture |
| `delivery_type` | `local` (planifiée sur l'appareil), `push` (envoyée par un serveur) |
| `link_source` | `email`, `social`, `qr_code`, `referral`, `other`. Pas de valeur `push` : une notification qui ouvre un lien envoie `notification_opened`, pour ne pas compter deux fois le même retour |

## Les questions auxquelles ce pilier répond

- Quelle part de mes utilisateurs revient à J1, J7, J30, et lesquels ?
- Les utilisateurs activés reviennent-ils plus que les autres ?
- Par quels canaux reviennent-ils ?
- Quelle part des retours passe par une notification ? Pour savoir si une notification fait réellement revenir, il faut un groupe témoin qui ne la reçoit pas.

## Les erreurs classiques

- Piloter la rétention sur l'ouverture de l'app ou sur des sessions. La rétention d'ouverture sert à se comparer au marché, pas à décider.
- Lire une seule courbe, sans séparer activés et non activés.
- Comparer les activés à l'ensemble des utilisateurs, ou faire partir leur courbe de l'aha moment.
- Comparer la rétention cœur, ou la cohorte des activés, aux benchmarks du marché, qui comptent des ouvertures d'app depuis l'installation.
- Lire au jour près la rétention d'une app à usage peu fréquent.
- Présenter l'écart entre activés et non activés comme un gain garanti.
- Lire une rétention à J30 sur une cohorte entrée il y a moins de 30 jours.
- Compter des sessions alors que l'outil ne les mesure pas de la même façon d'une app à l'autre. Selon l'outil, les sessions sont capturées automatiquement, réglables ou absentes.
