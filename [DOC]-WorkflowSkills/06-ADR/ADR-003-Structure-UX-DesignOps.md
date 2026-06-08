---
title: ADR-003 Structure documentaire UX DesignOps
type: adr
status: approved
created: 2026-06-07
updated: 2026-06-08
decision-date: 2026-06-07
decision-makers:
  - Guillaume
tags:
  - adr
  - ux
  - designops
  - documentation
---

# ADR-003 - Structure documentaire UX DesignOps

## Contexte

Le nouveau Codex UX/UI DesignOps Kit fournit des skills, `DESIGN.md`, des prompts Stitch, un script de scan, et une memoire UX initialement structuree sous `docs/obsidian`.

La Workflow Skills Suite utilise deja `[DOC]-<Project>/` comme source de verite documentaire. Copier ou utiliser `docs/obsidian` comme fallback creerait une seconde source documentaire concurrente.

## Decision

La memoire UX/UI projet doit vivre exclusivement dans:

```text
[DOC]-<Project>/11-UX-DesignOps/
```

Structure cible:

```text
[DOC]-<Project>/
  00-MOC/
    MOC-UX.md
  _Templates/
    TPL-UX-Screen.md
    TPL-UX-Component.md
    TPL-UX-Flow.md
    TPL-UX-Audit.md

11-UX-DesignOps/
  01-Product/
  02-Design-System/
  03-Interaction/
  04-Screens/
  05-Components/
  06-Flows/
  07-Stitch/
  08-Audits/
  09-Debt/
  10-Decisions/
```

Les MOC et templates restent dans les dossiers standards du vault. `11-UX-DesignOps/` contient uniquement les documents de memoire UX/UI.

Les skills UX ne doivent jamais ecrire dans `docs/obsidian` comme fallback. Si aucun dossier `[DOC]-*` n'existe, ils doivent demander l'initialisation de la documentation projet avant de produire une documentation persistante.

La verification UI ne doit pas proposer de mode sans rendu comme workflow normal. Dans Codex, le runtime de verification visuelle par defaut est le Codex Browser plugin. Playwright reste utile quand le projet possede deja une suite E2E, quand le Browser plugin n'est pas disponible, ou quand une preuve automatisee versionnee est explicitement requise.

Le skill source `ux-review-no-playwright` doit etre remplace par un skill de verification visuelle, par exemple `ux-visual-verification`, utilisant le Codex Browser plugin par defaut, Playwright/Storybook si necessaire, ou un outil equivalent de rendu/capture.

## Consequences

### Positives

- Une seule source de verite documentaire: `[DOC]-<Project>/`.
- UX DesignOps devient un domaine documentaire explicite et ordonne.
- Les outputs des skills sont compatibles avec les MOC, frontmatter, tags et conventions WorkflowSkills.
- Les changements UI exigent une verification visuelle reelle.

### Negatives

- Le kit source doit etre adapte avant integration.
- Les templates `clai`, `AGENTS.md` et les skills WorkflowSkills doivent connaitre `11-UX-DesignOps`, `00-MOC/MOC-UX.md`, et les templates UX dans `_Templates/`.

Note 2026-06-07: `source-command-doc-manager` et la commande `/doc-manager` ont ete retires du workflow actif. Voir [[ADR-004-Suppression-doc-manager-workflow]].
- `uxkit-lite.mjs` doit etre modifie pour ecrire son rapport dans le dossier `[DOC]-*/11-UX-DesignOps/08-Audits/`.

### Risques

- Les projets deja initialises avec l'ancien pack global peuvent encore exposer des skills obsoletes localement.
- Si aucun outil de rendu n'est disponible dans un projet, les tests UI seront bloques jusqu'a installation ou configuration de l'outillage. Dans Codex, la configuration du Browser plugin doit etre privilegiee avant d'ajouter Playwright uniquement pour une verification visuelle ponctuelle.

## Alternatives considerees

### `09-Resources/UX`

Rejete. Cette structure est moins visible et melange une memoire UX projet vivante avec des ressources externes.

### `docs/obsidian`

Rejete. Ce chemin cree une seconde source de verite et contredit les conventions WorkflowSkills.

### Mode review sans rendu

Rejete. Une review statique peut aider ponctuellement, mais elle ne doit pas etre formalisee comme workflow de verification UI.

## Liens

- [[FEAT-004-Findings]]
- [[FEAT-004-Skill-Audit]]
- [[MOC-Principal]]
