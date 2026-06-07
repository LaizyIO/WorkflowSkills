---
name: ux-stitch-brief
description: Prepare a Google Stitch design brief from DESIGN.md, WorkflowSkills docs, and UX DesignOps memory.
---

# UX Stitch Brief Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. If UX docs do not exist inside `[DOC]-*`, run or follow `ux-bootstrap`.
5. Read `DESIGN.md`, related UX docs, CDC, FEAT, and ADR before writing.

## Goal

Create a Stitch-ready brief that preserves product truth, design constraints, and anti-slop rules.

## Stitch MCP Usage

Use Stitch MCP tools when available:

- `list_projects` to find existing projects.
- `get_project` to confirm a selected project.
- `list_screens` to inspect existing screens.
- `list_design_systems` to inspect available systems.

Persist project, screen, and design system IDs in `UX_DOCS_ROOT/07-Stitch/Project_Map.md`.

## Output

Save the brief under `UX_DOCS_ROOT/07-Stitch/Prompts/[target]-brief.md` and optionally mirror an operational prompt under `design/stitch/prompts/`.

## Rules

- Do not invent product logic.
- Do not request decorative AI slop.
- Include user goal, primary task, information hierarchy, state matrix, responsive behavior, accessibility constraints, and anti-slop constraints.
- Document every Stitch project or screen ID used.
