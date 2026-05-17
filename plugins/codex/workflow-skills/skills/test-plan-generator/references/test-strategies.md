# Test Strategies by Change Type

## API Endpoint Added

**Changes:** New REST/GraphQL endpoint

**Tests Needed:**
- **E2E Tests:** If user-facing (can create/use via UI)
- **API Tests:**
  - Success scenarios (200, 201)
  - Validation errors (400)
  - Auth errors (401, 403)
  - Not found (404)
  - Server errors (500)
- **Unit Tests:** Only for complex logic not covered by API tests

**Skip:** Unit tests if API tests provide sufficient coverage

## UI Component Added

**Changes:** New React/Vue component

**Tests Needed:**
- **E2E Tests:** User interactions, workflows
- **Component Tests:** Isolated component behavior (optional)

**Skip:** Backend tests (no backend changes)

## Database Schema Changed

**Changes:** New tables, columns, migrations

**Tests Needed:**
- **Migration Tests:**
  - Migration applies successfully
  - Migration rolls back
  - Data integrity maintained
- **Integration Tests:** API works with new schema

**Skip:** E2E if schema changes don't affect UI

## Business Logic Added

**Changes:** Validation, calculations, algorithms

**Tests Needed:**
- **Unit Tests:**
  - Valid inputs
  - Invalid inputs
  - Edge cases
  - Boundary values
- **Integration Tests:** If logic interacts with database/external APIs

**Skip:** E2E if logic is well-tested at unit level

## Performance Optimization

**Changes:** Query optimization, caching, indexing

**Tests Needed:**
- **Performance Tests:**
  - Before/after benchmarks
  - Load tests
  - Response time measurements
- **Regression Tests:** Ensure no functionality broken

**Skip:** Additional functional tests (covered by existing tests)

## Security Feature

**Changes:** Authentication, authorization, encryption

**Tests Needed:**
- **Security Tests:**
  - Unauthorized access blocked
  - SQL injection prevented
  - XSS prevented
  - CSRF protection
- **E2E Tests:** Auth workflows

**Skip:** Performance tests unless security adds latency

## Test Coverage Strategy

**High Priority (Must Test):**
- Critical user paths
- Data integrity
- Security features
- Payment/financial logic

**Medium Priority (Should Test):**
- Edge cases
- Error handling
- Non-critical features

**Low Priority (Nice to Have):**
- UI polish
- Rarely-used features
- Minor optimizations

## Avoiding Redundancy

**Rule:** Test each thing once at the right level

**Example: Form Submission**

✅ **Good (Non-Redundant):**
- E2E: User submits form via UI (tests entire flow)
- API: Edge cases not accessible via UI (malformed JSON, rate limiting)
- Unit: Complex validation algorithm

❌ **Bad (Redundant):**
- E2E: User submits form
- API: POST /api/forms (duplicate of E2E)
- Unit: Form controller (duplicate of API)

**When E2E tests backend thoroughly, skip redundant API tests.**
