---
title: FEAT-004 Integration UX DesignOps Kit - Plan
type: plan
status: completed
created: 2026-06-07
updated: 2026-06-07
feature: FEAT-004
tags:
  - feature-workflow
  - planning
  - ux
  - designops
  - codex
  - clai
  - stitch
  - mcp
---

# FEAT-004 - Plan d'implementation

## Overview

FEAT-004 remplace l'ancien skill `ux-refactor` par un workflow UX/UI DesignOps complet integre a Workflow Skills Suite. Le nouveau kit doit etre consomme comme un domaine fonctionnel du workflow feature, et non comme un pack autonome de prompts.

L'implementation doit connecter les nouveaux skills UX au plugin Codex, a la CLI `clai`, aux templates projet `AGENTS.md`, a la documentation Obsidian `[DOC]-*`, a Stitch MCP, et aux phases existantes `specification -> research -> plan -> implement -> test -> fix -> documentation`.

Les documents de reference pour executer ce plan sont:

- [[FEAT-004-Final-Findings]]
- [[FEAT-004-Findings]]
- [[FEAT-004-Skill-Audit]]
- [[FEAT-004-Stitch-MCP-Research]]
- [[ADR-003-Structure-UX-DesignOps]]

## Goals

- Remplacer completement `ux-refactor` par 13 skills UX DesignOps specialises.
- Normaliser tous les skills UX selon les conventions WorkflowSkills.
- Brancher les workflows UX sur `[DOC]-*` uniquement, sans fallback `docs/obsidian`.
- Integrer Stitch MCP dans les skills concernes quand les outils MCP existent.
- Initialiser automatiquement la memoire UX via `clai init --target codex`.
- Rendre la verification visuelle obligatoire pour les changements UI.
- Produire une suite plugin Codex coherente, documentee, testee et prete a importer globalement.

## Scope

**In Scope**

- Creation et adaptation des skills UX DesignOps dans le plugin Codex.
- Suppression de l'exposition plugin de `ux-refactor`.
- Remplacement de `ux-review-no-playwright` par `ux-visual-verification`.
- Adaptation des skills WorkflowSkills existants pour integrer les phases UX.
- Integration de Stitch MCP dans les skills Stitch.
- Mise a jour de la CLI `clai` pour installer les assets UX par defaut en cible Codex.
- Ajout des templates Obsidian UX, de `DESIGN.md`, du MOC UX et des assets `design/stitch`.
- Mise a jour du manifest plugin, README, marketplace et docs.
- Tests d'initialisation projet, validation documentaire, validation plugin et verification MCP non destructive.

**Out of Scope**

- Reprendre l'ancien UI kit deja remplace.
- Conserver un mode "sans Playwright".
- Ecrire des documents persistants dans `docs/obsidian`.
- Implementer des capacites Stitch non exposees par le MCP actuel, comme la generation directe de screens si l'outil n'est pas disponible.
- Modifier la cle API Stitch ou documenter sa valeur.

## Progress Tracker

- [x] **Phase 1**: Normaliser les sources UX et le perimetre plugin (100%)
- [x] **Phase 2**: Adapter les 13 skills UX aux normes WorkflowSkills (100%)
- [x] **Phase 3**: Brancher Stitch MCP dans le workflow UX (100%)
- [x] **Phase 4**: Integrer UX dans les skills Feature Workflow existants (100%)
- [x] **Phase 5**: Integrer UX DesignOps dans `clai init` et `clai sync` (100%)
- [x] **Phase 6**: Mettre a jour plugin Codex, README et marketplace (100%)
- [x] **Phase 7**: Tester et valider la feature complete (100%)
- [x] **Phase Finale**: Synchroniser la documentation Obsidian (100%)

**Overall Progress:** 8/8 phases complete

---

## Phase 1: Normaliser les sources UX et le perimetre plugin

### Goals

Importer le nouveau kit UX DesignOps comme source officielle, retirer l'ancien skill UI, et preparer une structure de fichiers propre pour les adaptations.

### Prerequisites

- Archive source disponible: `codex-uiux-skill-pack.zip`.
- Findings FEAT-004 valides.
- Aucun changement non relu dans les fichiers a modifier.

### Steps

- [x] **Step 1.1**: Inventorier les skills sources du kit UX
  - **Location**: `codex-uiux-skill-pack.zip`, dossier extrait `codex_ux_ui_designops_kit/`
  - **Details**: Confirmer la presence des skills cibles et identifier les fichiers annexes: `docs`, `scripts`, `templates`, `agents/openai.yaml`.
  - **Dependencies**: None

- [x] **Step 1.2**: Creer ou mettre a jour les dossiers skills racine
  - **Location**: `ux-bootstrap/`, `ux-audit/`, `ux-flow/`, `ux-component-spec/`, `ux-stitch-brief/`, `ux-stitch-generate/`, `ux-stitch-iterate/`, `ux-code-to-stitch/`, `ux-implement-from-stitch/`, `ux-polish/`, `ux-visual-verification/`, `ux-design-sync/`, `ux-storybook/`
  - **Details**: Copier les skills du kit, renommer `ux-review-no-playwright` en `ux-visual-verification`, puis supprimer toute instruction de validation degradee sans rendu.
  - **Dependencies**: Step 1.1

- [x] **Step 1.3**: Mettre a jour les copies plugin Codex
  - **Location**: `plugins/codex/workflow-skills/skills/`
  - **Details**: Ajouter les 13 nouveaux skills dans le plugin Codex, avec les memes contenus que les dossiers racine apres adaptation.
  - **Dependencies**: Step 1.2

- [x] **Step 1.4**: Retirer l'ancien skill UI
  - **Location**: `ux-refactor/`, `plugins/codex/workflow-skills/skills/ux-refactor/`
  - **Details**: Supprimer l'exposition de `ux-refactor`. Si une archive est necessaire, documenter seulement dans Obsidian; ne pas conserver le skill actif dans le plugin.
  - **Dependencies**: Step 1.3

- [x] **Step 1.5**: Integrer les instructions agent optionnelles
  - **Location**: `agents/openai.yaml`, `plugins/codex/workflow-skills/`
  - **Details**: Conserver uniquement ce qui renforce les skills sans contredire `AGENTS.md`, les instructions systeme Codex, ni les regles WorkflowSkills.
  - **Dependencies**: Step 1.1

### Validation Criteria

- [x] Les 13 skills cibles existent en racine et dans `plugins/codex/workflow-skills/skills/`.
- [x] `ux-refactor` n'est plus expose dans le plugin.
- [x] `ux-review-no-playwright` n'existe pas comme skill actif.
- [x] `ux-visual-verification` existe et impose Playwright, Browser plugin ou outil equivalent.
- [x] Aucun fichier importe ne reference `docs/obsidian` comme cible d'ecriture persistante.

### Notes

Cette phase doit rester mecanique. Les changements de contenu profonds des `SKILL.md` sont traites en phase 2.

---

## Phase 2: Adapter les 13 skills UX aux normes WorkflowSkills

### Goals

Transformer les skills UX en skills WorkflowSkills natifs: resolution documentaire, frontmatter, MOC, langue francaise, hierarchie documentaire, et outputs compatibles avec les phases feature.

### Prerequisites

- Phase 1 terminee.
- Structure cible validee par [[ADR-003-Structure-UX-DesignOps]].

### Steps

- [x] **Step 2.1**: Ajouter le bloc commun `WorkflowSkills Project Context`
  - **Location**: Tous les `SKILL.md` des 13 skills UX, racine et plugin.
  - **Details**: Imposer la detection d'un dossier `[DOC]-*`; definir `DOC_ROOT` et `UX_DOCS_ROOT=[DOC]-*/11-UX-DesignOps`; stopper si aucun `[DOC]-*` n'existe; ne jamais fallback vers `docs/obsidian`.
  - **Dependencies**: Phase 1 complete

- [x] **Step 2.2**: Ajouter les conventions documentaires UX
  - **Location**: Tous les `SKILL.md` UX.
  - **Details**: Exiger YAML frontmatter, contenu en francais, wikilinks Obsidian, statut, dates, tags, mise a jour de `MOC-UX.md` et du MOC principal quand necessaire.
  - **Dependencies**: Step 2.1

- [x] **Step 2.3**: Adapter `ux-bootstrap`
  - **Location**: `ux-bootstrap/SKILL.md`, `plugins/codex/workflow-skills/skills/ux-bootstrap/SKILL.md`
  - **Details**: Creer `11-UX-DesignOps`, `00-MOC/MOC-UX.md`, les templates UX dans `_Templates`, `DESIGN.md` racine, `design/stitch`, et brancher le scan UX vers `UX_DOCS_ROOT/08-Audits/Project_Scan_Report.md`.
  - **Dependencies**: Steps 2.1, 2.2

- [x] **Step 2.4**: Adapter `ux-audit`
  - **Location**: `ux-audit/SKILL.md`, copie plugin.
  - **Details**: Lire CDC/FEAT/ADR/DESIGN/UX docs avant audit; produire sections `Problemes critiques`, `Quick wins`, `Corrections structurelles`, `Impacts implementation-planner`, `Tests UX requis`; mettre a jour `Visual_Debt.md`.
  - **Dependencies**: Steps 2.1, 2.2

- [x] **Step 2.5**: Adapter `ux-flow` et `ux-component-spec`
  - **Location**: `ux-flow/SKILL.md`, `ux-component-spec/SKILL.md`, copies plugin.
  - **Details**: Produire des docs dans `06-Flows` et `05-Components`, relier chaque sortie a la feature courante, inclure etats, responsive, accessibilite, edge cases, acceptance criteria UX.
  - **Dependencies**: Steps 2.1, 2.2

- [x] **Step 2.6**: Adapter les skills Stitch
  - **Location**: `ux-stitch-brief/`, `ux-stitch-generate/`, `ux-stitch-iterate/`, `ux-code-to-stitch/`, `ux-implement-from-stitch/`, copies plugin.
  - **Details**: Lire `DESIGN.md` et `UX_DOCS_ROOT`, stocker prompts, project IDs, screen IDs, decisions, exports et mappings dans `11-UX-DesignOps/07-Stitch`.
  - **Dependencies**: Steps 2.1, 2.2

- [x] **Step 2.7**: Adapter `ux-polish`
  - **Location**: `ux-polish/SKILL.md`, copie plugin.
  - **Details**: Encadrer les passes de polish par design system existant, comportement inchange, visual debt, focus states, responsive, anti-slop, et verification visuelle obligatoire.
  - **Dependencies**: Steps 2.1, 2.2

- [x] **Step 2.8**: Implementer `ux-visual-verification`
  - **Location**: `ux-visual-verification/SKILL.md`, copie plugin.
  - **Details**: Definir le protocole Playwright/Browser: desktop, mobile, overflow, focus, loading/error/empty states, captures, comparaison Stitch si pertinente. Si aucun outil de rendu n'est disponible, declarer un blocage et proposer l'installation/configuration.
  - **Dependencies**: Step 1.2

- [x] **Step 2.9**: Adapter `ux-design-sync` et `ux-storybook`
  - **Location**: `ux-design-sync/SKILL.md`, `ux-storybook/SKILL.md`, copies plugin.
  - **Details**: Synchroniser code, docs UX, `DESIGN.md`, Storybook si present, et ajouter des controles de coherence entre composants, tokens, docs et captures.
  - **Dependencies**: Steps 2.1, 2.2

### Validation Criteria

- [x] Tous les skills contiennent la regle `[DOC]-*` obligatoire.
- [x] Aucune instruction ne propose `docs/obsidian` comme fallback.
- [x] Les MOC et templates UX sont places dans `00-MOC` et `_Templates`, pas dans `11-UX-DesignOps`.
- [x] Les documents persistants attendus sont sous `11-UX-DesignOps`.
- [x] Tous les skills UX indiquent clairement leur place dans le workflow feature.
- [x] Les instructions sont compatibles avec la hierarchie CDC > DB > Meetings > ADR > FEAT.

### Notes

Cette phase est critique. Une integration partielle recreerait un kit autonome au lieu d'un workflow UX branche sur Workflow Skills Suite.

---

## Phase 3: Brancher Stitch MCP dans le workflow UX

### Goals

Faire consommer les outils Stitch MCP disponibles par les skills UX concernes, et documenter proprement les limites des capacites non exposees.

### Prerequisites

- Phase 2 terminee pour les skills Stitch.
- MCP Stitch configure globalement dans Codex.
- Les valeurs sensibles restent hors documentation.

### Steps

- [x] **Step 3.1**: Documenter la matrice d'outils Stitch utilisables
  - **Location**: `ux-stitch-brief/SKILL.md`, `ux-stitch-generate/SKILL.md`, `ux-stitch-iterate/SKILL.md`, `ux-code-to-stitch/SKILL.md`, `ux-design-sync/SKILL.md`
  - **Details**: Lister les outils MCP utilisables: `create_project`, `list_projects`, `get_project`, `list_screens`, `list_design_systems`, `create_design_system`, `update_design_system`, `upload_design_md`, `create_design_system_from_design_md`, `apply_design_system`.
  - **Dependencies**: Phase 2 complete

- [x] **Step 3.2**: Brancher la resolution projet Stitch
  - **Location**: Skills Stitch.
  - **Details**: Toujours verifier les projets existants avec `list_projects`; si un projet est donne, confirmer avec `get_project`; lier les IDs dans `11-UX-DesignOps/07-Stitch/Project_Map.md`.
  - **Dependencies**: Step 3.1

- [x] **Step 3.3**: Brancher la lecture des screens Stitch
  - **Location**: `ux-stitch-iterate`, `ux-implement-from-stitch`, `ux-design-sync`.
  - **Details**: Utiliser `list_screens` quand un project ID est disponible; documenter screen ID, nom, role, date de sync et relation avec les routes/components projet.
  - **Dependencies**: Step 3.2

- [x] **Step 3.4**: Brancher les design systems Stitch
  - **Location**: `ux-stitch-brief`, `ux-stitch-generate`, `ux-design-sync`.
  - **Details**: Utiliser `list_design_systems`; permettre `upload_design_md` et `create_design_system_from_design_md` depuis `DESIGN.md`; permettre `apply_design_system` quand un screen cible existe.
  - **Dependencies**: Step 3.2

- [x] **Step 3.5**: Encadrer les capacites non exposees
  - **Location**: Skills Stitch et README plugin.
  - **Details**: Expliquer que generation directe de screens, upload HTML, extraction HTML, conversion React/shadcn et `stitch-loop` dependent de l'ecosysteme officiel `google-labs-code/stitch-skills` si le MCP courant ne les expose pas.
  - **Dependencies**: Step 3.1

### Validation Criteria

- [x] Les skills Stitch consomment les outils MCP disponibles au lieu de produire seulement des prompts manuels.
- [x] Les operations Stitch destructives ou creatrices sont explicites et documentees.
- [x] `Project_Map.md` est sous `[DOC]-*/11-UX-DesignOps/07-Stitch/`.
- [x] Aucune cle API n'est ecrite dans le repo ou les docs.
- [x] Les limites du MCP courant sont documentees sans bloquer le workflow de base.

### Notes

Les appels de verification non destructifs recommandes sont `list_projects`, `get_project`, `list_screens` et `list_design_systems`.

---

## Phase 4: Integrer UX dans les skills Feature Workflow existants

### Goals

Faire entrer les etapes UX dans le workflow feature principal sans creer un plan concurrent. Les sorties UX doivent enrichir `CDC`, `Findings`, `Plan`, `Test-Plan`, `Test-Results` et la documentation finale.

### Prerequisites

- Phases 2 et 3 terminees.
- Les noms des 13 skills UX sont stabilises.

### Steps

- [x] **Step 4.1**: Mettre a jour `feature-specification`
  - **Location**: `plugins/codex/workflow-skills/skills/feature-specification/SKILL.md`
  - **Details**: Ajouter detection `UI impacted`; capturer goal, surfaces, states, accessibility, responsive, constraints, docs UX attendues; recommander `ux-flow` et `ux-component-spec` si necessaire.
  - **Dependencies**: Phase 2 complete

- [x] **Step 4.2**: Mettre a jour `feature-research`
  - **Location**: `plugins/codex/workflow-skills/skills/feature-research/SKILL.md`
  - **Details**: Ajouter section `UX/UI Research`; lire `DESIGN.md` et `11-UX-DesignOps`; identifier audit, Stitch, surfaces, risques accessibilite/responsive, anti-slop.
  - **Dependencies**: Phase 2 complete

- [x] **Step 4.3**: Mettre a jour `implementation-planner`
  - **Location**: `plugins/codex/workflow-skills/skills/implementation-planner/SKILL.md`, `references/plan-template.md`
  - **Details**: Ajouter phases conditionnelles UX: flow/component spec, Stitch sync/generation, implementation UI, visual verification, design sync. Ne jamais creer un plan UX separe quand un `FEAT-XXX-Plan.md` existe.
  - **Dependencies**: Phase 2 complete

- [x] **Step 4.4**: Mettre a jour `feature-implementer`
  - **Location**: `plugins/codex/workflow-skills/skills/feature-implementer/SKILL.md`
  - **Details**: Pour UI, utiliser `ux-polish` ou `ux-implement-from-stitch`, preserver logique metier, composants et tokens existants, eviter collage HTML brut Stitch, mettre a jour docs UX.
  - **Dependencies**: Phase 2 complete

- [x] **Step 4.5**: Mettre a jour `test-plan-generator`
  - **Location**: `plugins/codex/workflow-skills/skills/test-plan-generator/SKILL.md`
  - **Details**: Ajouter state matrix, responsive desktop/mobile, clavier/focus, accessibility basics, comparaison Stitch si pertinente, Storybook si present, checks anti-slop.
  - **Dependencies**: Phase 2 complete

- [x] **Step 4.6**: Mettre a jour `test-executor` et `test-fixer`
  - **Location**: `plugins/codex/workflow-skills/skills/test-executor/SKILL.md`, `test-fixer/SKILL.md`
  - **Details**: Executer `ux-visual-verification` pour les changements UI; si verification impossible, produire un blocage explicite; fixer les regressions visuelles detectees.
  - **Dependencies**: Step 4.5

- [x] **Step 4.7**: Retirer `source-command-doc-manager` du workflow actif
  - **Location**: `source-command-doc-manager/`, `plugins/codex/workflow-skills/skills/source-command-doc-manager/`, templates `/doc-manager`
  - **Details**: Supprimer le skill et la commande dedies; reporter la synchronisation documentaire sur les phases explicites du workflow et `ux-design-sync`.
  - **Dependencies**: Phase 2 complete

- [x] **Step 4.8**: Mettre a jour `workflow-challenger` et `feature-workflow`
  - **Location**: `plugins/codex/workflow-skills/skills/workflow-challenger/SKILL.md`, `feature-workflow/SKILL.md`
  - **Details**: Challenger les gaps UX dans CDC/findings/plan/tests; orchestrer les skills UX quand une feature impacte l'interface.
  - **Dependencies**: Steps 4.1 a 4.7

### Validation Criteria

- [x] Les skills existants connaissent le domaine `11-UX-DesignOps`.
- [x] Une feature UI obtient des etapes UX dans le meme `FEAT-XXX-Plan.md`.
- [x] Le workflow ne propose jamais de validation UI sans rendu.
- [x] Les tests UI incluent au minimum responsive, focus/clavier, etats et capture visuelle.
- [x] `source-command-doc-manager` n'est plus expose; `ux-design-sync` et les phases documentaires maintiennent les docs UX.

### Notes

Cette phase cree l'integration reelle dans Workflow Skills Suite. Sans elle, les skills UX seraient disponibles mais non orchestras.

---

## Phase 5: Integrer UX DesignOps dans `clai init` et `clai sync`

### Goals

Installer la structure UX DesignOps automatiquement dans les projets Codex initialises par `clai`, avec option explicite pour ne pas l'installer.

### Prerequisites

- Phases 1 et 2 terminees.
- Structure actuelle `clai/templates/codex` relue.

### Steps

- [x] **Step 5.1**: Ajouter les templates UX Codex
  - **Location**: `clai/templates/codex/ux-designops/`
  - **Details**: Ajouter `DESIGN.md`, `11-UX-DesignOps`, `00-MOC/MOC-UX.md`, `_Templates/TPL-UX-*.md`, `design/stitch`, `scripts/ux/uxkit-lite.mjs`.
  - **Dependencies**: Phase 2 complete

- [x] **Step 5.2**: Adapter `clai/src/project.js`
  - **Location**: `clai/src/project.js`
  - **Details**: Installer UX DesignOps par defaut pour `--target codex`; detecter `[DOC]-<Project>`; creer `11-UX-DesignOps`; ne pas ecraser sans `--force`; supporter `--no-ux`.
  - **Dependencies**: Step 5.1

- [x] **Step 5.3**: Adapter `clai/src/cli.js`
  - **Location**: `clai/src/cli.js`
  - **Details**: Ajouter option `--no-ux` sur les commandes d'init/sync pertinentes; documenter le comportement dans `--help`.
  - **Dependencies**: Step 5.2

- [x] **Step 5.4**: Adapter `generateGuide` et `AGENTS.md`
  - **Location**: `clai/src/project.js`, templates `AGENTS.md`.
  - **Details**: Ajouter une section UX DesignOps concise: `[DOC]-*` obligatoire, `DESIGN.md`, `11-UX-DesignOps`, Stitch MCP, verification visuelle obligatoire.
  - **Dependencies**: Step 5.2

- [x] **Step 5.5**: Adapter `syncProject`
  - **Location**: `clai/src/project.js`
  - **Details**: Ajouter UX DesignOps aux operations de sync sans ecraser les documents projet vivants; mettre a jour seulement les templates/outils quand force ou absent.
  - **Dependencies**: Steps 5.2, 5.3

### Validation Criteria

- [x] `clai init --target codex` cree la structure UX DesignOps par defaut.
- [x] `clai init --target codex --no-ux` ne cree pas les assets UX.
- [x] `clai sync` respecte les fichiers existants.
- [x] Aucun chemin `docs/obsidian` n'est genere.
- [x] `AGENTS.md` mentionne le workflow UX sans dupliquer inutilement les instructions existantes.

### Notes

Le MOC UX et les templates doivent rester dans les dossiers classiques du vault. Seule la memoire UX specialisee vit dans `11-UX-DesignOps`.

---

## Phase 6: Mettre a jour plugin Codex, README et marketplace

### Goals

Publier une suite plugin coherente: manifest, metadata, documentation utilisateur et liste de skills a jour.

### Prerequisites

- Phases 1 a 5 terminees.

### Steps

- [x] **Step 6.1**: Mettre a jour le manifest plugin
  - **Location**: `plugins/codex/.codex-plugin/plugin.json`
  - **Details**: Ajouter les 13 skills UX; retirer `ux-refactor`; mettre a jour description, prompt par defaut et version cible.
  - **Dependencies**: Phases 1 a 5 complete

- [x] **Step 6.2**: Mettre a jour README plugin
  - **Location**: `plugins/codex/README.md`
  - **Details**: Documenter le workflow UX DesignOps, `[DOC]-*`, Stitch MCP, Playwright obligatoire, `clai init`, `--no-ux`, et les limites du MCP Stitch actuel.
  - **Dependencies**: Step 6.1

- [x] **Step 6.3**: Mettre a jour marketplace/personnal plugin metadata si applicable
  - **Location**: Fichiers marketplace ou metadata existants du repo.
  - **Details**: Refleter le remplacement de l'ancien UI kit par UX DesignOps Kit.
  - **Dependencies**: Step 6.1

- [x] **Step 6.4**: Verifier les references croisees
  - **Location**: Repo complet.
  - **Details**: Rechercher `ux-refactor`, `ux-review-no-playwright`, `docs/obsidian`, `11-UX-DesignOps`, `MOC-UX`, `ux-visual-verification`; corriger les references incoherentes.
  - **Dependencies**: Steps 6.1 a 6.3

### Validation Criteria

- [x] Le plugin expose les 13 nouveaux skills UX.
- [x] Le plugin n'expose plus `ux-refactor`.
- [x] La documentation plugin explique clairement le workflow.
- [x] Les references restantes a `docs/obsidian` ne sont pas des fallbacks d'ecriture persistante.
- [x] Les limites Stitch MCP sont explicites.

### Notes

Si la version plugin actuelle est `1.3.0`, cette feature justifie une version mineure `1.4.0`.

---

## Phase 7: Tester et valider la feature complete

### Goals

Verifier l'integration de bout en bout: skills, plugin, CLI, docs, Stitch MCP et validation visuelle obligatoire.

### Prerequisites

- Phases 1 a 6 terminees.
- MCP Stitch disponible dans Codex.
- Environnement Node fonctionnel pour `clai`.

### Test Plan

#### Tests structurels

- [x] Verifier que chaque nouveau skill a un `SKILL.md` valide en racine.
- [x] Verifier que chaque nouveau skill a une copie plugin valide.
- [x] Verifier que `ux-refactor` et `ux-review-no-playwright` ne sont plus actifs.
- [x] Verifier que les skills UX mentionnent `[DOC]-*` et `11-UX-DesignOps`.
- [x] Verifier qu'aucun skill n'utilise `docs/obsidian` comme fallback.

#### Tests CLI

- [x] Executer `node clai/bin/clai.js --help`.
- [x] Executer `node clai/bin/clai.js init <TempProject> --target codex --doc <TempProject> --force`.
- [x] Verifier la creation de `[DOC]-<TempProject>/11-UX-DesignOps/`.
- [x] Verifier la creation de `[DOC]-<TempProject>/00-MOC/MOC-UX.md`.
- [x] Verifier la creation de `[DOC]-<TempProject>/_Templates/TPL-UX-*.md`.
- [x] Verifier la creation de `DESIGN.md`.
- [x] Executer un init avec `--no-ux` et verifier que les assets UX ne sont pas crees.
- [x] Executer `sync` sur un projet existant et verifier l'absence d'ecrasement non voulu.

#### Tests MCP Stitch non destructifs

- [x] Appeler `list_projects`.
- [x] Appeler `get_project` sur un project ID connu si disponible.
- [x] Appeler `list_screens` sur un project ID connu si disponible.
- [x] Appeler `list_design_systems`.
- [x] Verifier que les skills documentent les operations creatrices avant `create_project`, `create_design_system`, `upload_design_md`, `apply_design_system`.

#### Tests documentation

- [x] Verifier les frontmatter YAML des nouveaux documents.
- [x] Verifier que le contenu documentaire est en francais.
- [x] Verifier que `MOC-Principal.md` reference `MOC-UX` quand un projet UX est initialise.
- [x] Verifier que les templates UX sont dans `_Templates`.
- [x] Verifier que `Project_Map.md` est dans `11-UX-DesignOps/07-Stitch/`.

#### Tests visuels

- [x] Sur une feature UI de test, confirmer que le plan demande `ux-visual-verification`.
- [x] Confirmer que Playwright, Browser plugin ou equivalent est requis.
- [x] Confirmer qu'une absence d'outil visuel produit un blocage explicite, pas une validation degradee.

### Validation Criteria

- [x] Tous les tests structurels passent.
- [x] Tous les tests CLI passent.
- [x] Les appels Stitch non destructifs fonctionnent ou documentent un blocage d'environnement.
- [x] La validation documentaire passe.
- [x] Le workflow UI ne propose aucun mode sans Playwright.
- [x] Les commandes de build/lint/test existantes passent, ou les absences sont documentees.

### Notes

Les tests creatifs Stitch doivent rester optionnels sauf besoin explicite, car ils peuvent creer ou modifier des projets/design systems.

---

## Phase Finale: Synchroniser la documentation Obsidian

### Goals

Aligner `[DOC]-WorkflowSkills/` avec l'implementation reelle une fois le code stabilise.

### Prerequisites

- Phase 7 terminee.
- Code stable.
- Resultats de tests disponibles.

### Steps

- [x] **Step D.1**: Mettre a jour les findings si des ecarts ont ete trouves
  - **Location**: `[DOC]-WorkflowSkills/10-Archives/FEAT-004-Integration-UX-DesignOps-Kit/`
  - **Details**: Corriger [[FEAT-004-Final-Findings]], [[FEAT-004-Skill-Audit]] et [[FEAT-004-Stitch-MCP-Research]] si l'implementation a revele des changements.
  - **Dependencies**: Phase 7 complete

- [x] **Step D.2**: Mettre a jour ou creer les docs feature finales
  - **Location**: `[DOC]-WorkflowSkills/04-Features/`, archive FEAT-004.
  - **Details**: Creer ou mettre a jour une documentation feature finale si necessaire, avec resume du comportement livre.
  - **Dependencies**: Step D.1

- [x] **Step D.3**: Mettre a jour les ADR si une decision a change
  - **Location**: `[DOC]-WorkflowSkills/06-ADR/`
  - **Details**: Garder [[ADR-003-Structure-UX-DesignOps]] comme decision structurante; creer un nouvel ADR uniquement si une nouvelle decision architecturale apparait.
  - **Dependencies**: Step D.1

- [x] **Step D.4**: Mettre a jour les MOC
  - **Location**: `[DOC]-WorkflowSkills/00-MOC/MOC-Principal.md`
  - **Details**: Ajouter les nouveaux documents FEAT/ADR/DEV crees pendant l'implementation.
  - **Dependencies**: Steps D.1 a D.3

- [x] **Step D.5**: Documenter le statut de l'ancien UI kit
  - **Location**: `[DOC]-WorkflowSkills/10-Archives/` ou document feature existant.
  - **Details**: Marquer l'ancien `ux-refactor` comme remplace par FEAT-004, sans le conserver actif.
  - **Dependencies**: Phase 6 complete

### Validation Criteria

- [x] Tous les documents FEAT-004 ont un frontmatter valide.
- [x] `updated: 2026-06-07` ou date courante est renseigne.
- [x] Les MOC pointent vers les documents crees.
- [x] La documentation ne mentionne pas `docs/obsidian` comme fallback.
- [x] La documentation rappelle que `[DOC]-*` est obligatoire.

### Notes

Cette phase remplace l'ancien flux `source-command-doc-manager` par des etapes documentaires explicites dans le workflow et par `ux-design-sync` pour le domaine UX.

---

## Dependencies Summary

### External Dependencies

| Dependency | Version | Purpose | Installation |
|------------|---------|---------|--------------|
| Stitch MCP | Global Codex config | Lire/projeter projets, screens et design systems Stitch | Deja configure globalement |
| Playwright | Projet cible ou dependance dev | Verification visuelle obligatoire pour UI | Selon projet cible |
| Browser plugin | Plugin Codex | Alternative de rendu/capture quand disponible | Plugin deja disponible dans Codex |
| Node.js | Version projet | Executer `clai` et scripts UX | Selon environnement |

### Internal Dependencies

| Component | Location | Purpose |
|-----------|----------|---------|
| Workflow Skills plugin | `plugins/codex/workflow-skills/` | Distribution globale Codex |
| Skills racine | `*/SKILL.md` | Source locale des skills |
| CLI clai | `clai/` | Initialisation et synchronisation projet |
| Obsidian vault | `[DOC]-WorkflowSkills/` | Source de verite documentaire |
| UX docs cible | `[DOC]-*/11-UX-DesignOps/` | Memoire UX/UI projet |
| Design contract | `DESIGN.md` | Contrat design portable projet |

---

## Parallelization Matrix

| Phase/Step | Can Start After | Can Run in Parallel With |
|------------|-----------------|--------------------------|
| Phase 1 | Immediate | None |
| Phase 2.1-2.2 | Phase 1 | None |
| Phase 2.3-2.9 | Phase 2.1-2.2 | Each other, by skill group |
| Phase 3 | Phase 2.6 | Phase 4.1-4.2 |
| Phase 4.1-4.2 | Phase 2 complete | Phase 3 |
| Phase 4.3-4.8 | Phase 4.1-4.2 | Phase 5.1 |
| Phase 5.1 | Phase 2 complete | Phase 4.3-4.8 |
| Phase 5.2-5.5 | Phase 5.1 | Phase 6 draft docs |
| Phase 6 | Phases 1-5 complete | None |
| Phase 7 | Phases 1-6 complete | None |
| Phase Finale | Phase 7 complete | None |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Un skill garde un fallback `docs/obsidian` | Documentation eparpillee et non conforme | Recherche repo complete et validation dediee |
| `ux-review-no-playwright` reste expose | Contradiction avec decision utilisateur | Supprimer/renommer et valider par `rg` |
| Stitch MCP ne fournit pas une capacite attendue | Workflow bloque sur generation/conversion | Documenter delegation vers official Stitch Skills et ne pas promettre l'outil absent |
| `clai sync` ecrase des docs projet | Perte de travail utilisateur | Create-if-missing par defaut, overwrite seulement avec `--force` |
| Les skills UX deviennent autonomes au lieu d'etre orchestras | Workflow incoherent | Phase 4 obligatoire avant release plugin |
| Verification visuelle indisponible | Validation UI incomplete | Declarer blocage explicite et ajouter setup Playwright/Browser |

---

## Definition of Done

- [x] Les 13 skills UX DesignOps sont disponibles dans le plugin Codex.
- [x] `ux-refactor` et `ux-review-no-playwright` ne sont plus exposes.
- [x] Tous les skills UX respectent `[DOC]-*` obligatoire et `11-UX-DesignOps`.
- [x] `clai init --target codex` installe UX DesignOps par defaut.
- [x] `--no-ux` permet de desactiver cette installation.
- [x] Stitch MCP est consomme par les skills concernes quand les outils existent.
- [x] Les changements UI exigent une verification visuelle avec Playwright, Browser plugin ou equivalent.
- [x] Le manifest plugin et le README sont a jour.
- [x] Les tests structurels, CLI, docs et MCP passent.
- [x] La documentation Obsidian FEAT-004 est synchronisee.
