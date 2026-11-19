# Fondations

Les fondations ne mesurent rien à elles seules. Elles rendent les KPI fiables : si l'une d'elles est cassée, tous les piliers le sont, quelle que soit la qualité des events. On les vérifie donc avant les piliers.

Elles sont au nombre de quatre : l'identité, les propriétés communes, le consentement et la séparation des données de test.

## 1. L'identité

Activation et rétention comptent des utilisateurs, pas des sessions. Il faut donc savoir qui fait quoi, d'un lancement à l'autre.

Quel que soit le cas, quatre règles s'appliquent :

- **Chaque event porte un identifiant**, dès le premier lancement.
- **L'identifiant utilisateur vient du système d'authentification**, que ce soit le backend de l'app ou un service d'authentification hébergé. Ce n'est jamais un email (voir [les données personnelles](conventions.md#les-données-personnelles) dans les conventions). Le même identifiant est transmis au fournisseur de paiement, pour relier les achats aux parcours.
- **Quand l'identifiant change, l'ancien est relié au nouveau.** Le parcours fait avant le changement compte ainsi pour le même utilisateur.
- **À la déconnexion, l'identité est réinitialisée.** Sinon, la personne suivante sur le même appareil hérite de l'historique de la précédente.

Leur application dépend de la façon dont l'app gère ses utilisateurs :

| Cas | Avant le compte | Quand l'utilisateur crée un compte ou se connecte | Ce que mesurent les KPI |
|---|---|---|---|
| **Comptes classiques** | Identifiant anonyme de l'outil d'analytics, stable sur l'installation | L'app transmet l'identifiant utilisateur et le relie à l'identifiant anonyme | Des utilisateurs, sur tous leurs appareils |
| **Accès anonyme, puis compte facultatif** | Identifiant fourni par le système d'authentification dès le premier lancement | Si le système garde le même identifiant en convertissant le compte, rien à faire. Sinon, l'ancien est relié au nouveau | Des utilisateurs pour ceux qui ont un compte, des installations pour les autres |
| **Aucun compte** | Identifiant anonyme de l'outil d'analytics | Sans objet | Des installations |

Quand les KPI comptent des installations, un utilisateur qui change de téléphone ou réinstalle l'app compte comme un nouveau. Ce n'est pas un défaut de tracking : c'est la limite d'une app sans compte, et elle est indiquée à côté de chaque KPI.

Les extensions de l'app (widget, extension de partage, montre) envoient leurs events avec le même identifiant que l'app. Sur iOS, il se partage par un App Group, sinon chaque extension apparaît comme un utilisateur distinct.

**Ce qui casse sans elle :** les utilisateurs sont comptés en double, la rétention est sous-estimée et l'onboarding n'est rattaché à personne.

## 2. Les propriétés communes

Certaines informations accompagnent chaque event, pour que tous les KPI puissent être découpés de la même façon. Peu importe qu'elles soient collectées automatiquement par l'outil ou envoyées par l'app : elles doivent exister.

Le tableau ci-dessous est un minimum. Chaque app peut en ajouter selon ses besoins, en respectant les conventions et les limites des outils (25 propriétés par event, 25 propriétés utilisateur). Les plus utiles sont celles que l'outil ne peut pas deviner : `app_language` quand la langue choisie dans l'app diffère de celle de l'appareil, `market` quand les offres changent selon les pays, `experiment_variant` quand un test A/B est en cours, ou `update_id` quand l'app déploie des mises à jour sans passer par les stores (Expo Updates, CodePush) : `app_version` ne change pas, et c'est le seul moyen de distinguer deux versions du code.

| Propriété | Portée | Sens | Valeurs |
|---|---|---|---|
| `app_version` | Commune | Version de l'app qui envoie l'event | `2.4.1` |
| `platform` | Commune | Système de l'appareil | `ios`, `android` |
| `environment` | Commune | Environnement d'exécution | `production`, `staging` pour les builds de test distribuées (TestFlight, tests internes du Play Store), `development` pour les builds locales et les simulateurs |
| `user_plan` | Utilisateur | Palier de l'offre, si l'app en a une payante | `free`, `pro`… |
| `is_trial` | Utilisateur | L'utilisateur est en période d'essai, si l'app en propose une | `true`, `false` |
| `is_internal` | Utilisateur | L'utilisateur ou l'appareil appartient à l'équipe | `true`, `false` |

Une propriété utilisateur est mise à jour à chaque fois que l'état change, pas seulement au lancement. Un `user_plan` resté à `free` après un achat fausse tous les segments. Quand le changement arrive hors de l'app (un renouvellement, une résiliation, un remboursement), le serveur met la propriété à jour, ou l'app le fait à son lancement suivant.

**Ce qui casse sans elles :** impossible de comparer deux versions de l'app, de séparer iOS et Android, ou de lire un KPI pour les seuls utilisateurs payants.

## 3. Le consentement

- **Quand la réglementation exige un consentement** pour la mesure d'audience, aucun event n'est envoyé avant que l'utilisateur l'ait donné. Les events émis avant sont jetés, jamais mis en file d'attente pour partir plus tard.
- **Le premier lancement n'est pas perdu pour autant.** `app_opened` porte `is_first_launch` (voir [le socle](mvt.md#le-socle) du Minimum Viable Tracking), et ce drapeau reste vrai tant que le premier `app_opened` n'a pas pu partir. À l'accord, l'app envoie aussitôt ce premier `app_opened`, avec `is_first_launch: true`, puis `analytics_consent_granted` : l'utilisateur entre dans les cohortes à ce moment-là.
- **L'accord est tracé, le refus jamais.** L'app envoie `analytics_consent_granted` juste après l'accord et le `app_opened` qu'il débloque, avec `consent_source` (`prompt` ou `settings`). Un refus ne part pas, puisque rien ne doit partir sans consentement.
- **Le taux de consentement vient d'ailleurs.** Les données d'analytics ne contiennent que ceux qui ont accepté, donc elles ne peuvent pas le calculer. Il se lit dans l'outil de gestion du consentement, ou dans un compteur agrégé qui ne contient aucun identifiant.
- **Les KPI ne décrivent que les consentants.** Ceux qui acceptent sont souvent plus engagés que les autres : une activation mesurée sur 60 % des utilisateurs est probablement plus haute que la vraie. Le taux de consentement accompagne donc la lecture des KPI, et la comparaison aux benchmarks du marché, qui n'ont pas ce filtre.
- **Le choix vaut pour tous les SDK**, y compris ceux qui envoient leurs propres events (paiement, paywall, messagerie in-app).
- **Un changement d'avis s'applique tout de suite**, sans attendre le prochain lancement de l'app. Un retrait du consentement ressemble à un départ dans les données : l'évolution du taux de consentement permet de les distinguer.
- **L'App Tracking Transparency d'iOS est une autre question.** Elle concerne le suivi publicitaire entre apps, pas la mesure d'audience. Sa réponse se trace comme une autorisation (`permission_type: "app_tracking"`), et ne remplace jamais le consentement analytics.

**Ce qui casse sans lui :** la collecte n'est pas conforme, et les KPI mélangent des utilisateurs mesurés et non mesurés sans qu'on puisse le voir.

## 4. La séparation des données de test

- **Les builds de développement, de test et les simulateurs n'envoient rien dans les données de production.** Le mieux est un projet ou un flux distinct par environnement. À défaut, la propriété `environment` est renseignée partout, et les KPI filtrent toujours sur `production`.
- **L'environnement se détecte à l'exécution, pas à la compilation.** Une build TestFlight est le même binaire que celle de l'App Store, et une build de test interne du Play Store est compilée comme une build de production. Il faut lire la provenance réelle de l'installation (le reçu sandbox sur iOS, la source d'installation sur Android) ou configurer l'environnement explicitement.
- **L'équipe est marquée** avec `is_internal`, pour être exclue des KPI sans être retirée des données. Le marquage se fait dès l'installation, par un réglage caché ou une build dédiée, et pas seulement à la connexion d'un compte de l'équipe.

**Ce qui casse sans elle :** les tests de l'équipe gonflent l'activation et faussent tous les taux. C'est vrai surtout au lancement de l'app, quand les vrais utilisateurs sont encore peu nombreux, et à chaque nouvelle feature : l'équipe est alors la première, et parfois la seule, à l'utiliser, au moment même où l'on veut lire son adoption.

## Les erreurs classiques

- Identifier l'utilisateur avec son email.
- Oublier de réinitialiser l'identité à la déconnexion.
- Identifier l'utilisateur avant que la connexion soit confirmée par le système d'authentification.
- Avec un accès anonyme, créer un compte neuf au lieu de convertir l'accès existant, ou ne pas signaler le changement d'identifiant à l'outil d'analytics : l'onboarding et les premiers lancements disparaissent de l'historique de l'utilisateur.
- Compter sur l'outil d'analytics pour tout réconcilier. Tous ne fusionnent pas l'historique de la même façon : certains rattachent les events passés au nouvel identifiant, d'autres seulement les suivants. Le plus sûr reste un identifiant stable dès le premier lancement.
- Laisser les builds de bêta (TestFlight, tests internes du Play Store) envoyer en production parce qu'un réglage repose sur le type de build.
- Laisser un SDK tiers envoyer ses events avant le consentement, ou sans l'identifiant utilisateur.
- Définir une propriété utilisateur au lancement et ne plus jamais la mettre à jour.
- Calculer un taux de consentement à partir des données d'analytics. Elles ne contiennent que ceux qui ont accepté.
