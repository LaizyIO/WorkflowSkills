---
title: FEAT-007 Sources de design - Test Results
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

# Résultats techniques

## Suite CLI

`node --test clai/test/*.test.js` : **24 tests réussis, aucun échec, aucun skip**. Les 15 tests précédents restent verts ; 9 couvrent les nouvelles sources :

- catalogue figé, IDs/chemins valides, filtre et sortie CLI hors ligne ;
- installation Taste, intégrité, idempotence et conservation du contrat et des références personnalisées ;
- conflit local détecté avant création des snapshots manquants ;
- import des octets réels du DESIGN.md IBM de la révision auditée, inscription comme candidate, provenance et licence, MOC conservés et complétés ;
- réutilisation hors ligne et idempotence des inscriptions ;
- rejet d'ID inconnu, vault absent/ambigu avant téléchargement, sélection explicite du vault ;
- refus d'un téléchargement corrompu ou d'une source locale modifiée, sans réécriture des documents ;
- refus des liens/jonctions et des liens pendants vers une destination extérieure ;
- init et sync Codex : source Taste installée, méthode ancrée, documents personnalisés préservés, aucune marque sélectionnée automatiquement.

Le fixture IBM et la notice MIT proviennent de la révision Awesome déclarée dans le manifest. Les empreintes des **4 fichiers Taste et 74 DESIGN.md Awesome** ont également été comparées aux blobs Git exacts des deux commits, pour éliminer un éventuel effet des fins de ligne Windows. `.gitattributes` conserve les octets de ces copies et fixtures.

## Installation et imports réseau réels

Un projet temporaire a reçu un DESIGN.md existant (« purple; no motion ») et un vault `[DOC]-Test`. Installation des 4 références Taste et de leur licence, puis téléchargements HTTPS de :

| Référence | Octets | Résultat |
| --- | ---: | --- |
| IBM | 26 481 | SHA-256 conforme, candidate inscrite |
| Notion | 35 176 | SHA-256 conforme, candidate inscrite |
| Airbnb | 30 517 | SHA-256 conforme, candidate inscrite |

Le DESIGN.md existant est resté identique. Les commandes CLI réelles `design install` et `design import ibm` ont ensuite réussi sur ce même projet ; l'import a réutilisé la copie vérifiée. Aucun plugin global ni cache Codex utilisateur n'a été modifié par ces essais.

## Distribution

- **25 skills** validés avec `skill-creator/scripts/quick_validate.py`.
- Parité source/plugin de toutes les instructions et ressources vérifiée par la suite existante, nouveau skill compris ; snapshots/manifest CLI conformes aux sources canoniques.
- `node --check` sur les modules CLI modifiés : réussi.
- `npm pack --dry-run --json` dans `clai/` : **103 fichiers**, module et assets de design inclus, tests exclus, package `@glamazere/clai` **1.4.0**. Aucune publication npm.
- `git diff --check` : réussi.

## Évaluation du skill

Une passe indépendante utilise le nouveau skill sur trois demandes fictives contrastées (site d'exposition, produit logistique dense, inventaire Android). Les résultats et artefacts sont consignés dans [[FEAT-007-Forward-Test]]. Il s'agit de décisions documentaires produites avec le skill, pas de captures d'une application.

Résultat relu : site photo/réservation avec palette fournie et mouvement faible ; table logistique conservant violet/Inter/Lucide/clavier et états sémantiques ; Android conservant Compose/Material et l'incertitude des mécanismes hors ligne. Airbnb et IBM apportent des propriétés adaptées ; aucune référence du catalogue n'est forcée pour le scan industriel. Les licences et la provenance sont tracées. La lecture sélective résout le volume du snapshot mobile ; aucune correction du routage n'a été justifiée par cet essai.

## Limites

Ces tests démontrent l'intégration, la provenance, la préservation et le comportement de sélection des sources. Ils ne démontrent pas un gain esthétique, la réussite d'une tâche par des utilisateurs, les performances d'un frontend ou sa conformité d'accessibilité. Aucun écran implémenté ou mockup généré n'a été présenté comme une preuve de ces qualités. Les projets réels doivent poursuivre le workflow jusqu'au rendu et à la vérification des tâches sur chaque plateforme.

Versions préparées localement : plugin **1.7.0**, CLI **1.4.0**. Commit, push, actualisation du plugin et publication npm sont des opérations distinctes.
