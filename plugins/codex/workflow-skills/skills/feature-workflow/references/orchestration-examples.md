# Workflow Orchestration Examples

## Example 1: Full Autonomous Workflow

**Scenario:** Start from scratch, implement complete feature

**Config:**
```json
{
  "workflow": {
    "phases": ["research", "plan", "implement", "test", "fix"],
    "auto_iterate": true,
    "max_iterations": 3
  }
}
```

**Usage:**
```bash
feature-workflow --config full-workflow.json
# or
feature-workflow --full
```

**Flow:**
```
Research → Plan → Implement → Test → Fix (iterate) → Complete
```

---

## Example 2: Skip Research (Already Done)

**Scenario:** Research complete, start from planning

**Config:**
```json
{
  "workflow": {
    "phases": ["plan", "implement", "test", "fix"],
    "skip_phases": ["research"]
  },
  "planning": {
    "validate": true
  }
}
```

**Usage:**
```bash
feature-workflow --skip research
```

**Flow:**
```
[Research exists] → Plan → Implement → Test → Fix → Complete
```

---

## Example 3: Stop After Planning (Review Before Implementation)

**Scenario:** Generate plan, review with team before implementing

**Config:**
```json
{
  "workflow": {
    "phases": ["research", "plan"],
    "stop_after": "plan"
  }
}
```

**Usage:**
```bash
feature-workflow --stop-after plan
```

**Flow:**
```
Research → Plan → [STOP for review]
```

After review:
```bash
feature-workflow --skip research,plan
```

---

## Example 4: Implementation Only (with Worktree)

**Scenario:** Plan ready, just implement in new worktree

**Config:**
```json
{
  "workflow": {
    "phases": ["implement"],
    "skip_phases": ["research", "plan", "test", "fix"]
  },
  "implementation": {
    "use_worktree": true,
    "worktree_name": "feature/email-notifications",
    "build_after_each_step": true
  }
}
```

**Usage:**
```bash
feature-workflow --phases implement --use-worktree
```

---

## Example 5: Test-Fix Loop Only

**Scenario:** Implementation complete, just run tests and fix

**Config:**
```json
{
  "workflow": {
    "phases": ["test", "fix"],
    "auto_iterate": true,
    "max_iterations": 5
  },
  "testing": {
    "test_plan_file": "test-plan.md"
  }
}
```

**Usage:**
```bash
feature-workflow --phases test,fix --max-iterations 5
```

**Flow:**
```
Test → [if failures] → Fix → Test → [if still failing] → Fix → ...
```

---

## Example 6: Incremental Build and Test

**Scenario:** Build and test after each implementation step (slower but catches issues early)

**Config:**
```json
{
  "workflow": {
    "phases": ["implement", "test"]
  },
  "implementation": {
    "build_after_each_step": true,
    "test_after_each_step": true
  }
}
```

**Flow:**
```
Implement Step 1 → Build → Test
Implement Step 2 → Build → Test
...
```

---

## Example 7: Parallel Implementation (Advanced)

**Scenario:** Multiple developers working on different phases simultaneously

**Config:**
```json
{
  "workflow": {
    "phases": ["implement"],
    "parallel_implementation": true
  },
  "implementation": {
    "use_worktree": true
  }
}
```

**Creates multiple worktrees for independent steps**

---

## Example 8: Research with Required POC

**Scenario:** Always create POC during research

**Config:**
```json
{
  "workflow": {
    "phases": ["research", "plan"]
  },
  "research": {
    "create_poc": "always",
    "output_file": "research-findings.md"
  }
}
```

---

## Example 9: Custom File Names

**Scenario:** Non-standard file names

**Config:**
```json
{
  "research": {
    "output_file": "feature-research.md"
  },
  "planning": {
    "output_file": "implementation-plan.md"
  },
  "testing": {
    "test_plan_file": "qa-tests.md",
    "failure_report_file": "test-errors.md"
  }
}
```

---

## Example 10: Stop on First Test Failure (Debugging)

**Scenario:** Debugging flaky tests, stop on first failure

**Config:**
```json
{
  "workflow": {
    "phases": ["test"]
  },
  "testing": {
    "stop_on_first_failure": true
  }
}
```

---

## Command-Line Examples

### Full Workflow
```bash
feature-workflow --full
```

### Skip Specific Phases
```bash
feature-workflow --skip research,plan
```

### Run Specific Phases
```bash
feature-workflow --phases implement,test,fix
```

### Stop After Phase
```bash
feature-workflow --stop-after plan
```

### Max Iterations
```bash
feature-workflow --max-iterations 5
```

### Combined
```bash
feature-workflow --skip research --phases plan,implement,test,fix --max-iterations 3
```

---

## Use Cases Summary

| Use Case | Command | Config Key Points |
|----------|---------|-------------------|
| New feature (full) | `--full` | All phases |
| Research done | `--skip research` | Skip research |
| Review before impl | `--stop-after plan` | Stop after plan |
| Just implement | `--phases implement` | Implementation only |
| Just test | `--phases test,fix` | Test-fix loop |
| With worktree | `--use-worktree` | Parallel development |
| Debug tests | `--stop-on-first-failure` | Stop early |
