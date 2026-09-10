---
name: ux-flow
description: Define user flows, state matrices, edge cases, and UX acceptance criteria for a UI feature before implementation.
---

# UX Flow Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. If UX docs do not exist inside `[DOC]-*`, run or follow `ux-bootstrap`.
5. Read `DESIGN.md`, CDC, FEAT, ADR, and related UX docs before writing.
6. All persistent documentation must be in French and include YAML frontmatter.

## Goal

Turn a UI feature request into a clear flow document usable by `feature-specification`, `feature-research`, and `implementation-planner`.

## Process

1. Identify user goal, entry point, primary task, secondary tasks, and exit point.
2. Map happy path, alternative paths, blocked paths, and recovery paths.
3. Define required states: loading, empty, error, success, permission, disabled, offline or network if relevant.
4. Define adaptation for supported platforms, input methods and window/device configurations. Include interruptions, offline recovery and cross-device continuity only when relevant to the product.
5. Define keyboard/focus and native navigation/accessibility requirements as applicable. Use the user's mental model and task frequency to choose navigation and disclosure.
6. Define UX acceptance criteria and test implications.
7. Save the output under `UX_DOCS_ROOT/06-Flows/`.

## Output

Create or update `UX_DOCS_ROOT/06-Flows/[flow].md` with frontmatter:

```yaml
---
title: UX Flow - Nom flow
type: ux-flow
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
feature:
tags:
  - ux
  - flow
---
```

## Rules

- Do not implement UI in this skill.
- Do not invent product rules absent from CDC or FEAT docs.
- If product rules are missing, list open questions explicitly.
- Update `DOC_ROOT/00-MOC/MOC-UX.md`.
