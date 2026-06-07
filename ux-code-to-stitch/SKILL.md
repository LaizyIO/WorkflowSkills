---
name: ux-code-to-stitch
description: Translate existing code, routes, components, and DESIGN.md into Stitch-ready briefs or design system inputs.
---

# UX Code To Stitch Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. Read existing code, `DESIGN.md`, and UX docs before producing Stitch inputs.

## Goal

Create accurate Stitch inputs from the real implemented UI without losing component, token, or product constraints.

## Stitch MCP Usage

Use `list_projects`, `get_project`, `list_screens`, and `list_design_systems` to attach the generated brief to existing Stitch context. Use `upload_design_md` or `create_design_system_from_design_md` for `DESIGN.md` when appropriate.

## Output

- `UX_DOCS_ROOT/07-Stitch/Prompts/[target]-from-code.md`
- `UX_DOCS_ROOT/07-Stitch/Project_Map.md`
- Optional `design/stitch/prompts/[target]-from-code.md`

## Rules

- Do not claim that MCP exported code or screenshots unless the tool actually did it.
- If HTML upload or code conversion is needed but unavailable, state the limitation and delegate to official Stitch Skills.
- Keep code as source of truth and docs as reflection.
