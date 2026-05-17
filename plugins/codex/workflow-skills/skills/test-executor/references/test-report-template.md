# Test Failure Report

**Date:** [Date]
**Execution:** [Run #X]
**Branch:** [Branch name]

## Summary

- **Total Tests:** X
- **Passed:** Y
- **Failed:** Z
- **Skipped:** N
- **Success Rate:** Y/X %
- **Duration:** Xs

---

## Failed Test #1: [Test Name]

**Test File:** `path/to/test.spec.ts`

**Test Type:** E2E / API / Unit / Integration

**Failure Type:** Timeout / Assertion / Connection / Authentication / Data Error

**Error Message:**
```
[Full error message]
[Stack trace if available]
```

**Probable Cause:**
[Analysis of why the test failed]

**Suggested Fix:**
[Specific actions to resolve the issue]

**Related Code:**
- `src/path/to/component.ts:line 42`
- `backend/path/to/service.cs:line 67`

**Screenshots:** (if E2E test)
- `screenshots/failure-1.png`

---

## Failed Test #2: [Test Name]

[Same structure as above]

---

## Common Patterns

[If multiple failures have common root cause, note it here]

**Pattern:** All API tests failing with 500 errors
**Root Cause:** Database connection issue
**Fix:** Check database service is running

---

## Test Environment

**Services Status:**
- Frontend: ✅ Running (http://localhost:5174)
- Backend: ✅ Running (http://localhost:5001)
- Database: ❌ Not responding (localhost:5432)

**Configuration:**
- Node version: X.X.X
- .NET version: X.X
- Python version: X.X.X

**Dependencies:**
- All packages installed: Yes/No
- Environment variables set: Yes/No

---

## Next Steps

1. [Action 1 to fix failures]
2. [Action 2 to fix failures]
3. Re-run tests after fixes
4. If issues persist, investigate [specific area]

---

## Notes

[Any additional context or observations]

---

**Report for:** `test-fixer` skill
**Status:** Ready for fixing
