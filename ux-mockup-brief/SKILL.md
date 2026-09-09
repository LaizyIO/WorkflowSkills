---
name: ux-mockup-brief
description: Prepare a UI mockup brief grounded in product requirements, existing design tokens and UX states before Codex image generation.
---

# ux-mockup-brief

## Project context

Read AGENTS.md, DESIGN.md, the relevant CDC/FEAT/ADR and existing UX screen, flow and component docs. Resolve DOC_ROOT to the project's [DOC]-* vault and UX_DOCS_ROOT to its 11-UX-DesignOps directory. Follow ux-bootstrap if UX memory is missing. Keep persistent documentation in French with frontmatter and MOC links.

## Prepare the brief

Identify the user task, target route/component, viewport, content hierarchy, real labels, density, design tokens, reusable components and constraints. Include loading, empty, error, permission and success states when relevant, keyboard/focus behavior and responsive requirements. Keep unsupported product decisions explicitly unresolved.

For an existing interface, inspect its code and rendered screenshot. Preserve its identity unless a redesign is requested. State exact copy and distinguish illustrative sample content from real data. Avoid invented metrics and decorative effects without a product purpose.

Write the prompt in this form:

- Use case: ui-mockup.
- Target, user goal, viewport and fidelity.
- Reference images and their roles, if any.
- Information hierarchy, layout, typography, palette and component states.
- Text verbatim, constraints to preserve, changes requested and elements to avoid.

Save the brief in UX_DOCS_ROOT/07-Mockups/Prompts/<target>-brief.md. Record the target in Mockup_Index.md. When a rendered mockup is requested, continue with ux-mockup-generate; a written prompt alone does not satisfy a mockup request.
