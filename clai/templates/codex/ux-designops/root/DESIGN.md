# DESIGN.md

## Role

This file is the portable design contract for web and native UI agents. Keep project decisions outside the managed method block below.

For any user-visible change, treat the interface as a product workflow first and a visual surface second. Preserve business logic, routes, APIs, validation, and existing component architecture unless the feature plan explicitly says otherwise.

## Product Context

- User goal must be explicit before UI implementation.
- Primary task must be visible and efficient.
- Secondary tasks must not compete with the primary task.
- Empty, loading, error, success, disabled, permission, and offline states must be designed when relevant.

## Visual Principles

- Connect composition, typography, imagery, density and motion to the task, content and brand. Expression can serve a product purpose; minimalism is not mandatory.
- Use existing tokens, components and platform resources; document justified extensions.
- System fonts, gradients and cards are options, not forbidden or mandatory styles. Never invent product metrics or user evidence.
- Distinguish content cards, panels, page sections and dialogs by function; avoid accidental nesting and competing emphasis.
- Verify long text and real content on the affected platforms.

## Interaction Principles

- Every interactive control needs affordance, feedback, hover, focus-visible, active, disabled, and loading states where relevant.
- Icon-only buttons need accessible names.
- Keyboard navigation and focus order must be logical.
- Errors must be close to the affected control and not rely only on color.

## Responsive Rules

- Verify supported platforms, inputs and relevant window/device configurations.
- Preserve zoom and text enlargement. Bounded fluid type is acceptable when tested; do not rely only on viewport units for readable text.
- Use stable dimensions for fixed-format UI elements.
- Prevent overflow, overlap, and layout shift from dynamic content.

## Accessibility

Target WCAG 2.2 AA when applicable:

- visible labels or clear accessible labels;
- sufficient contrast;
- focus-visible styles;
- logical tab order;
- reduced-motion handling for non-essential animation;
- appropriate modal focus management and restoration; do not trap focus in non-modal panels.

For native targets, use platform accessibility semantics, text enlargement, system navigation and assistive technology checks as applicable. A screenshot does not establish accessibility compliance.

<!-- workflow-skills:contextual-design:start -->
## Contextual Design Method

Use the existing project facts and decisions in [DOC]-{{PROJECT_NAME}}/11-UX-DesignOps/01-Product/: Product_Context.md, Design_Direction.md and Platform_Profile.md (or equivalent documents). An empty template is not established context. Record facts, sources and material unknowns; ask only when missing information changes the design.

For creation/redesign, connect context to intent, observable composition/type/imagery/component decisions, product reasons and verification. Use ux-mockup-brief's contextual-design and vocabulary references when direction is unresolved. Compare a few materially different options only when exploration is useful. For focused corrections, reuse the selected direction and existing authorization.

Shared methodology does not impose a visual identity. Treat legacy template defaults as guidance to assess against approved project decisions, not universal aesthetic bans. Preserve brand constraints and platform conventions; do not inherit another project's palette or style automatically.

Implement from the approved specifications, with or without a mockup. Verify representative tasks and states on the actual target runtime: browser for web, native renderer/device for native. Report visual direction, interaction, accessibility and task outcomes separately. Code shows the implemented state; approved requirements define the intended state. Record discrepancies instead of silently changing requirements.
<!-- workflow-skills:contextual-design:end -->

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
