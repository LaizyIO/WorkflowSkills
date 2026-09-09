---
name: ux-design-sync
description: Synchronize DESIGN.md, UX DesignOps docs, mockup references, visual debt, and implementation reality after UI changes.
---

# UX Design Sync Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. Read current code before updating docs. Code is source of truth; documentation is reflection.

## Goal

Keep UX documentation, `DESIGN.md`, mockup metadata, and implemented UI aligned.

## Process

1. Read changed UI files, tokens, components, routes, and tests.
2. Compare code with `DESIGN.md` and UX docs.
3. Update screen, component, flow, decision, visual debt, and mockup index docs.
4. Update frontmatter `updated` dates.
5. Update `MOC-UX.md` and `MOC-Principal.md` when new docs are created.
6. Verify that referenced mockup images exist locally and distinguish proposed designs from implemented screens.

## Image references

Update 07-Mockups/Mockup_Index.md with selected image paths, exact prompts, route/component mapping, implementation status and intentional deviations. Keep rendered application screenshots separate from generated mockups.

## Rules

- Documentation content must be in French.
- Do not invent implementation details absent from code.
- Archive obsolete UX docs if the related code no longer exists.
