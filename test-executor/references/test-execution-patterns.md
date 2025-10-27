# Test Execution Patterns

## E2E Tests (Browser-Based)

**Pattern:** User workflow testing
**Tools:** Playwright, Cypress, Puppeteer

```bash
# Playwright
npx playwright test
npx playwright test --headed  # With browser visible
npx playwright test specific.spec.ts  # Single file

# Cypress
npx cypress run
npx cypress open  # Interactive mode
```

## API Tests

**Pattern:** HTTP request/response testing
**Tools:** curl, httpie, REST Client

```bash
# curl
curl -X POST http://localhost:5001/api/forms \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'

# With authentication
curl -H "Authorization: Bearer ${TOKEN}" \
  http://localhost:5001/api/forms
```

## Unit Tests

**Pattern:** Isolated function testing

**JavaScript/TypeScript:**
```bash
npm test
jest
vitest run
```

**.NET:**
```bash
dotnet test
dotnet test --filter TestName
```

**Python:**
```bash
pytest
pytest tests/unit/
```

## Integration Tests

**Pattern:** Component interaction testing
**Requires:** Database, external services

```bash
# Start dependencies first
docker-compose up -d

# Run integration tests
npm run test:integration
dotnet test --filter Category=Integration
pytest tests/integration/
```

## Performance Tests

**Pattern:** Load and stress testing
**Tools:** ab, wrk, k6

```bash
# Apache Bench
ab -n 1000 -c 10 http://localhost:5001/api/forms

# k6
k6 run load-test.js
```
