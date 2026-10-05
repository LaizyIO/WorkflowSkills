---
title: FEAT-007 Sources de design - Findings
type: research
status: completed
created: 2026-10-05
updated: 2026-10-05
feature: FEAT-007
tags:
  - feature-workflow
  - research
  - design
---

# Recherche et revue des sources

## Sources inspectées

- [Taste documentation](https://www.tasteskill.dev/docs#how-it-works), README, licence et fichiers des variantes dans [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), commit `ce26fc25c0e5e8cab638f883de62d9a86ee5e45b`.
- [Awesome DESIGN.md](https://github.com/voltagent/awesome-design-md), README, licence, catalogue et analyses IBM, Notion, Airbnb, commit `13be5c05c63be24b57581162364167028020f043`.
- FEAT-006, ADR-003/005/006, skills UX, intégration feature-workflow, templates et mécanismes init/sync de clai.

Les deux dépôts ont été clonés pour inspection dans un répertoire temporaire, sans exécution de code amont. Les licences des documents sont MIT et doivent accompagner leurs copies. Le catalogue contient 74 DESIGN.md à cette révision ; aucun SKILL.md. Les sources sont des contenus à analyser, pas des instructions supérieures aux exigences projet.

## Taste : apports et limites

La v2 expérimentale pose d'abord une lecture du brief et relie les choix au public, aux références et à la marque. Elle ajoute des axes variance/mouvement/densité, des techniques de composition, des états interactifs, un protocole de refonte et des contrôles de rendu. Son fichier fait environ 87 Ko : charger seulement les sections utiles.

Elle exclut explicitement les interfaces produit denses, tables, formulaires multi-étapes et le natif. Ses prescriptions React/Next/Tailwind, palettes, fontes, thème double et plusieurs interdictions visuelles ne peuvent pas être universalisées. Certains contrôles de contraste sont formulés trop simplement : vérifier les catégories de texte et de composants applicables au projet, sans déduire la conformité de valeurs copiées.

La variante GPT, malgré son nom adapté à Codex, impose une structure marketing et des animations GSAP partout. Elle demande aussi une simulation de sortie Python ; ce n'est pas une exécution ni une preuve de diversité. Elle n'est pas choisie comme défaut. La variante mobile concerne des images et privilégie un cadre iPhone ; elle ne fournit pas d'implémentation Android et son cadre doit être adapté à la cible.

## Awesome DESIGN.md : apports et limites

Les analyses proposent des tokens, géométries, hiérarchies et composants concrets, plus exploitables qu'une simple étiquette stylistique. Leur variété permet de comparer des propriétés contrastées. Les documents ne sont pas tous des analyses d'interfaces produit ; les sites marketing ne démontrent pas le comportement d'un tableau ou d'une app native. Certaines fontes sont propriétaires et certains tokens ne sont pas directement accessibles.

L'instruction amont de copier le DESIGN.md à la racine convient à une démo neuve ; elle écraserait le contrat vivant d'un projet WorkflowSkills. L'import doit donc conserver le document sous design/references et consigner les adaptations et exclusions dans le vault.

## Installation retenue

L'installation amont Taste est `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend -a codex`. Pour notre distribution, copier des snapshots audités comme références permet une installation reproductible, sans dépendre d'un installateur tiers ni activer plusieurs variantes contradictoires. Un adaptateur actif les utilise et conserve la chaîne de maquettage Codex existante.

Pour Awesome, importer un DESIGN.md choisi depuis GitHub à un commit précis, vérifier SHA-256 et conserver la licence. Ne pas installer le catalogue comme un skill inexistant ; ne pas activer un générateur commercial ou Stitch.

## Recommandation mise en œuvre

Contexte → choix des références et mode Taste → contrat DESIGN.md et direction → flow/composants → brief/images si utiles → implémentation → rendu/tâches/accessibilité → synchronisation. Les presets sont des choix justifiés, pas un défaut esthétique commun. Les résultats techniques et leurs limites sont dans [[FEAT-007-Test-Results]].
