# Workflow Skills Codex Marketplace

Use this directory as the partial path when adding the marketplace in Codex:

```text
plugins/codex
```

The marketplace exposes the `workflow-skills` plugin from:

```text
plugins/codex/workflow-skills
```

The plugin manifest is:

```text
plugins/codex/workflow-skills/.codex-plugin/plugin.json
```

## Included Workflows

Version 1.7.0 adds `ux-design-direction`: audited Taste guidance plus the pinned Awesome DESIGN.md catalog, adapted to each project's task, brand and web/native platform. Taste snapshots are bundled as scoped references; Awesome documents are imported as candidates, without replacing the project's DESIGN.md. Project decisions and source provenance live in Design_Direction and Design_References. Use `clai design catalog`, `clai design install` and `clai design import <id>` for project source files.

Version 1.6.0 adds contextual design across the existing 13 UX skills. New/redesigned surfaces connect product facts to observable visual decisions and task outcomes. Focused corrections reuse the selected direction. Shared methods do not prescribe a palette, font or style.

Detailed context and vocabulary references are bundled with `ux-mockup-brief`; platform verification guidance is bundled with `ux-visual-verification`. Project decisions live in Product_Context, Design_Direction and Platform_Profile (or existing equivalents).

- Feature specification, research, implementation planning, implementation, testing, fixing, Git worktrees, and Linear issue creation.
- UX DesignOps workflow for product UI work.
- Codex-generated image mockups, focused iteration and implementation handoff.
- Visual verification workflow for UI changes.

## UX DesignOps Skills

The previous `ux-refactor` skill is replaced by specialized skills:

```text
ux-bootstrap
ux-design-direction
ux-audit
ux-flow
ux-component-spec
ux-mockup-brief
ux-mockup-generate
ux-mockup-iterate
ux-code-to-mockup
ux-implement-from-mockup
ux-polish
ux-visual-verification
ux-design-sync
ux-storybook
```

Persistent UX documentation must use the project vault:

```text
[DOC]-<Project>/11-UX-DesignOps/
```

MOC and templates remain in the standard vault folders:

```text
[DOC]-<Project>/00-MOC/MOC-UX.md
[DOC]-<Project>/_Templates/TPL-UX-*.md
```

There is no runtime fallback to `docs/obsidian`.

## Visual Verification

UI changes need rendering on each affected runtime: Codex Browser or existing browser tooling for web; native emulator/simulator/device evidence for native UI. A web preview does not validate a native app. Report visual direction, interactions, accessibility and task outcomes separately.

If no rendering tool is available, the UX verification is blocked until the project has one.

## Codex Image Mockups

Whenever a UI/UX mockup is needed, use ux-mockup-generate and Codex's built-in image generation tool. Use ux-mockup-brief for the prompt and ux-mockup-iterate for revisions. Inspect the images, preserve existing product constraints and tokens, and save actual deliverables under design/mockups/images/. Record prompts, selected versions and rationale in [DOC]-<Project>/11-UX-DesignOps/07-Mockups/Mockup_Index.md.

If image generation is unavailable, say the mockup is blocked; do not claim a written prompt is a generated image. API/CLI fallback requires explicit user authorization. Use ux-implement-from-mockup to build the selected direction with real components, then ux-visual-verification on the rendered app. Generated images are proposals, never proof of implementation or accessibility.
