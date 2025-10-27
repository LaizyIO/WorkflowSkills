# Dependency Matrix Guide

## Purpose

A dependency matrix helps visualize and document dependencies between implementation steps, making it easier to identify parallel work opportunities and avoid bottlenecks.

## When to Create a Dependency Matrix

Create a dependency matrix when:
- Feature has 10+ steps across multiple phases
- Multiple developers will work on the feature simultaneously
- Complex interdependencies make parallel work planning difficult
- Need to visualize the critical path through implementation

For simple features (<10 steps), inline dependency notes are sufficient.

## Matrix Format

### Basic Format

| Step | Depends On | Can Run in Parallel With |
|------|-----------|--------------------------|
| A | None | B, C |
| B | None | A, C |
| C | None | A, B |
| D | A, B, C | None |

### Detailed Format (Complex Projects)

| Step | Description | Depends On | Blocks | Est. Hours | Assignee |
|------|-------------|------------|--------|------------|----------|
| 1.1 | Create User entity | None | 1.3 | 2h | Dev A |
| 1.2 | Create Form entity | None | 1.3 | 2h | Dev B |
| 1.3 | Add User-Form relation | 1.1, 1.2 | 2.1 | 1h | Dev A |
| 2.1 | Create FormsController | 1.3 | 3.1 | 4h | Dev A |

## Identifying Dependencies

### Types of Dependencies

#### 1. **Data Dependencies**
Step B needs data/entities created in Step A.

**Example:**
```
Step A: Create User entity
Step B: Create Submission entity with UserId foreign key
→ Step B depends on Step A
```

#### 2. **Interface Dependencies**
Step B needs API contract defined in Step A.

**Example:**
```
Step A: Define IEmailService interface
Step B: Implement EmailService
Step C: Use EmailService in SubmissionsController
→ B depends on A, C depends on A (contract) but can run parallel with B
```

#### 3. **Build Dependencies**
Step B needs Step A to compile successfully.

**Example:**
```
Step A: Install NuGet package
Step B: Use package in code
→ B depends on A
```

#### 4. **Test Dependencies**
Step B needs Step A to be testable.

**Example:**
```
Step A: Implement backend API
Step B: Write E2E tests for API
→ B depends on A
```

### Dependencies vs. Preferences

**Dependency (Must Wait):**
- Step B cannot start until Step A is complete
- Technical blocker

**Preference (Nice to Wait):**
- Step B could start, but it's easier if Step A is done first
- Not a technical blocker

**Mark only true dependencies in the matrix.**

## Creating the Matrix

### Step 1: List All Steps

Extract all steps from your implementation plan:

```
1.1 Create User entity
1.2 Create Form entity
1.3 Add User-Form relationship
2.1 Create UsersController
2.2 Create FormsController
3.1 Create user management UI
3.2 Create form builder UI
```

### Step 2: Identify Direct Dependencies

For each step, ask:
- "What must be completed before I can start this step?"
- "What data/interfaces/components does this step need?"

```
1.1: None (can start immediately)
1.2: None (can start immediately)
1.3: Needs 1.1 and 1.2 (User and Form entities)
2.1: Needs 1.1 (User entity)
2.2: Needs 1.2 and 1.3 (Form entity and relationships)
3.1: Needs 2.1 (API contract defined)
3.2: Needs 2.2 (API contract defined)
```

### Step 3: Document Parallel Opportunities

For each step, identify what can run simultaneously:

```
1.1 can run in parallel with: 1.2
1.2 can run in parallel with: 1.1
1.3 cannot run in parallel (needs 1.1 and 1.2)
2.1 can run in parallel with: 1.2, 1.3 (if started after 1.1)
2.2 can run in parallel with: 2.1 (both need 1.3)
3.1 can run in parallel with: 2.2, 3.2 (if API contract defined)
3.2 can run in parallel with: 2.1, 3.1 (if API contract defined)
```

### Step 4: Create the Matrix

| Step | Depends On | Can Run in Parallel With | Notes |
|------|------------|--------------------------|-------|
| 1.1 | None | 1.2 | Independent entities |
| 1.2 | None | 1.1 | Independent entities |
| 1.3 | 1.1, 1.2 | None | Needs both entities |
| 2.1 | 1.1 | 2.2 (after 1.3) | Needs User entity |
| 2.2 | 1.2, 1.3 | 2.1 | Needs Form + relations |
| 3.1 | 2.1 (API contract) | 2.1 (impl), 3.2 | Can start when API defined |
| 3.2 | 2.2 (API contract) | 2.2 (impl), 3.1 | Can start when API defined |

## Visualization Options

### Gantt-Style Timeline

```
Week 1:
  Day 1-2: [1.1] [1.2]  ← Parallel
  Day 3:   [1.3]        ← Sequential (depends on 1.1 & 1.2)
  Day 4-5: [2.1] [2.2]  ← Parallel (after 1.3)

Week 2:
  Day 1-3: [3.1] [3.2]  ← Parallel (API contracts defined)
  Day 4-5: [Testing]
```

### Dependency Graph (ASCII)

```
    1.1 ──┐
          ├──> 1.3 ──┐
    1.2 ──┘          ├──> 2.2 ──> 3.2
                     │
    (1.1) ─────> 2.1 ─────────> 3.1
                     │
                     └──> [Both complete] ──> Testing
```

## Example: Complex Feature

**Feature:** Real-Time Notifications with SignalR

### Full Dependency Matrix

| Step | Description | Depends On | Can Parallel | Est | Dev |
|------|-------------|------------|--------------|-----|-----|
| 1.1 | Install SignalR packages | None | 1.2, 1.3 | 0.5h | A |
| 1.2 | Create Notification entity | None | 1.1, 1.3 | 2h | B |
| 1.3 | Setup Redis for scaling | None | 1.1, 1.2 | 2h | C |
| 2.1 | Create NotificationHub | 1.1 | 2.2 | 3h | A |
| 2.2 | Configure SignalR in Program.cs | 1.1, 1.3 | 2.1 | 1h | A |
| 2.3 | Create NotificationService | 1.2 | 3.1 | 3h | B |
| 3.1 | Install @microsoft/signalr (frontend) | None | 2.x, 3.2 | 0.5h | C |
| 3.2 | Create useNotifications hook | 3.1, 2.1 (contract) | 3.3 | 4h | C |
| 3.3 | Integrate notifications in UI | 3.2 | 4.1 | 3h | C |
| 4.1 | Write E2E tests | 2.x, 3.x | 4.2 | 4h | All |
| 4.2 | Performance testing (load) | 2.2, 1.3 (Redis) | 4.1 | 3h | A |

### Parallel Tracks

**Track A (Backend Core):** 1.1 → 2.1 → 2.2 → 4.2
**Track B (Data Layer):** 1.2 → 2.3
**Track C (Frontend):** 3.1 → 3.2 → 3.3

**Critical Path:** 1.1 → 2.1 → 2.2 → 3.2 → 3.3 → 4.1 (~17.5 hours)

**Optimization:**
- Tracks A, B, C can run mostly in parallel
- Total time with 3 devs: ~18 hours (vs 26 hours sequential)

## Tips for Effective Dependency Management

1. **Be Specific**: "Depends on User entity" is better than "Depends on Phase 1"
2. **Distinguish Contract from Implementation**: Frontend can start when API contract is defined, doesn't need implementation complete
3. **Mark True Dependencies Only**: Don't mark preferences as dependencies
4. **Update as You Learn**: Dependencies may change during implementation
5. **Communicate**: Share matrix with team so everyone knows what blocks what
6. **Identify Critical Path**: Focus on longest dependency chain
7. **Optimize Parallel Work**: Look for opportunities to break dependencies
8. **Consider Mocking**: Can frontend mock backend API to start sooner?

## Common Dependency Patterns

### Pattern 1: Layer Dependencies

```
Database Schema → Backend API → Frontend UI
```
Each layer depends on the previous.

**Optimization:** Define API contracts first, allowing frontend to start sooner.

### Pattern 2: Component Dependencies

```
Component A ──┐
              ├──> Integration Component
Component B ──┘
```

Integration component depends on A and B, but A and B are independent.

### Pattern 3: Pipeline Dependencies

```
Step 1 → Step 2 → Step 3 → Step 4
```

Purely sequential. Look for opportunities to parallelize.

**Optimization:** Can steps 2 and 3 run in parallel? Can we start step 4 earlier?

### Pattern 4: Fan-Out Dependencies

```
       ┌──> Component A
Core ──┼──> Component B
       └──> Component C
```

After core is done, multiple parallel tracks.

**Optimization:** Maximize parallel work after core completion.

## When Dependencies Change

Dependencies may change during implementation:

**Scenario:** Discovered that Step 3.2 actually depends on Step 2.3 (not originally identified)

**Action:**
1. Update dependency matrix
2. Notify affected team members
3. Adjust timeline if needed
4. Document reason for change

## Conclusion

A well-maintained dependency matrix:
- ✅ Enables efficient parallel work
- ✅ Prevents blocking and bottlenecks
- ✅ Helps estimate realistic timelines
- ✅ Facilitates team coordination
- ✅ Makes critical path visible

Start with a simple matrix and add detail as needed. The goal is clarity, not perfection.
