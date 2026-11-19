# Advocacy

*Traduction de v0.1.0. La version anglaise fait référence : [English](../../pillars/advocacy.md).*

> Sont-ils prêts à la recommander ?

Un utilisateur satisfait est le canal de croissance le moins cher : il recommande l'app, la partage, participe à son amélioration. L'Advocacy mesure cette disposition. Elle prend deux formes : **recommander** l'app autour de soi, et **contribuer** à son évolution en proposant ou en votant pour des features. Le pilier reprend l'idée du Referral d'AARRR, mesurée là où l'app peut la voir.

**Objectif business type :** faire des utilisateurs satisfaits un levier de croissance organique et d'amélioration du produit.

## Mesurer l'intention, pas l'acte

L'acte de recommander se passe hors de l'app, là où elle ne voit rien. La demande de note des stores en est le meilleur exemple : l'app peut la déclencher, mais elle ne sait jamais si la fenêtre s'est affichée, ni si l'utilisateur a noté. Les stores peuvent même décider de ne pas l'afficher.

L'Advocacy mesure donc **l'intention captée dans l'app**. Le KPI de référence ne retient que les intentions explicites : une réponse positive à une question de satisfaction, un score NPS de 9 ou 10, une invitation lancée. Les partages de contenu et les contributions sont des signaux plus diffus : partager sa course recommande la course autant que l'app, et un feedback peut être une plainte. Ils ont leurs propres KPI, à côté. Ce que devient l'intention à l'extérieur (une note, une installation par parrainage) n'est pas mesuré par ce pilier.

| App | Signal d'intention explicite |
|---|---|
| Course à pied | Invite un ami à un défi |
| Budget | Donne 9 ou 10 à la question NPS |
| Méditation | Invite un proche à méditer avec lui |
| Prise de notes | Répond positivement à une question de satisfaction |
| E-commerce | Parraine un ami |

Le pilier vaut pour toutes les apps, mais il ne se mesure que si l'app offre au moins un de ces moyens : une question de satisfaction, un NPS, une invitation. Une app qui n'en propose aucun ne peut pas mesurer son Advocacy : c'est un constat produit, pas un event manquant.

## KPI de référence : le taux d'intention de recommandation

| | |
|---|---|
| **Définition** | Part des utilisateurs actifs de la période qui expriment au moins une fois une intention explicite de recommander |
| **Actifs** | Utilisateurs qui émettent au moins un `app_opened` ou un `core_action_completed` dans la période |
| **Numérateur** | Utilisateurs actifs qui émettent au moins un de ces signaux : `satisfaction_prompt_answered` avec une réponse positive, `nps_answered` avec un score de 9 ou 10, `invite_shared` |
| **Période** | Le mois, ou le trimestre pour une app à usage peu fréquent |
| **Unité** | Des utilisateurs distincts |
| **Volume** | Le nombre d'utilisateurs qui ont exprimé une intention dans la période |

Ce taux dépend aussi de la fréquence à laquelle l'app pose ses questions : poser la question de satisfaction deux fois plus souvent fera monter le KPI sans que rien n'ait changé. Il ne se compare donc dans le temps qu'à fréquence et moments constants. Tout changement se note dans le plan de tracking. Le comparer d'une app à l'autre n'a pas de sens. Une invitation lancée puis abandonnée compte aussi comme une intention : l'app ne voit pas la suite.

| Verdict | Condition |
|---|---|
| **Mesurable** | Au moins une question de satisfaction, un NPS ou une invitation existe, et ses events disent ce que l'utilisateur a fait (réponse donnée, partage lancé) |
| **Partiel** | Une question de satisfaction, un NPS ou une invitation existe, mais ses events partent avant que l'utilisateur agisse (question affichée plutôt que réponse donnée, écran d'invitation ouvert plutôt que partage lancé), ou manquent sur une partie des surfaces |
| **Non mesurable** | Ni question de satisfaction, ni NPS, ni invitation. Le partage de contenu, la co-création ou la demande de note seuls ne suffisent pas |

## KPI complémentaires

| KPI | Définition |
|---|---|
| **Satisfaction déclarée** | Part des utilisateurs interrogés qui répondent positivement à `satisfaction_prompt_answered`, par `trigger_context` |
| **NPS** | Part des scores de 9 et 10 moins part des scores de 0 à 6, sur `nps_answered`, si l'app le mesure |
| **Taux de partage** | Part des utilisateurs actifs qui lancent au moins un partage de contenu (`content_shared`) dans la période |
| **Taux de contribution** | Part des utilisateurs actifs qui émettent au moins un `co_creation_contributed` dans la période |
| **Rétention des contributeurs** | Rétention cœur des nouveaux utilisateurs qui contribuent dans les N premiers jours (la fenêtre d'activation), lue après ces N jours et comparée à celle des autres nouveaux utilisateurs de la même période. Comparer à tous ceux qui ont contribué un jour fausserait l'écart : un utilisateur qui contribue à J25 est forcément encore là à J25. C'est une corrélation : les contributeurs étaient sans doute déjà les plus engagés |
| **Sollicitation de note** | Part des utilisateurs actifs pour qui l'app a appelé la demande de note dans la période, par `trigger_context`. Il dit si l'app demande au bon moment, sans demander trop souvent |

## Events

| Event | Quand | Propriétés | Obligatoire si |
|---|---|---|---|
| `satisfaction_prompt_answered` | L'utilisateur répond à une question de satisfaction posée dans l'app | `satisfaction_answer`, `trigger_context` | L'app pose la question |
| `nps_answered` | L'utilisateur donne un score NPS | `nps_score`, `trigger_context` | L'app mesure le NPS |
| `review_prompt_triggered` | L'app appelle la demande de note du store. Le store décide s'il l'affiche | `trigger_context` | L'app demande une note |
| `invite_shared` | L'utilisateur lance le partage d'une invitation ou de son lien de parrainage | `share_method` | L'app a une invitation ou un parrainage |
| `content_shared` | L'utilisateur lance le partage d'un contenu de l'app | `content_type`, `share_method` | L'app permet le partage |
| `co_creation_contributed` | L'utilisateur propose une idée, vote pour une feature ou envoie un retour | `co_creation_action` | L'app intègre un outil de co-création |

Il faut au moins une question de satisfaction, un NPS ou une invitation pour que le KPI de référence soit mesurable.

**Quand part un event de partage ?** Quand le partage commence : la feuille de partage s'ouvre, le lien est copié, ou le partage propre à l'app est envoyé. C'est la même règle sur iOS et Android. Les plateformes et les bibliothèques ne disent pas toutes si le partage a abouti, ni vers quelle cible. Compter seulement le début du partage mesure partout la même chose : une intention de partage, comparable d'une plateforme à l'autre.

## Propriétés

| Propriété | Valeurs |
|---|---|
| `satisfaction_answer` | `positive`, `negative` |
| `trigger_context` | Le moment choisi par l'app : `post_aha_moment`, `post_positive_event`, `day_7`, `day_30` (7 ou 30 jours après le premier lancement) |
| `nps_score` | Entier de 0 à 10 |
| `share_method` | Le moyen : `share_sheet` (feuille de partage du système), `link_copied`, `in_app` (fonction de partage propre à l'app) |
| `content_type` | Type de contenu partagé, propre à l'app : `run`, `product`, `note`… |
| `co_creation_action` | `feature_requested`, `roadmap_voted`, `feedback_submitted` |

## La demande de note

La question de satisfaction et la demande de note sont deux mécaniques indépendantes. **La demande de note ne se conditionne jamais à une réponse positive.** La [documentation de l'In-App Review API de Google Play](https://developer.android.com/guide/playcore/in-app-review) interdit de poser à l'utilisateur la moindre question avant ou pendant la demande de note, y compris « Vous aimez l'app ? ». Elle déconseille aussi de la déclencher depuis un bouton : le store peut ne rien afficher, et l'utilisateur croit que l'app est cassée. Un bouton « Noter l'app » dans les réglages ouvre plutôt la page de l'app sur le store.

L'app choisit donc le moment de la demande d'après ce que fait l'utilisateur, par exemple juste après l'aha moment, juste après un moment positif, ou 7 ou 30 jours après le premier lancement, et `trigger_context` dit lequel.

## Les questions auxquelles ce pilier répond

- Quelle part de mes utilisateurs se dit prête à recommander l'app ?
- Mes utilisateurs sont-ils satisfaits, et à quel moment de leur parcours ?
- Qu'est-ce que mes utilisateurs partagent ?
- Mes contributeurs restent-ils plus longtemps que les autres ?
- Mon programme de parrainage amène-t-il des utilisateurs qui s'activent ?

## Le parrainage

Beaucoup d'apps font de la recommandation un levier d'acquisition, et récompensent le parrain par une réduction, un mois offert ou des points. Une bonne partie de ce parcours se passe dans l'app :

1. Le parrain lance une invitation : `invite_shared`.
2. Le filleul ouvre l'app depuis un lien de parrainage : `referral_link_opened`. Le lien mène souvent d'abord à une page web qui présente l'offre. L'app ne voit pas cette page : l'event part à l'ouverture de l'app.
3. Le parrainage est rattaché au compte du filleul : `referral_code_applied`. Le code, tapé par le filleul ou porté par le lien, désigne le parrain, ce qui relie les deux utilisateurs.
4. Le filleul atteint, ou non, l'aha moment : `aha_moment_reached`, lu sur les utilisateurs parrainés.
5. L'app récompense le parrain : `reward_received`.

Ouvrir le lien et rattacher le parrainage sont deux étapes distinctes : un filleul peut ouvrir le lien, voir l'offre, et ne jamais aller plus loin. Un lien de parrainage envoie `referral_link_opened` à la place de `deep_link_opened`, pour ne pas compter deux fois la même ouverture.

Un code saisi à la main se mesure sans aucun outil d'attribution. Un lien de parrainage, lui, doit survivre à l'installation de l'app : il demande un lien différé, fourni par un outil d'attribution ou un service de liens.

| Event | Quand | Propriétés | Obligatoire si |
|---|---|---|---|
| `referral_link_opened` | L'app s'ouvre depuis un lien de parrainage, directement ou après l'installation par un lien différé | | L'app a des liens de parrainage |
| `referral_code_applied` | Le parrainage est rattaché au compte du filleul, par un code tapé ou porté par le lien | `referral_source` | L'app a un programme de parrainage |
| `reward_received` | L'utilisateur reçoit une récompense de l'app | `reward_reason`, `reward_type` | L'app récompense ses utilisateurs |

| Propriété | Valeurs |
|---|---|
| `referral_source` | `code` (tapé par le filleul), `link` (porté par le lien de parrainage) |
| `reward_reason` | `referral`, `contribution`, `other` |
| `reward_type` | `discount`, `free_period`, `credit`, `points` |

`reward_received` est volontairement générique : il couvre aussi les récompenses accordées pour une contribution, comme une idée retenue dans la roadmap. Il n'envoie jamais de montant, puisque le revenu est hors périmètre. Il peut partir du serveur, quand c'est lui qui accorde la récompense.

| KPI | Définition |
|---|---|
| **Taux de parrainage** | Part des utilisateurs actifs qui lancent au moins une invitation dans la période |
| **Conversion des liens de parrainage** | Part des utilisateurs qui émettent `referral_link_opened` puis `referral_code_applied` dans les 30 jours qui suivent, lue à J7 et J30 comptés depuis `referral_link_opened`. L'écart entre J7 et J30 dit si une relance au filleul vaut le coup |
| **Filleuls par parrain** | Nombre d'utilisateurs dont le parrainage est rattaché au compte (`referral_code_applied`), rapporté au nombre d'utilisateurs qui ont lancé au moins une invitation, sur une même période glissante de 30 jours. Indicatif : une invitation et le code qui la suit peuvent tomber sur deux périodes |
| **Activation des filleuls** | Taux d'activation des utilisateurs parrainés, comparé à celui des autres nouveaux utilisateurs de la même période. Comme toujours, c'est une corrélation : un filleul arrive souvent avec une recommandation qui le motive déjà |
| **Parrains récompensés** | Nombre de parrains distincts qui reçoivent une récompense pour un parrainage dans la période |

Reste hors de portée de l'app : relier une installation à une invitation quand le filleul n'applique aucun code et n'ouvre aucun lien. C'est le travail des outils d'attribution.

## Les erreurs classiques

- Conditionner la demande de note à une réponse positive à une question de satisfaction. Google Play l'interdit.
- Déclencher la demande de note depuis un bouton.
- Présenter `review_prompt_triggered` comme une note obtenue. L'app ne sait jamais si l'utilisateur a noté.
- Compter la consultation de la roadmap ou du changelog comme une contribution. C'est une lecture.
- Envoyer le commentaire libre d'un NPS ou d'un feedback en propriété. C'est du texte libre, que les conventions interdisent.
- Comparer le taux d'intention de recommandation après avoir changé la fréquence des questions.
- Lire `referral_link_opened` comme un nombre d'installations venues du parrainage. Il compte des ouvertures depuis un lien ; les installations relèvent de l'attribution.
- Accorder une récompense sans event : impossible ensuite de savoir combien de parrains le programme a réellement récompensés.
- Envoyer le montant d'une récompense en propriété. Le type suffit, le montant relève du revenu.
