---
name: ux-polish
description: Apply a focused UI polish pass while preserving behavior, design system consistency, accessibility, and WorkflowSkills docs.
---

# UX Polish Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. Read `DESIGN.md`, related UX docs, and current code.

## Goal

Improve visual quality, clarity, interaction feedback, and consistency without changing business behavior.

## Process

1. Identify the target surface and current issue.
2. Read components, tokens, theme resources and the existing state catalog for the target stack (CSS/Tailwind on web when present, native styling resources on native targets).
3. Make focused changes to spacing, hierarchy, alignment, states, typography, contrast, and motion.
4. Preserve behavior, data flow, APIs, validation, and routing.
5. Update `UX_DOCS_ROOT/09-Debt/Visual_Debt.md` and related screen/component docs.
6. Run or trigger `ux-visual-verification`.

## Rules

- Keep changes small and reviewable.
- Preserve the selected direction and relevant platform conventions. If the problem requires different information architecture or components, report the structural need and route to ux-flow/ux-component-spec or a revised brief within the user's authorized scope; polish alone cannot resolve it.
- Use existing tokens and components.
- Do not create one-off styling unless documented as a deliberate exception.
- Do not use generic AI visual patterns without product rationale.
- Visual verification is mandatory for UI changes.


## Taste and design references

Reuse the direction and source decisions in Design_References through ux-design-direction. Apply Taste redesign checks selectively; do not change fonts, palette, icons, navigation or motion solely because the upstream audit dislikes their defaults.
