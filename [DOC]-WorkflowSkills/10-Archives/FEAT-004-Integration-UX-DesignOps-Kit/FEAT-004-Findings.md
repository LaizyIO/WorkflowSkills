---
title: FEAT-004 Integration UX DesignOps Kit - Findings
type: research
status: completed
created: 2026-06-07
updated: 2026-06-07
feature: FEAT-004
tags:
  - feature-workflow
  - research
  - ux
  - designops
  - codex
  - clai
---

# FEAT-004 - Integration UX DesignOps Kit - Findings

## Overview

Objectif: remplacer completement l'ancien skill UI `ux-refactor` par le nouveau **Codex UX/UI DesignOps Kit** et l'integrer proprement dans la Workflow Skills Suite, le plugin Codex, la CLI `clai`, le template `AGENTS.md`, et le systeme documentaire `[DOC]-*`.

Le nouveau kit ne doit pas etre traite comme un simple pack de skills. Il contient un workflow complet:

- skills Codex UX/UI;
- directives persistantes `AGENTS.md`;
- fichier portable `DESIGN.md`;
- memoire UX/UI projet;
- prompts Google Stitch;
- script local `scripts/ux/uxkit-lite.mjs`;
- logique de bootstrap, audit, flow, Stitch, implementation, polish, review, sync documentation.

## Requirements

- Remplacer l'ancien UI kit existant (`ux-refactor`) par le nouveau kit.
- Brancher le nouveau workflow UX dans la Workflow Skills Suite existante.
- Respecter la structure documentaire projet `[DOC]-<Project>/`.
- Ajouter les directives UX/UI au template `AGENTS.md` existant sans casser les directives documentation/workflow deja presentes.
- Integrer l'initialisation dans la CLI `clai`, notamment pour les projets Codex.
- Garder une separation nette entre:
  - les skills reutilisables distribues par le plugin Workflow Skills;
  - les artefacts projet generes par `clai init`.
- Eviter de creer deux systemes documentaires concurrents (`docs/obsidian` vs `[DOC]-*`).

## Source Package Analysis

Source analysee:

- `D:\WorkflowSkills\codex-uiux-skill-pack.zip`
- `D:\WorkflowSkills\EXPORT_COMPLET.md`

Le zip s'extrait en `codex_ux_ui_designops_kit/`.

Contenu principal:

```text
AGENTS.md
DESIGN.md
EXPORT_COMPLET.md
README.md
.agents/skills/
design/stitch/
docs/obsidian/
scripts/ux/uxkit-lite.mjs
```

Le fichier `EXPORT_COMPLET.md` est conforme a l'archive, mais il est partiel: il consolide les documents principaux, pas les 13 `SKILL.md`, les prompts Stitch, les templates, ni le script.

## New Skills

Le nouveau kit contient 13 skills valides:

| Skill | Role |
|-------|------|
| `ux-bootstrap` | Initialiser la memoire UX/UI projet sans changer le comportement |
| `ux-audit` | Auditer ecran, composant, flow ou feature avant code |
| `ux-flow` | Documenter le parcours utilisateur avant design/code |
| `ux-component-spec` | Documenter un composant, ses variants, etats et contrats accessibilite |
| `ux-stitch-brief` | Transformer une demande vague en brief Stitch |
| `ux-stitch-generate` | Generer un prompt Stitch depuis `DESIGN.md` et les docs UX |
| `ux-stitch-iterate` | Preparer une iteration sur une direction Stitch existante |
| `ux-code-to-stitch` | Convertir le contexte code existant en brief Stitch |
| `ux-implement-from-stitch` | Implementer une direction Stitch dans le vrai code projet |
| `ux-polish` | Ameliorer une UI existante sans changer la logique metier |
| `ux-review-no-playwright` | A remplacer par un skill de verification visuelle Playwright/browser |
| `ux-design-sync` | Synchroniser `DESIGN.md`, docs UX, Stitch et decision log apres changement |
| `ux-storybook` | Documenter les etats composants via Storybook si present |

Tous les skills ont un frontmatter `name` et `description` valide. Aucun nom ne collisionne avec les skills deja presents dans `C:\Users\guillaume\.agents\skills`.

Point non bloquant: aucun skill n'a de `agents/openai.yaml`. Pour une integration produit plus propre, il faudra en generer un par skill ou accepter une UI moins riche.

## Existing Architecture

### Plugin Codex

Le plugin est expose via:

```text
plugins/codex/marketplace.json
plugins/codex/workflow-skills/.codex-plugin/plugin.json
plugins/codex/workflow-skills/skills/
```

Le manifest actuel mentionne encore `ux-refactor` dans la description et les prompts par defaut. `plugins/codex/README.md` documente aussi uniquement `ux-refactor`.

### Skills sources du repo

Les skills existent en double forme:

- racine repo: `feature-research/`, `ux-refactor/`, etc.;
- plugin Codex: `plugins/codex/workflow-skills/skills/<skill>/`.

Pour rester coherent avec l'existant, l'integration doit mettre a jour les deux emplacements ou definir explicitement que le plugin devient la source de verite.

### CLI clai

`clai init --target codex`:

- cree `.codex/`;
- copie commands/agents/output-styles/cache depuis `clai/templates/codex/`;
- propose de creer `[DOC]-<Project>/` depuis `clai/templates/obsidian/`;
- genere ou append `AGENTS.md` depuis `clai/templates/codex/AGENTS.md.template`.

`clai global --target codex` installe actuellement seulement commands et agents dans `~/.codex/`, pas les skills.

### Documentation projet

La suite actuelle impose `[DOC]-<Project>/` comme source de verite documentaire. Le nouveau kit utilise `docs/obsidian/`, ce qui entrerait en conflit si on le copiait tel quel dans les projets.

## Chosen Integration Approach

### Decision 1 - Le plugin distribue les skills, `clai init` distribue la memoire projet

Les 13 skills doivent etre ajoutes au plugin Workflow Skills:

```text
plugins/codex/workflow-skills/skills/ux-bootstrap/
plugins/codex/workflow-skills/skills/ux-audit/
...
```

L'ancien `ux-refactor` doit etre retire du plugin ou archive hors du chemin `skills/` pour ne plus etre expose par Codex.

Les artefacts projet du kit doivent etre geres par `clai init --target codex`:

```text
DESIGN.md
design/stitch/
scripts/ux/uxkit-lite.mjs
[DOC]-<Project>/... UX docs
AGENTS.md UX section
```

Raison: les skills sont reutilisables globalement, alors que `DESIGN.md`, les docs UX, les prompts Stitch et les rapports de scan sont propres a chaque projet.

### Decision 2 - Ne pas copier `docs/obsidian` tel quel

Le dossier source `docs/obsidian/` du kit doit etre traite comme un template de contenu, pas comme une destination finale.

Destination retenue dans un projet `clai`:

```text
[DOC]-<Project>/11-UX-DesignOps/
  01-Product/
  02-Design-System/
  03-Interaction/
  04-Screens/
  05-Components/
  06-Flows/
  07-Stitch/
  08-Audits/
  09-Debt/
  10-Decisions/
```

Les fichiers transverses restent dans les dossiers standards du vault:

```text
[DOC]-<Project>/00-MOC/MOC-UX.md
[DOC]-<Project>/_Templates/TPL-UX-Screen.md
[DOC]-<Project>/_Templates/TPL-UX-Component.md
[DOC]-<Project>/_Templates/TPL-UX-Flow.md
[DOC]-<Project>/_Templates/TPL-UX-Audit.md
```

`09-Resources/` reste reserve aux ressources externes. La memoire UX/UI devient un domaine documentaire explicite et ordonne.

### Decision 3 - `DESIGN.md` reste a la racine

`DESIGN.md` doit rester a la racine du projet parce que:

- les agents et Stitch s'attendent a le trouver facilement;
- il agit comme contrat design portable;
- il est court et operationnel.

La documentation longue et evolutive doit vivre dans `[DOC]-<Project>/11-UX-DesignOps/`.

`AGENTS.md` doit expliquer cette double source:

- `DESIGN.md` = contrat design portable et rapide;
- `[DOC]-<Project>/11-UX-DesignOps/` = memoire UX/UI detaillee et historisee.

### Decision 4 - Adapter les skills au resolver `[DOC]-*`

Les nouveaux skills referencent actuellement `docs/obsidian`. Pour une integration WorkflowSkills, ils doivent etre ajustes:

1. Chercher d'abord un dossier `[DOC]-*` a la racine.
2. Si present, utiliser `[DOC]-*/11-UX-DesignOps`.
3. Si absent, demander d'initialiser la documentation projet; ne jamais ecrire dans `docs/obsidian` comme fallback.
4. Si le dossier UX n'existe pas dans `[DOC]-*`, `ux-bootstrap` cree la structure cible.

Cela permet:

- compatibilite avec les projets initialises par `clai`;
- absence de duplication documentaire.

## Integration Into Feature Workflow Suite

Le workflow actuel est:

```text
specification -> research -> plan -> implement -> test -> fix -> documentation
```

Le nouveau workflow UX doit s'inserer conditionnellement pour les features user-facing, frontend, app shell, dashboards, forms, pages, composants, routes, onboarding, flows, ou toute modification visible.

### Phase 0 - Specification

Ajouter aux skills `feature-specification` et `feature-workflow`:

- detecter si la feature a une surface UI/UX;
- exiger les informations UX minimales:
  - user goal;
  - primary task;
  - entry/exit point;
  - states attendus;
  - accessibilite;
  - responsive;
  - design constraints.

Skill UX associe:

- `ux-flow` si la demande concerne un parcours utilisateur;
- `ux-component-spec` si la demande concerne un composant reutilisable.

### Phase 1 - Research

Ajouter a `feature-research`:

- lire `DESIGN.md` si present;
- lire `[DOC]-*/11-UX-DesignOps` si present;
- lancer mentalement le diagnostic `ux-audit` pour une UI existante;
- identifier si Stitch est utile pour exploration visuelle;
- documenter les impacts UX dans les findings.

Sortie attendue dans `FEAT-XXX-Findings.md`:

- section `UX/UI Research`;
- surfaces impactees;
- docs UX a creer/mettre a jour;
- besoin ou non de Stitch;
- risques anti-slop/accessibilite.

### Phase 2 - Planning

Ajouter a `implementation-planner`:

- phases UX explicites quand UI impactee;
- etapes de creation/mise a jour `UX docs`;
- etape `ux-stitch-generate` optionnelle avant implementation si la direction visuelle est incertaine;
- etape `ux-component-spec` pour composants partages;
- validation responsive/accessibilite dans les criteres.

### Phase 3 - Implementation

Ajouter a `feature-implementer`:

- pour UI existante: suivre `ux-polish`;
- pour direction Stitch choisie: suivre `ux-implement-from-stitch`;
- reutiliser tokens/composants existants;
- ne pas coller le code Stitch brut si le projet a deja des composants;
- mettre a jour les docs UX pendant ou juste apres l'implementation.

### Phase 4 - Testing

Ajouter a `test-plan-generator` / `test-executor`:

- tests ou checks UI si surface visible:
  - etats loading/empty/error/success/disabled;
  - responsive desktop/mobile;
  - focus-visible et navigation clavier;
  - contraste et labels;
  - absence d'anti-slop;
  - Storybook si disponible;
  - Playwright seulement si deja present ou demande.

Skill associe:

- remplacer `ux-review-no-playwright` par un skill `ux-visual-verification` utilisant Playwright/browser.

### Phase 6 - Documentation

Ajouter a la phase documentation:

- executer la logique `ux-design-sync` pour UI changes;
- mettre a jour:
  - `DESIGN.md` si les regles design ont change;
  - `[DOC]-*/11-UX-DesignOps/04-Screens/*`;
  - `[DOC]-*/11-UX-DesignOps/05-Components/*`;
  - `[DOC]-*/11-UX-DesignOps/06-Flows/*`;
  - `[DOC]-*/11-UX-DesignOps/10-Decisions/Decision_Log.md`;
  - `[DOC]-*/11-UX-DesignOps/09-Debt/Visual_Debt.md`;
  - `design/stitch/project-map.md` si Stitch a ete utilise.

## CLI clai Integration

### New template assets

Ajouter dans `clai/templates/codex/`:

```text
ux-designops/
  DESIGN.md
  design/stitch/README.md
  design/stitch/project-map.md
  design/stitch/prompts/*.md
  scripts/ux/uxkit-lite.mjs
  obsidian-ux/11-UX-DesignOps/**/*.md
```

`obsidian-ux/11-UX-DesignOps/` serait copie vers `[DOC]-<Project>/11-UX-DesignOps/`.

### `clai init --target codex`

Comportement recommande:

- installer UX DesignOps par defaut pour la cible Codex;
- ajouter une option `--no-ux` pour des projets non-frontend ou minimalistes;
- garder `--force` pour ecraser les templates si explicitement demande;
- utiliser safe-copy pour ne pas detruire une memoire UX existante.

Pseudo-resultats a ajouter:

```text
DESIGN.md -> cree / append ignore si present
design/stitch/ -> cree / merge
scripts/ux/ -> cree / merge
[DOC]-<Project>/11-UX-DesignOps/ -> cree / merge
AGENTS.md -> section UX ajoutee si absente
```

### `clai sync --target codex`

`syncProject` doit aussi synchroniser:

- commands/agents comme aujourd'hui;
- templates UX projet si absents;
- sans ecraser `DESIGN.md` et docs UX existantes par defaut.

Risque: `sync` ne doit pas remplacer la memoire UX du projet par le template vierge. Il faut donc differencier:

- assets statiques: safe overwrite possible si force;
- docs projet vivantes: create-if-missing uniquement, sauf `--force`.

### `clai global --target codex`

Deux options possibles:

1. Ne rien changer: la distribution globale des skills se fait via le plugin Codex marketplace.
2. Ajouter une option dediee `clai global --target codex --skills` qui copie les skills dans `~/.agents/skills`.

Recommandation: ne pas melanger pour l'instant. Le plugin Codex est le canal de distribution officiel des skills. `clai global` reste dedie aux commandes/agents.

## AGENTS.md Integration

Le template `clai/templates/codex/AGENTS.md.template` doit recevoir une section dediee, apres les regles de documentation et avant les commandes disponibles.

Section recommandee:

```markdown
## UX/UI DesignOps

Pour toute modification visible par l'utilisateur, Codex doit agir comme senior product designer + frontend design-system engineer.

Avant modification UI:
1. Lire `DESIGN.md`.
2. Lire `[DOC]-{{PROJECT_NAME}}/11-UX-DesignOps/`.
3. Identifier user goal, primary task, states, responsive, accessibilite.
4. Reutiliser composants et tokens existants.
5. Mettre a jour la memoire UX apres implementation.

Skills UX disponibles:
- `ux-bootstrap`
- `ux-audit`
- `ux-flow`
- `ux-component-spec`
- `ux-stitch-generate`
- `ux-implement-from-stitch`
- `ux-polish`
- `ux-visual-verification`
- `ux-design-sync`

Interdits par defaut:
- gradients decoratifs;
- glassmorphism gratuit;
- blobs/orbes decoratifs;
- fausses metriques;
- empilement de cards sans logique;
- styles arbitraires hors tokens;
- copie brute de code Stitch quand le projet a deja des composants.
```

Le detecteur de duplication dans `generateGuide` doit etre mis a jour pour reconnaitre cette section et eviter les appends multiples.

## Plugin Manifest Updates

Modifier:

```text
plugins/codex/workflow-skills/.codex-plugin/plugin.json
```

Changements:

- version: incrementer au moins en mineur (`1.4.0` recommande);
- description: remplacer "UX refactoring" par "UX/UI DesignOps workflow";
- longDescription: mentionner bootstrap, audit, flows, Stitch, implementation, review, documentation sync;
- defaultPrompt: remplacer `$ux-refactor` par:
  - `Use ux-bootstrap to initialize UX/UI memory for this project.`
  - `Use ux-audit on this route before coding.`
  - `Use ux-flow for this user journey.`
  - `Use ux-polish to improve this UI without changing business logic.`
  - `Use ux-visual-verification to verify this UI change with Playwright/browser.`

Mettre a jour aussi:

```text
plugins/codex/README.md
plugins/codex/marketplace.json si description exposee
```

## Files To Add / Remove

### Remove or archive

```text
ux-refactor/
plugins/codex/workflow-skills/skills/ux-refactor/
```

Si on veut conserver l'historique dans le repo sans exposition plugin:

```text
deprecated/ux-refactor/
```

Mais il ne doit plus etre sous un dossier `skills/` expose par le plugin.

### Add skills

```text
ux-bootstrap/
ux-audit/
ux-flow/
ux-component-spec/
ux-stitch-brief/
ux-stitch-generate/
ux-stitch-iterate/
ux-code-to-stitch/
ux-implement-from-stitch/
ux-polish/
ux-visual-verification/
ux-design-sync/
ux-storybook/

plugins/codex/workflow-skills/skills/<same names>/
```

### Add clai templates

```text
clai/templates/codex/ux-designops/
```

### Modify existing skills

At minimum:

```text
feature-workflow/SKILL.md
feature-research/SKILL.md
implementation-planner/SKILL.md
feature-implementer/SKILL.md
test-plan-generator/SKILL.md
source-command-doc-manager/SKILL.md
workflow-challenger/SKILL.md
```

And their plugin copies under:

```text
plugins/codex/workflow-skills/skills/
```

## Technical Risks

### Risk 1 - Documentation duplication

If `docs/obsidian` is copied as-is, projects will have two doc sources:

- `[DOC]-<Project>/`;
- `docs/obsidian/`.

Mitigation: map the kit docs into `[DOC]-<Project>/11-UX-DesignOps/` and update skills to resolve the UX docs root. Do not allow a `docs/obsidian` runtime fallback.

### Risk 2 - `sync` overwrites living UX docs

`DESIGN.md` and UX docs become project memory after first use. Overwriting them would destroy work.

Mitigation:

- create-if-missing by default;
- overwrite only with `--force`;
- for existing `DESIGN.md`, append a managed section only if absent or report manual merge.

### Risk 3 - Too many UX skills confuse invocation

13 skills are useful but can feel broad.

Mitigation:

- document the routing in `AGENTS.md`;
- update plugin default prompts;
- update `feature-workflow` to choose the UX skill based on phase.

### Risk 4 - Visual verification without browser tooling

The original kit includes a `ux-review-no-playwright` skill. This should not be carried over as a supported workflow mode.

Mitigation:

- replace it with `ux-visual-verification`;
- require Playwright/browser-based verification for UI changes;
- if tooling is absent, report the blocker and add setup work to the plan rather than silently degrading to static review.

### Risk 5 - Existing global installs keep old UI skills

The user's global `C:\Users\guillaume\.agents\skills` already contains older UI skills.

Mitigation:

- the repo/plugin replacement removes `ux-refactor`;
- optional cleanup command can remove old global skills manually, but not required for plugin correctness;
- avoid naming collisions by using the new `ux-*` names.

## Implementation Strategy

Recommended implementation phases:

1. **Repository cleanup**
   - remove `ux-refactor` from plugin exposure;
   - add 13 new skills at root and in plugin.

2. **Skill adaptation**
   - adjust `docs/obsidian` references to use `UX_DOCS_ROOT`;
   - add resolver instructions: `[DOC]-*/11-UX-DesignOps` only; no runtime fallback to `docs/obsidian`.

3. **Workflow Suite integration**
   - update `feature-workflow`, `feature-research`, `implementation-planner`, `feature-implementer`, `test-plan-generator`, `workflow-challenger`, `source-command-doc-manager`.

4. **clai template integration**
   - add `clai/templates/codex/ux-designops`;
   - modify `project.js` to install UX assets during `initProject` for Codex;
   - add `--no-ux` option;
   - update `syncProject` with create-if-missing UX sync.

5. **AGENTS.md integration**
   - merge UX directives into `clai/templates/codex/AGENTS.md.template`;
   - update `generateGuide` duplicate detection.

6. **Documentation**
   - create `FEAT-004` feature doc;
   - likely create an ADR for the `[DOC]-*/11-UX-DesignOps` mapping;
   - update `MOC-Principal.md`;
   - update `FEAT-003` or mark it superseded by `FEAT-004`.

7. **Validation**
   - run zip extraction/skill validation;
   - run `node clai/bin/clai.js init Test --target codex --doc Test --force` in temp;
   - verify generated `AGENTS.md`, `DESIGN.md`, `[DOC]-Test/11-UX-DesignOps`, `design/stitch`, `scripts/ux`;
   - run `node scripts/ux/uxkit-lite.mjs scan` in generated project;
   - validate plugin folder has no `ux-refactor` and exposes 13 new UX skills.

## Acceptance Criteria

- `ux-refactor` is no longer exposed by the Codex plugin.
- The 13 new UX DesignOps skills are exposed by the Workflow Skills plugin.
- Plugin manifest and README mention the new UX workflow, not the old UI kit.
- `clai init --target codex` initializes UX DesignOps assets by default.
- `clai init --target codex --no-ux` skips UX assets.
- Existing `AGENTS.md` gets one UX section appended once, not duplicated.
- Generated projects use `[DOC]-<Project>/11-UX-DesignOps/` for UX docs, not `docs/obsidian`.
- `DESIGN.md` exists at project root after init.
- `scripts/ux/uxkit-lite.mjs scan` creates a project scan report in the UX docs root or a documented target.
- Feature workflow docs instruct when to use `ux-flow`, `ux-audit`, `ux-polish`, `ux-design-sync`.
- Test planning includes UI states, responsive, accessibility, and anti-slop checks when UI is impacted.

## Open Questions

1. Should UX DesignOps be enabled for `target claude` too, or only for `target codex`?
   - Recommendation: Codex only for the first integration, because the skills are Codex-oriented.

2. Should `clai global --target codex` install skills into `~/.agents/skills`?
   - Recommendation: no for now; keep marketplace/plugin as official skill distribution.

3. Should UX DesignOps live in a dedicated `[DOC]-*/11-UX-DesignOps/` folder?
   - Decision: yes. UX DesignOps is a first-class project documentation domain, not a generic resource.

4. Should old globally installed UI skills be removed from `C:\Users\guillaume\.agents\skills`?
   - Recommendation: optional manual cleanup after plugin integration; not required for repo correctness.

## Next Steps

Proceed to `implementation-planner` for FEAT-004.

The plan should be detailed and include code edits, template moves, plugin manifest updates, documentation updates, and validation commands.
