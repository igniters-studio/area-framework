# Minimum Viable Tracking

Le Minimum Viable Tracking est le tracking qu'AREA attend de toute app pour lire ses quatre piliers. Il se construit en trois couches : les Fondations, un socle d'events commun à toutes les apps, et les events des mécaniques que l'app contient. Pour une app courante, il compte une douzaine d'events, et il en tire plus d'une quinzaine de KPI.

**La règle :** chaque event existe parce qu'un KPI en a besoin. Seul l'event des Fondations fait exception : `analytics_consent_granted` sert la conformité et la fiabilité, pas un KPI. Le Minimum Viable Tracking ne cherche pas à tout tracer. Il cherche à pouvoir répondre, de façon fiable, aux questions que toute app se pose.

## Les trois couches

| Couche | Ce qu'elle contient | Pour quelles apps |
|---|---|---|
| **Fondations** | L'identité, les propriétés communes (`app_version`, `platform`, `environment`, `user_plan`…), le consentement et la séparation des données de test | Toutes |
| **Socle** | `app_opened`, `aha_moment_reached`, `core_action_completed` | Toutes |
| **Mécaniques** | Les events de l'onboarding, de la paywall, des autorisations, des notifications, du partage, du parrainage… | Chaque app, selon ce qu'elle contient. Une mécanique présente rend ses events obligatoires |

## Peu d'events, beaucoup de KPI

La richesse d'un tracking ne vient pas du nombre d'events. Elle vient de trois choses :

- **Les propriétés.** Le même `core_action_completed` se lit par type d'action, par version de l'app, par plateforme, par palier d'offre.
- **Les cohortes.** Le même event sert à suivre les nouveaux utilisateurs, les activés, les payants, ceux d'une version donnée.
- **Le temps.** Le délai entre deux events, ou l'intervalle entre deux réalisations du même event, est un KPI à lui seul.

Les trois events du socle suffisent ainsi à calculer, à eux seuls, une bonne part des KPI d'AREA :

| KPI | Pilier | Events utilisés |
|---|---|---|
| Taux d'activation | Activation | `app_opened`, `aha_moment_reached` |
| Time to Aha | Activation | `app_opened`, `aha_moment_reached` |
| Taux d'usage cœur | Engagement | `app_opened`, `core_action_completed` |
| Fréquence de l'action cœur | Engagement | `app_opened`, `core_action_completed` |
| Part d'utilisateurs intensifs | Engagement | `app_opened`, `core_action_completed` |
| Rétention cœur à J1, J7, J30 | Rétention | `app_opened`, `core_action_completed` |
| Rétention des activés et des non activés | Rétention | `app_opened`, `aha_moment_reached`, `core_action_completed` |
| Retours par canal | Rétention | `app_opened` |
| Rétention d'ouverture, à comparer au marché | Rétention | `app_opened` |

Chacun se découpe ensuite par les propriétés des Fondations : iOS ou Android, gratuit ou payant, version de l'app.

Les mécaniques ajoutent leurs propres KPI : complétion de l'onboarding, abandon par étape, conversion de la paywall, acceptation des autorisations, adoption des features, satisfaction déclarée, parrainage.

## Le socle

| Event | Ce qu'il signale | Propriétés |
|---|---|---|
| `app_opened` | L'app passe au premier plan : lancement ou retour depuis l'arrière-plan. Il définit les nouveaux utilisateurs et les canaux de retour, et entre dans la définition des utilisateurs actifs | `entry_point`, `is_first_launch` |
| `aha_moment_reached` | L'utilisateur atteint l'aha moment, tel que l'app l'a défini (voir [l'aha moment](pillars/activation.md#laha-moment)) | `aha_version`, et `core_action_type` si l'aha porte sur une action cœur |
| `core_action_completed` | Chaque réalisation de l'action cœur, première comprise, depuis toutes les surfaces où elle se fait (écran de l'app, widget, notification, extension de partage…) | `core_action_type` |

| Propriété | Valeurs |
|---|---|
| `entry_point` | Ce qui a amené l'app au premier plan : `icon`, `notification`, `link`, `widget`, `shortcut`, `other` |
| `is_first_launch` | `true` seulement pour le premier `app_opened` envoyé après l'installation. Il reste vrai tant que cet event n'a pas pu partir, par exemple avant le consentement. Quand le consentement est donné, l'app envoie aussitôt ce `app_opened`, avant `analytics_consent_granted` |

Ces trois events sont les seuls dont dépendent les KPI de référence des piliers, à une exception près : l'Advocacy demande au moins une question de satisfaction, un NPS ou une invitation.

**Les utilisateurs actifs** d'une période sont ceux qui émettent au moins un `app_opened` ou un `core_action_completed`. Le second compte parce que l'action cœur peut se faire sans ouvrir l'app, depuis un widget, une action de notification ou une extension.

**Les nouveaux utilisateurs** d'une période sont ceux dont le `app_opened` avec `is_first_launch` tombe dans cette période. Un utilisateur réinitialisé à la déconnexion, ou une app existante qui adopte AREA (voir [plus bas](#adopter-area-dans-une-app-existante)), ne crée donc pas de faux nouveaux utilisateurs.

**Avant d'écrire une ligne de code**, deux réponses sont nécessaires : quelle est l'[action cœur](pillars/engagement.md#laction-cœur) de l'app, et quel est son [aha moment](pillars/activation.md#laha-moment). Sans elles, deux des trois events du socle n'ont pas de sens.

## Des rôles, pas seulement des noms

`aha_moment_reached` et `core_action_completed` désignent un rôle autant qu'un event : ce qu'ils signalent dépend de l'app. Une app de course enregistre une course, une app de budget catégorise une dépense. Dans une nouvelle app, ces rôles portent les noms AREA, et ce qui varie d'une app à l'autre passe dans `core_action_type`.

Dans une app existante, l'event qui joue déjà un rôle peut garder son nom (voir [Renommer et faire évoluer](conventions.md#renommer-et-faire-évoluer) dans les conventions). Le plan de tracking de l'app indique alors quel event joue quel rôle : `workout_saved` joue le rôle de `core_action_completed`. Les KPI se calculent de la même façon, sur l'event indiqué.

## Adopter AREA dans une app existante

Le jour où une version de l'app introduit AREA, ses utilisateurs ne sont pas nouveaux. Trois précautions évitent qu'ils le deviennent dans les données :

- **`is_first_launch` ne vaut `true` qu'après une vraie installation.** Un utilisateur qui met à jour l'app n'est pas à son premier lancement : l'app le sait quand elle trouve des données locales d'une version précédente.
- **Les KPI de cohorte ne se lisent que sur les cohortes entrées après la bascule.** Les cohortes plus anciennes n'ont pas d'aha moment tracé.
- **L'aha moment des utilisateurs existants n'est pas reconstitué.** Leur première action cœur après la bascule n'est pas leur aha moment : l'app n'envoie `aha_moment_reached` qu'aux utilisateurs entrés après la bascule.

## Lire les KPI

Un KPI bien tracé peut encore être mal lu. Ces règles valent pour tous les piliers :

- **Des utilisateurs distincts, jamais des events.** Un ratio compte des personnes : un utilisateur qui partage dix fois compte une fois.
- **Un taux toujours accompagné de son volume.** Un taux d'usage cœur qui monte pendant que le nombre d'utilisateurs fond n'est pas une bonne nouvelle. Chaque KPI de référence se lit avec le nombre d'utilisateurs qu'il compte.
- **Des cohortes arrivées à maturité.** Une rétention à J30 ne se lit que sur les cohortes entrées il y a plus de 30 jours, et un taux d'activation que sur celles dont la fenêtre d'activation est close.
- **Un effectif suffisant.** Sur une cohorte de quelques centaines d'utilisateurs, un écart de quelques points relève du bruit. Avant de conclure, regarder si l'écart tient sur plusieurs cohortes.
- **Comparer des versions sur leurs nouveaux utilisateurs.** Découper tous les utilisateurs par `app_version` mélange l'effet de la version et celui de la population : les premiers à mettre à jour sont aussi les plus engagés. On compare plutôt les cohortes de nouveaux utilisateurs arrivés sur chaque version.
- **Une corrélation n'est pas une cause.** Les écarts entre cohortes (activés et non activés, parrainés et autres, contributeurs et autres) disent où regarder. Pour savoir si un changement produit un effet, il faut une expérience : un test A/B, ou un groupe témoin qui ne reçoit pas le changement.
- **Le taux de consentement à côté.** Les KPI ne décrivent que les utilisateurs qui ont accepté la mesure (voir [le consentement](foundations.md#3-le-consentement)).

## Les mécaniques

Ces events ne sont pas facultatifs : ils deviennent obligatoires dès que la mécanique existe dans l'app. Une app qui demande des autorisations doit tracer les accords et les refus, une app qui envoie des notifications doit tracer leur ouverture.

| Mécanique | Events | Pilier |
|---|---|---|
| Consentement requis | `analytics_consent_granted` | Fondations |
| Onboarding | `onboarding_started`, `onboarding_completed`, et `onboarding_step_completed` s'il a plusieurs étapes | Activation |
| Paywall | `paywall_shown`, `purchase_completed`, et `trial_started` si l'app propose un essai | Activation |
| Autorisations | `permission_granted`, `permission_denied` | Activation |
| Navigation, si l'app analyse ses parcours écran par écran | `screen_viewed` | Engagement |
| Features distinctes de l'action cœur | `feature_used` | Engagement |
| Notifications | `notification_opened` | Rétention |
| Liens entrants | `deep_link_opened` | Rétention |
| Question de satisfaction | `satisfaction_prompt_answered` | Advocacy |
| NPS | `nps_answered` | Advocacy |
| Demande de note | `review_prompt_triggered` | Advocacy |
| Invitation ou parrainage | `invite_shared`, `referral_code_applied` si l'app a un parrainage, `referral_link_opened` si elle a des liens de parrainage | Advocacy |
| Partage de contenu | `content_shared` | Advocacy |
| Co-création | `co_creation_contributed` | Advocacy |
| Récompenses | `reward_received` | Advocacy |

Le détail de chaque event et de ses propriétés est dans la page de son pilier, ou dans les [Fondations](foundations.md#3-le-consentement) pour `analytics_consent_granted`. `app_opened` est décrit plus haut, dans [le socle](#le-socle).

## Un exemple : une app courante

Une app avec un onboarding en plusieurs étapes, des autorisations, des notifications, quelques features au-delà de l'action cœur, une question de satisfaction et une demande de note :

| Couche | Events |
|---|---|
| Socle | `app_opened`, `aha_moment_reached`, `core_action_completed` |
| Onboarding | `onboarding_started`, `onboarding_step_completed`, `onboarding_completed` |
| Autorisations | `permission_granted`, `permission_denied` |
| Features | `feature_used` |
| Notifications | `notification_opened` |
| Advocacy | `satisfaction_prompt_answered`, `review_prompt_triggered` |

Douze events, avec les Fondations en dessous. Ils suffisent à lire les quatre piliers, à découper chaque KPI par plateforme, version et palier d'offre, et à répondre aux questions ci-dessous. Avec une paywall, deux ou trois events de plus (`trial_started` si l'app propose un essai).

## Ce que le Minimum Viable Tracking permet de répondre

- Quelle part de mes nouveaux utilisateurs perçoit la valeur de l'app, en combien de temps, et à quelle étape je les perds ?
- Parmi ceux qui viennent, combien se servent de l'app pour ce qu'elle sait faire, et à quel rythme ?
- Combien reviennent la refaire, et par quel canal ?
- Les utilisateurs arrivés sur la dernière version s'activent-ils mieux que ceux de la précédente ? Les payants se comportent-ils autrement que les gratuits ?
- Quelle part de mes utilisateurs se dit prête à recommander l'app ?

## Ce que contient le plan de tracking

Le plan de tracking est le document de l'app qui dit ce qu'elle trace et pourquoi. AREA n'en impose pas la forme : un document, un tableur ou un fichier à côté du code conviennent, tant qu'il est versionné avec l'app et tenu à jour. Il contient :

- **La version d'AREA** que l'app suit.
- **L'objectif business de chaque pilier**, écrit pour l'app.
- **L'action cœur**, et la liste de ses `core_action_type`.
- **L'aha moment**, avec son `aha_version` et l'historique de ses définitions.
- **Les fenêtres et les seuils choisis** : la fenêtre d'activation, la lecture de la rétention par jour ou par fenêtre, le seuil des utilisateurs intensifs.
- **Les mécaniques présentes dans l'app**, donc les events qui deviennent obligatoires.
- **Les listes fermées propres à l'app** : `feature_name`, `screen_name`, `step_name`, `content_type`.
- **Les events hérités**, et le rôle AREA que chacun joue.
- **Les choix par plateforme**, comme le moment où part un partage sur Android.
- **Les changements de dispositif** qui touchent un KPI, comme la fréquence de la question de satisfaction.
- **Les questions propres à l'app**, et les events qui y répondent.

## Au-delà : les questions propres à l'app

Le Minimum Viable Tracking répond aux questions que toute app se pose. Chaque app a aussi les siennes : pourquoi les utilisateurs abandonnent tel formulaire, si telle nouvelle feature est adoptée. Elles se traitent avec des events propres à l'app, en respectant la même règle : chaque event existe parce qu'il répond à une question écrite dans le plan de tracking. Le volume ne justifie jamais un event.
