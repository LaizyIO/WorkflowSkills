---
name: ux-component-spec
description: Specify reusable UI components, states, accessibility, responsive behavior, tokens, and implementation constraints before coding.
---

# UX Component Spec Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. If UX docs do not exist inside `[DOC]-*`, run or follow `ux-bootstrap`.
5. Read `DESIGN.md`, existing components, tokens, Storybook if present, and related UX docs.
6. All persistent documentation must be in French and include YAML frontmatter.

## Goal

Create a component contract before implementation or refactor.

## Process

1. Identify the component role, users, context, and parent flows.
2. Define props or inputs at a behavioral level without inventing backend contracts.
3. Define visual states, validation states, loading, disabled, selected, empty, and error variants.
4. Define keyboard, focus, labels, ARIA needs, and motion constraints.
5. Define responsive behavior and layout constraints.
6. Map required tokens and existing components to reuse.
7. Save the output under `UX_DOCS_ROOT/05-Components/`.

## Output

Create or update `UX_DOCS_ROOT/05-Components/[component].md` with frontmatter:

```yaml
---
title: UX Component - ComponentName
type: ux-component
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
component: ComponentName
tags:
  - ux
  - component
---
```

## Rules

- Do not code unless explicitly asked.
- Prefer existing components and tokens.
- If Storybook exists, include story coverage recommendations.
- Update `DOC_ROOT/00-MOC/MOC-UX.md`.
