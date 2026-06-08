---
name: ux-visual-verification
description: Verify UI changes with the Codex Browser plugin by default, or Playwright/Storybook/equivalent rendering tools when needed, using screenshots, responsive checks, focus states, and accessibility basics. Blocks if no rendering tool is available.
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

Use at least one rendering tool:

- Codex Browser plugin (preferred in Codex).
- Existing project visual test runner.
- Storybook rendered with browser automation.
- Playwright when the project already uses it, Browser plugin is unavailable, or automated E2E evidence is explicitly required.

If no rendering tool is available, do not downgrade to code-only review. Mark verification as blocked and add setup work for the Codex Browser plugin or an equivalent renderer. Do not require Playwright just to satisfy visual verification when Browser plugin can render the app.

## Checks

1. Desktop viewport.
2. Mobile viewport.
3. Responsive overflow and clipping.
4. Loading, empty, error, success, disabled, selected, hover, focus, active states when applicable.
5. Keyboard navigation and focus-visible.
6. Contrast and readable typography.
7. No incoherent overlap.
8. No accidental layout shift from dynamic text.
9. No anti-slop violations.
10. Comparison against Stitch screenshot or prompt if relevant.

## Output

Create or update `UX_DOCS_ROOT/08-Audits/[target]-Visual-Verification.md` with:

- rendered targets;
- viewport matrix;
- screenshots or capture references when available;
- pass/fail checklist;
- issues by priority;
- required fixes;
- blocked items.

## Rules

- Do not mark UI work complete without rendered verification.
- If verification is blocked, say exactly which tool/configuration is missing.
- Keep findings actionable and tied to files or screens.
