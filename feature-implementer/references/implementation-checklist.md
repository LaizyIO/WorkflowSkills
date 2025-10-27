# Implementation Quality Checklist

Use this checklist to ensure implementation quality before marking a step complete.

## Code Quality

- [ ] **Code compiles/builds** without errors or warnings
- [ ] **Code follows project conventions** (naming, structure, patterns)
- [ ] **No commented-out code** (remove or explain)
- [ ] **No debug statements** left in code (console.log, print, Debug.WriteLine)
- [ ] **Error handling** implemented appropriately
- [ ] **Null/undefined checks** where needed
- [ ] **Input validation** for user-provided data
- [ ] **Comments** added for complex logic only (code should be self-documenting)
- [ ] **No hardcoded values** (use configuration or constants)
- [ ] **DRY principle** followed (Don't Repeat Yourself)
- [ ] **SOLID principles** considered
- [ ] **Performance** considerations addressed if critical

## Testing

- [ ] **Unit tests** written (if complex logic)
- [ ] **Integration tests** written (if component interactions)
- [ ] **Manual testing** performed
- [ ] **Edge cases** considered and tested
- [ ] **Error scenarios** tested
- [ ] **Build passes** locally
- [ ] **Tests pass** locally

## Documentation

- [ ] **Plan updated** with progress (checkboxes marked)
- [ ] **Comments added** for non-obvious code
- [ ] **README updated** if needed (new setup steps, dependencies)
- [ ] **API documentation** updated if endpoints changed
- [ ] **Commit messages** are clear and descriptive

## Dependencies

- [ ] **New dependencies** documented (why they're needed)
- [ ] **Package versions** specified
- [ ] **Dependencies installed** and project builds
- [ ] **No unnecessary dependencies** added

## Configuration

- [ ] **Configuration changes** documented
- [ ] **.env.example** updated if new env vars added
- [ ] **Secrets** not committed to repository
- [ ] **Config validated** in different environments (dev, test)

## Git

- [ ] **Working on correct branch**
- [ ] **Commits are atomic** (one logical change per commit)
- [ ] **Commit messages** follow conventions
- [ ] **No merge conflicts**
- [ ] **Changes staged** appropriately

## Security

- [ ] **No secrets** in code or commits
- [ ] **Input validation** prevents injection attacks
- [ ] **Authentication/authorization** implemented correctly
- [ ] **Sensitive data** encrypted/hashed appropriately
- [ ] **CORS configured** correctly (if backend API)
- [ ] **No security warnings** from linters or security scanners

## Accessibility (if UI changes)

- [ ] **Semantic HTML** used
- [ ] **ARIA labels** added where needed
- [ ] **Keyboard navigation** works
- [ ] **Color contrast** meets WCAG standards
- [ ] **Screen reader friendly**

## Performance (if critical)

- [ ] **Database queries optimized** (indexes, no N+1)
- [ ] **API responses** under acceptable latency
- [ ] **Caching** implemented where appropriate
- [ ] **Bundle size** considerations (if frontend)
- [ ] **Memory leaks** checked

## Cleanup

- [ ] **Temporary files** removed
- [ ] **POC code** removed or archived
- [ ] **Unused imports** removed
- [ ] **Dead code** removed
- [ ] **Console logs** removed (except intentional logging)
- [ ] **Whitespace/formatting** cleaned up

## Before Marking Complete

- [ ] **All above items** checked
- [ ] **Step fully implemented** (not partial)
- [ ] **No known bugs** or issues
- [ ] **Ready for code review** (if applicable)
- [ ] **Plan checkbox** marked as complete
- [ ] **Test plan generated** (if end of phase)
