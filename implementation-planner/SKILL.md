---
name: implementation-planner
description: Generate comprehensive implementation plans with checkboxes, dependencies, and parallelization details. This skill should be used after feature research is complete to create structured, step-by-step implementation plans that track progress, identify dependencies between tasks, and enable multiple developers to work in parallel.
---

# Implementation Planner Skill

## Purpose

Transform feature research findings into comprehensive, actionable implementation plans with clear steps, dependencies, checkboxes for tracking progress, and identification of parallelizable tasks. The plan format enables systematic implementation by one or multiple developers while maintaining clear visibility of progress.

## When to Use This Skill

Use this skill when:

- Feature research is complete and findings are documented
- Ready to break down a feature into implementable steps
- Need to coordinate implementation across multiple developers
- Want to track progress systematically with checkboxes
- Need to identify task dependencies and parallel work opportunities
- Creating a roadmap for phased implementation
- Planning complex features with multiple integration points

## Plan Structure Philosophy

A good implementation plan is:

- **Detailed Enough**: Each step is clear and actionable
- **Not Over-Detailed**: Avoids micro-management, trusts developer judgment
- **Dependency-Aware**: Clearly marks which steps depend on others
- **Parallelizable**: Identifies tasks that can run concurrently
- **Track able**: Uses checkboxes to show progress
- **Testable**: Each step includes validation criteria
- **Phased**: Breaks large features into logical stages

## Creating an Implementation Plan

### Step 1: Review Research Findings

Before creating the plan, thoroughly review:
- Feature requirements and constraints
- Design decisions and rationale
- Integration points identified
- Technical considerations
- Dependencies (external and internal)
- POC results and recommendations

**Input:** `findings.md` or `research-notes.md` from `feature-research` skill

### Step 2: Identify Major Phases

Break the feature into logical phases. Each phase should:
- Deliver incrementally testable functionality
- Have clear boundaries and deliverables
- Be independently testable (backend → frontend → E2E)

**Example Phases for "Email Notifications Feature":**
1. Backend Email Service Implementation
2. Database Schema for Email History
3. Queue Integration with Hangfire
4. Frontend Notification Settings UI
5. Testing and Validation
6. Deployment

### Step 3: Break Phases into Steps

For each phase, create specific, actionable steps.

**Step Granularity Guidelines:**
- ✅ **Right Size**: "Implement EmailService with Microsoft Graph" (2-4 hours)
- ❌ **Too Large**: "Implement entire backend" (days)
- ❌ **Too Small**: "Add using statement for Microsoft.Graph" (minutes)

**Each Step Should Include:**
1. **Clear Action**: What to do (verb-first: "Implement", "Create", "Add", "Test")
2. **Context**: Where or what (file paths, component names)
3. **Acceptance Criteria**: How to know it's done
4. **Dependencies**: What must be completed first (if any)

### Step 4: Mark Dependencies

Identify dependencies between steps:

- **Sequential Dependencies**: Step B cannot start until Step A is complete
- **Parallel-Safe**: Steps that can run simultaneously

**Notation:**
```markdown
## Phase 1: Backend Implementation

- [ ] Step 1: Create User entity (no dependencies)
- [ ] Step 2: Create Form entity (no dependencies)
- [ ] Step 3: Add User-Form relationship (depends on Step 1 & 2)
  - **Depends on**: Step 1, Step 2

**Note**: Steps 1 and 2 can be done in parallel
```

### Step 5: Add Progress Tracking

Use checkboxes for every step:

```markdown
- [x] Completed step (marked as done)
- [ ] Pending step (not started)
```

Include an overall progress tracker:

```markdown
## Progress Overview

- [x] Phase 1: Backend Implementation (100%)
- [ ] Phase 2: Frontend Integration (0%)
- [ ] Phase 3: Testing (0%)
```

### Step 6: Add Validation Criteria

For each step or phase, add clear success criteria:

```markdown
## Phase 1: Backend Implementation

### Validation Criteria
- [ ] Backend compiles without errors
- [ ] All unit tests pass
- [ ] API endpoints return expected responses
- [ ] Database migrations apply successfully
```

### Step 7: Validate Plan

Use `scripts/validate_plan.py` to check:
- All sections are present
- Checkboxes are properly formatted
- Dependencies are clearly marked
- Acceptance criteria exist for each phase

## Plan Template Structure

See `references/plan-template.md` for a complete template based on `backend/docs/Plan.md` style.

**Key Sections:**
1. **Overview**: Feature description and scope
2. **Progress Tracker**: High-level phase completion status
3. **Phases**: Detailed breakdown with steps
4. **Validation Criteria**: Success criteria for each phase
5. **Dependencies**: External dependencies (libraries, services)
6. **Notes**: Important considerations or risks

## Identifying Parallelizable Work

### Patterns for Parallel Work

**1. Independent Modules**
```markdown
## Phase 2: Implementation

**Parallel Track A: Backend**
- [ ] Create API endpoints
- [ ] Add validation logic
- [ ] Write unit tests

**Parallel Track B: Frontend**
- [ ] Create UI components
- [ ] Add form validation
- [ ] Write component tests

**Note**: Tracks A and B can run simultaneously if API contract is defined
```

**2. Different Layers**
- Database schema changes (Track A)
- Business logic implementation (Track B, depends on Track A)
- UI implementation (Track C, can start if API contract is defined)

**3. Different Features**
- User authentication (Track A)
- Form builder (Track B)
- File upload (Track C)

*All three can run in parallel if they don't share dependencies*

### Dependency Matrix

For complex features with many dependencies, create a dependency matrix:

See `references/dependency-matrix.md` for detailed guidance.

**Simple Example:**
```markdown
| Step | Depends On     | Can Run in Parallel With |
|------|----------------|--------------------------|
| A    | None           | B, C                     |
| B    | None           | A, C                     |
| C    | None           | A, B                     |
| D    | A, B, C        | None                     |
```

## Level of Detail Guidelines

### What to Include

✅ **File Paths**: Where to create/modify files
```markdown
- [ ] Create `src/services/EmailService.ts`
- [ ] Modify `src/api/controllers/SubmissionsController.cs`
```

✅ **Key Interfaces/APIs**: What contracts to define
```markdown
- [ ] Define IEmailService interface with SendEmail and QueueEmail methods
```

✅ **Configuration Changes**: What settings to add
```markdown
- [ ] Add Microsoft Graph credentials to appsettings.json
```

✅ **Dependencies to Install**: What packages to add
```markdown
- [ ] Install Microsoft.Graph NuGet package
```

✅ **Test Requirements**: What tests to write
```markdown
- [ ] Write unit tests for EmailService
- [ ] Write E2E test for email notification flow
```

### What NOT to Include

❌ **Exact Code**: Leave implementation details to developer
```markdown
Bad: "Add line 42: const result = await emailService.send()"
Good: "Implement sendEmail method in EmailService"
```

❌ **Obvious Steps**: Don't micro-manage
```markdown
Bad: "Open Visual Studio, Click File > New > Class"
Good: "Create EmailService class"
```

❌ **Implementation Choices**: Trust developer judgment
```markdown
Bad: "Use a for loop to iterate through recipients"
Good: "Send emails to all recipients from form.recipients"
```

## Updating the Plan

The plan is a living document. As implementation progresses:

1. **Mark Steps Complete**: Check off completed steps
   ```markdown
   - [x] Create EmailService class
   ```

2. **Update Progress Percentages**:
   ```markdown
   - [x] Phase 1: Backend (100%)
   - [ ] Phase 2: Frontend (60%)
   ```

3. **Add Discovered Steps**: If new tasks are found
   ```markdown
   - [ ] Fix CORS configuration (discovered during testing)
   ```

4. **Note Blockers**: Document issues blocking progress
   ```markdown
   ## Blockers
   - Azure AD credentials not yet provisioned (blocking Phase 2)
   ```

5. **Adjust Estimates**: Update if reality differs from plan

## Example Plan: Email Notifications Feature

```markdown
# Implementation Plan: Email Notifications

## Overview
Add email notifications sent via Microsoft Graph when forms are submitted.

## Progress Tracker
- [x] Phase 1: Backend Email Service (100%)
- [ ] Phase 2: Queue Integration (50%)
- [ ] Phase 3: Frontend Settings (0%)
- [ ] Phase 4: Testing (0%)

---

## Phase 1: Backend Email Service

### Goals
Implement EmailService using Microsoft Graph API to send emails.

### Steps

- [x] Install Microsoft.Graph NuGet package
- [x] Create `src/Services/EmailService.cs` with IEmailService interface
- [x] Implement SendEmail method using Graph API
- [x] Add Microsoft Graph configuration to appsettings.json
- [x] Write unit tests for EmailService

**Dependencies**: None (can start immediately)

### Validation Criteria
- [x] Email successfully sent in development environment
- [x] Unit tests pass
- [x] Configuration properly loaded from appsettings

---

## Phase 2: Queue Integration

### Goals
Use Hangfire to queue emails for reliability.

### Steps

- [x] Install Hangfire.AspNetCore NuGet package
- [ ] Configure Hangfire in Program.cs
- [ ] Create QueueEmailJob background job
- [ ] Modify SubmissionsController to enqueue emails after submission
- [ ] Test email queuing and processing

**Dependencies**: Phase 1 must be complete
**Parallel Work**: Frontend Settings (Phase 3) can start now if API is defined

### Validation Criteria
- [ ] Emails enqueued successfully
- [ ] Hangfire dashboard shows queued jobs
- [ ] Emails processed from queue
- [ ] Failed emails retry automatically

---

## Phase 3: Frontend Settings

### Goals
Allow admins to configure email recipients in form settings.

### Steps

- [ ] Add recipients field to FormSettings interface
- [ ] Create MultiEmailInput component for recipient management
- [ ] Integrate MultiEmailInput in FormBuilder
- [ ] Update form creation/edit to save recipients
- [ ] Add email validation for recipients

**Dependencies**: API contract from Phase 2
**Parallel Work**: Can run in parallel with Phase 2 implementation

### Validation Criteria
- [ ] Recipients can be added/removed in form builder
- [ ] Invalid emails are rejected
- [ ] Recipients saved to database correctly

---

## Phase 4: Testing

### Goals
Comprehensive testing of email notification flow.

### Steps

- [ ] Write E2E test: Submit form → Email sent
- [ ] Write E2E test: Email delivery failure handling
- [ ] Manual testing with real Microsoft Graph account
- [ ] Performance testing: 100 emails queued simultaneously

**Dependencies**: All previous phases must be complete

### Validation Criteria
- [ ] All E2E tests pass
- [ ] Manual test emails received
- [ ] No performance degradation with high email volume
- [ ] Hangfire dashboard shows successful processing

---

## Dependencies

### External
- Microsoft.Graph NuGet package
- Hangfire.AspNetCore NuGet package
- Microsoft Graph API credentials (Azure AD app)

### Internal
- SubmissionsController (modify for email triggering)
- Form entity (add recipients field)

## Notes

- Microsoft Graph requires Azure AD app registration (credentials needed)
- Hangfire requires database storage (use existing PostgreSQL)
- Consider rate limiting for Microsoft Graph API (30 requests/second)

---

**Plan Version**: 1.0
**Last Updated**: [Date]
```

## Tips for Creating Effective Plans

1. **Start with Research**: Always base plans on thorough research
2. **Think in Phases**: Logical groupings make complex features manageable
3. **Be Specific**: "Create EmailService" is better than "Add emails"
4. **Mark Dependencies**: Clearly identify what blocks what
5. **Enable Parallelism**: Identify independent work streams
6. **Add Validation**: Every phase should have clear success criteria
7. **Keep it Living**: Update the plan as you learn
8. **Trust Developers**: Don't micro-manage implementation details
9. **Use Checkboxes**: Visual progress tracking is motivating
10. **Validate Structure**: Run validate_plan.py to ensure quality

## Common Planning Mistakes

### 1. Too Granular
**Mistake**: "Line 42: Add const email = req.body.email"
**Fix**: "Implement email extraction from request body"

### 2. Missing Dependencies
**Mistake**: Not marking that Step 5 requires Step 2 to be done first
**Fix**: Explicitly list dependencies for each step

### 3. No Parallelization
**Mistake**: Making everything sequential when tasks could be parallel
**Fix**: Identify independent work tracks

### 4. Vague Steps
**Mistake**: "Make it work"
**Fix**: "Implement EmailService.SendEmail with Graph API"

### 5. No Validation Criteria
**Mistake**: Steps without success criteria
**Fix**: Add "Validation Criteria" section for each phase

## Bundled Resources

- `scripts/validate_plan.py` - Validates plan structure and completeness
- `references/plan-template.md` - Complete implementation plan template
- `references/dependency-matrix.md` - Guide for identifying and documenting dependencies
