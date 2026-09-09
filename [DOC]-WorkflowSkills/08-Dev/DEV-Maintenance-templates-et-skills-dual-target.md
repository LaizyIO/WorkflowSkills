---
title: DEV-Maintenance-templates-et-skills-dual-target
type: dev
status: approved
created: 2026-05-17
updated: 2026-09-09
tags:
  - dev
  - codex
  - claude
---

# Conventions de maintenance dual-target

## Templates
- Source historique: `clai/templates/*` pour Claude.
- Cible Codex: `clai/templates/codex/*`.
- Toute commande/agent ajout? c?t? Claude doit ?tre port? c?t? Codex.
- Les templates Codex doivent inclure le guide `AGENTS.md`, les artefacts `.codex/`, `DESIGN.md`, `design/mockups/`, `scripts/ux/`, et la memoire UX dans `[DOC]-*/11-UX-DesignOps/`.
- La verification visuelle Codex doit citer le Codex Browser plugin comme outil par defaut; Playwright reste un outil E2E ou fallback selon le contexte projet.
- Les outils projet communs vivent dans `clai/templates/project/` et doivent etre installes par `clai init` et `clai sync`, quelle que soit la cible.
- Controle mojibake suspendu : ne pas installer ni executer le script. Utiliser `clai remove-mojibake [directory]` pour retirer le controle d'un projet existant. Voir [[DEV-Desactivation-Mojibake]].

## Guides racine
- Claude: `CLAUDE.md`.
- Codex: `AGENTS.md`.
- `clai sync --target codex` doit aussi synchroniser `AGENTS.md`; un fichier qui ne contient qu'un bloc `<claude-mem-context>` doit etre remplace par le guide Codex complet.

## Skills
- Maquettage : utiliser les cinq skills `ux-mockup-brief`, `ux-mockup-generate`, `ux-mockup-iterate`, `ux-code-to-mockup`, `ux-implement-from-mockup`. L'outil image natif Codex produit les maquettes ; la verification navigateur controle l'implementation.
- Conserver les prompts exacts et decisions dans `07-Mockups/Mockup_Index.md`, les images dans `design/mockups/images/`.
- Toute modification d'un skill source doit etre reportee a l'identique dans `plugins/codex/workflow-skills/skills/`.
- Les output styles ne font plus partie des composants installes. Ne pas reintroduire une dependance de service de design externe dans les templates.
- Executer `npm test` dans `clai/` pour verifier init/sync et la preservation des fichiers utilisateurs. Voir [[FEAT-005-Maquettes-Images-Codex]] et [[ADR-005-Maquettes-Images-Codex]].
- Les `SKILL.md` doivent inclure un mapping explicite Claude -> Codex quand primitives diff?rentes.
- Pr?f?rer primitives Codex (`request_user_input`, `spawn_agent`, outillage shell natif).
