---
name: ux-implement-from-stitch
description: Implement a selected Stitch direction into an existing frontend while preserving app logic, architecture, components, and WorkflowSkills documentation.
---

# UX Implement From Stitch Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. Read `DESIGN.md`, related UX docs, selected Stitch context, and implementation plan.

## Goal

Translate a selected Stitch visual direction into maintainable project code.

## Process

1. Identify the selected Stitch project, screen, variant, and rationale.
2. Read existing components, tokens, routes, data flow, and tests.
3. Preserve business logic, APIs, routing, validation, state management, and accessibility contracts.
4. Reuse project components and design tokens.
5. Implement the UI direction without pasting raw Stitch HTML when the project has reusable architecture.
6. Update UX docs, decision log, and visual debt.
7. Trigger `ux-visual-verification`.

## Stitch MCP Usage

Use `get_project`, `list_screens`, `list_design_systems`, and `apply_design_system` when available to confirm context before implementation.

## Rules

- Do not change backend contracts unless the feature plan explicitly requires it.
- Do not introduce decorative UI that is not justified by the Stitch decision and `DESIGN.md`.
- Do not finish a UI implementation without visual verification or an explicit blocked status.
