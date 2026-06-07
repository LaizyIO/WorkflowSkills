---
title: ADR-004 Suppression du doc-manager du workflow actif
type: adr
status: accepted
created: 2026-06-07
updated: 2026-06-07
tags:
  - adr
  - workflow-skills
  - codex
  - documentation
---

# ADR-004 - Suppression du doc-manager du workflow actif

## Contexte

La Workflow Skills Suite exposait un skill `source-command-doc-manager` et des commandes/templates `/doc-manager` pour generer automatiquement la documentation Obsidian depuis une conversation.

Avec FEAT-004, la synchronisation documentaire UX est maintenant portee par les skills du workflow eux-memes, notamment `ux-design-sync`, les phases documentaires du `feature-implementer`, et les plans d'implementation. Conserver un skill/commande `doc-manager` separe creerait une deuxieme voie de synchronisation.

## Decision

Supprimer completement le skill `source-command-doc-manager` du workflow actif et retirer la commande `/doc-manager` des templates installes.

Sont retires:

- `source-command-doc-manager/`
- `plugins/codex/workflow-skills/skills/source-command-doc-manager/`
- `clai/templates/commands/doc-manager.md`
- `clai/templates/codex/commands/doc-manager.md`
- `clai/templates/agents/doc-manager-agent.md`
- `clai/templates/codex/agents/doc-manager-agent.md`
- `clai/templates/cache/doc-manager/`
- `clai/templates/codex/cache/doc-manager/`

## Consequences

- La documentation reste obligatoire, mais elle est maintenue par les phases explicites des skills feature et UX.
- `ux-design-sync` devient le point de synchronisation dedie pour la documentation UX.
- Les projets initialises par `clai` ne recevront plus `/doc-manager`.
- Les references historiques dans d'anciens rapports peuvent rester comme contexte, mais elles ne decrivent plus le workflow actif.
