---
name: ux-code-to-mockup
description: Build an accurate image-generation brief from existing UI code, routes, tokens and rendered screenshots for a proposed interface change.
---

# ux-code-to-mockup

## Project context

Read AGENTS.md, DESIGN.md, the relevant CDC/FEAT/ADR and existing UX screen, flow and component docs. Resolve DOC_ROOT to the project's [DOC]-* vault and UX_DOCS_ROOT to its 11-UX-DesignOps directory. Follow ux-bootstrap if UX memory is missing. Keep persistent documentation in French with frontmatter and MOC links.

## Ground the proposal in the implemented UI

Inspect the actual route, layout, reusable components, design tokens, data flow and relevant states. Capture the current screen with an available browser/rendering tool and inspect it; if rendering is unavailable, distinguish code-derived assumptions from verified visual facts.

Prepare a brief that records current behavior, screenshot paths, components to reuse, exact requested changes and invariants. Do not export invented HTML or imply that an image contains source code. Keep real user data out of illustrative mockups unless needed and authorized.

Save UX_DOCS_ROOT/07-Mockups/Prompts/<target>-from-code.md and reference the current screenshot in Mockup_Index.md. If a mockup is requested, invoke ux-mockup-generate using the screenshot as a reference rather than stopping at a prompt. Existing implementation remains evidence of current behavior, while CDC and feature requirements define desired behavior.
