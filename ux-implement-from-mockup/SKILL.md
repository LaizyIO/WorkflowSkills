---
name: ux-implement-from-mockup
description: Implement a selected UI mockup image in the existing frontend while preserving product behavior, components, tokens and accessibility.
---

# ux-implement-from-mockup

## Project context

Read AGENTS.md, DESIGN.md, the relevant CDC/FEAT/ADR and existing UX screen, flow and component docs. Resolve DOC_ROOT to the project's [DOC]-* vault and UX_DOCS_ROOT to its 11-UX-DesignOps directory. Follow ux-bootstrap if UX memory is missing. Keep persistent documentation in French with frontmatter and MOC links.

## Implement the selected direction

1. Resolve the selected image and its brief from UX_DOCS_ROOT/07-Mockups/Mockup_Index.md or the user's explicit reference. Inspect the image. If there is no actual image, follow ux-mockup-generate when a mockup is needed; never invent a selection.
2. Read existing components, tokens, routes, data flow, validation and tests. Reuse the project's architecture and design system.
3. Translate the visual direction into semantic, responsive UI code. Never use the whole mockup as a screenshot background to impersonate working controls. Keep text, inputs and navigation real; use generated raster assets only where appropriate.
4. Preserve APIs, business logic, permissions and state management. Handle states absent from the image according to the feature and UX specs. Do not copy hallucinated labels, data or inaccessible visual details into the product.
5. Translate the selected intent into the target platform's real controls and conventions. Run relevant checks and ux-visual-verification on each affected runtime, input mode and state. A web preview does not verify native behavior; a generated image is a target, not proof of working behavior or accessibility.
6. Run ux-design-sync to record the implemented route/components, image reference, intentional deviations and remaining visual debt.

Respect existing user authorization for implementation; ask for a design choice only if multiple unresolved directions materially block the work. If rendering is unavailable, report visual verification as blocked rather than claiming completion.
