---
title: FEAT-004 Integration UX DesignOps Kit - Test Plan
type: test
status: completed
created: 2026-06-07
updated: 2026-06-07
feature: FEAT-004
tags:
  - feature-workflow
  - testing
  - ux
  - designops
  - codex
  - clai
  - stitch
---

# FEAT-004 - Test Plan

## Objectif

Verifier que le nouveau workflow UX DesignOps remplace `ux-refactor`, s'integre au plugin Codex, a la CLI `clai`, a la documentation `[DOC]-*`, a Stitch MCP, et impose une verification visuelle pour les changements UI.

## Tests structurels

- [x] Verifier que les 13 skills UX existent en racine.
- [x] Verifier que les 13 skills UX existent dans `plugins/codex/workflow-skills/skills/`.
- [x] Verifier que `ux-refactor` n'est plus expose.
- [x] Verifier que `ux-review-no-playwright` n'est pas expose.
- [x] Verifier que `ux-visual-verification` existe.
- [x] Verifier que les skills UX imposent `[DOC]-*` et `11-UX-DesignOps`.
- [x] Verifier que `source-command-doc-manager` n'est plus expose dans le plugin.
- [x] Verifier que les templates `clai` n'installent plus `/doc-manager`, `doc-manager-agent.md`, ni cache `doc-manager`.

## Tests CLI

- [x] Verifier la syntaxe Node de `clai/src/project.js`.
- [x] Verifier la syntaxe Node de `clai/src/cli.js`.
- [x] Verifier `clai init --help` et la presence de `--no-ux`.
- [x] Executer `clai init Demo --target codex --doc Demo --force --no-ruflo`.
- [x] Verifier la creation de `DESIGN.md`.
- [x] Verifier la creation de `[DOC]-Demo/00-MOC/MOC-UX.md`.
- [x] Verifier la creation de `[DOC]-Demo/_Templates/TPL-UX-*.md`.
- [x] Verifier la creation de `[DOC]-Demo/11-UX-DesignOps/`.
- [x] Executer `clai init DemoNoUx --target codex --doc DemoNoUx --force --no-ruflo --no-ux`.
- [x] Verifier que `--no-ux` ne cree pas les assets UX.
- [x] Executer `clai sync --target codex`.
- [x] Verifier qu'un init Codex temporaire ne contient aucune reference `doc-manager`.

## Tests documentation

- [x] Verifier que `scripts/ux/uxkit-lite.mjs scan` ecrit dans `[DOC]-*/11-UX-DesignOps/08-Audits/Project_Scan_Report.md`.
- [x] Verifier que `scripts/ux/uxkit-lite.mjs scan` ne cree pas `docs/obsidian/Project_Scan_Report.md`.
- [x] Verifier que `MOC-Principal.md` reference `[[MOC-UX]]` dans un projet initialise.
- [x] Verifier que les templates UX restent dans `_Templates`.

## Tests Stitch MCP

- [x] Appeler `list_projects`.
- [x] Appeler `list_design_systems` avec project ID.
- [x] Appeler `list_screens` avec project ID.
- [x] Ne pas appeler les outils create/update/apply sans demande explicite.

## Tests visuels

- [x] Verifier que `ux-visual-verification` impose un outil de rendu.
- [x] Verifier que les skills test/planner/executor ne valident pas une UI par review code-only.
- [x] Verifier que l'absence d'outil de rendu doit produire un blocage.

## Limites connues

- `clai --help` racine affiche l'aide mais ne rend pas la main avant timeout dans cet environnement. `clai init --help` et les commandes ciblees fonctionnent.
- `npm test` du package `clai` reste le script placeholder existant (`Error: no test specified`), donc non utilise comme validation.
