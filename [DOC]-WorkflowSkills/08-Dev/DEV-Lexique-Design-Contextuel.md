---
title: Lexique de design contextuel pour les briefs IA
type: dev
status: review
created: 2026-09-10
updated: 2026-09-10
tags:
  - design
  - vocabulary
  - prompting
---

# Lexique de design contextuel pour les briefs IA

## Utilisation

Proposition issue de [[DEV-Audit-Skills-Design-Contextuel]]. Les expressions anglaises servent à rechercher des références et à préciser un brief ; ce ne sont pas des commandes garanties du modèle. Certains termes sont des concepts établis, d'autres des formulations descriptives. Ils ne constituent pas une taxonomie normative.

Choisir seulement les termes qui répondent au contexte. Pour chacun, écrire : **terme → traduction visible → raison → limite → vérification**. Ne pas transformer cette liste en un prompt exhaustif.

## Comprendre l'usage avant le style

| Terme | Traduction exploitable | Limite / contrôle |
|---|---|---|
| Context of use | Préciser lieu, appareil, attention disponible, réseau et conditions de travail. | Ne pas inventer des observations de terrain. |
| Jobs to be done | Décrire le progrès que la personne cherche à accomplir dans une situation. | Un cadre de questionnement, pas une preuve utilisateur. |
| Mental model | Organiser les objets et actions dans le langage que le public comprend. | Vérifier les libellés et l'ordre des étapes. |
| Task-oriented navigation | Mettre les destinations utiles au parcours à portée. | Ne pas recopier automatiquement l'organigramme métier. |
| Information scent | Nommer un lien pour permettre d'anticiper sa destination. | Vérifier la compréhension, pas seulement la longueur du label. |
| Progressive disclosure | Montrer les choix avancés au moment où ils deviennent utiles. | Ne pas cacher une action fréquente ou une information nécessaire. |
| Recognition over recall | Présenter les options et leur contexte au lieu d'exiger une mémorisation. | Éviter les icônes ambiguës sans libellé. |
| Glanceability | Faire repérer rapidement l'état et la prochaine action. | Ne pas réduire toutes les informations à des badges. |
| Information density | Ajuster l'information visible à la tâche et au mode d'entrée. | Densité ne signifie pas police minuscule. |
| Error recovery | Préserver la saisie et rendre la correction explicite. | Vérifier un scénario d'échec réel. |

Ces notions complètent les principes orientés besoins de [GOV.UK](https://www.gov.uk/guidance/government-design-principles). Pour les indices de navigation, voir [Information scent, NN/g](https://www.nngroup.com/articles/information-scent/).

## Composition et typographie

| Terme | Instruction observable | Contexte / limite |
|---|---|---|
| Content-led layout | Choisir la structure en fonction des informations, de leurs relations et de leur priorité. | Éviter la succession automatique hero/cartes/témoignages. |
| Visual hierarchy | Donner une dominance à l'information nécessaire à la prochaine action. | Un titre géant ne doit pas repousser le travail utile. |
| Asymmetric balance | Équilibrer des zones de proportions différentes autour d'un contenu dominant. | L'asymétrie doit rester compréhensible sur petit écran. |
| Modular grid | Aligner textes, images et commandes sur des colonnes cohérentes. | Ne pas forcer tous les écrans à partager le même assemblage. |
| Visual rhythm | Alterner densité, espacements et proportions selon les séquences de contenu. | Éviter les variations arbitraires. |
| Negative space | Utiliser l'espace libre pour séparer et hiérarchiser. | Garder les contenus nécessaires accessibles sans défilement inutile. |
| Optical alignment | Ajuster visuellement icônes, chiffres et texte pour un alignement perçu juste. | Vérifier avec le rendu et plusieurs contenus. |
| Microtypography | Soigner interlignage, largeur de lecture, césures et espaces. | Vérifier les langues et textes longs prévus. |
| Tabular numerals | Aligner les chiffres comparables dans les données. | Réserver aux valeurs dont la comparaison le justifie. |
| Type-driven design | Utiliser une composition typographique comme signature. | Préserver une police de lecture confortable. |
| Restrained palette | Limiter les rôles colorés et les définir sémantiquement. | Une palette limitée peut rester expressive ; statut et marque ont des rôles distincts. |

## Identité et directions artistiques

| Terme / famille | Caractéristiques possibles | Usage conditionnel |
|---|---|---|
| Brand personality | Traduire le ton de la marque en contrastes, images, rythme et langage. | « Sérieux » ou « chaleureux » doit recevoir une traduction précise. |
| Art direction | Relier composition, typo, images et mouvement dans une intention cohérente. | Ne pas se limiter à une palette. |
| Swiss / International Typographic Style | Grille structurée, hiérarchie typographique et géométrie. | Option à choisir, pas style par défaut des outils métier. |
| Editorial design | Relations entre titres, textes, images, légendes et séquences de lecture. | Convient aux contenus narratifs ; à adapter aux tâches transactionnelles. |
| Humanist typography | Formes de lettres ouvertes et caractère moins mécanique. | Tester la fonte réelle et sa couverture linguistique. |
| Expressive typography | Contrastes ou compositions de titres assumés. | Réserver les effets aux zones où ils servent la lecture et l'identité. |
| Neo-brutalism | Aplats, contours marqués et ombres franches. | Ne prouve aucune supériorité d'usage. |
| Analog collage / Materiality | Découpes, textures et traitements rappelant des matériaux. | Pertinence du sujet, poids des images et lisibilité à contrôler. |
| Cinematic | Cadrage, séquence et mouvement donnant une narration visuelle. | Respecter performance, réduction du mouvement et accès direct au contenu. |
| Playful | Ton, formes et feedback exprimant le jeu. | Ne pas infantiliser le public ni rendre les commandes opaques. |
| Signature visual motif | Motif, traitement d'image ou composition récurrente propre au projet. | Une piste possible ; ne pas imposer un motif décoratif à toute application. |

La première recherche dans la tâche Design fournit d'autres exemples de familles. L'article [Anthropic](https://claude.com/blog/improving-frontend-design-through-skills) illustre l'intérêt de consignes visuelles précises ; le choix final reste à justifier et à évaluer sur le projet.

## Interaction, contenu et plateformes

| Terme | Traduction exploitable | Contrôle |
|---|---|---|
| List-detail | Relier une collection à son élément consulté. | Préserver sélection et contexte lors du passage entre un ou plusieurs panneaux. |
| Searchable selection | Aider à retrouver un choix parmi un ensemble conséquent. | Chargement, aucun résultat, sélection et effacement accessibles. |
| Bulk actions | Agir sur plusieurs éléments avec une portée explicite. | Vérifier nombre, sélection hors page et conséquences selon les règles produit. |
| Inline validation | Placer une aide à la correction près de la saisie. | Moment d'affichage et restitution accessibles. |
| Content design | Écrire les labels, aides et messages à partir du besoin. | Pas de métriques fictives ou de textes génériques dans une livraison réelle. |
| Purposeful motion | Utiliser le mouvement pour expliquer un changement d'état. | Ne pas retarder une tâche répétitive ; prévoir réduction du mouvement. |
| Adaptive layout | Changer présentation et organisation selon l'espace et les entrées. | Ne pas simplement rétrécir l'écran desktop. |
| Platform conventions | Employer les commandes et comportements attendus sur la cible. | Contrôles réels, retour système et accessibilité de la plateforme. |
| Touch ergonomics | Mettre les commandes courantes à une portée et une taille adaptées. | Vérifier sur l'appareil et avec le contenu prévus. |

Les [guides Android](https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout?hl=en) et les [HIG Apple](https://developer.apple.com/design/human-interface-guidelines?lang=en) cadrent les adaptations propres aux plateformes. Les [tables Carbon](https://carbondesignsystem.com/components/data-table/usage/) et le [pattern combobox W3C](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) aident à préciser certains contrats d'interaction, sans imposer leur bibliothèque.

## Exemples de briefs conditionnels

Ces exemples sont fictifs et montrent une méthode ; ils ne prescrivent pas un style à un secteur.

| Projet et hypothèse d'usage | Direction plausible | Conséquence concrète |
|---|---|---|
| Outil B2B, opérateurs experts comparant des dossiers quotidiennement | Information density + list-detail + tabular numerals | Comparaison alignée, filtres proches des résultats, actions de lot documentées. |
| Site culturel dont l'identité s'appuie sur des archives photographiques | Editorial + type-driven + image-led | Séquences éditoriales, légendes lisibles et photographie authentique dominante. |
| Commerce où la comparaison des variantes détermine l'achat | Content-led + product photography + clear hierarchy | Attributs comparables, disponibilité et prix lisibles, sélection explicite. |
| Android de terrain avec interruptions et réseau variable | Glanceability + adaptive layout + error recovery | Action principale accessible, état de synchronisation visible et saisie conservée. |
| Service grand public utilisé rarement | Recognition over recall + progressive disclosure | Libellés explicites, choix limités à chaque étape et récapitulatif compréhensible. |

## Contrat de brief proposé

1. **Faits :** public, tâche, plateforme, données, contraintes et sources.
2. **Inconnues :** questions qui modifieraient substantiellement les choix.
3. **Priorité :** résultat utilisateur recherché et moyen de le vérifier.
4. **Direction :** intention et quelques termes traduits en décisions visibles.
5. **Références :** propriété recherchée pour chaque référence, éléments à ne pas reprendre.
6. **Interaction :** composants, états, adaptation et comportement natif si pertinent.
7. **Invariants :** marque, règles métier, accessibilité et architecture autorisée.
8. **Exclusions :** quelques automatismes inadaptés à ce projet, avec leur raison.
9. **Preuves :** proposition visuelle si nécessaire, puis rendu et parcours réels.

Exemple de formulation : « La tâche est de comparer les dossiers avant validation. Utiliser une densité permettant de comparer leurs attributs, avec des chiffres alignés et les anomalies nommées près des données concernées. Conserver les cibles accessibles au toucher. Vérifier que la comparaison et la correction d'une erreur restent possibles avec le texte agrandi. »

Le contrôle final demande pourquoi chaque choix convient au produit. Changer le logo doit laisser apparaître les particularités du contenu et des usages ; ce test exploratoire n'interdit pas le partage de patterns standard entre produits.
