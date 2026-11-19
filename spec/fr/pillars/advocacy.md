# Advocacy

> Sont-ils prêts à la recommander ?

Un utilisateur satisfait est le canal de croissance le moins cher : il recommande l'app, la partage, participe à son amélioration. L'Advocacy mesure cette disposition. Elle prend deux formes : **recommander** l'app autour de soi, et **contribuer** à son évolution en proposant ou en votant pour des features. Le pilier reprend l'idée du Referral d'AARRR, mesurée là où l'app peut la voir.

**Objectif business type :** faire des utilisateurs satisfaits un levier de croissance organique et d'amélioration du produit.

## Mesurer l'intention, pas l'acte

L'acte de recommander se passe hors de l'app, là où elle ne voit rien. La demande de note des stores en est le meilleur exemple : l'app peut la déclencher, mais elle ne sait jamais si la fenêtre s'est affichée, ni si l'utilisateur a noté. Les stores peuvent même décider de ne pas l'afficher.

L'Advocacy mesure donc **l'intention captée dans l'app**. Le KPI de référence ne retient que les intentions explicites : une réponse positive à une question de satisfaction, un score NPS de 9 ou 10, une invitation envoyée. Les partages de contenu et les contributions sont des signaux plus diffus : partager sa course recommande la course autant que l'app, et un feedback peut être une plainte. Ils ont leurs propres KPI, à côté. Ce que devient l'intention à l'extérieur (une note, une installation par parrainage) n'est pas mesuré par ce pilier.

| App | Signal d'intention explicite |
|---|---|
| Course à pied | Invite un ami à un défi |
| Budget | Donne 9 ou 10 à la question NPS |
| Méditation | Offre une séance à un proche |
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

Ce taux dépend aussi de la fréquence à laquelle l'app pose ses questions : poser la question de satisfaction deux fois plus souvent fera monter le KPI sans que rien n'ait changé. Il se compare donc dans le temps à dispositif constant, et chaque changement de dispositif se note dans le plan de tracking. Le comparer d'une app à l'autre n'a pas de sens.

| Verdict | Condition |
|---|---|
| **Mesurable** | Au moins une question de satisfaction, un NPS ou une invitation existe, et ses events disent ce que l'utilisateur a fait (réponse donnée, invitation envoyée) |
| **Partiel** | Seuls des signaux diffus existent (partage de contenu, co-création), ou seuls des events déclenchés par l'app, comme la demande de note, ou les invitations sont tracées au tap sur le bouton plutôt qu'à leur envoi |
| **Non mesurable** | L'app n'offre aucun moyen de recommander ou de contribuer |

## KPI complémentaires

| KPI | Définition |
|---|---|
| **Satisfaction déclarée** | Part des utilisateurs interrogés qui répondent positivement à `satisfaction_prompt_answered`, par `trigger_context` |
| **NPS** | Part des scores de 9 et 10 moins part des scores de 0 à 6, sur `nps_answered`, si l'app le mesure |
| **Taux de partage** | Part des utilisateurs actifs qui partagent au moins un contenu (`content_shared`) dans la période |
| **Taux de contribution** | Part des utilisateurs actifs qui émettent au moins un `co_creation_contributed` dans la période |
| **Rétention des contributeurs** | Rétention cœur des utilisateurs qui ont contribué, comparée à celle des autres utilisateurs entrés à la même période. C'est une corrélation : les contributeurs étaient sans doute déjà les plus engagés |
| **Sollicitation de note** | Part des utilisateurs actifs pour qui l'app a appelé la demande de note dans la période, par `trigger_context`. Il dit si l'app demande au bon moment, sans demander trop souvent |

## Events

| Event | Quand | Propriétés | Statut |
|---|---|---|---|
| `satisfaction_prompt_answered` | L'utilisateur répond à une question de satisfaction posée dans l'app | `satisfaction_answer`, `trigger_context` | Si l'app pose la question |
| `nps_answered` | L'utilisateur donne un score NPS | `nps_score`, `trigger_context` | Si l'app mesure le NPS |
| `review_prompt_triggered` | L'app appelle la demande de note du store. Le store décide s'il l'affiche | `trigger_context` | Si l'app demande une note |
| `invite_shared` | L'utilisateur envoie une invitation ou son lien de parrainage | `share_method` | Si l'app a une invitation ou un parrainage |
| `content_shared` | L'utilisateur partage un contenu de l'app | `content_type`, `share_method` | Si l'app permet le partage |
| `co_creation_contributed` | L'utilisateur propose une idée, vote pour une feature ou envoie un retour | `co_creation_action` | Si l'app intègre un outil de co-création |

Il faut au moins une question de satisfaction, un NPS ou une invitation pour que le KPI de référence soit mesurable.

**Quand un partage a-t-il eu lieu ?** Sur iOS, la feuille de partage dit quelle cible l'utilisateur a choisie : l'event part à ce moment-là. Sur Android, la feuille de partage du système ne le dit pas toujours. L'event part alors à l'ouverture de la feuille, et c'est une limite connue : il mesure une intention de partage, pas un partage confirmé. Le plan de tracking note ce choix par plateforme.

## Propriétés

| Propriété | Valeurs |
|---|---|
| `satisfaction_answer` | `positive`, `negative` |
| `trigger_context` | Le moment choisi par l'app : `post_aha_moment`, `post_positive_event`, `day_7`, `day_30` |
| `nps_score` | Entier de 0 à 10 |
| `share_method` | `share_sheet`, `link_copied`, `message`, `social` |
| `content_type` | Type de contenu partagé, propre à l'app : `run`, `product`, `note`… |
| `co_creation_action` | `feature_requested`, `roadmap_voted`, `feedback_sent` |

## La demande de note

La question de satisfaction et la demande de note sont deux mécaniques indépendantes. **La demande de note ne se conditionne jamais à une réponse positive.** La [documentation de l'In-App Review API de Google Play](https://developer.android.com/guide/playcore/in-app-review) interdit de poser à l'utilisateur la moindre question avant ou pendant la demande de note, y compris « Vous aimez l'app ? ». Elle déconseille aussi de la déclencher depuis un bouton : le store peut ne rien afficher, et l'utilisateur croit que l'app est cassée. Un bouton « Noter l'app » dans les réglages ouvre plutôt la page de l'app sur le store.

L'app choisit donc le moment de la demande d'après ce que fait l'utilisateur, par exemple juste après un moment positif ou plusieurs jours après l'aha moment, et `trigger_context` dit lequel.

## Les questions auxquelles ce pilier répond

- Quelle part de mes utilisateurs se dit prête à recommander l'app ?
- Mes utilisateurs sont-ils satisfaits, et à quel moment de leur parcours ?
- Qu'est-ce que mes utilisateurs partagent ?
- Mes contributeurs restent-ils plus longtemps que les autres ?
- Mon programme de parrainage amène-t-il des utilisateurs qui s'activent ?

## Le parrainage

Beaucoup d'apps font de la recommandation un levier d'acquisition, et récompensent le parrain par une réduction, un mois offert ou des points. Une bonne partie de ce parcours se passe dans l'app :

1. Le parrain envoie une invitation : `invite_shared`.
2. Le filleul applique un code de parrainage à son arrivée, ou ouvre un lien de parrainage : `referral_code_applied`. Le code désigne le parrain, ce qui relie les deux utilisateurs.
3. Le filleul atteint, ou non, l'aha moment : `aha_moment_reached`, lu sur les utilisateurs parrainés.
4. L'app récompense le parrain : `reward_received`.

Un code saisi à la main se mesure sans aucun outil d'attribution. Un lien de parrainage, lui, doit survivre à l'installation de l'app : il demande un lien différé, fourni par un outil d'attribution ou un service de liens.

| Event | Quand | Propriétés | Statut |
|---|---|---|---|
| `referral_code_applied` | Le filleul applique un code ou ouvre un lien de parrainage | `referral_source` | Si l'app a un programme de parrainage |
| `reward_received` | L'utilisateur reçoit une récompense de l'app | `reward_reason`, `reward_type` | Si l'app récompense ses utilisateurs |

| Propriété | Valeurs |
|---|---|
| `referral_source` | `code`, `link` |
| `reward_reason` | `referral`, `contribution`, ou une autre raison propre à l'app |
| `reward_type` | `discount`, `free_period`, `credit`, `points` |

`reward_received` est volontairement générique : il couvre aussi les récompenses accordées pour une contribution, comme une idée retenue dans la roadmap. Il n'envoie jamais de montant, puisque le revenu est hors périmètre. Il peut partir du serveur, quand c'est lui qui accorde la récompense.

| KPI | Définition |
|---|---|
| **Taux de parrainage** | Part des utilisateurs actifs qui envoient au moins une invitation dans la période |
| **Filleuls par parrain** | Nombre d'utilisateurs qui appliquent un code de parrainage, rapporté au nombre d'utilisateurs qui ont envoyé au moins une invitation, sur une même période glissante de 30 jours. Indicatif : une invitation et le code qui la suit peuvent tomber sur deux périodes |
| **Activation des filleuls** | Taux d'activation des utilisateurs parrainés, comparé à celui des autres nouveaux utilisateurs de la même période. Comme toujours, c'est une corrélation : un filleul arrive souvent avec une recommandation qui le motive déjà |
| **Parrains récompensés** | Nombre de parrains distincts qui reçoivent une récompense pour un parrainage dans la période |

Reste hors de portée de l'app : relier une installation à une invitation quand le filleul n'applique aucun code et n'ouvre aucun lien. C'est le travail des outils d'attribution.

## Les erreurs classiques

- Conditionner la demande de note à une réponse positive à une question de satisfaction. Google Play l'interdit.
- Déclencher la demande de note depuis un bouton.
- Présenter `review_prompt_triggered` comme une note obtenue. L'app ne sait jamais si l'utilisateur a noté.
- Tracer le tap sur le bouton de partage au lieu du partage effectué, quand la plateforme permet de le savoir.
- Compter la consultation de la roadmap ou du changelog comme une contribution. C'est une lecture.
- Envoyer le commentaire libre d'un NPS ou d'un feedback en propriété. C'est du texte libre, que les conventions interdisent.
- Comparer le taux d'intention de recommandation après avoir changé la fréquence des questions.
- Compter dans ce pilier les installations venues d'un parrainage. Elles relèvent de l'attribution.
- Accorder une récompense sans event : impossible ensuite de savoir combien de parrains le programme a réellement récompensés.
- Envoyer le montant d'une récompense en propriété. Le type suffit, le montant relève du revenu.
