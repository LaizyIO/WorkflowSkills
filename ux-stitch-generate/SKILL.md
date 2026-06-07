---
name: ux-stitch-generate
description: Generate or prepare professional Google Stitch prompts and MCP operations for screen or component exploration.
---

# UX Stitch Generate Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. If UX docs do not exist inside `[DOC]-*`, run or follow `ux-bootstrap`.
5. Read `DESIGN.md` and related screen, component, or flow docs.

## Goal

Create Stitch exploration inputs that produce usable, professional UI variants without AI slop.

## Stitch MCP Usage

Use Stitch MCP tools when available:

- `list_projects` and `get_project` before creating new project context.
- `create_project` only when the user asks for a new Stitch project or no suitable project exists.
- `list_design_systems` before selecting a design system.
- `upload_design_md` and `create_design_system_from_design_md` when syncing `DESIGN.md`.
- `apply_design_system` when a target screen and design system are known.

Current MCP limitations must be stated when relevant: direct screen generation, HTML upload, HTML extraction, React/shadcn conversion, and `stitch-loop` may require the official `google-labs-code/stitch-skills` ecosystem if not exposed in the active MCP.

## Output

- `UX_DOCS_ROOT/07-Stitch/Prompts/[target].md`
- `UX_DOCS_ROOT/07-Stitch/Project_Map.md`
- Optional operational prompt in `design/stitch/prompts/[target].md`

## Rules

- Do not implement code in this skill.
- Do not invent product rules or fake data.
- Include at least two variants when exploring.
- Include strict constraints against generic gradients, decorative cards, fake metrics, and unsupported visual effects.
