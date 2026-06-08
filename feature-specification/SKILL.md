---
name: feature-specification
description: Guide iterative specification and CDC (Cahier Des Charges) creation through deep questioning, context analysis, and proactive proposals. Use this skill BEFORE feature-research to clarify requirements, identify prerequisites, define scope, and document complete specifications. Triggers when starting a new feature, task, bug fix, or refactoring and requirements need clarification.
---

# Feature Specification Skill

## Purpose

Transform vague or incomplete requests into comprehensive, validated specifications through iterative dialogue. This skill produces a CDC (Cahier Des Charges) document in French that serves as the foundation for all subsequent phases.

**Key difference from feature-research:**
- `feature-specification` = WHAT to do (define precisely)
- `feature-research` = HOW to do it (technical research)

## IMPORTANT: User Interaction

**ALWAYS use the `request_user_input` tool to ask questions to the user.**

This tool allows structured questioning with multiple choice options:
- Ask 1-4 questions at a time
- Provide 2-4 options per question with descriptions
- User can select options or provide custom "Other" response
- Use `multiSelect: true` when multiple answers are valid

**Example usage:**
```
request_user_input:
  questions:
    - question: "Who are the primary users of this feature?"
      header: "Users"
      options:
        - label: "Internal employees"
          description: "Staff members using internal tools"
        - label: "External customers"
          description: "End users of the product"
        - label: "Administrators"
          description: "Users with elevated privileges"
      multiSelect: true
```

**Why this matters:**
- Structured questions are clearer for users
- Options help users think through possibilities
- Responses are unambiguous
- Conversation stays focused

## Specification Workflow

### Phase 1: Initial Context Analysis

1. **Read the user request** - Understand the initial ask
2. **Analyze project context** - Use Glob/Grep to discover:
   - Project structure and technologies
   - Existing similar features
   - Conventions and patterns in use
3. **Identify domain** - Understand the business context
4. **Ask initial framing questions** - Start the dialogue

```
Example initial analysis:
- Found: package.json → Node.js/React project
- Found: src/modules/auth/ → Authentication module exists
- Found: PostgreSQL migrations → Database with existing schema
```

### Phase 2: Deep Iterative Questioning

Ask questions across these categories. See `references/questioning-guide.md` for complete guide.

**2.1 Motivation & Objectives**
- What problem does this solve?
- What are the business goals?
- How will success be measured?

**2.2 Users & Personas**
- Who will use this?
- What is their technical level?
- What are their current workflows?

**2.3 Detailed Functionality**
- What exactly should happen?
- What actions must be possible?
- What are expected inputs/outputs?

**2.4 Constraints & Limits**
- Technical constraints (performance, security)?
- Business constraints (regulations, processes)?
- Time or budget constraints?

**2.5 Integration & Dependencies**
- What existing systems to integrate with?
- What prerequisites must be in place?
- Impact on existing functionality?

**2.6 Edge Cases & Exceptions**
- What if X fails?
- How to handle edge cases?
- What error scenarios to anticipate?

**Questioning principles:**
- Ask 2-4 questions at a time, not overwhelming lists
- Build on previous answers
- Validate understanding before moving on
- Be specific based on project context discovered

### Phase 3: Contextual Codebase Research

Explore the codebase to inform specifications:

1. **Find similar implementations**
   ```
   Glob: **/*Service.ts, **/*Controller.cs
   Grep: "similar-feature-name"
   ```

2. **Understand existing patterns**
   - How are similar features structured?
   - What conventions are followed?
   - What dependencies are used?

3. **Identify integration points**
   - Which components will be affected?
   - What interfaces exist?
   - What data models are relevant?

### Phase 4: Proactive Proposals

Be a force of proposal, not just passive. See `references/proposal-techniques.md`.

**Propose simplifications:**
```
"Rather than a complete notification system, I suggest starting with
emails only. This validates the concept before adding push/SMS."
```

**Suggest alternatives:**
```
"I noticed you don't have a queue system. For emails, I suggest using
Hangfire which is already configured in the project."
```

**Identify quick wins:**
```
"We could reuse the existing EmailTemplate component from the
password-reset feature."
```

**Anticipate problems:**
```
"If we store files locally, this won't work with multiple server
instances. Consider using Azure Blob Storage instead."
```

### Phase 5: CDC Documentation

Compile all gathered information into a CDC document.

1. **Create `CDC.md`** using template from `references/cdc-template.md`
2. **Review completeness** - Ensure all sections are filled appropriately
3. **Present for user approval**

## Context-Aware Questions

Adapt questions based on discovered project context:

**If PostgreSQL detected:**
> "This feature will need new database tables. Have you thought about the data model?"

**If React + TypeScript detected:**
> "Should we include visual verification with Codex Browser, or committed E2E tests with Playwright/Cypress for this feature?"

**If similar feature found:**
> "I found a similar feature in `src/modules/orders`. Should we follow the same pattern?"

**If authentication exists:**
> "Should this feature be restricted to authenticated users? Specific roles?"

## Output

The skill produces `CDC.md` containing:

- Clear problem statement and context
- Validated objectives with success criteria
- Explicit scope (in/out)
- Functional requirements with acceptance criteria
- Non-functional requirements (performance, security, accessibility)
- Constraints and prerequisites
- User personas and usage scenarios
- Identified risks with mitigations
- Documented decisions
- User approval

See `references/cdc-template.md` for the complete template.

## Tips for Effective Specification

1. **Ask before assuming** - Clarify ambiguities early
2. **Be context-aware** - Use project analysis to ask relevant questions
3. **Propose, don't just ask** - Offer options based on your analysis
4. **Document as you go** - Capture decisions in real-time
5. **Validate incrementally** - Confirm understanding before moving on
6. **Think integration** - Consider how this fits the existing system
7. **Anticipate problems** - Surface issues early
8. **Keep scope focused** - Help user avoid scope creep

## Integration with Workflow

```
Phase 0: Specification (this skill)
   ↓ CDC.md
Phase 1: Research (feature-research)
   ↓ findings.md
Phase 2: Planning (implementation-planner)
   ...
```

The CDC becomes input for `feature-research`, providing clear requirements for technical research.

## Bundled Resources

- `references/cdc-template.md` - Complete CDC template in French
- `references/questioning-guide.md` - Detailed questioning strategies by category
- `references/proposal-techniques.md` - Techniques for being proactive


## Compatibility Mapping (Claude -> Codex)

- `AskUserQuestion` -> `request_user_input`
- `Task tool` with `subagent_type` -> `spawn_agent` with `agent_type`
- `Glob`/`Grep`/`Read` instructions -> use shell tooling (`rg`, `Get-Content`, `Get-ChildItem`)
- If a Claude-specific primitive is unavailable, use the nearest Codex-native tool with equivalent intent

## UX DesignOps Integration

When a feature affects a user-visible interface, capture UX requirements during specification:

- user goal and primary task;
- target routes, screens, components, and flows;
- required loading, empty, error, success, disabled, permission, and offline states;
- accessibility and keyboard/focus constraints;
- desktop and mobile responsive constraints;
- design system, token, and component reuse constraints;
- expected UX documents under `[DOC]-*/11-UX-DesignOps/`.

Use `ux-flow` for feature journeys and `ux-component-spec` for shared UI components. Persistent UX docs require a `[DOC]-*` vault; never use `docs/obsidian` as fallback.
