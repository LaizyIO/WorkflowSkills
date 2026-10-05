---
title: FEAT-007 Évaluation indépendante du skill - Forward Test
type: test
status: completed
created: 2026-10-05
updated: 2026-10-05
feature: FEAT-007
tags:
  - feature-workflow
  - testing
  - ux
---

# Passe indépendante

Demandes fictives, traitées par un agent indépendant à partir du skill et des sources brutes, sans lui communiquer les réponses attendues. Les textes produits restent des propositions draft, jamais des spécifications de WorkflowSkills ou d'un client réel. Le parent a relu les contrats et les fiches : marque, composants existants, états sémantiques et inconnues restent explicites ; aucune migration Carbon ni garantie de persistance hors ligne n'est inventée.


## Résultat

Les trois briefs conduisent à des contrats distincts sans importer une identité de marque ou une architecture imposée par l'amont.

| Cas | Sources choisies | Décisions caractéristiques | Informations non fournies |
| --- | --- | --- | --- |
| A | Taste frontend ; analyse Airbnb | Photographie éditoriale, cobalt/crème, Source Sans 3, choix de date lisible ; repères 6/1/3 | Dates, tarifs, copie, tokens précis, droits photos, flux billetterie |
| B | Taste redesign sélectif ; analyse IBM ; Carbon officiel | Table dense, violet/Inter/Lucide et clavier conservés ; états textuels/visuels ; repères 2/1/9 | Colonnes, statuts, contrats détaillés, sélection des lots, résultats partiels, interface existante |
| C | Taste mobile pour plateforme/cohérence ; Android Developers | Deux rôles Android/Material, grands contrôles, texte adaptable, distinction hors ligne/doublon/erreur ; repères 2/1/3 | Lecteur et appareil, politique doublons, persistance/synchronisation, tokens et tailles système prises en charge |

Airbnb et IBM ont été lus dans le dépôt Awesome donné. Leur SHA256 concorde avec le manifeste du skill. Les sources choisies ont été copiées dans chaque projet temporaire avec leurs licences MIT. Clay, Airtable et Expo ont été consultés puis rejetés avec raisons consignées. La recherche native dans le catalogue a trouvé des références d'inventaire automobile et badges Android, sans correspondance à l'activité d'entrepôt.

## Utilisation réelle du skill

Lecture de SKILL.md, AGENTS.md, source-routing.md et manifest.json ; sélection de sections Taste pertinentes ; recherche du catalogue par propriétés ; lecture des candidats ; écriture des décisions en français, frontmatter et liens MOC. Les fiches tracent URL, commit, chemins locaux, propriétés retenues/écartées, adaptation et statut provisoire. Les sources officielles Carbon et Android ont été consultées en lecture seule.

Le routage a évité trois dérives concrètes : reprendre le baseline 8/6/4, remplacer Inter/Lucide lors d'une refonte, traiter le guide mobile d'images comme une spécification Compose/hors ligne. Il rappelle aussi que l'analyse IBM ne contient pas les tables produit.

La lecture du grand snapshot mobile a produit une sortie trop longue à la première consultation ; l'extraction de sections nommées a résolu le problème. Le skill propose déjà cette lecture sélective. Aucun obstacle de dépendance ou d'installation rencontré.

Cet essai a créé seulement les deux documents demandés par cas et un MOC minimal, avec copies des sources. Les autres mémoires Product_Context/Platform_Profile/Design_Direction et le workflow ux-bootstrap complet n'ont pas été exercés, car les briefs sont fictifs et l'évaluation demandait des décisions documentaires. Aucun fichier D:/WorkflowSkills n'a été modifié.

## Portée de validation

Validé : possibilité de suivre le routage, distinguer scopes marketing/produit/natif, conserver les contraintes fournies, choisir ou refuser le catalogue, tracer provenance/licence et expliciter les incertitudes.

Non validé : fonctionnement CLI catalog/import/install, rendu web ou Android, agrandissement réel du texte, contraste final, clavier, lecteur d'écran, billetterie, performance sur 15 000 lignes, scanner avec gants, doublons et synchronisation. Aucune application, image, installation globale ou écriture externe n'a été créée. Les vérifications de fichiers n'équivalent pas à une validation UX réelle.

## Artefacts produits, archivés pour revue

Les chemins locaux ci-dessous appartiennent au répertoire temporaire de test original. Les URLs et commits sont la provenance durable. Ces documents ne sont pas la mémoire active d'un projet.

### A — Exposition

Contrat proposé :

````markdown
---
title: Direction de design — exposition de céramique
type: spec
status: draft
created: 2026-10-05
updated: 2026-10-05
tags: [ux, forward-test, ceramics]
---

## Décisions du projet

Lecture : site éditorial contemporain pour des visiteurs sur téléphone, où les œuvres ouvrent la découverte et le choix de date conduit à la billetterie. Faits : cobalt sombre, crème, photographies fournies et Source Sans 3 sous licence ouverte. Cette proposition n'est pas une direction approuvée.

- **Identité et tokens** : `brand.cobalt` pour les actions principales et les titres ; `surface.cream` pour la lecture ; Source Sans 3 pour toute la hiérarchie. Les valeurs couleur exactes, graisses disponibles et droits d'usage des photographies restent à fournir. Séparer les tokens d'erreur de l'accent de marque.
- **Composition** : une colonne sur téléphone, photographie d'œuvre puis titre et informations utiles, accès visible au choix de date. Rythme éditorial grâce aux cadrages et à l'espacement ; le contrôle de date reste régulier. Images significatives avec description ; les légendes restent hors de l'image.
- **Typographie et densité** : corps proposé à 1rem, interligne 1,5 ; titre fluide en rem, jamais réduit pour tenir une ligne. Espacement de référence 4/8/16/24/32 ; commencer les gouttières à 16px, puis vérifier avec le contenu réel. Contrôles clairement étiquetés, sans légende miniature.
- **Parcours proposé** : découvrir → choisir une date disponible → afficher la date choisie et poursuivre vers la réservation. Ne présumer ni créneaux horaires, ni compte obligatoire, ni panier ou paiement intégrés. Le type de sélecteur dépend du nombre réel de dates. Une action fixe en bas est candidate, uniquement si elle laisse la lecture et le clavier utilisables.
- **États** : chargement des disponibilités, aucune date disponible, date sélectionnée, indisponibilité apparue après sélection, erreur de réservation et confirmation effective. Garder le contexte et proposer une reprise ; toute confirmation suit le retour réel de la billetterie. Les noms et messages définitifs sont à fournir.
- **Mouvement** : repères Taste 6/1/3 (variance/mouvement/densité) : caractère artistique dans les images, parcours statique, lecture aérée sur téléphone. Les transitions éventuelles honorent le mouvement réduit ; aucune interaction ne dépend d'un survol.
- **Sources** : Taste frontend pour la lecture du brief et la composition ; Airbnb pour la photographie prioritaire et la proximité de la réservation. Adapter en cobalt/crème/Source Sans 3 ; rejeter Cereal, Rausch, étoiles, favoris et grille de logements.

À vérifier ensuite : texte réel, choix de date au clavier et sur téléphone, retour après échec, agrandissement du texte, contraste sur les valeurs de marque et images réelles. Incertitudes : dates, tarifs, contenus, flux et fournisseur de billetterie. Ce document ne prouve aucun comportement rendu.

Mémoire : [[MOC-UX]] ; [[Design_References]].

````

Références et arbitrages :

````markdown
---
title: Références de design — exposition de céramique
type: spec
status: draft
created: 2026-10-05
updated: 2026-10-05
tags: [ux, references, forward-test]
---

## Sélection pour cet essai

1. **Taste frontend — selected**. [Source](https://github.com/Leonxlnx/taste-skill/blob/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/skills/taste-skill/SKILL.md) ; commit `ce26fc25c0e5e8cab638f883de62d9a86ee5e45b` ; original local : `D:/WorkflowSkills/ux-design-direction/assets/design-sources/taste/frontend.md`. Copie : `design/references/taste/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/frontend.md`, MIT conservée. Sections utilisées : Brief Inference, Three Dials, Typography, Interactive UI States, Image Strategy. Retenir la lecture du contexte et la hiérarchie des images ; adapter en 6/1/3, Source Sans 3 et couleurs du brief. Écarter baseline 8/6/4, police de remplacement, images obligatoirement générées, mode sombre automatique et mouvements de scroll.
2. **Airbnb — selected, inspiration partielle**. [Analyse](https://github.com/voltagent/awesome-design-md/blob/13be5c05c63be24b57581162364167028020f043/design-md/airbnb/DESIGN.md) ; commit `13be5c05c63be24b57581162364167028020f043` ; original : `C:/Users/guillaume/AppData/Local/Temp/workflow-design-research-20261005/awesome-design-md/design-md/airbnb/DESIGN.md`. Copie : `design/references/awesome-design-md/13be5c05c63be24b57581162364167028020f043/airbnb/DESIGN.md`, MIT conservée. SHA256 concordant avec le manifeste : `add34130d67209ad105346d60fe2b290728b9711683969db4b7760e29477a5fe`. Retenir photographies prioritaires, contrôle de date étiqueté et proximité de la réservation sur mobile. Adapter au choix d'une date d'exposition ; rejeter typographie Cereal propriétaire, rose Rausch, badges minuscules, modèle de logement, favoris et avis.
3. **Clay — rejected**. [Analyse](https://github.com/voltagent/awesome-design-md/blob/13be5c05c63be24b57581162364167028020f043/design-md/clay/DESIGN.md), même commit Awesome ; original : `C:/Users/guillaume/AppData/Local/Temp/workflow-design-research-20261005/awesome-design-md/design-md/clay/DESIGN.md`. La richesse des objets 3D a été examinée comme alternative à la photographie ; cette analyse concerne une plateforme GTM et non une exposition. Ses six accents, mascottes et illustrations commandées détournent les œuvres fournies. Aucun asset ni token adopté.

Recherche guidée par photographie, hiérarchie, rythme éditorial et date/réservation. Les analyses sont tierces et alpha ; leur licence ne fournit pas les photos, logos ou polices des marques. Copie documentaire ≠ approbation. Aucun import CLI, rendu ni mesure de contraste effectué. La route billetterie et les disponibilités restent inconnues.

Voir [[MOC-UX]] et le DESIGN.md du cas.

````

### B — Logistique

Contrat proposé :

````markdown
---
title: Direction de design — poste de dispatch logistique
type: spec
status: draft
created: 2026-10-05
updated: 2026-10-05
tags: [ux, forward-test, logistics]
---

## Décisions du projet

Lecture : espace de travail web dense pour des dispatchers expérimentés, utilisé quotidiennement afin de comparer 15 000 expéditions, filtrer les anomalies et changer les statuts en lot. Faits : violet de marque, Inter, Lucide, parcours clavier validé, routes et contrats backend fixes. Aucun audit de l'interface actuelle n'a été possible.

- **Identité et tokens** : conserver les tokens violet, Inter et Lucide existants. Accent de marque distinct de `status.error`, `status.warning`, `status.success` ; reprendre leurs valeurs existantes si elles sont documentées, sinon les faire valider. Chaque état possède texte et icône en plus de la couleur.
- **Structure** : conserver la navigation et le chemin clavier validés. Table comme surface principale, colonnes alignées et séparateurs sobres, toolbar de filtres proche des résultats, sélection lisible et barre d'actions en lot au même endroit. Aucun remplacement de la table par des cartes. Les colonnes métier, ordre et raccourcis ne peuvent pas être définis sans documentation actuelle.
- **Densité** : repères descriptifs 2/1/9, hors recette Taste frontend : faible variation, absence de mouvement décoratif, comparaison dense. Inter et taille de ligne actuels servent de départ ; ne réduire ni texte ni cibles arbitrairement. Les nombres peuvent utiliser les chiffres tabulaires disponibles. Les en-têtes persistants sont une candidate à vérifier contre le fonctionnement actuel.
- **Interaction** : annoncer le nombre et la portée de sélection avant l'action ; préciser s'il s'agit des lignes visibles ou de résultats filtrés seulement si le contrat le permet. Le détail du statut cible et l'éligibilité proviennent des contrats existants. Retour du focus et conservation du contexte doivent suivre le parcours validé.
- **États requis** : avertissement avant une opération qui nécessite une décision ; état en cours clairement distinct de la réussite ; succès uniquement après confirmation backend ; erreur contextualisée avec expéditions concernées. Afficher un résultat partiel seulement si le backend distingue les résultats par expédition. Ne proposer ni annulation ni réessai automatique sans garantie contractuelle. Inclure chargement, aucun résultat et filtre invalide.
- **Références** : Taste redesign pour examiner focus, états et points faibles ; rejeter sa priorité de changement de police. IBM pour alignement, surfaces plates et géométrie de table ; Carbon officiel pour les conventions de sélection/actions en lot. IBM reste une analyse marketing, sans preuve des interactions métier. Garder violet, Inter et composants du projet.

À vérifier ensuite : jeu réaliste de 15 000 lignes, stabilité de sélection après filtre, portée réelle des lots, retours backend, clavier validé, lecteur d'écran, contraste et performance. Virtualisation, pagination et filtres locaux/serveur restent des choix techniques à étudier selon le contrat ; aucune performance n'est démontrée ici. Incertitudes : colonnes, statuts, politiques d'erreur partielle, tokens exacts, implémentation actuelle.

Mémoire : [[MOC-UX]] ; [[Design_References]].

````

Références et arbitrages :

````markdown
---
title: Références de design — dispatch logistique
type: spec
status: draft
created: 2026-10-05
updated: 2026-10-05
tags: [ux, references, forward-test]
---

## Sélection pour cet essai

1. **Taste redesign — selected, audit sélectif**. [Source](https://github.com/Leonxlnx/taste-skill/blob/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/skills/redesign-skill/SKILL.md) ; commit `ce26fc25c0e5e8cab638f883de62d9a86ee5e45b` ; original : `D:/WorkflowSkills/ux-design-direction/assets/design-sources/taste/redesign.md`. Copie : `design/references/taste/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/redesign.md`, MIT conservée. Retenir Scan/Diagnose et focus/chargement/erreur. Rejeter priorité « font swap », changement de Lucide, mouvement systématique et remplacement des conventions familières. Le frontend Taste exclut les data tables ; son contrat de page n'est pas retenu. Aucun audit réel de code ni interface effectué dans ce cas fictif.
2. **IBM — selected, propriétés visuelles seulement**. [Analyse](https://github.com/voltagent/awesome-design-md/blob/13be5c05c63be24b57581162364167028020f043/design-md/ibm/DESIGN.md) ; commit `13be5c05c63be24b57581162364167028020f043` ; original : `C:/Users/guillaume/AppData/Local/Temp/workflow-design-research-20261005/awesome-design-md/design-md/ibm/DESIGN.md`. Copie : `design/references/awesome-design-md/13be5c05c63be24b57581162364167028020f043/ibm/DESIGN.md`, MIT conservée. SHA256 concordant : `46f6fd65b5e7524fed1133b9b3c0dd619f9a0f145fbb2b87f3675c701a88f3bd`. Retenir alignement, surfaces plates, séparateurs et distinction accent/états. Adapter en violet/Inter/composants existants ; rejeter IBM Blue, Plex, grands titres de marketing, rayon zéro imposé et nouvelle grille marketing. L'analyse indique elle-même que les tables produit ne sont pas observées.
3. **Carbon officiel — selected, guide de composant**. [Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines), consulté le 2026-10-05 ; ressource vivante sans commit établi ni copie locale. Ses principes de sélection multiple et actions groupées servent de référence comportementale candidate, adaptée aux routes et contrats existants. Aucune installation de Carbon ni changement d'architecture demandé.
4. **Airtable — rejected comme référence de table métier**. [Analyse](https://github.com/voltagent/awesome-design-md/blob/13be5c05c63be24b57581162364167028020f043/design-md/airtable/DESIGN.md), même commit Awesome ; original : `C:/Users/guillaume/AppData/Local/Temp/workflow-design-research-20261005/awesome-design-md/design-md/airtable/DESIGN.md`. Lecture des sections marketing, grille de démonstration, comparaison de tarifs et Known Gaps. Le nom du produit évoque les tables mais le contenu ne démontre pas l'usage par dispatchers ; cards marketing et Haas propriétaire ne répondent pas au brief.

Recherche par alignement, table, densité, sélection et clavier. Les sources ne prouvent ni les interactions actuelles, ni les performances sur 15 000 lignes, ni les résultats partiels backend. Seule la sélection documentaire est validée. Voir [[MOC-UX]] et le DESIGN.md du cas.

````

### C — Android

Contrat proposé :

````markdown
---
title: Direction de design — inventaire Android
type: spec
status: draft
created: 2026-10-05
updated: 2026-10-05
tags: [ux, forward-test, android]
---

## Décisions du projet

Lecture : deux écrans Android opérationnels pour du personnel d'entrepôt portant des gants, avec réseau intermittent, entrée par code-barres et grande taille de texte système. Faits : Kotlin Compose, composants Material existants et marque verte. Les mécanismes de scan et de synchronisation ne sont pas documentés.

- **Système** : reprendre Material et le thème Compose existants, y compris famille typographique, composants et icônes. `brand.green` ne signifie pas automatiquement « synchronisé » ; états explicites distincts du vert de marque. Repères descriptifs 2/1/3 : régularité, mouvement décoratif nul, grands contrôles espacés.
- **Écran 1 — scan** : app bar simple, disponibilité réseau visible, zone de saisie du code-barres avec libellé, action principale largement accessible et retour du dernier événement. Le mode caméra, lecteur matériel ou saisie manuelle reste à préciser ; aucune permission caméra n'est présumée. Afficher le code réellement lu et le contexte disponible, sans inventer des champs d'article.
- **Écran 2 — reprise** : même app bar, mêmes tokens et contrôles ; problème explicite (hors ligne, doublon ou erreur), code concerné, état de traitement réel, action de reprise permise et retour au scan conservant le contexte. La navigation précise utilise les conventions du projet quand elles seront fournies. Ces deux écrans sont des rôles et états, pas de nouvelles routes imposées.
- **Gants et texte** : minimum interactif documenté de 48dp ; hypothèse de départ à tester de 64dp pour les actions principales avec gants, hauteur extensible et séparation des cibles. Respecter la taille système, autoriser plusieurs lignes et le défilement ; ne diminuer ni tronquer un message critique pour conserver un écran fixe. Insets système et clavier ne masquent pas la saisie ou l'action. Les sémantiques Compose doivent être vérifiées. Sources : [Compose](https://developer.android.com/develop/ui/compose/accessibility/api-defaults), [accessibilité Android](https://developer.android.com/guide/topics/ui/accessibility/apps).
- **États** : lu → traitement → confirmé uniquement après réponse réelle ; hors ligne ≠ succès. Une présentation « en attente » est autorisée seulement si une file persistante existe. Doublon : avertissement lisible et choix permis par la politique métier ; erreur : reprise conservant le code. Ne promettre ni sauvegarde locale, ni déduplication, ni synchronisation automatique, ni succès par vibration sans contrat. Le texte porte toujours l'état, même si un retour sonore/haptique sera ajouté.
- **Sources** : Taste mobile pour cohérence entre écrans, mode Android, régions système et lisibilité ; ses directives de texture, illustration, iPhone et icônes originales sont écartées. Aucune entrée Awesome pertinente pour ce travail industriel. Référence principale : composants du projet et documentation Android.

À vérifier ensuite sur matériel réel : scan avec gants, texte système maximal pris en charge, TalkBack, réseau coupé puis rétabli, doublon, erreur et reprise. Incertitudes : appareil, lecteur, politique de doublon, file hors ligne, durabilité, reprise backend, tokens, taille de texte ciblée. Aucune image ni application n'a été produite, aucune saisie ou reprise n'est validée.

Mémoire : [[MOC-UX]] ; [[Design_References]].

````

Références et arbitrages :

````markdown
---
title: Références de design — inventaire Android
type: spec
status: draft
created: 2026-10-05
updated: 2026-10-05
tags: [ux, references, forward-test, android]
---

## Sélection pour cet essai

1. **Taste mobile — selected, portée limitée**. [Source](https://github.com/Leonxlnx/taste-skill/blob/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/skills/imagegen-frontend-mobile/SKILL.md) ; commit `ce26fc25c0e5e8cab638f883de62d9a86ee5e45b` ; original : `D:/WorkflowSkills/ux-design-direction/assets/design-sources/taste/imagegen-mobile.md`. Copie : `design/references/taste/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/imagegen-mobile.md`, MIT conservée. Sections utilisées : Platform Mode, Multi-Screen Consistency, Logical Flow, Safe Area, Navigation, Text Size and Readability. Retenir Android, cohérence des deux écrans et lisibilité ; adapter à Material existant, gants et grands textes. Écarter iPhone par défaut, décorations, illustrations, polices ou icônes remplacées pour paraître originales. C'est une référence d'image, pas un contrat Kotlin, hors ligne ou barcode ; aucune image n'est générée pour cet essai documentaire.
2. **Android Developers — selected, source principale de plateforme**. [API defaults Compose](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) et [Make apps more accessible](https://developer.android.com/guide/topics/ui/accessibility/apps), consultés le 2026-10-05. Ressources vivantes sans commit établi ni copie locale. Utiliser composants Material, sémantiques, cibles minimales documentées et texte adaptable. L'hypothèse 64dp pour les actions avec gants appartient à ce projet d'essai et exige une validation physique ; ce n'est pas une garantie Android pour les gants.
3. **Awesome DESIGN.md — aucune sélection**. Catalogue épinglé à `13be5c05c63be24b57581162364167028020f043`. Recherche dans `C:/Users/guillaume/AppData/Local/Temp/workflow-design-research-20261005/awesome-design-md/design-md/` par Android, inventory, warehouse, gloves, barcode, offline. Les résultats concernent surtout l'inventaire automobile, des badges de téléchargement Android ou un inventaire de composants. Aucun comportement industriel adéquat.
4. **Expo — rejected**. [Analyse](https://github.com/voltagent/awesome-design-md/blob/13be5c05c63be24b57581162364167028020f043/design-md/expo/DESIGN.md) ; même commit ; original : `C:/Users/guillaume/AppData/Local/Temp/workflow-design-research-20261005/awesome-design-md/design-md/expo/DESIGN.md`. Lecture de la description, de l'identité et de Known Gaps. Le marketing React Native et les mockups d'appareils ne justifient ni la saisie barcode, ni les grands textes, ni le Compose existant ; aucune propriété adoptée.

Base produit : composants Compose/Material et vert déjà mentionnés dans le brief, sans fichier projet fourni. Les versions, tokens et comportements doivent être obtenus avant un contrat d'implémentation. Aucun émulateur, appareil, TalkBack, réseau intermittent ou scanner réellement testé. Voir [[MOC-UX]] et le DESIGN.md du cas.

````
