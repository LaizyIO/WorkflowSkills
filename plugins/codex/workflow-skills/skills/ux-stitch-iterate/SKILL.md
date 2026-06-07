---
name: ux-stitch-iterate
description: Iterate an existing Stitch design using project and screen context, UX docs, decisions, and anti-slop constraints.
---

# UX Stitch Iterate Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. Read `DESIGN.md`, `UX_DOCS_ROOT/07-Stitch/Project_Map.md`, and related UX docs.

## Goal

Improve an existing Stitch direction while preserving product context and documented decisions.

## Stitch MCP Usage

Use `get_project` and `list_screens` when project ID is known. Use `list_design_systems` and `apply_design_system` when a design system must be checked or applied.

## Output

Update:

- `UX_DOCS_ROOT/07-Stitch/Project_Map.md`
- `UX_DOCS_ROOT/10-Decisions/Decision_Log.md`
- `UX_DOCS_ROOT/07-Stitch/Prompts/[target]-iteration.md`

## Rules

- Do not treat Stitch output as source of truth.
- Preserve `DESIGN.md` and WorkflowSkills docs as constraints.
- Record selected variant, rejected directions, and rationale.
- If MCP cannot perform the requested operation, document the manual Stitch step or delegate to official Stitch Skills.
