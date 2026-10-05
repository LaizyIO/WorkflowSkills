---
name: ux-storybook
description: Use Storybook as a UI state catalog for component specification, visual QA, and WorkflowSkills UX documentation.
---

# UX Storybook Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first before writing persistent UX documentation.
4. Read `DESIGN.md`, component docs, existing stories, and component code.

## Goal

Use Storybook when present to document, test, and verify UI component states.

## Process

1. Detect Storybook config and existing stories.
2. Map component docs to required stories.
3. Recommend or create stories for core states when implementation is requested.
4. Use Storybook as a rendered target for `ux-visual-verification` when possible.
5. Update `UX_DOCS_ROOT/05-Components/[component].md`.

## Rules

- Storybook is useful but optional unless the project already relies on it.
- This skill covers Storybook, not every native state catalog. If the project uses native previews or another catalog, retain it and route its target to ux-visual-verification; runtime flows still need runtime evidence.
- Do not add Storybook dependencies unless explicitly requested.
- Cover loading, error, empty, disabled, focus, selected, and responsive variants where relevant.
- Web Storybook verification requires actual browser rendering; do not treat web stories as proof of a separate native runtime.


## Taste and design references

Include the adopted reference properties and documented exceptions from Design_References in relevant stories. Taste source checks do not replace behavioral, accessibility or native runtime verification.
