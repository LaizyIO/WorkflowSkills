# Contextual design decisions

Use this method for a new surface, a redesign, or a brief whose direction is unresolved. For a focused correction, read the existing decisions and update only what the request affects. Reuse supplied facts before asking questions; ask only about missing information that would materially change the design. Unknown business rules remain unresolved, not invented.

## Establish a usable context

Record compactly in the project's Product_Context.md, with sources and unknowns:

- Product and surface: marketing, reading, transaction, repeated work, exploration, or a combination.
- Users: expertise, frequency, language, accessibility needs and relevant conditions of use.
- Primary task and content: actual objects, labels, relationships, volume, variability and cost of errors.
- Platforms and inputs: web/native, supported devices, touch/keyboard/pointer, network and interruption constraints.
- Identity: existing brand assets, tone, visual references, constraints and requested freedom to change.
- Success: observable task outcome and how it will be checked. Do not fabricate analytics or user interviews.

A file containing only headings or generic principles is not established context. Keep unsupported assumptions visibly separate from evidence. A small request does not require filling unrelated fields.

## Turn context into a direction

For each major choice, connect **context → intent → observable decision → reason → verification**. Record the selected direction in 01-Product/Design_Direction.md, or an existing equivalent; reference it from DESIGN.md. Keep platform requirements in Platform_Profile.md or the existing equivalent.

Cover the relevant axes: content hierarchy, composition/grid, typography, image treatment, color roles, density, component selection, language and motion. Use a few useful terms from design-vocabulary.md, not the whole catalog. Styles, system fonts, cards, gradients and minimalism are options, not universal requirements or prohibitions. Brand expression can itself serve a product purpose.

Annotate references: which property helps this project, which properties must not transfer, and how it changes for the target content/platform. Shared standards can coexist with an individual identity. Never transfer another client's palette or a previous project's preferred style automatically.

If open exploration is useful, compare a small number of materially different directions with the same representative task and content. Differences should affect composition, imagery or interaction where appropriate, not just recoloring. Recommend based on context and tradeoffs. Respect an existing selection or authorization; do not add an approval checkpoint to every edit. Follow ux-mockup-generate for requested images.

## Choose components from the task

Consider data volume, comparison, search, single/multiple selection, frequency and error recovery. A short set of choices may need a simple native control; a large directory may need searchable selection and a change summary. Do not impose an arbitrary numeric threshold or replace familiar controls only for novelty.

## Evaluate without inventing an anti-slop score

Explain with evidence whether:

- the content determines the composition and primary action;
- labels and components express the domain rather than a generic dashboard shell;
- identity decisions have project-specific reasons;
- familiar platform interactions remain understandable;
- real content, long text, errors and repeated tasks still work.

Distinguish preference, usability defect and requirement violation. A recurring standard component is not itself a defect. Record task completion, failures and observed limitations; claim improvement only with a suitable comparison. A generated image cannot demonstrate interaction, performance or accessibility.

Research basis: [Government Design Principles](https://www.gov.uk/guidance/government-design-principles), [Anthropic frontend prompting](https://claude.com/blog/improving-frontend-design-through-skills), [Carbon data tables](https://carbondesignsystem.com/components/data-table/usage/). This method is a WorkflowSkills synthesis, not a guarantee about model output.
