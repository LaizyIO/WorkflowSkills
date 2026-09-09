---
name: ux-mockup-generate
description: Generate UI or UX mockup images with Codex image generation when a screen, component or design direction needs a visual proposal.
---

# ux-mockup-generate

## Project context

Read AGENTS.md, DESIGN.md, the relevant CDC/FEAT/ADR and existing UX screen, flow and component docs. Resolve DOC_ROOT to the project's [DOC]-* vault and UX_DOCS_ROOT to its 11-UX-DesignOps directory. Follow ux-bootstrap if UX memory is missing. Keep persistent documentation in French with frontmatter and MOC links.

## Generate an actual mockup

Whenever a mockup is needed, generate an image with Codex's built-in image generation tool (image_gen). Read the imagegen skill if available and follow the actual tool schema. Do not assume model IDs, API credentials, destination arguments or a particular MCP provider. Built-in generation does not require a user API key.

1. Use ux-mockup-brief or prepare the same grounded brief inline. For an existing UI, inspect rendered screenshots and the code before choosing visual changes.
2. Generate the requested screen/state. For edits, inspect the supplied local image with the image viewer and use the tool's supported reference mechanism. Preserve explicit invariants.
3. Inspect the generated image: hierarchy, labels, spacing, contrast intent, state clarity, density, viewport and consistency with DESIGN.md. Correct visible defects through focused image edits. One mockup is enough for a focused request; produce additional directions when exploration or the user calls for them.
4. Present the image as a design proposal, not a screenshot of implemented software. Save each requested deliverable and the selected image to design/mockups/images/<target>-v<N>.png (preserve the real output format). Copy from the actual tool result path; never invent a saved file or overwrite a prior version silently.
5. Save the exact prompt in UX_DOCS_ROOT/07-Mockups/Prompts/ and update Mockup_Index.md with artifact path, reference inputs, target, viewport/state, generation tool, status (proposed/selected/rejected) and rationale. Respect an already selected direction; ask for selection only when genuinely unresolved before dependent implementation.

## Capability boundary

If image generation is unavailable or fails, state that no mockup was generated and retain the brief. Do not substitute HTML, SVG, ASCII, stock imagery or a handoff to another design service while claiming generation succeeded. Offer an explicit API/CLI fallback only if needed and use it only when the user authorizes it; do not add credentials or dependencies automatically. Other design analysis can continue independently.

Do not implement application code in this skill. A raster mockup cannot verify real keyboard behavior, accessibility, data flow or responsive behavior. Use ux-implement-from-mockup for implementation and ux-visual-verification on the actual application.
