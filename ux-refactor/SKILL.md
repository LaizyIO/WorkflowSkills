---
name: ux-refactor
description: Use this skill when the user asks to improve, redesign, modernize, polish, professionalize, audit, or refactor a frontend UI/UX. Trigger for UI, UX, design, layout, visual hierarchy, modern, professional, responsive, accessibility, Tailwind, shadcn, dashboard, form, component, page, or product interface work.
---

# UX Refactor Skill

## Purpose

Improve a frontend screen or component with senior product design judgment while preserving business logic. This skill is for practical UI work in Codex: diagnose what is wrong, align with the existing design system, implement focused changes, and verify the result.

Use this skill for:

- UI modernization or polish
- UX audits before implementation
- SaaS/product page refactors
- Design system consistency fixes
- Responsive and accessibility corrections
- Tailwind/shadcn UI improvements

Do not use this skill for pure branding, illustration, logo creation, or marketing copy unless the UI task explicitly needs it.

## Core Principles

- Clarity over decoration.
- One obvious primary user action per screen.
- Strong visual hierarchy through layout, type, spacing, and contrast.
- Consistent spacing, alignment, component variants, and interaction states.
- Product-focused density: avoid empty marketing-style layouts for operational apps.
- Accessibility is part of visual quality, not a separate cleanup phase.
- Reuse existing components, tokens, CSS variables, and UI libraries before adding new patterns.
- Avoid generic AI-looking UI: random gradients, excessive cards, excessive shadows, low-contrast gray text, decorative icons without purpose, and inconsistent rounded corners.

## Required Workflow

### 1. Inspect First

Before editing, inspect the actual project:

- Framework and styling stack (`package.json`, config files, CSS entrypoints)
- Existing UI library (`components/ui`, shadcn, Radix, MUI, Chakra, Headless UI, custom components)
- Design tokens (`tailwind.config.*`, CSS variables, theme files, token files)
- Nearby screens/components for local visual language
- Current component structure, data flow, and business logic boundaries
- Responsive behavior implied by classes, layout, and breakpoints

Prefer `rg`, `Get-ChildItem`, and direct file reads for discovery.

### 2. Diagnose UX Problems

Identify concrete issues in:

- Information architecture
- Visual hierarchy
- Layout density
- Spacing rhythm
- Alignment
- Typography scale
- Color usage and semantic contrast
- Component consistency
- Affordance and interaction states
- Loading, empty, error, disabled, hover, and focus-visible states
- Accessibility and keyboard behavior
- Responsive behavior

When the user asks for an audit only, stop after diagnosis and recommendations. Do not edit files.

### 3. Define Design Direction

Before coding substantial changes, state a concise direction:

- Screen goal
- Primary action
- Secondary actions
- Layout structure
- Component strategy
- Visual language constraints from the existing app

Keep this short. It should guide implementation, not become a design essay.

### 4. Implement Safely

When editing:

- Preserve business logic, routes, API calls, validation, and state transitions unless the user explicitly asks otherwise.
- Keep changes scoped to the target UI and closely related shared components.
- Prefer existing components and variants.
- Use semantic HTML and accessible form labels.
- Add or repair `hover`, `focus-visible`, `disabled`, `loading`, `empty`, and `error` states where relevant.
- Use a consistent spacing scale, typically 4/8/12/16/24/32/48/64px or the project equivalent.
- Prefer semantic design tokens over hard-coded one-off colors.
- In Tailwind projects, use existing CSS variables and variant utilities before inventing new colors.
- In shadcn projects, prefer local `components/ui` primitives and component composition.
- Add dependencies only when a missing primitive is genuinely needed and consistent with the project.

### 5. Verify

Before finishing, verify what is practical for the project:

- Typecheck/build/lint when available and relevant.
- Browser check for local frontend apps when a dev server target is obvious.
- Responsive scan for mobile and desktop when layout changed.
- Accessibility basics: labels, keyboard focus, contrast, target size, visible errors.
- No obvious layout shifts, clipping, overlap, or text overflow.

If browser verification cannot be run, state why and list the remaining visual risks.

## UI Quality Checklist

- The first viewport clearly communicates where the user is and what they can do.
- The primary action is visually dominant but not noisy.
- Secondary actions are available without competing with the main action.
- Content groups map to user tasks, not arbitrary card boundaries.
- Spacing and typography create rhythm, not scattered decoration.
- Status, error, empty, loading, and disabled states are explicit.
- Controls have visible hover and focus-visible states.
- Text contrast meets WCAG AA targets where practical.
- Touch/click targets are not cramped.
- Mobile layout is designed, not just compressed.

## Prompt Pattern for Internal Use

Use this mental prompt before coding:

```text
Act as a senior product designer and frontend engineer.
Preserve business logic. Improve hierarchy, clarity, spacing, state handling,
accessibility, and consistency with the local design system.
Avoid generic AI UI. Reuse existing components and tokens.
```

## Output

For implementation work, final response should include:

- UX problems fixed
- Design direction applied
- Files changed
- Verification run
- Remaining risks or follow-up recommendations

For audit-only work, final response should include:

- Short diagnosis
- Issues ranked by user impact
- Concrete recommended changes
- What not to change
- Safe implementation plan

## Integration With Workflow Skills

- Use after `feature-research` when a feature has visible UI impact.
- Use during `implementation-planner` to define UI phases and acceptance criteria.
- Use during `feature-implementer` for UI implementation steps.
- Use before `test-plan-generator` to ensure visual, responsive, accessibility, and state scenarios are covered.

## Bundled References

- `references/design-principles.md` - Professional UX/UI principles for Codex work
- `references/prompt-patterns.md` - Prompt patterns for design tasks
- `references/quality-checklist.md` - Verification checklist for UI changes
