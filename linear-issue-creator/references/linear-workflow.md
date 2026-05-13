# Linear Workflow Conventions — DEV-007

Source: `[DOC]-Laizy/08-Dev/Linear/DEV-007-Linear-Workflow.md`
Last sync: 2026-05-13

---

## Team & Projects

**Team**: `LaizyDev` (key `LAI`) — all issues prefixed `LAI-XX` regardless of project.

**Known projects** (add new ones as they are created in Linear):

| Linear project name | Description |
|---------------------|-------------|
| `Rikka` | Main Laizy app (FastAPI + React + Qdrant + N8N + Docker) |
| `Desktop App` | Companion desktop app (`laizy-desktop`) |
| `n8n Fork` | Internal n8n fork |

> For any new client or side project, ask the user for the exact Linear project name before creating the issue.

---

## Labels

### Type (exactly one per issue)

| Label | Template | Use case |
|-------|----------|----------|
| `Feature` | Feature | New user-facing capability |
| `Bug` | Bug / Hotfix | Broken existing behavior |
| `Improvement` | Idée | Enhancement or vague idea |
| `tech-debt` | Tech-Debt | Refacto, dependency update, technical cleanup |
| `refactor` | Tech-Debt | Code restructuring without behavior change |
| `docs` | — | Documentation only |
| `chore` | — | Maintenance, config |

### Area (at most one — the primary area)

| Label | When to use |
|-------|-------------|
| `frontend` | UI components, state management, CSS |
| `backend` | API, services, data processing |
| `api` | API design, contracts, integration endpoints |
| `infra` | Docker, CI/CD, scripts, deployments, cron |

If the issue clearly spans multiple areas, pick the one where **most of the work** happens. Note other areas in the description.

### Source (exactly one)

| Label | When to use |
|-------|-------------|
| `from-dev` | Internal team member — **default** |
| `from-PO` | Product Owner (commercial) |
| `from-client` | Direct client request |

---

## Priority Scale

| Value | Name | Default for |
|-------|------|-------------|
| 0 | No priority | Idée |
| 1 | Urgent | Hotfix |
| 2 | High | Bug |
| 3 | Medium | Feature |
| 4 | Low | Tech-Debt |

---

## Statuses

New issues are **always** created in state `À clarifier`. Never set another state at creation.

Full status progression (read-only reference):

| Status | Who moves there |
|--------|----------------|
| `À clarifier` | Default for all new issues |
| `Prêt à prendre` | Lead only |
| `Spécification en cours` | Dev/Stagiaire |
| `À reviewer (Spec/Plan)` | Dev after writing spec or plan |
| `Plan en cours` | Dev/Stagiaire |
| `Implémentation` | Dev/Stagiaire |
| `Code à review` | Dev after implementation |
| `Changes requested` | After rejected review |
| `Test local` | Dev after code review approved |
| `Test dev` | After merge to develop |
| `Test prod (UAT)` | Lead after Git tag |
| `Done` | PO after UAT |
| `Canceled` | Lead, deliberate abandon |
| `Duplicate` | Duplicate of another issue |

---

## Branch Naming Conventions

```
feature/LAI-{num}-slug-court
fix/LAI-{num}-slug-court
hotfix/LAI-{num}-slug-court
refactor/LAI-{num}-slug-court
```

- No project segment in branch name (the project is tracked in Linear, not Git)
- Kebab-case, lowercase, concise
- When LAI number is not yet known (new issue being created), write `LAI-XXX` as placeholder

---

## Obsidian / Documentation Artifacts Pattern

When a project has an Obsidian vault or structured doc folder, artifact paths follow this pattern:

```
{doc_root}/10-Archives/{TYPE}-XXX-{Name}/
  ├── {TYPE}-XXX-CDC.md          ← Specification phase
  ├── {TYPE}-XXX-Findings.md     ← Research phase
  ├── {TYPE}-XXX-Plan.md         ← Planning phase
  ├── {TYPE}-XXX-Test-Plan.md    ← Implementation phase
  └── {TYPE}-XXX-Test-Results.md ← Test phase
```

Where `TYPE` = `FEAT` / `BUG` / `TECH` / `HOTFIX`.

If the project has a different documentation structure, adapt the artifact paths to match what actually exists in the repo. Never hardcode Rikka-specific paths for non-Rikka projects.
