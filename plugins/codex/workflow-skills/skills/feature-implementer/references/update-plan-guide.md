# Plan Update Guide

## How to Update Implementation Plan

### Marking Steps Complete

**Format:**
```markdown
## Phase 2: Implementation

- [x] Step 2.1: Create EmailService class
- [x] Step 2.2: Implement SendEmail method
- [ ] Step 2.3: Add email queueing (in progress)
- [ ] Step 2.4: Write unit tests

**Progress:** 2/4 steps complete (50%)
```

**Rules:**
- Use `[x]` for completed steps
- Use `[ ]` for pending steps
- Update progress percentage after each step

### Adding Notes to Steps

When implementation differs from plan:

```markdown
- [x] Step 2.2: Implement SendEmail method
  **Note:** Used Microsoft Graph instead of SMTP (as discussed in research)
  **File:** `src/Services/EmailService.cs:42-89`
```

### Documenting Blockers

When unable to complete a step:

```markdown
- [ ] Step 3.1: Deploy to staging environment
  **Blocker:** Staging credentials not available
  **Status:** Waiting for DevOps team (requested 2024-10-26)
  **Alternative:** Testing in local environment for now
```

### Adding Discovered Steps

When new tasks are discovered:

```markdown
## Phase 2: Implementation

- [x] Step 2.1: Create EmailService
- [x] Step 2.2: Implement SendEmail
- [ ] Step 2.2.1: Fix CORS configuration (discovered during testing) ⚠️
- [ ] Step 2.3: Add email queueing

**Progress:** 2/4 steps complete (50%)
```

Mark new steps with ⚠️ for visibility.

### Updating Phase Progress

**Phase-level progress:**

```markdown
## Phase 2: Backend Implementation (67%)

- [x] Step 2.1: Done
- [x] Step 2.2: Done
- [ ] Step 2.3: In progress
```

**Overall progress:**

```markdown
## Progress Tracker

- [x] Phase 1: Research (100%)
- [x] Phase 2: Planning (100%)
- [x] Phase 3: Implementation (67%)
- [ ] Phase 4: Testing (0%)
- [ ] Phase 5: Deployment (0%)

**Overall Progress:** 3/5 phases complete (60%)
```

### Adding Implementation Notes

Add notes section if significant deviations:

```markdown
## Implementation Notes

### Phase 2 Notes
- **Decision:** Switched from SMTP to Microsoft Graph for email
  - Reason: Better integration with existing Azure AD setup
  - Impact: Simplified authentication, removed SMTP config
  - File: `src/Services/EmailService.cs`

### Phase 3 Notes
- **Issue:** CORS errors during frontend testing
  - Solution: Added CORS policy in Program.cs
  - File: `backend/src/Bovis.API/Program.cs:line 42`
```

### Tracking Time (Optional)

If tracking time:

```markdown
- [x] Step 2.1: Create EmailService class
  **Estimated:** 2 hours
  **Actual:** 1.5 hours
  **Completed:** 2024-10-26
```

### Adding References

Link to relevant commits or PRs:

```markdown
- [x] Phase 2: Backend Implementation (100%)
  **Commits:** abc123f, def456a
  **PR:** #42 (merged)
  **Completed:** 2024-10-26
```

### Changelog

Maintain a changelog at end of plan:

```markdown
## Changelog

### 2024-10-26
- Completed Phase 2 (Backend Implementation)
- Added Step 2.2.1 for CORS fix
- Updated Phase 3 progress to 30%

### 2024-10-25
- Completed Phase 1 (Research)
- Started Phase 2
```

## Best Practices

1. **Update Immediately:** Mark steps complete right after finishing
2. **Be Specific:** Note what was done, not just "completed"
3. **Document Deviations:** Explain changes from original plan
4. **Link to Code:** Reference files and line numbers
5. **Track Blockers:** Document issues and their status
6. **Update Progress:** Keep percentages current
7. **Add Context:** Help future readers understand what happened
8. **Be Concise:** Notes should be brief but informative

## Common Mistakes

❌ **Don't do this:**
```markdown
- [x] did stuff
```

✅ **Do this:**
```markdown
- [x] Step 2.1: Create EmailService class
  **File:** `src/Services/EmailService.cs`
  **Tests:** Unit tests passing
```

❌ **Don't skip updates:**
- Marking multiple steps at once (lose visibility)
- Not updating progress percentages
- Not documenting blockers

✅ **Do update regularly:**
- After each step completion
- When discovering new tasks
- When blocked or deviating from plan

## Example: Complete Phase Update

```markdown
## Phase 2: Backend Email Service (100%) ✅

### Goals
Implement EmailService using Microsoft Graph API.

### Steps

- [x] Step 2.1: Install Microsoft.Graph package
  **Completed:** 2024-10-26 10:30
  **File:** `backend/src/Bovis.API/Bovis.API.csproj`

- [x] Step 2.2: Create EmailService class
  **Completed:** 2024-10-26 11:45
  **File:** `src/Services/EmailService.cs`
  **Note:** Implemented IEmailService interface

- [x] Step 2.3: Implement SendEmail method
  **Completed:** 2024-10-26 14:20
  **File:** `src/Services/EmailService.cs:line 42-89`
  **Note:** Using Microsoft Graph instead of SMTP (better Azure AD integration)

- [x] Step 2.4: Add configuration
  **Completed:** 2024-10-26 14:35
  **File:** `appsettings.json`
  **Note:** Added MicrosoftGraph section

- [x] Step 2.5: Write unit tests
  **Completed:** 2024-10-26 15:50
  **File:** `tests/Services/EmailServiceTests.cs`
  **Tests:** 8/8 passing

**Dependencies:** None

### Validation Criteria
- [x] Email successfully sent in dev environment
- [x] Unit tests pass (8/8)
- [x] Configuration properly loaded
- [x] Code reviewed and approved

### Notes
- Switched from SMTP to Microsoft Graph (better integration)
- Added error handling for Graph API failures
- Implemented retry logic (3 attempts)

**Phase completed:** 2024-10-26 16:00
**Total time:** ~5 hours (estimated 6 hours)
```
