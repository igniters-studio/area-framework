# Changelog

Tous les changements notables d'AREA sont notés dans ce fichier.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), et AREA suit le
[versionnement sémantique](https://semver.org/lang/fr/).

## [0.1.0] - non publiée

Première version publique d'AREA. Toutes les entrées du registre sont en `development`.

### Ajouté

- **Manifeste** : pourquoi AREA part des objectifs business et non des events.
- **Conventions** : nommage des events et des propriétés, vocabulaire de verbes, noms réservés,
  stabilité et versions.
- **Fondations** : identité, propriétés communes, consentement, séparation des données de test.
- **Quatre piliers**, chacun avec son KPI de référence, son volume et ses verdicts (mesurable,
  partiel, non mesurable) :
  - Activation : taux d'activation ;
  - Rétention : rétention cœur ;
  - Engagement : taux d'usage cœur ;
  - Advocacy : taux d'intention de recommandation.
- **Minimum Viable Tracking** en trois couches : les Fondations, un socle de trois events
  (`app_opened`, `aha_moment_reached`, `core_action_completed`), et les events liés aux mécaniques
  de l'app.
- **Registre YAML** (`registry/`) : nommage, piliers, mécaniques, propriétés, events et KPI, lisibles
  par une machine.
- **Script de validation** du registre (`scripts/validate_registry.py`).
- **Benchmarks** (`references/`), hors spec.
