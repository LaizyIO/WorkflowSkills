---
title: ADR-002 Architecture dual-target Claude Codex
type: adr
status: approved
created: 2026-05-17
updated: 2026-05-17
tags:
  - adr
  - architecture
  - clai
---

# ADR-002 - Mode dual-target dans clai

## Contexte
La suite ?tait initialement coupl?e ? Claude (`.claude/`, `CLAUDE.md`).

## D?cision
Introduire une architecture dual-target pilot?e par `--target` dans la CLI:
- target `claude`: flux historique.
- target `codex`: runtime `.codex/`, guide `AGENTS.md`, templates d?di?s.

## Cons?quences
- Maintien de compatibilit? descendante.
- Co?t de maintenance templates/skills pour deux cibles.
- Ruflo limit? ? la cible Claude.
