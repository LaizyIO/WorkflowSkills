---
title: DEV-Maintenance-templates-et-skills-dual-target
type: dev
status: approved
created: 2026-05-17
updated: 2026-05-17
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

## Guides racine
- Claude: `CLAUDE.md`.
- Codex: `AGENTS.md`.

## Skills
- Les `SKILL.md` doivent inclure un mapping explicite Claude -> Codex quand primitives diff?rentes.
- Pr?f?rer primitives Codex (`request_user_input`, `spawn_agent`, outillage shell natif).
