---
title: FEAT-002 Migration clai dual-target Claude Codex
type: feature
status: approved
created: 2026-05-17
updated: 2026-05-17
tags:
  - feature-workflow
  - clai
  - codex
  - claude
---

# FEAT-002 - Migration dual-target

## Objectif
Rendre la suite Workflow Skills et `clai init` utilisables avec Claude et Codex.

## Changements cl?s
- Ajout de `--target claude|codex` dans `clai init`.
- Routing des artefacts runtime vers `.claude/` ou `.codex/`.
- G?n?ration guide racine: `CLAUDE.md` (Claude) ou `AGENTS.md` (Codex).
- Ajout templates Codex dans `clai/templates/codex/`.
- Conversion des SKILL.md vers primitives Codex (`request_user_input`, `spawn_agent`).
- Ruflo conserv? Claude-only avec garde-fou explicite en contexte Codex.
