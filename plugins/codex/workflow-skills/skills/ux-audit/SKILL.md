---
name: ux-audit
description: Audit a page, flow, feature, or component for UX, UI, interactions, accessibility, responsive behavior, and anti-slop quality before coding.
---

# UX Audit Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. If UX docs do not exist inside `[DOC]-*`, run or follow `ux-bootstrap` before producing persistent UX documentation.
5. Keep `DESIGN.md` at project root as the portable design contract.
6. All persistent documentation must be in French and include YAML frontmatter.
7. Update `00-MOC/MOC-UX.md` when creating or updating UX docs.

## Goal

Find concrete UX/UI problems and produce actionable findings for `feature-research` or `implementation-planner` before coding.

## Required Inputs

- Target route, screen, component, feature, screenshot, or diff.
- `DESIGN.md`.
- Related docs in `UX_DOCS_ROOT`.
- Related CDC, FEAT, ADR, DB, or meeting notes when they exist.
- Existing code.
- Optional selected mockup images or rendered screenshot references.

## Audit Dimensions

1. User goal and primary task.
2. Information architecture.
3. Visual hierarchy and content density.
4. Interaction states and system feedback.
5. Error prevention and recovery.
6. Responsive and adaptive behavior.
7. Accessibility basics and keyboard flow.
8. Component and token consistency.
9. Contextual fit: composition follows the actual content/task, identity choices have project reasons, and components match the data and platform. Repeated standard patterns are not defects by themselves.
10. Impact on implementation plan and test plan.

## Output

Create or update the matching document:

- `UX_DOCS_ROOT/04-Screens/[screen].md`
- `UX_DOCS_ROOT/05-Components/[component].md`
- `UX_DOCS_ROOT/06-Flows/[flow].md`
- `UX_DOCS_ROOT/08-Audits/[target]-Audit.md`

Also update `UX_DOCS_ROOT/09-Debt/Visual_Debt.md`.

Use these sections:

- `Problemes critiques`
- `Quick wins`
- `Corrections structurelles`
- `Impacts implementation-planner`
- `Tests UX requis`

## Rules

- Do not code unless explicitly asked.
- Prioritize issues by user impact.
- For each finding record the source/screen, scenario, observation, consequence, severity and recommended check. Separate aesthetic preference from usability defects and requirement violations.
- Read Product_Context, Design_Direction and Platform_Profile (or existing equivalents). Evaluate the actual target platform, not only desktop/mobile sizes. Distinguish expert inference, rendered evidence and user observations.
- Prefer specific recommendations over generic advice.
- Identify quick wins and structural fixes separately.
- If a feature workflow is active, summarize the UX findings in `FEAT-XXX-Findings.md`.
