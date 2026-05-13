---
name: linear-issue-creator
description: Create well-formed Linear issues on command for any project. Accepts a GitHub URL or local disk path as project context, explores the codebase and documentation adaptively, then creates a structured issue using DEV-007 templates (Bug, Feature, Tech-Debt, Idée, Hotfix) via the Linear MCP.
---

# Linear Issue Creator Skill

## Purpose

Transform a natural-language request into a fully-structured Linear issue. The skill discovers and explores the target project — from GitHub or a local path — before writing, so the issue description contains real, sourced technical content rather than placeholders.

**Always runs in the main Claude Code session** (never as a sub-agent), because it calls `mcp__linear-server__save_issue` directly.

---

## Input Expected from User

Minimum:
```
"Crée une issue pour [description libre]"
"Issue sur [sujet]"
```

Optional enrichments:
- **Project source** (one of):
  - GitHub URL: `https://github.com/org/repo`
  - Local path: `D:\Projects\my-app` or `/home/user/my-app`
  - Current working directory (implicit if not specified)
- **Linear project name**: which Linear project to file the issue under (e.g. `Rikka`, `Desktop App`)
- **Type hint**: "c'est un bug" / "feature" / "tech-debt" / "hotfix" / "idée"
- **Priority hint**: "urgent" / "important" / "mineur"
- **Source label**: "remontée client" / "idée PO" / dev interne

**If neither a GitHub URL nor a local path is given**, and the request topic does not obviously match the current working directory, ask the user:
> "Sur quel projet dois-je créer cette issue ? Donne-moi une URL GitHub ou un chemin local."

---

## Workflow

### Step 0: Resolve Project Source

Determine **where** to read project context from.

#### Case A — GitHub URL provided

Use `gh` CLI (already authenticated, works for private and public repos).

```bash
# 1. Extract org/repo from the URL
#    https://github.com/org/repo  →  org/repo

# 2. Get the full file tree
gh api repos/{org}/{repo}/git/trees/HEAD?recursive=1 \
  --jq '[.tree[] | select(.type=="blob") | .path]'

# 3. Read README
gh api repos/{org}/{repo}/contents/README.md \
  --jq '.content' | base64 -d

# 4. Read key structural files (package.json, requirements.txt, go.mod,
#    Cargo.toml, docker-compose.yml, Makefile — whichever exist)
gh api repos/{org}/{repo}/contents/{path} \
  --jq '.content' | base64 -d

# 5. Read files most relevant to the issue topic (found in tree from step 2)
#    Limit to 4–5 files total.
```

Stop after the tree + 5 file reads. Work with what you have.

#### Case B — Local path provided (or current directory)

```
1. Glob: {path}/**/* to get the file tree (limit to first 200 results)
2. Identify: language/stack, main directories, framework patterns
3. Read key structural files: package.json / requirements.txt / Cargo.toml /
   go.mod / *.csproj / Makefile / docker-compose.yml (whichever exist)
4. Look for documentation: README.md, docs/, wiki/, any *DOC* folders, Obsidian vaults
```

#### Project structure fingerprinting

After initial discovery, identify:

| Signal | What it tells you |
|--------|------------------|
| `package.json` with React/Vue/Angular | Frontend JS/TS project |
| `requirements.txt` / `pyproject.toml` | Python backend |
| `*.csproj` / `*.sln` | .NET project |
| `go.mod` | Go project |
| `Cargo.toml` | Rust project |
| `docker-compose.yml` | Multi-service architecture |
| `[DOC]-*/` or `docs/` or `wiki/` | Has documentation vault |
| `*obsidian*` or `.obsidian/` | Obsidian documentation vault |

This fingerprint guides exploration in Step 2.

---

### Step 1: Classify the Issue Type

Apply this decision tree (first match wins):

```
Does the request describe a broken behavior in something that exists?
  ("ça marche pas", "bug", "broken", "ne se supprime pas", "erreur", "reste bloqué")
      → BUG

Is it an active production emergency — service down, critical function broken right now?
  ("urgent prod", "bloquant pour les users maintenant", "service down", "prod cassée")
      → HOTFIX

Is it cleanup / refacto / dependency update / technical debt with no new user-facing capability?
  ("clean", "refacto", "extraire", "mettre à jour la lib", "dette technique", "sécurité code")
      → TECH-DEBT

Is it a clearly scoped new capability — we know what it does and who benefits?
  ("ajouter X", "permettre à l'utilisateur de Y", "nouvelle page Z", "implémenter")
      → FEATURE

Otherwise (vague, exploratory, "tester si…", "voir pour…", beneficiary or scope unclear):
      → IDÉE
```

The user's type hint is a **clue, not a verdict**. Apply the tree and justify any override.

**Priority mapping:**

| User hint | Value |
|-----------|-------|
| "urgent" / "prod cassée" / "bloquant" | 1 (Urgent) |
| "important" / "high" | 2 (High) |
| no hint | Template default — Bug→2, Feature→3, Tech-Debt→4, Idée→0, Hotfix→1 |
| "mineur" / "nice to have" / "low" | 4 (Low) |

---

### Step 2: Research Project Context

**Goal**: produce real, sourced content for the issue description. Never invent technical details.

#### 2a. Adaptive exploration strategy

Search for the **key terms from the user's request** first:

```
# For local projects:
Grep: pattern="{keyword}" path="{project_root}" — to find relevant files

# Then read the files found:
Read: {file_path}  ← focus on the relevant sections
```

Then adapt depth based on issue type:

**BUG** — find the broken component:
- Where is the code path that handles the described behavior?
- What function / class / component / endpoint is involved?
- Are there existing error logs, tests, or comments that mention this issue?

**FEATURE** — find the integration surface:
- Is there an existing similar feature to use as a model?
- What services, APIs, DB tables, or components would be touched?
- Are there related issues, TODOs, or commented-out code?

**TECH-DEBT** — measure the scope:
- Which specific files / patterns are problematic?
- How many occurrences? What's the blast radius of a refactor?
- Are there existing tests covering the affected code?

**IDÉE** — check for overlap:
- Does a similar feature already exist in the codebase?
- Are there any existing issues, TODOs, or feature flags related to this idea?

**HOTFIX** — find the immediate source:
- What's the specific file/function causing the production error?
- Is there a recent commit that could have introduced it?

#### 2b. Documentation discovery

After exploring the code, look for project documentation:

```
Priority order for reading docs:
1. Specification files: CDC-*.md, spec-*.md, requirements-*.md
2. Database/schema docs: DB-*.md, schema.md, ERD files
3. Architecture docs: ARCH-*.md, architecture.md, ADR-*.md
4. Feature specs: FEAT-*.md, features/*.md
5. README and general docs
```

Use `Glob` to find documentation files:
```
{project_root}/**/*.md        ← all markdown
{project_root}/**/ADR-*.md   ← architecture decisions
{project_root}/**/*spec*.md  ← specifications
```

If a documentation vault exists (Obsidian or otherwise), check it for existing feature specs related to the issue topic before writing the description.

#### 2c. Stop condition

Stop researching when you have:
- The file path(s) most relevant to the issue
- An understanding of what already exists vs. what's new
- Enough context to write the acceptance criteria

**Maximum research budget**: ~10 file reads or web fetches. If you haven't found what you need, write "_à préciser_" for that section rather than inventing.

#### 2d. Zero hallucination rule

Every technical claim in the description must be either:
- **Sourced**: `"d'après \`path/to/file.py:42\`…"`, `"cf. FEAT-009…"`, `"service X dans docker-compose.yml"`
- **Flagged as uncertain**: `"_à confirmer lors de la phase spec_"`

Never invent file paths, function names, table names, or behaviors.

---

### Step 3: Build the Issue

#### 3a. Fill the correct template

Use the exact template structure from `references/linear-templates.md`. Copy section headers verbatim.

**Filling rules:**

**Context / Why** (Feature, Tech-Debt, Idée):
- One factual paragraph explaining the business/technical need
- Source everything: `"cf. \`src/services/auth.ts\`"`, `"d'après la doc ARCH-*.md"`

**Symptom / Reproduction** (Bug, Hotfix):
- Use real file paths and component names found in Step 2
- If reproduction steps are unknown: `"_Étapes à préciser — reproduire depuis l'UI ou l'API_"`

**Acceptance criteria** (Feature, Bug, Tech-Debt):
- 3–6 verifiable, realistic items
- Include a documentation update criterion when the change is substantial
- For Hotfix: keep criteria minimal — fix, test, post-mortem

**Artifacts section**:
- Keep `FEAT-XXX` / `BUG-XXX` / `TECH-XXX` as literal placeholders
- Branch slug: derive from issue title, kebab-case
- Write `feature/LAI-XXX-slug` — the actual LAI number is assigned after creation

**Links section**:
- Fill with actual file paths and doc references found
- Use `(à remplir)` only when genuinely nothing was found

#### 3b. Compose title and labels

**Title**: `[{Type}] Titre court et clair` — under 80 characters, correct French, describes the outcome.

**Labels** (from `references/linear-workflow.md`):

| Group | Rule |
|-------|------|
| Type | One — must match template: `Feature` / `Bug` / `Improvement` / `tech-debt` / `refactor` |
| Area | At most **one** primary area: `frontend` / `backend` / `api` / `infra` |
| Source | One — default `from-dev` unless user says otherwise |

Only use existing Linear labels. Do not invent new ones.

---

### Step 4: Create the Issue via MCP

```
mcp__linear-server__save_issue:
  team: "LaizyDev"
  project: "{Linear project name}"
  title: "{normalized title}"
  description: "{filled template — literal newlines, not \n}"
  priority: {0–4}
  labels: ["{type}", "{area if known}", "{source}"]
  state: "À clarifier"
```

Rules:
- **No `id` parameter** → creates new issue (never updates)
- **state always `À clarifier`** → never set another state at creation
- **project** → ask user if not specified and cannot be inferred

---

### Step 5: Post-Creation Report

Tell the user:
1. Issue identifier (`LAI-XXX`), title, URL
2. Type chosen + one-line justification (especially if it differs from the user's hint)
3. Any flags: potential duplicate found, sections left as "_à préciser_", uncertain classification

---

## Special Cases

### Potential duplicate

If research reveals an existing issue or feature covering the same topic:
- Report it before creating: "LAI-XX semble couvrir X — je crée quand même ou je complète celle-là ?"
- Wait for user confirmation before creating.

### Issue spans multiple areas

Pick the **primary** area label only. Note the secondary area in the description text.

### Request too vague to research

Create the issue with skeleton template, write `"_À préciser avec le PO/dev d'origine — contexte non retrouvé dans le code ou la doc_"` in affected sections. Flag clearly in the post-creation report.

### Project not in Linear

If the user names a project that doesn't exist in Linear:
- Ask: "Le projet '{name}' n'existe pas dans Linear. Quel projet Linear dois-je utiliser ?"
- Never create an issue in the wrong project.

### GitHub URL — `gh` not available or auth failure

If `gh api` returns an error (not installed, not authenticated, repo not found):
- Run `gh auth status` to diagnose
- If not authenticated: `gh auth login` (prompt user to run it)
- If repo genuinely not found: ask the user to verify the URL or provide a local path

---

## Quality Rules

1. **Zero hallucination** — every technical claim sourced or flagged
2. **No product decisions** — classify and structure; never decide priority, scope, or go/no-go
3. **Correct French** — titles, descriptions, all written content in French (accents required)
4. **Template fidelity** — copy section headers exactly, do not invent sections
5. **State is immutable at creation** — always `À clarifier`
6. **Labels discipline** — only existing Linear labels, at most one Area label
7. **Research before writing** — explore first, fill second

---

## Integration with Other Skills

This skill is standalone. Once an issue is created and the lead moves it to `Prêt à prendre`, the standard feature workflow begins:

```
linear-issue-creator  →  LAI-XXX created in "À clarifier"
                          ↓ Lead: moves to "Prêt à prendre"
feature-specification →  CDC.md
feature-research      →  Findings.md
implementation-planner→  Plan.md
feature-implementer   →  Code
test-executor/fixer   →  Validation
```

---

## Bundled Resources

- `references/linear-templates.md` — 5 DEV-007 templates (exact structure to copy)
- `references/linear-workflow.md` — Labels, statuses, projects, GitFlow conventions
- `references/issue-classification.md` — Classification tree with examples and edge cases
