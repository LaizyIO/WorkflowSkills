---
name: ux-visual-verification
description: Verify rendered UI and representative tasks on affected web or native platforms, with appropriate browser, emulator, simulator or device evidence. Report unavailable verification as blocked.
---

# UX Visual Verification Skill

## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first before writing persistent UX verification docs.
4. Read `DESIGN.md`, related UX docs, implementation plan, and changed files.

## Goal

Validate that UI changes render correctly and preserve UX quality across states and viewports.

## Required Rendering Tool

Read [platform-verification.md](references/platform-verification.md) for the affected targets. Use a rendering tool appropriate to each claimed platform:

- Codex Browser plugin (preferred for web in Codex).
- Existing project visual test runner.
- Storybook rendered with browser automation.
- Playwright when the project already uses it, Browser plugin is unavailable, or automated E2E evidence is explicitly required.
- Native emulator, simulator, device or native rendering/test runner for native targets. Layout previews alone do not validate runtime interactions.

If the required renderer is unavailable, mark the affected checks blocked and name the missing setup; complete independent checks. Do not downgrade to code-only review or require Playwright when an available tool can render the target. A web build or narrow browser viewport does not validate a native app.

## Checks

1. Supported platforms, relevant window/device configurations and input methods from the project profile.
2. Representative task completion and recovery, with expected outcomes from the feature/flow.
3. Responsive overflow and clipping.
4. Loading, empty, error, success, disabled, selected, hover, focus, active states when applicable.
5. Keyboard navigation and focus-visible.
6. Contrast and readable typography.
7. No incoherent overlap.
8. No accidental layout shift from dynamic text.
9. Contextual fit: composition, content, component choice and identity have documented product reasons. Distinguish preferences from defects; common platform patterns are not violations.
10. Comparison against selected generated mockup image (not verification evidence) if relevant.

## Output

Create or update `UX_DOCS_ROOT/08-Audits/[target]-Visual-Verification.md` with:

- rendered targets;
- platform/device/window/input/state matrix;
- screenshots or capture references when available;
- pass/fail checklist;
- issues by priority;
- required fixes;
- blocked items.

Report visual direction, interaction, accessibility checks and task outcomes separately. Record what was actually observed; no invented user feedback, blanket compliance claims or unmeasured efficiency gains.

## Rules

- Do not mark UI work complete without rendered verification.
- If verification is blocked, say exactly which tool/configuration is missing.
- Keep findings actionable and tied to files or screens.


## Taste and design references

Verify the adopted source properties and intentional deviations from Design_References as well as task/state/platform checks. Taste preflight and imported tokens are not evidence of accessibility compliance or runtime behavior.
