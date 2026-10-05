---
name: ux-mockup-iterate
description: Edit an existing UI mockup image with Codex image generation while preserving the selected layout, design system and product constraints.
---

# ux-mockup-iterate

## Project context

Read AGENTS.md, DESIGN.md, the relevant CDC/FEAT/ADR and existing UX screen, flow and component docs. Resolve DOC_ROOT to the project's [DOC]-* vault and UX_DOCS_ROOT to its 11-UX-DesignOps directory. Follow ux-bootstrap if UX memory is missing. Keep persistent documentation in French with frontmatter and MOC links.

## Iterate a selected image

Read UX_DOCS_ROOT/07-Mockups/Mockup_Index.md and the selected image. Inspect local images with the image viewer before editing. Identify a small, coherent change set and explicit invariants (layout, content, typography, palette, components and state as applicable).

Check whether the feedback concerns local finish or a structural mismatch with the task, content or platform. For structural changes, return to ux-mockup-brief and revise the direction within the authorized scope instead of repeatedly polishing the wrong composition. Preserve decisions unrelated to the feedback.

Use the built-in image generation editing capability and its supported references, following imagegen if available. State change only X and preserve Y in the prompt. Generate a sibling version, inspect it, and present the actual result. Follow the capability boundary in ux-mockup-generate if generation is unavailable; never claim a prompt-only edit produced an image.

Save the image in design/mockups/images/ and the exact prompt in UX_DOCS_ROOT/07-Mockups/Prompts/. Update Mockup_Index.md and 10-Decisions/Decision_Log.md with the parent reference, changes, selected/rejected status and rationale. Keep prior versions; do not implement code or infer approval from a generated variant.


## Taste and design references

Preserve the source properties, adaptations and exclusions recorded in Design_References through ux-design-direction. Change them only within the authorized revision; do not pick another brand for each iteration.
