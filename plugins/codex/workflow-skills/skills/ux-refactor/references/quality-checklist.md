# UI Quality Checklist

## Before Editing

- Identify the target user task.
- Identify the primary action.
- Read nearby components and the local design system.
- Check existing tokens and CSS variables.
- Check whether shadcn, Radix, Tailwind, or another UI system is already in use.

## Implementation

- Preserve business logic.
- Reuse existing components.
- Keep one primary action visually dominant.
- Use consistent spacing and alignment.
- Use semantic tokens instead of one-off colors.
- Add missing loading, empty, error, disabled, hover, and focus-visible states.
- Use semantic HTML and accessible labels.
- Avoid unrelated refactors.

## Verification

- Build/typecheck/lint when available.
- Check mobile and desktop layout.
- Check focus-visible and keyboard navigation.
- Check contrast for primary text and controls.
- Check text overflow and clipping.
- Check no section became a card without a real grouping reason.
