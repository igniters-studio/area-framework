# Activation

*Traduction de v0.1.0. La version anglaise fait référence : [English](../../pillars/activation.md).*

> Les nouveaux utilisateurs atteignent-ils le moment où l'app prouve sa valeur ?

Un utilisateur qui n'a pas perçu la valeur de l'app ne reviendra pas, quelle que soit la qualité du produit. L'activation mesure ce passage : le moment où l'utilisateur obtient pour la première fois ce que l'app promet. Ce pilier s'appuie sur l'action cœur, définie avec l'[Engagement](engagement.md#laction-cœur). La [Rétention](retention.md#activés-et-non-activés) s'appuie à son tour sur l'Activation pour séparer les utilisateurs activés des non activés.

**Objectif business type :** amener le plus de nouveaux utilisateurs possible jusqu'à la valeur de l'app, le plus vite possible. Chaque app écrit le sien (voir [Appliquer AREA](../../../README.fr.md#appliquer-area) dans le README).

## L'aha moment

L'aha moment est le jalon à partir duquel un utilisateur a perçu la valeur de l'app. **C'est une hypothèse que chaque app pose, puis vérifie sur ses données.**

Au départ, l'hypothèse la plus simple est la **première réalisation de l'action cœur**, celle pour laquelle l'app existe (voir [l'action cœur](engagement.md#laction-cœur)). Une app peut choisir un jalon plus précis quand la première action ne suffit pas à percevoir la valeur. Par exemple :

| App | Aha moment |
|---|---|
| Course à pied | Première course enregistrée |
| Budget | Première dépense catégorisée |
| Méditation | Première séance terminée |
| Prise de notes | Première note créée puis retrouvée. Créer une note est l'action cœur, mais sa valeur apparaît quand on la retrouve |
| E-commerce | Première commande passée |

L'aha moment n'est pas la fin de l'onboarding. Un utilisateur peut terminer l'onboarding sans jamais toucher à ce qui fait la valeur de l'app.

Toute app a un chemin jusqu'à l'aha moment, même sans onboarding. AREA ne prescrit pas d'onboarding : il demande que ce chemin soit défini et mesuré. Un onboarding n'est qu'une façon de le raccourcir.

Il se définit **avant** d'écrire la moindre ligne de tracking, parce qu'il est propre à chaque app et qu'aucun outil ne peut le deviner. Une app sans aha moment défini ne peut mesurer ni son activation ni la rétention de ses utilisateurs activés. Ce n'est pas un event manquant parmi d'autres : c'est une question produit sans réponse, et aucun tracking ne la remplacera.

## Vérifier l'aha moment

Une hypothèse se vérifie. Après quelques semaines de données :

1. Répartir les nouveaux utilisateurs selon ce qu'ils ont fait dans la fenêtre d'activation : aucune action cœur, une, deux, trois ou plus.
2. Comparer leur rétention cœur à J30.
3. Si la rétention fait un saut net à partir d'un certain seuil, l'aha moment est probablement ce seuil, par exemple « trois courses enregistrées dans la première semaine », plutôt que la première action.
4. Mettre à jour la définition dans le plan de tracking, avec un nouveau `aha_version`.

Comme tout écart entre cohortes, ce saut est une corrélation : il désigne le meilleur candidat, il ne prouve pas que pousser les utilisateurs jusqu'au seuil les fera rester. La vérification se refait quand le produit change beaucoup.

Changer de définition change le KPI. `aha_version` permet de ne jamais mélanger deux définitions dans la même courbe.

## KPI de référence : le taux d'activation

| | |
|---|---|
| **Définition** | Part des nouveaux utilisateurs qui atteignent l'aha moment dans la fenêtre d'activation |
| **Cohorte** | Nouveaux utilisateurs de la période : leur `app_opened` avec `is_first_launch` tombe dans la période |
| **Numérateur** | Utilisateurs de la cohorte qui émettent `aha_moment_reached` dans les N jours suivant leur premier lancement |
| **Fenêtre N** | 7 jours par défaut. Une app quotidienne peut la réduire à 1 jour, une app occasionnelle l'allonger. Une fois choisie, elle est notée dans le plan de tracking. La changer ouvre une nouvelle série, qui ne se compare pas à l'ancienne |
| **Unité** | Des utilisateurs distincts. Seule la première occurrence de `aha_moment_reached` compte |
| **Volume** | Le nombre d'utilisateurs activés de la cohorte |

Le verdict dit si ce KPI peut être lu de façon fiable à partir du tracking en place :

| Verdict | Condition |
|---|---|
| **Mesurable** | L'aha moment est défini et versionné, `aha_moment_reached` part depuis toutes les surfaces où il peut être atteint (écran de l'app, widget, notification…), `app_opened` est en place avec `is_first_launch`, et les Fondations sont respectées |
| **Partiel** | L'event manque sur une partie des surfaces, `is_first_launch` est absent, ou l'une des Fondations est incomplète |
| **Non mesurable** | Aucun aha moment défini, ou aucun event qui le signale |

Une app sans compte n'est pas pénalisée : son verdict précise seulement qu'il porte sur des installations (voir [l'identité](../foundations.md#1-lidentité) dans les Fondations).

## KPI complémentaires

| KPI | Définition |
|---|---|
| **Time to Aha** | Temps médian entre le premier lancement et `aha_moment_reached`, parmi les utilisateurs activés dans la fenêtre. Il se publie avec la part de la cohorte qui ne l'a pas atteint, sans quoi une médiane qui baisse peut cacher plus d'abandons. Calculé dans l'outil, jamais envoyé en propriété |
| **Taux de complétion de l'onboarding** | Utilisateurs qui émettent `onboarding_completed`, rapportés à ceux qui émettent `onboarding_started`, par `onboarding_version` |
| **Abandon par étape** | Part des utilisateurs perdus à chaque étape de l'onboarding, lue avec `step_name` et `onboarding_version`, si l'onboarding a plusieurs étapes |
| **Conversion de la paywall** | Part des utilisateurs exposés à la paywall qui démarrent un essai ou achètent dans les 24 heures (fenêtre par défaut), par `paywall_trigger` |
| **Taux d'acceptation des autorisations** | Utilisateurs qui accordent l'autorisation, rapportés à ceux qui l'ont accordée ou refusée, par `permission_type` |

## Events

| Event | Quand | Propriétés | Obligatoire si |
|---|---|---|---|
| `aha_moment_reached` | L'utilisateur atteint l'aha moment défini par l'app | `aha_version`, `core_action_type` si l'aha porte sur une action cœur | Toujours (socle) |
| `onboarding_started` | L'utilisateur démarre l'onboarding | `onboarding_version` | L'app a un onboarding |
| `onboarding_step_completed` | Une étape de l'onboarding est franchie | `onboarding_version`, `step_name`, `step_index`, `step_total` | L'onboarding a plusieurs étapes |
| `onboarding_completed` | Toutes les étapes sont franchies | `onboarding_version` | L'app a un onboarding |
| `paywall_shown` | L'app présente son offre payante | `paywall_trigger` | L'app a une paywall |
| `trial_started` | L'utilisateur démarre un essai gratuit | `user_plan` | L'app propose un essai |
| `purchase_completed` | L'utilisateur achète un abonnement ou un produit proposé par la paywall. Une commande dans une app de commerce n'en est pas un : c'est l'action cœur | `user_plan`, `purchase_type` | L'app a une paywall |
| `permission_granted` | L'utilisateur accorde une autorisation | `permission_type`, et `permission_scope` si la plateforme expose une portée | L'app demande des autorisations |
| `permission_denied` | L'utilisateur refuse une autorisation | `permission_type` | L'app demande des autorisations |

`aha_moment_reached` peut partir plus d'une fois sans fausser le KPI, puisque seule sa première occurrence compte. Il n'est donc pas nécessaire de garder un état côté serveur pour l'envoyer une seule fois.

## Propriétés

| Propriété | Valeurs |
|---|---|
| `aha_version` | Version de la définition de l'aha moment : `v1`, `v2`… |
| `core_action_type` | Type d'action cœur, propre à l'app. Même propriété que sur `core_action_completed` |
| `onboarding_version` | Version du parcours d'onboarding, pour comparer deux versions : `v1`, `v2`… |
| `step_name` | Nom de l'étape, propre à l'app : `profile_setup`, `goal_selection`… |
| `step_index`, `step_total` | Position de l'étape et nombre total d'étapes |
| `paywall_trigger` | Ce qui a fait apparaître la paywall : `onboarding`, `feature_lock`, `usage_limit`, `settings` |
| `user_plan` | Palier de l'offre au moment de l'event : sur `trial_started` et `purchase_completed`, le palier qui vient d'être obtenu. Copie de la propriété utilisateur des Fondations |
| `purchase_type` | `subscription`, `one_time` |
| `permission_type` | `notifications`, `location`, `health`, `camera`, `microphone`, `contacts`, `photos`, `app_tracking` |
| `permission_scope` | Ce que l'utilisateur a accordé, envoyé chaque fois que la plateforme expose une portée : `full` (autorisation complète), `limited` (photos choisies, position approximative), `provisional` (notifications provisoires d'iOS), `once` (pour cette fois seulement) |

## La paywall et l'achat

AREA mesure les décisions d'achat prises dans l'app : la paywall présentée, l'essai démarré, l'achat fait. Il ne mesure jamais l'argent : aucun montant, aucune devise. Le revenu, les renouvellements et les remboursements se lisent chez le fournisseur de paiement, qui reçoit le même identifiant utilisateur (voir [l'identité](../foundations.md#1-lidentité) dans les Fondations).

**Quand la paywall bloque l'accès**, personne n'atteint l'aha moment sans payer ou démarrer un essai d'abord. La paywall devient une étape de l'activation : ce qui la casse casse l'activation, et le Time to Aha s'allonge mécaniquement de ce passage obligé.

## Les questions auxquelles ce pilier répond

- Quelle part de mes nouveaux utilisateurs perçoit la valeur de l'app ?
- Combien de temps leur faut-il pour y arriver ?
- À quelle étape de l'onboarding est-ce que j'en perds le plus ?
- Ma paywall convertit-elle, et selon ce qui la déclenche ?
- Quelles autorisations sont le plus souvent refusées ?

## Les erreurs classiques

- Prendre la fin de l'onboarding pour l'aha moment.
- Ne jamais vérifier l'aha moment, ou changer sa définition sans changer `aha_version`.
- Ne tracer que les autorisations accordées. Sans les refus, aucun taux d'acceptation n'est calculable. Sur Android, après deux refus, le système refuse sans plus afficher de dialogue : `permission_denied` part quand même, et le taux mesure alors une décision, pas un affichage.
- Envoyer le Time to Aha en propriété. C'est un KPI que l'outil calcule à partir des events.
- Envoyer un montant ou une devise avec `purchase_completed`. Le revenu se lit chez le fournisseur de paiement.
- Compter l'activation en sessions plutôt qu'en utilisateurs.
