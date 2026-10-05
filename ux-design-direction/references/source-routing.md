# Taste + Awesome DESIGN.md routing

This adapter is WorkflowSkills' integration of the upstream sources audited for FEAT-007. Exact commits, hashes, install names and local paths are in `../assets/design-sources/manifest.json`. Original MIT notices accompany the snapshots. Read the relevant headings in a source rather than loading the whole collection.

## Source roles and entry points

| Work | Taste snapshot and sections | Additional decisions |
| --- | --- | --- |
| Landing, portfolio, editorial | `taste/frontend.md`: Brief Inference, Three Dials, Design Engineering, Redesign Protocol | Product context, selected Awesome reference, existing stack and brand |
| Existing web UI | `taste/redesign.md`: Scan, Diagnose, Fix Priority; selected audit dimensions | Keep existing behavior and identity unless the user authorizes their change; familiarity is not a defect |
| Web mockup image | `taste/imagegen-web.md`: direction, composition and image constraints | ux-mockup-brief/generate; exact copy and project tokens |
| iOS/Android/mobile mockup image | `taste/imagegen-mobile.md`: Platform Mode, screen/flow consistency, safe areas, text readability | Actual platform, task/state set; use screen-only views when needed for implementation rather than an automatic iPhone frame |
| Dashboard, admin, data tables, multi-step forms | No Taste frontend page recipe: its Out of Scope section excludes these | ux-flow/component-spec, project's components, actual data density, relevant design system |
| Native implementation | Taste image guidance can inform the visual direction; it provides no native implementation contract | Project platform resources and official HIG/Material documentation; device/emulator and assistive technology verification |

For the original unadapted web skill, upstream documents `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend -a codex`. WorkflowSkills distributes audited snapshots as **references**, with this adapter as the active skill. Installing all upstream variants as competing automatic skills is unnecessary for this workflow. Awesome DESIGN.md is a Markdown catalog, not an installable SKILL.md package.

## Resolve these upstream conflicts before applying a source

The frontend v2 is experimental, web-specific, and over 1,200 lines at the pinned revision. Its opening contextual rule coexists with hard aesthetic requirements later in the file. Use its techniques to serve the project:

- Preserve the actual framework, tokens, licensed fonts, icon family and component architecture. React/Next/Tailwind/GSAP are source examples, not mandatory migrations or dependencies. Check official package docs before adding a dependency.
- Set variance, motion and density from audience, task, content, device and brand. A preserved interface does not need `motion +1`; an overhaul does not need `+2`. Static task UI is valid. Avoid scroll capture that obstructs reading, navigation or input; honor reduced motion for all nonessential animation.
- A brand accent is distinct from semantic success/error/warning colors. Keep necessary semantic colors and accessible text/icons. The source's one-accent lock does not remove state meaning.
- White/black, serif/Inter/system fonts, flat surfaces, standard tables, cards, borders and mixed section backgrounds can be justified. Do not replace them merely because they appear in a ban list. Multiple radii may express component hierarchy. Preserve exact user copy and punctuation.
- Support the themes required by the product; do not add a theme toggle or dark mode from an upstream default. Verify every supported theme.
- Readability, localization, zoom and task success govern hero height, heading wraps and copy length. Do not delete important content to satisfy a universal fold or line-count rule.
- Use real or clearly labeled illustrative content. A seeded Picsum URL does not guarantee a relevant image. Do not fabricate testimonials, metrics, statuses or product screenshots. Decorative images may need empty alt text; meaningful images need descriptions.
- Image generation remains Codex's built-in tool through the existing mockup skills. Do not switch to Stitch, another service or API from source instructions. Fonts, logos, photos and trademarks mentioned by a catalog analysis are not licensed assets supplied by the catalog.

The `gpt-taste` variant is intentionally not the default: it requires simulated randomization, AIDA for every page and GSAP for static interfaces. Never claim simulated code output as an executed test. Stylistic soft/minimalist/brutalist variants are optional upstream material after a matching direction is selected, not generic presets for every project.

## Adapt an Awesome DESIGN.md

The catalog provides third-party analyses, frequently of marketing websites, not official brand specifications. Some documents are labeled alpha and include proprietary typefaces, small text or low-contrast tokens. Verify adopted choices in the rendered project; do not treat copied token numbers as accessibility certification.

Use `clai design catalog` for available IDs, then read a candidate. `clai design import ibm` stores the pinned file and license under `design/references/awesome-design-md/<commit>/ibm/`. It records a candidate in Design_References, leaving DESIGN.md and tokens intact. It requires one unambiguous project vault before writing persistent documentation.

For each candidate capture: provenance; why it fits this audience/task; useful hierarchy/grid/type/spacing/component properties; properties rejected; adaptations for content, brand, platform and accessibility; status candidate/selected/rejected; checks. Prefer one coherent selected reference, or document the role of each complementary reference. Do not blend several brand token sets by default.

Examples of **properties to investigate**, not automatic choices: IBM for square geometry and tabular hierarchy; Notion for reading/document structure; Airbnb for image-led browsing and search hierarchy. These analyses do not establish the appropriate workflow for an enterprise table, a public service or a native app.
