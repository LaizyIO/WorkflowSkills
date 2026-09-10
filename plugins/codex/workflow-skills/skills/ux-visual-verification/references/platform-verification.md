# Platform verification

Build a matrix from the product's supported targets, relevant inputs and changed tasks. Use existing project tooling. Do not expand support to platforms outside the request. Record target, device/window, input, state, expected outcome, evidence and pass/fail/blocked/not-applicable with a reason.

## Web

Use the Codex Browser plugin when available in Codex, an existing browser runner, or Playwright as appropriate. Check relevant widths, zoom/text enlargement, keyboard/focus, overflow, dynamic content and system feedback. Inspect semantic labels and accessibility behavior with appropriate tools; screenshots alone do not prove it. Rendered Storybook covers component states, not automatically full journeys.

## Android and other native targets

Use an available emulator, simulator, physical device or native test runner capable of rendering the actual target. Previews can demonstrate layout, but cannot alone prove runtime permissions, navigation, input or persistence. Test the relevant platform behavior: system back/navigation, software keyboard, insets/safe areas, text enlargement, rotation/resizing, interruptions, state restoration and offline recovery where specified. Use the platform accessibility semantics and assistive technology, such as TalkBack or VoiceOver, when needed by the verification scope.

Cross-platform frameworks still need evidence for each claimed runtime. Browser screenshots of a web build do not verify Android or Apple native behavior. Name unavailable tools precisely and keep those checks blocked while completing independent checks.

## Quality dimensions

Report separately:

- Visual direction: composition, type, imagery and density match the documented intent and real content.
- Interaction: the user completes the representative task and can recover from relevant errors.
- Accessibility: actual checks and their coverage, not a blanket compliance claim.
- Product fit: component and content choices have context-specific reasons; identify preferences separately from defects.

For before/after claims use comparable content and tasks. User metrics require actual observations; expert review is not user research. Compare with generated mockups only as proposals, never as verification evidence.
