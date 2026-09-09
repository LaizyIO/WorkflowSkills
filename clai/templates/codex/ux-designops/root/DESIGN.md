# DESIGN.md

## Role

This file is the portable design contract for Codex and frontend agents.

For any user-visible change, treat the interface as a product workflow first and a visual surface second. Preserve business logic, routes, APIs, validation, and existing component architecture unless the feature plan explicitly says otherwise.

## Product Context

- User goal must be explicit before UI implementation.
- Primary task must be visible and efficient.
- Secondary tasks must not compete with the primary task.
- Empty, loading, error, success, disabled, permission, and offline states must be designed when relevant.

## Visual Principles

- Prefer clarity, content hierarchy, and scan efficiency over decorative styling.
- Use existing design tokens, CSS variables, components, and layout primitives.
- Do not introduce generic gradients, glass effects, decorative blobs, fake metrics, or card-heavy layouts without documented product rationale.
- Cards are for repeated items, modals, and framed tools; page sections should not be nested cards.
- Text must fit its container on desktop and mobile.

## Interaction Principles

- Every interactive control needs affordance, feedback, hover, focus-visible, active, disabled, and loading states where relevant.
- Icon-only buttons need accessible names.
- Keyboard navigation and focus order must be logical.
- Errors must be close to the affected control and not rely only on color.

## Responsive Rules

- Verify desktop and mobile layouts.
- Avoid viewport-width font scaling.
- Use stable dimensions for fixed-format UI elements.
- Prevent overflow, overlap, and layout shift from dynamic content.

## Accessibility

Target WCAG 2.2 AA when applicable:

- visible labels or clear accessible labels;
- sufficient contrast;
- focus-visible styles;
- logical tab order;
- reduced-motion handling for non-essential animation;
- focus trap and focus restoration for modals and drawers.

## Codex Image Mockups

Whenever a UI/UX mockup is needed, use ux-mockup-generate and Codex's built-in image generation tool. Use ux-mockup-brief for the prompt and ux-mockup-iterate for revisions. Inspect the images, preserve existing product constraints and tokens, and save actual deliverables under design/mockups/images/. Record prompts, selected versions and rationale in [DOC]-{{PROJECT_NAME}}/11-UX-DesignOps/07-Mockups/Mockup_Index.md.

If image generation is unavailable, say the mockup is blocked; do not claim a written prompt is a generated image. API/CLI fallback requires explicit user authorization. Use ux-implement-from-mockup to build the selected direction with real components, then ux-visual-verification on the rendered app. Generated images are proposals, never proof of implementation or accessibility.

## Documentation

Persistent UX documentation lives in:

```text
[DOC]-<Project>/11-UX-DesignOps/
```

MOC and templates remain in:

```text
[DOC]-<Project>/00-MOC/MOC-UX.md
[DOC]-<Project>/_Templates/TPL-UX-*.md
```
