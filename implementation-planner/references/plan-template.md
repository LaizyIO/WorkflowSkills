# Implementation Plan: [Feature Name]

**Date Created:** [Date]
**Last Updated:** [Date]
**Status:** [Planning / In Progress / Complete]

---

## Overview

[2-3 paragraph description of the feature]

**Goals:**
- [Primary goal 1]
- [Primary goal 2]
- [Primary goal 3]

**Scope:**
- **In Scope**: [What this plan includes]
- **Out of Scope**: [What this plan explicitly excludes]

---

## Progress Tracker

- [ ] **Phase 1**: [Phase Name] (0%)
- [ ] **Phase 2**: [Phase Name] (0%)
- [ ] **Phase 3**: [Phase Name] (0%)
- [ ] **Phase 4**: [Phase Name] (0%)

**Overall Progress:** 0/X phases complete

---

## Phase 1: [Phase Name]

### Goals
[What this phase aims to accomplish]

### Prerequisites
[What must be in place before starting this phase]

### Steps

#### Backend Implementation

- [ ] **Step 1.1**: [Action description]
  - **Location**: `path/to/file.ext`
  - **Details**: [Brief implementation notes]
  - **Dependencies**: None / Depends on Step X.X

- [ ] **Step 1.2**: [Action description]
  - **Location**: `path/to/file.ext`
  - **Details**: [Brief implementation notes]
  - **Dependencies**: Step 1.1

#### Frontend Implementation

- [ ] **Step 1.3**: [Action description]
  - **Location**: `path/to/file.ext`
  - **Details**: [Brief implementation notes]
  - **Dependencies**: None (can run in parallel with backend)

**Parallel Work Opportunities:**
- Steps 1.1 and 1.3 can run simultaneously
- Step 1.2 requires 1.1 to complete first

### Dependencies

**External Dependencies:**
- [Package/Library Name] - Version X.Y.Z - Purpose: [Why needed]

**Internal Dependencies:**
- [Component/Service Name] - [What it provides]

### Validation Criteria

- [ ] [Success criterion 1]
- [ ] [Success criterion 2]
- [ ] [Success criterion 3]
- [ ] All tests pass
- [ ] Code compiles/builds without errors

### Notes

[Any important considerations, risks, or decisions for this phase]

---

## Phase 2: [Phase Name]

### Goals
[What this phase aims to accomplish]

### Prerequisites
- Phase 1 must be complete
- [Any other prerequisites]

### Steps

- [ ] **Step 2.1**: [Action description]
  - **Location**: `path/to/file.ext`
  - **Details**: [Brief implementation notes]
  - **Dependencies**: Phase 1 complete

- [ ] **Step 2.2**: [Action description]
  - **Location**: `path/to/file.ext`
  - **Details**: [Brief implementation notes]
  - **Dependencies**: Step 2.1

### Dependencies

**External Dependencies:**
- [Package/Library Name] - Version X.Y.Z

**Internal Dependencies:**
- Results from Phase 1

### Validation Criteria

- [ ] [Success criterion 1]
- [ ] [Success criterion 2]

### Notes

[Important notes]

---

## Phase 3: [Phase Name]

[Repeat structure from Phase 1/2]

---

## Phase N: Testing & Validation

### Goals
Comprehensive testing of the entire feature

### Test Plan

#### Unit Tests
- [ ] Test [Component A]
- [ ] Test [Component B]

#### Integration Tests
- [ ] Test [Integration point 1]
- [ ] Test [Integration point 2]

#### E2E Tests
- [ ] Test [User flow 1]
- [ ] Test [User flow 2]

#### Performance Tests
- [ ] Test [Performance scenario 1]
- [ ] Test [Performance scenario 2]

### Validation Criteria

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Performance meets requirements
- [ ] Manual testing complete
- [ ] No critical bugs

---

## Dependencies Summary

### External Dependencies
| Dependency | Version | Purpose | Installation |
|------------|---------|---------|--------------|
| [Package 1] | X.Y.Z | [Purpose] | `npm install pkg1` |
| [Package 2] | X.Y.Z | [Purpose] | `dotnet add package Pkg2` |

### Internal Dependencies
| Component | Location | Purpose |
|-----------|----------|---------|
| [Component A] | `path/to/component` | [What it provides] |
| [Component B] | `path/to/component` | [What it provides] |

---

## Parallelization Matrix

| Phase/Step | Can Start After | Can Run in Parallel With |
|------------|-----------------|--------------------------|
| Phase 1 | Immediate | None |
| Phase 2.1 | Phase 1 | Phase 2.2 |
| Phase 2.2 | Phase 1 | Phase 2.1 |
| Phase 3 | Phase 2.1 & 2.2 | None |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk description] | High/Medium/Low | [How to mitigate] |

---

## Open Questions

- [ ] [Question 1 that needs answering]
- [ ] [Question 2 that needs answering]

---

## Blockers

[Document any current blockers]

- [Blocker 1]: [Description and status]
- [Blocker 2]: [Description and status]

---

## Notes & Decisions

### Design Decisions
- **Decision 1**: [What was decided and why]
- **Decision 2**: [What was decided and why]

### Implementation Notes
- [Important note 1]
- [Important note 2]

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| [Date] | Plan created | [Name] |
| [Date] | Phase 1 completed | [Name] |

---

**Plan Version:** 1.0
