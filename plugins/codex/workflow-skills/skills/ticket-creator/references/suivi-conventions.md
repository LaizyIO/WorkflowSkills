# Suivi Conventions

How a ticket is stored in the suivi of a project. Reference: Slipstream, `ARCH-Suivi-Format`. Replaces the former Linear workflow conventions (DEV-007).

---

## Where tickets live

One Markdown file per ticket, `tickets/T-<aammjj>-<xxx>.md`, in the `suivi` branch of the project's repository. Slipstream keeps a local copy and synchronises it; the `suivi` MCP server writes into that copy. Nobody commits to the `suivi` branch by hand.

The identifier carries the creation date and three random characters (`T-261104-K7Q`): two machines can create tickets offline without colliding. It is assigned by the tool; never invent one.

---

## Fields

| Field | Values | Notes |
|-------|--------|-------|
| `titre` | free text | One short sentence |
| `type` | `bug`, `tache`, `rappel`, `idee` | `tache` by default |
| `priorite` | `haute`, `normale`, `basse` | `normale` by default |
| `echeance` | `AAAA-MM-JJ` | Optional |
| `assigne` | a person's identifier in the suivi | Optional |
| `feature` | `FEAT-XXX` | Optional; links the ticket to the feature's documents in the project's vault |
| `corps` | Markdown | The filled template |

The author and the dates are set by the tool.

There are **no labels, no area, no source field, no project board**. What does not fit a field goes in the body.

---

## Types

| Type | Use case |
|------|----------|
| `bug` | Broken existing behaviour, including production emergencies (priority `haute`) |
| `tache` | Something to build or to clean: feature, technical debt, refactor |
| `rappel` | Something not to forget, usually with a due date |
| `idee` | An improvement to evaluate or to propose to the client; not work to do yet |

---

## Statuses

A new ticket is always `ouvert`. The status is never set at creation.

| Status | Meaning |
|--------|---------|
| `ouvert` | To do |
| `en-cours` | Someone is on it |
| `fait` | Done |
| `ecarte` | Deliberately dropped (an idea that is dropped is not proposed again) |

Statuses change in Slipstream or with `suivi_clore_ticket`.

---

## Branch Naming Conventions

```
feature/slug-court
fix/slug-court
hotfix/slug-court
refactor/slug-court
```

- Kebab-case, lowercase, concise, derived from the ticket title
- When the ticket belongs to a documented feature, prefer its reference: `feature/FEAT-012-onboarding`

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
