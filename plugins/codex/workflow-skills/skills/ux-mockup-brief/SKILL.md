---
name: ux-mockup-brief
description: Prepare a UI mockup brief grounded in product requirements, existing design tokens and UX states before Codex image generation.
---

# ux-mockup-brief

## Project context

Read AGENTS.md, DESIGN.md, the relevant CDC/FEAT/ADR and existing UX screen, flow and component docs. Resolve DOC_ROOT to the project's [DOC]-* vault and UX_DOCS_ROOT to its 11-UX-DesignOps directory. Follow ux-bootstrap if UX memory is missing. Keep persistent documentation in French with frontmatter and MOC links.

## Prepare the brief

For a new surface, redesign or unresolved direction, read [contextual-design.md](references/contextual-design.md). Use [design-vocabulary.md](references/design-vocabulary.md) for the relevant visual and interaction axes. For a small revision, reuse the documented context and selected direction; do not restart discovery.

Record sourced user/context facts, the target platform and inputs, brand constraints, intended task outcome and unresolved material questions. Each major visual choice needs an observable interpretation and product reason. Keep the reusable direction in `01-Product/Design_Direction.md` (or the existing equivalent) and platform requirements in `01-Product/Platform_Profile.md`. A filled template is not proof of user research.

Identify the user task, target route/component, viewport, content hierarchy, real labels, density, design tokens, reusable components and constraints. Include loading, empty, error, permission and success states when relevant, keyboard/focus behavior and responsive requirements. Keep unsupported product decisions explicitly unresolved.

For an existing interface, inspect its code and rendered screenshot. Preserve its identity unless a redesign is requested. State exact copy and distinguish illustrative sample content from real data. Avoid invented metrics and decorative effects without a product purpose.

Write the prompt in this form:

- Use case: ui-mockup.
- Target, user goal, viewport and fidelity.
- Reference images and their roles, if any.
- Direction and rationale: selected terms translated into visible choices, reference properties to adapt and properties to exclude.
- Target platform/input behavior and observable task success criteria.
- Information hierarchy, layout, typography, palette and component states.
- Text verbatim, constraints to preserve, changes requested and elements to avoid.

Save the brief in UX_DOCS_ROOT/07-Mockups/Prompts/<target>-brief.md. Record the target in Mockup_Index.md. When a rendered mockup is requested, continue with ux-mockup-generate; a written prompt alone does not satisfy a mockup request.


## Taste and design references

For creation/redesign or unresolved direction, follow ux-design-direction to select relevant Taste guidance and inspect Awesome DESIGN.md candidates. Include adopted properties, adaptations and exclusions in the brief; preserve the project contract for focused revisions.
