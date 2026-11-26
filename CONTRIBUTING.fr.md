# Contribuer à AREA

*Traduction. La version anglaise fait référence : [English](CONTRIBUTING.md).*

AREA avance par les retours des apps qui l'appliquent. C'est aussi ce qui fait passer ses entrées de `development` à `stable` (voir [Stabilité et versions](spec/fr/conventions.md#stabilité-et-versions)). Tout passe par les [Discussions](https://github.com/igniters-studio/area-framework/discussions) du repo, en anglais ou en français.

## Ce qui aide le plus

### Un retour d'app

Vous appliquez AREA dans une app, en production ou en cours de développement : dites ce qui a tenu et ce qui a coincé. Quel pilier vous avez pu lire, avec quel verdict, quel event vous avez dû adapter, quelle définition vous a fait hésiter. Ouvrez une discussion dans la catégorie **App feedback**.

Les retours d'apps en production comptent particulièrement : une entrée devient `stable` quand elle tourne dans au moins deux apps en production, dont une hors de l'équipe qui maintient AREA.

### Un event, une propriété ou un KPI qui ne tient pas dans votre app

Décrivez l'app, ce que vous vouliez mesurer, et pourquoi l'entrée du registre ne suffit pas. Ouvrez une discussion dans la catégorie **Proposals** : un changement du registre touche toutes les apps qui le suivent, il se discute d'abord.

### Une question ou une incohérence

Une question sur la spec, ou un écart entre la spec et le registre, entre deux pages, entre l'anglais et le français, y compris une faute de frappe : la catégorie **Q&A** suffit.

## Les stacks

AREA ne dépend d'aucune stack : ses events décrivent ce que l'utilisateur obtient, pas le code qui les envoie. Son outillage, lui, commence par les apps React Native et Expo.

Les retours d'apps iOS natives, Android natives et Flutter sont les bienvenus. Ils portent sur ce qui change d'une stack à l'autre, sans ajouter d'events :

- où envoyer `app_opened` pour couvrir le lancement et le retour depuis l'arrière-plan ;
- comment connaître l'`entry_point` d'une ouverture par notification, lien ou widget, y compris à froid ;
- comment poser `is_first_launch` avant et après le consentement ;
- comment envoyer `core_action_completed` depuis un widget, une action de notification ou une extension.

Une note par stack, avec un exemple court, aide les autres équipes autant qu'elle aide AREA à préparer l'ouverture de son outillage.

## Ce que devient une contribution

Une proposition retenue devient un changement de la spec et du registre, fait par l'équipe qui maintient AREA et noté dans le [changelog](CHANGELOG.md) avec la version qui l'introduit. Le registre fait foi, la version anglaise fait référence, la traduction française suit.

## Licence des contributions

Une contribution reprise dans le repo est publiée sous la licence de la partie qu'elle touche : [CC BY 4.0](LICENSE) pour le texte, [CC0 1.0](registry/LICENSE) pour le registre, [Apache 2.0](scripts/LICENSE) pour le script et le site.
