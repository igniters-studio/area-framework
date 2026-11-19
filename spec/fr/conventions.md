# Conventions

*Traduction de v0.1.0. La version anglaise fait référence : [English](../conventions.md).*

Ces conventions s'appliquent à tout nouvel event et à toute nouvelle propriété. Elles visent le code qu'on écrit, pas le tracking déjà en place : un event existant dont le sens est juste garde son nom (voir [Renommer et faire évoluer](#renommer-et-faire-évoluer)).

Les noms d'events et de propriétés s'écrivent en anglais, quelle que soit la langue de l'app.

## Les events

**Format.** `snake_case`, en minuscules. Lettres, chiffres et underscores, en commençant par une lettre. 40 caractères au maximum.

**Grammaire.** L'objet d'abord, puis le verbe au participe passé : `onboarding_completed`, `paywall_shown`, `content_shared`. Mettre l'objet en tête regroupe les events d'un même sujet dans une liste triée : tous les `onboarding_*` se suivent.

Ce choix diffère de la [spec Segment](https://www.twilio.com/docs/segment/connections/spec/mobile), qui écrit `Application Opened` en Title Case. Le `snake_case` passe dans tous les outils sans transformation, y compris ceux qui refusent les espaces et les majuscules.

**Un event décrit un résultat.** Il dit ce que l'utilisateur a obtenu ou ce que l'app a fait, pas le bouton qui a été touché.

| ✅ À faire | ❌ À éviter | Pourquoi |
|---|---|---|
| `purchase_completed` | `buy_button_tapped` | L'achat peut partir de plusieurs boutons. Le tap ne dit pas si l'achat a abouti |
| `permission_granted` + `permission_type: "camera"` | `camera_permission_granted` | La valeur va dans une propriété, sinon chaque nouvelle autorisation crée un event |
| `request_submitted` + `screen_name: "home"` | `home_request_button_tapped` | L'écran d'origine est un contexte, pas un event |

Une interaction devient un event seulement quand elle est elle-même ce que mesure le KPI. C'est le cas de l'Advocacy : l'app ne peut pas voir si l'utilisateur a vraiment recommandé l'app, donc l'invitation lancée (`invite_shared`) est ce qu'on mesure, sans savoir si elle a abouti.

**Un vocabulaire de verbes commun.** Le même verbe a le même sens partout. Un nouveau verbe n'entre dans le vocabulaire qu'avec un sens qui ne recouvre aucun des autres. Ce vocabulaire fermé vaut pour les noms d'events. Les valeurs d'une propriété ne suivent pas ce vocabulaire de verbes, comme `roadmap_voted`.

| Verbe | Sens | Exemple |
|---|---|---|
| `started` | Un parcours commence | `onboarding_started`, `trial_started` |
| `completed` | Le parcours ou l'action aboutit | `onboarding_completed`, `purchase_completed` |
| `failed` | Le parcours échoue pour une raison technique ou externe | `purchase_failed` |
| `cancelled` | L'utilisateur abandonne un parcours qu'il avait commencé | `purchase_cancelled` |
| `reached` | L'utilisateur atteint un jalon que l'app a défini | `aha_moment_reached` |
| `shown` | L'app présente une offre ou un message qu'elle contrôle, quel qu'en soit le déclencheur (une propriété dit lequel) | `paywall_shown` |
| `dismissed` | L'utilisateur ferme ce que l'app lui a présenté | `paywall_dismissed` |
| `viewed` | L'utilisateur affiche un écran ou un contenu de lui-même | `screen_viewed` |
| `opened` | L'app passe au premier plan, ou s'ouvre depuis un point d'entrée précis | `app_opened`, `deep_link_opened` |
| `used` | L'utilisateur se sert d'une feature | `feature_used` |
| `granted` | L'utilisateur accepte une autorisation ou un consentement | `permission_granted` + `permission_type: "notifications"`, `analytics_consent_granted` |
| `denied` | L'utilisateur refuse une autorisation, ou le système la refuse sans dialogue. Un refus de consentement n'est jamais envoyé | `permission_denied` |
| `answered` | L'utilisateur répond à une question fermée posée par l'app | `satisfaction_prompt_answered`, `nps_answered` |
| `submitted` | L'utilisateur envoie un contenu qu'il a composé | `request_submitted` |
| `contributed` | L'utilisateur apporte une contribution au produit | `co_creation_contributed` |
| `shared` | L'utilisateur lance un partage vers une autre personne. L'app ne sait pas s'il a abouti | `content_shared`, `invite_shared` |
| `applied` | Un code est appliqué au compte de l'utilisateur, tapé par lui ou porté par un lien | `referral_code_applied` |
| `received` | L'utilisateur reçoit quelque chose de l'app | `reward_received` |
| `triggered` | L'app appelle un dispositif du système, qui décide seul de l'afficher | `review_prompt_triggered` |

`failed`, `cancelled` et `dismissed` ne se confondent jamais : le premier est un problème à corriger, le deuxième un abandon, le troisième un refus.

**Noms réservés.** Certains outils rejettent sans prévenir les events et les propriétés qui portent un nom réservé. AREA les interdit donc partout, quel que soit l'outil utilisé, pour qu'un même plan reste valide d'un outil à l'autre. Les listes ci-dessous réunissent celles de Google Analytics 4 et de Firebase, les plus strictes des outils courants :

- **Noms d'events** : `ad_activeview`, `ad_click`, `ad_exposure`, `ad_query`, `ad_reward`, `adunit_exposure`, `app_background`, `app_clear_data`, `app_exception`, `app_install`, `app_remove`, `app_store_refund`, `app_store_subscription_cancel`, `app_store_subscription_convert`, `app_store_subscription_renew`, `app_update`, `app_upgrade`, `dynamic_link_app_open`, `dynamic_link_app_update`, `dynamic_link_first_open`, `error`, `firebase_campaign`, `firebase_in_app_message_action`, `firebase_in_app_message_dismiss`, `firebase_in_app_message_impression`, `first_open`, `first_visit`, `in_app_purchase`, `notification_dismiss`, `notification_foreground`, `notification_open`, `notification_receive`, `notification_send`, `os_update`, `screen_view`, `session_start`, `session_start_with_rollout`, `user_engagement`. Préfixes interdits : `firebase_`, `google_`, `ga_`.
- **Propriétés d'event** : `cid`, `currency`, `customer_id`, `customerid`, `dclid`, `gclid`, `session_id`, `sessionid`, `sfmc_id`, `sid`, `srsltid`, `uid`, `user_id`, `userid`. Préfixes interdits : `_`, `firebase_`, `google_`, `ga_`, `gtag.`.
- **Propriétés utilisateur** : `cid`, `customer_id`, `customerid`, `first_open_after_install`, `first_open_time`, `first_visit_time`, `google_allow_ad_personalization_signals`, `last_advertising_id_reset`, `last_deep_link_referrer`, `last_gclid`, `lifetime_user_engagement`, `non_personalized_ads`, `session_id`, `session_number`, `sessionid`, `sfmc_id`, `sid`, `uid`, `user_id`, `userid`. Préfixes interdits : `_`, `firebase_`, `google_`, `ga_`.

Attention aux noms proches : `notification_opened`, `screen_viewed` et `app_opened` sont des events AREA valides, distincts des noms réservés `notification_open`, `screen_view` et `first_open`. Il ne faut jamais les « corriger » vers leur variante réservée.

Sources : [noms réservés de GA4](https://support.google.com/analytics/answer/13316687) et références `logEvent` de Firebase pour [iOS](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics) et [Android](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics), consultées le 19 novembre 2026. Ces listes évoluent : à revérifier avant chaque version.

## Les propriétés

**Format.** `snake_case`, en minuscules, 40 caractères au maximum pour une propriété d'event, 24 pour une propriété utilisateur.

**Suffixes et préfixes.**

| Cas | Règle | Exemple |
|---|---|---|
| Booléen | Préfixe `is_` ou `has_` | `is_trial`, `has_push_enabled` |
| Identifiant | Suffixe `_id` | `content_id` |
| Durée | En secondes, suffixe `_seconds` | `run_duration_seconds` |
| Autre mesure | L'unité en suffixe | `distance_m` |
| Date et heure | Jamais en propriété : l'outil date chaque event | |
| Valeur dérivée | Jamais en propriété : un compteur, un délai entre deux events ou un rang dans l'historique de l'utilisateur (« Nième action ») se calculent dans l'outil à partir des events. La position d'une étape dans un parcours (`step_index`) n'en est pas une : seule l'app connaît l'ordre de ses écrans | |

Une durée envoyée en propriété est une mesure que seule l'app connaît, comme la durée d'une course. Le temps écoulé entre deux events, lui, se calcule dans l'outil.

**Des noms descriptifs, jamais abrégés.** `permission_type` et `paywall_trigger`, pas `perm_type` ni `trigger`. Un nom générique comme `type` ou `source` ne dit rien une fois sorti de son event.

**Valeurs d'une liste fermée.** En `snake_case` minuscule, et la liste est documentée dans le registre : `paywall_trigger` vaut `onboarding`, `feature_lock`, `usage_limit` ou `settings`, rien d'autre. Ajouter une valeur à une liste fermée est une version mineure : un plan qui suit l'ancienne liste reste valide.

**Un nom, un sens.** Une propriété garde le même sens et le même type sur tous les events. `screen_name` désigne partout le nom d'un écran, jamais autre chose. Quand deux events ont besoin d'une notion voisine, chacun a sa propriété : `link_source` pour l'origine d'un lien entrant, `consent_source` pour l'endroit où le consentement a été donné.

## Les trois portées

| Portée | Ce qu'elle décrit | Quand elle est envoyée | Exemple |
|---|---|---|---|
| **Propriété d'event** | Le contexte de cet event précis | Avec l'event concerné | `paywall_trigger`, `step_name` |
| **Propriété utilisateur** | Un état durable de l'utilisateur | À chaque changement de cet état, depuis l'app ou depuis le serveur | `user_plan`, `is_trial` |
| **Propriété commune** | Un contexte partagé par tous les events | Jointe automatiquement à chaque event | Définies dans les Fondations |

Une information qui ne change pas d'un event à l'autre n'est pas une propriété d'event : c'est une propriété utilisateur ou une propriété commune. Une seule exception : recopier une propriété utilisateur sur un event quand on a besoin de sa valeur au moment de l'event. Beaucoup d'outils affichent la valeur actuelle d'une propriété utilisateur, pas celle qu'elle avait quand l'event est parti. `feature_used` porte ainsi `user_plan`, pour savoir si la feature a servi à un utilisateur gratuit ou payant à ce moment-là. La copie garde le même nom, et le registre liste les events qui la portent.

Une propriété utilisateur ne porte qu'une information. `user_plan` dit le palier (`free`, `pro`), `is_trial` dit si l'utilisateur est en essai. Les mélanger dans une seule valeur casse les segments dès qu'une offre payante existe.

## Les données personnelles

- Aucune donnée directement identifiante dans un nom ou une propriété : ni email, ni nom, ni téléphone, ni adresse.
- L'identifiant utilisateur est un identifiant interne pseudonyme, jamais un email. Il reste une donnée personnelle au sens du RGPD : il relève du consentement, du droit d'accès et du droit à l'effacement.
- Aucun texte libre saisi par l'utilisateur (recherche, message, formulaire). Si le contenu compte, on envoie une catégorie.
- Aucun event avant le consentement, quand il est requis. Le détail est dans [les Fondations](foundations.md#3-le-consentement).

## Les limites des outils

AREA ne dépend d'aucun outil d'analytics, mais il cale ses contraintes sur le plus strict des outils courants, pour qu'un plan reste valide partout. Aujourd'hui, c'est Firebase Analytics.

| Élément | Limite |
|---|---|
| Nom d'event | 40 caractères |
| Propriétés par event | 25, propriétés communes comprises |
| Nom de propriété d'event | 40 caractères |
| Valeur de propriété d'event | 100 caractères |
| Propriétés utilisateur | 25 |
| Nom de propriété utilisateur | 24 caractères |
| Valeur de propriété utilisateur | 36 caractères |

Source : [limites de collecte de Google Analytics pour Firebase](https://support.google.com/firebase/answer/9237506), consultées le 16 novembre 2026.

## Renommer et faire évoluer

- **On ne renomme un event que si son sens est faux.** Un renommage casse l'historique et les dashboards. Un event au sens juste mais au nom non conforme garde son nom : le plan de tracking de l'app le note comme hérité, et indique le rôle AREA qu'il joue (voir [Des rôles, pas seulement des noms](mvt.md#des-rôles-pas-seulement-des-noms) dans le Minimum Viable Tracking).
- **Un event qui change de sens change de nom.** Garder le nom ferait comparer deux choses différentes dans le même graphique.
- **Un event abandonné est d'abord marqué déprécié**, puis retiré dans une version suivante.

## Stabilité et versions

Chaque entrée du registre (pilier, KPI, event, propriété, mécanique) a un niveau de stabilité.

| Niveau | Sens |
|---|---|
| `development` | Peut encore changer. Toute nouvelle entrée commence ici |
| `stable` | Ne change plus sans nouvelle version majeure |
| `deprecated` | À ne plus utiliser, retiré dans une version suivante |

**Une entrée devient stable par l'usage, pas par décision.** Elle passe de `development` à `stable` quand les trois conditions suivantes sont réunies :

1. Elle est implémentée dans au moins deux apps en production, dont une au moins hors de l'équipe qui maintient AREA.
2. Ses KPI ont été lus sur des données réelles dans ces apps.
3. Aucun retour ouvert ne la remet en cause.

Les retours se déposent dans une issue ou une discussion du repo, et chaque changement de niveau est noté dans le changelog avec les retours qui le justifient.

Une entrée en `development` peut changer ou disparaître d'une version mineure à l'autre. Une entrée `stable` qui doit disparaître passe d'abord en `deprecated`, puis elle est retirée à la version majeure suivante.

AREA suit le versionnement sémantique :

- **Majeure** : un changement qui casse un plan existant, comme le renommage ou le retrait d'une entrée stable, ou un nouveau calcul de KPI de référence.
- **Mineure** : un ajout qui ne casse rien, y compris une nouvelle valeur dans une liste fermée.
- **Correctif** : une précision du texte, sans effet sur le tracking.

**En version 0.x, AREA ne garantit rien.** Même une entrée stable peut encore évoluer d'une version mineure à l'autre. Un plan de tracking indique la version d'AREA qu'il suit, pour savoir ce qui a changé depuis.
