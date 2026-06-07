---
name: ux-design-sync
description: Synchronize DESIGN.md, UX DesignOps docs, Stitch mappings, visual debt, and implementation reality after UI changes.
---

# UX Design Sync Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. Read current code before updating docs. Code is source of truth; documentation is reflection.

## Goal

Keep UX documentation, `DESIGN.md`, Stitch metadata, and implemented UI aligned.

## Process

1. Read changed UI files, tokens, components, routes, and tests.
2. Compare code with `DESIGN.md` and UX docs.
3. Update screen, component, flow, decision, visual debt, and Stitch project map docs.
4. Update frontmatter `updated` dates.
5. Update `MOC-UX.md` and `MOC-Principal.md` when new docs are created.
6. If Stitch context exists, verify IDs with MCP tools when available.

## Stitch MCP Usage

Use `list_projects`, `get_project`, `list_screens`, `list_design_systems`, `upload_design_md`, `create_design_system_from_design_md`, and `apply_design_system` when the sync concerns Stitch project or design system state.

## Rules

- Documentation content must be in French.
- Do not invent implementation details absent from code.
- Archive obsolete UX docs if the related code no longer exists.
