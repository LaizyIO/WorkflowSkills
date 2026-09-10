---
name: ux-bootstrap
description: Initialize UX/UI DesignOps memory in a WorkflowSkills project. Use when a project has no UX docs, no DESIGN.md, or needs Codex-ready product design onboarding.
---

# UX Bootstrap Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. If UX docs do not exist inside `[DOC]-*`, create them in `UX_DOCS_ROOT`.
5. Keep `DESIGN.md` at project root as the portable design contract.
6. All persistent documentation must be in French and include YAML frontmatter.
7. Update `00-MOC/MOC-Principal.md` and `00-MOC/MOC-UX.md` when creating new UX documents.

## Goal

Create a repo-native UX/UI operating system without changing product behavior.

## Process

1. Inspect the frontend stack, routes, layouts, components, styling system, tokens, and available tools.
2. Read existing `AGENTS.md`, `DESIGN.md`, CDC, FEAT, ADR, and UX docs when present.
   Establish the relevant product facts: public/expertise, task/frequency, content/volume, use conditions, brand, platforms/inputs and observable success. Cite sources and separate unknowns from evidence. Ask only for missing facts that materially affect the requested work; empty templates do not establish context.
3. Create or update `DESIGN.md` at project root.
4. Create `DOC_ROOT/00-MOC/MOC-UX.md`.
5. Create UX templates in `DOC_ROOT/_Templates/`.
6. Create `UX_DOCS_ROOT` with these folders:
   - `01-Product`
   - `02-Design-System`
   - `03-Interaction`
   - `04-Screens`
   - `05-Components`
   - `06-Flows`
   - `07-Mockups`
   - `08-Audits`
   - `09-Debt`
   - `10-Decisions`
7. Create or update core docs:
   - `01-Product/Product_Context.md`
   - `01-Product/Design_Direction.md`
   - `01-Product/Platform_Profile.md`
   - `01-Product/UX_Principles.md`
   - `01-Product/UI_Principles.md`
   - `01-Product/Anti_Slop_Vocabulary.md`
   - `02-Design-System/Design_Tokens.md`
   - `02-Design-System/Component_Registry.md`
   - `02-Design-System/Accessibility_Rules.md`
   - `03-Interaction/Interaction_Patterns.md`
   - `03-Interaction/Responsive_Adaptive_Rules.md`
   - `03-Interaction/Desktop_Mobile_Patterns.md`
   - `07-Mockups/Mockup_Index.md`
   - `08-Audits/Project_Scan_Report.md`
   - `09-Debt/Visual_Debt.md`
   - `10-Decisions/Decision_Log.md`
8. If `scripts/ux/uxkit-lite.mjs` exists, run `node scripts/ux/uxkit-lite.mjs scan`.
9. Prepare `design/mockups/images` and `design/mockups/references`.

## Rules

- Do not redesign UI in this skill.
- Do not change behavior.
- Do not add dependencies unless explicitly requested.
- Mark uncertain findings as assumptions.
- Preserve existing project decisions. Shared methodology and platform conventions do not prescribe a visual style. For unresolved direction, use the contextual-design reference bundled with ux-mockup-brief when available; record decisions with visible effects and product reasons.
- End with a prioritized next-action list.
- Never use `docs/obsidian` as fallback storage.
