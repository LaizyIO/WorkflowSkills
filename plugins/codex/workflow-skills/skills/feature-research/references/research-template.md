# Feature Research: [Feature Name]

**Date:** [Date]
**Researcher:** [Name or Claude Code]
**Status:** [In Progress / Complete]

## Overview

[Brief description of the feature - 2-3 sentences explaining what it is and why it's needed]

## Requirements

### Functional Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Non-Functional Requirements
- Performance: [e.g., "Response time < 200ms"]
- Security: [e.g., "Must authenticate users"]
- Scalability: [e.g., "Support 10,000 concurrent users"]
- Compliance: [e.g., "GDPR compliant data storage"]

### User Stories (if applicable)
- As a [user type], I want to [action] so that [benefit]
- As a [user type], I want to [action] so that [benefit]

## Design Decisions

### Chosen Approach

[Detailed description of the recommended approach]

**Rationale:**
- [Reason 1 for choosing this approach]
- [Reason 2 for choosing this approach]
- [Reason 3 for choosing this approach]

**Technology Stack:**
- [Framework/Library 1]: [Purpose]
- [Framework/Library 2]: [Purpose]

### Alternatives Considered

#### Alternative 1: [Name]
**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Rejection Reason:** [Why this was not chosen]

#### Alternative 2: [Name]
**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Rejection Reason:** [Why this was not chosen]

## Integration Points

### Existing Components

#### Component A: [Name]
- **Location:** `src/path/to/component`
- **Integration:** [How this feature integrates with it]
- **Changes Required:** [What modifications are needed]

#### Component B: [Name]
- **Location:** `src/path/to/component`
- **Integration:** [How this feature integrates with it]
- **Changes Required:** [What modifications are needed]

### New Components

#### Component C: [Name]
- **Purpose:** [What it does]
- **Location:** `src/path/to/new/component` (proposed)
- **Interfaces:** [APIs/contracts it exposes]

## Architecture Diagram (Optional)

```
[Simple ASCII diagram or reference to diagram file]

User → Component A → New Feature → Component B → Database
```

## Technical Considerations

### Performance
- [Performance consideration 1]
- [Performance consideration 2]
- [Estimated load/metrics]

### Security
- [Security consideration 1]
- [Security consideration 2]
- [Authentication/authorization requirements]

### Scalability
- [Scalability consideration 1]
- [Scalability consideration 2]
- [Horizontal/vertical scaling strategy]

### Error Handling
- [Error scenario 1 and handling strategy]
- [Error scenario 2 and handling strategy]

### Data Persistence
- [Database schema changes required]
- [Data migration strategy]
- [Backup and recovery considerations]

## Dependencies

### External Dependencies
- [Library/Package 1] - Version: [x.y.z] - Purpose: [Why needed]
- [Library/Package 2] - Version: [x.y.z] - Purpose: [Why needed]

### Internal Dependencies
- [Internal Component 1] - Depends on feature X
- [Internal Component 2] - Depends on service Y

### API Endpoints

#### Endpoints to Create
- `POST /api/resource` - [Purpose]
- `GET /api/resource/{id}` - [Purpose]
- `PUT /api/resource/{id}` - [Purpose]
- `DELETE /api/resource/{id}` - [Purpose]

#### Endpoints to Modify
- `GET /api/existing` - [Modification needed]

## Database Schema Changes (if applicable)

### New Tables

```sql
CREATE TABLE new_table (
    id UUID PRIMARY KEY,
    field1 VARCHAR(255) NOT NULL,
    field2 INT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Modified Tables

```sql
ALTER TABLE existing_table
ADD COLUMN new_field VARCHAR(100);
```

## POC Results

### POC Overview
- **What Was Tested:** [Core concept validated]
- **POC Location:** [Path to POC files or branch]
- **Duration:** [Time spent on POC]

### Findings
- **Success:** [What worked well]
- **Challenges:** [What was difficult]
- **Learnings:** [Key takeaways]

### Performance Metrics (if measured)
- [Metric 1]: [Value]
- [Metric 2]: [Value]

### Recommendations
- [Recommendation 1 based on POC]
- [Recommendation 2 based on POC]

## Research References

### Documentation Consulted
- [MCP Deep Wiki Query 1]: [Link or summary]
- [MCP Deep Wiki Query 2]: [Link or summary]
- [External Documentation]: [URL]

### Design Patterns Used
- [Pattern 1]: [Why and how it applies]
- [Pattern 2]: [Why and how it applies]

### Similar Implementations in Codebase
- `src/path/to/similar/feature.ts` - [How it's similar and what was learned]
- `src/path/to/another/example.cs` - [How it's similar and what was learned]

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| [Risk 1] | High/Medium/Low | High/Medium/Low | [How to mitigate] |
| [Risk 2] | High/Medium/Low | High/Medium/Low | [How to mitigate] |

## Timeline Estimate (Rough)

- Research: [Completed]
- Planning: [X hours/days]
- Implementation: [X hours/days]
- Testing: [X hours/days]
- Total: [X hours/days]

*Note: These are rough estimates based on research. More accurate estimates will be in the implementation plan.*

## Open Questions

- [Question 1 that still needs answering]
- [Question 2 that still needs answering]

## Next Steps

1. [Next action 1]
2. [Next action 2]
3. Create implementation plan using `implementation-planner` skill

## Approval

- **Reviewed By:** [User/Team]
- **Approved:** [ ] Yes [ ] No [ ] Needs Revision
- **Comments:** [Any feedback or adjustments needed]

---

**Research Complete:** [Date]
