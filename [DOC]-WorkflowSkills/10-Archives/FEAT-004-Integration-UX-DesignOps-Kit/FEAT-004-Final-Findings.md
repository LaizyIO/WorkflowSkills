---
title: FEAT-004 Integration UX DesignOps Kit - Findings finaux
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
  - stitch
  - mcp
---

# FEAT-004 - Findings finaux

## Synthese

FEAT-004 consiste a remplacer l'ancien skill UI `ux-refactor` par une integration complete du **Codex UX/UI DesignOps Kit** dans Workflow Skills Suite.

Le nouveau kit ne doit pas etre integre comme un simple pack de prompts. Il devient un sous-workflow UX/UI complet branche sur:

- le plugin Codex `workflow-skills`;
- la CLI `clai`;
- le template `AGENTS.md`;
- la documentation projet `[DOC]-*`;
- Stitch MCP;
- Playwright/browser pour verification visuelle;
- les phases existantes `specification -> research -> plan -> implement -> test -> fix -> documentation`.

Les trois rapports de recherche detailles restent les annexes techniques:

- [[FEAT-004-Findings]]
- [[FEAT-004-Skill-Audit]]
- [[FEAT-004-Stitch-MCP-Research]]

La decision documentaire structurante est formalisee dans:

- [[ADR-003-Structure-UX-DesignOps]]

## Decisions consolidees

### 1. `ux-refactor` est remplace

`ux-refactor` et l'ancien UI kit ne doivent plus etre exposes dans le plugin Workflow Skills.

Le nouveau workflow UX expose des skills plus specialises:

- `ux-bootstrap`
- `ux-audit`
- `ux-flow`
- `ux-component-spec`
- `ux-stitch-brief`
- `ux-stitch-generate`
- `ux-stitch-iterate`
- `ux-code-to-stitch`
- `ux-implement-from-stitch`
- `ux-polish`
- `ux-visual-verification`
- `ux-design-sync`
- `ux-storybook`

Le skill source `ux-review-no-playwright` ne doit pas etre conserve tel quel. Il doit etre remplace par `ux-visual-verification`.

### 2. `[DOC]-*` reste l'unique source documentaire

Il n'y a aucun fallback runtime vers `docs/obsidian`.

Si aucun dossier `[DOC]-*` n'existe, les skills UX doivent demander ou declencher l'initialisation documentaire du projet avant de produire une documentation persistante.

Le contenu source `docs/obsidian` du kit est seulement une source de templates a convertir.

### 3. UX DesignOps devient un domaine documentaire dedie

La memoire UX/UI projet vit dans:

```text
[DOC]-<Project>/11-UX-DesignOps/
```

Les MOC et templates restent dans les dossiers standards:

```text
[DOC]-<Project>/00-MOC/MOC-UX.md
[DOC]-<Project>/_Templates/TPL-UX-Screen.md
[DOC]-<Project>/_Templates/TPL-UX-Component.md
[DOC]-<Project>/_Templates/TPL-UX-Flow.md
[DOC]-<Project>/_Templates/TPL-UX-Audit.md
```

Structure cible:

```text
11-UX-DesignOps/
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

### 4. `DESIGN.md` reste a la racine projet

`DESIGN.md` est le contrat design portable pour Codex, Stitch et les agents. Il reste a la racine du projet.

La memoire longue, les audits, les decisions, les screens, les components, les flows et les artefacts Stitch documentes vivent dans `[DOC]-*/11-UX-DesignOps/`.

### 5. Stitch MCP doit etre consomme

Le kit actuel produit surtout des prompts manuels. Ce n'est pas suffisant.

Les skills Stitch doivent utiliser les outils MCP disponibles quand ils existent:

- `create_project`
- `list_projects`
- `get_project`
- `list_screens`
- `list_design_systems`
- `create_design_system`
- `update_design_system`
- `upload_design_md`
- `create_design_system_from_design_md`
- `apply_design_system`

Les appels testes dans la session fonctionnent:

- `list_projects`
- `get_project`
- `list_screens`
- `list_design_systems`

Les capacites non exposees dans le namespace MCP actuel, mais presentes dans l'ecosysteme officiel Stitch Skills/SDK, doivent etre signalees:

- generation directe de screens depuis prompt;
- upload d'HTML/assets vers Stitch;
- extraction HTML statique;
- conversion Stitch vers React/shadcn/React Native;
- boucle `stitch-loop`.

Le workflow peut deleguer ces operations avancees au plugin officiel `google-labs-code/stitch-skills` si installe.

### 6. Verification visuelle obligatoire pour UI

Le workflow ne formalise pas de mode "sans Playwright".

Pour une modification UI, la verification doit utiliser:

- Playwright;
- Browser plugin;
- ou un outil equivalent de rendu/capture disponible.

Si aucun outil n'est disponible, le test est bloque et le plan doit inclure l'installation/configuration de l'outillage.

### 7. Les docs UX doivent avoir frontmatter et MOC

Tous les documents persistants crees par les skills UX doivent:

- etre en francais;
- avoir un YAML frontmatter valide;
- utiliser des types dedies (`ux-screen`, `ux-component`, `ux-flow`, `ux-audit`, `ux-decision-log`, etc.);
- mettre a jour `00-MOC/MOC-UX.md`;
- mettre a jour `00-MOC/MOC-Principal.md` si un nouveau MOC est cree.

## Integration dans Workflow Skills Suite

### feature-specification

Ajouter une detection "UI impacted".

Si oui, la specification doit capturer:

- user goal;
- primary task;
- target surfaces;
- required states;
- accessibility constraints;
- responsive constraints;
- design constraints;
- UX documents expected.

Skills lies:

- `ux-flow` pour parcours utilisateur;
- `ux-component-spec` pour composant partage.

### feature-research

Ajouter une section `UX/UI Research` dans les findings quand UI impactee.

Le skill doit lire:

- `DESIGN.md`;
- `[DOC]-*/11-UX-DesignOps`;
- documents CDC/FEAT/ADR lies.

Il doit identifier:

- besoin d'audit UX;
- besoin de Stitch;
- surfaces impactees;
- docs UX a creer ou mettre a jour;
- risques accessibilite/responsive/anti-slop.

### implementation-planner

Ajouter des phases conditionnelles:

- UX flow / component spec;
- Stitch MCP sync/generation si necessaire;
- implementation UI;
- visual verification;
- UX design sync.

Le plan ne doit pas creer un plan UX concurrent; les etapes UX doivent etre integrees au `FEAT-XXX-Plan.md`.

### feature-implementer

Pour UI:

- suivre `ux-polish` ou `ux-implement-from-stitch`;
- preserver la logique metier;
- utiliser composants/tokens existants;
- ne pas coller HTML Stitch brut si le projet a deja des composants;
- mettre a jour docs UX;
- declencher verification visuelle.

### test-plan-generator

Pour UI:

- ajouter state matrix;
- responsive desktop/mobile;
- keyboard/focus;
- accessibility basics;
- visual comparison against Stitch screenshot if relevant;
- Storybook if present;
- anti-slop checks.

### test-executor

Executer `ux-visual-verification` pour les changements UI.

Si verification visuelle impossible, produire un blocage explicite au lieu d'une validation degradee.

### Synchronisation documentaire

`source-command-doc-manager` est retire du workflow actif.

La synchronisation documentaire UX doit inspecter et synchroniser:

```text
[DOC]-*/11-UX-DesignOps/
```

Le principe reste:

```text
Code = Source de verite
Documentation = Reflet du code
```

### workflow-challenger

Ajouter les challenges UX:

- flow absent pour une feature UI complexe;
- states incomplets;
- plan incoherent avec `DESIGN.md`;
- drift entre code, docs UX et Stitch;
- absence de decision UX dans `Decision_Log.md`;
- absence de verification visuelle.

## Integration `clai`

### `clai init --target codex`

Doit installer par defaut:

- `DESIGN.md`;
- `[DOC]-<Project>/11-UX-DesignOps/`;
- `[DOC]-<Project>/00-MOC/MOC-UX.md`;
- templates UX dans `[DOC]-<Project>/_Templates/`;
- `design/stitch/` pour artefacts locaux si utile;
- `scripts/ux/uxkit-lite.mjs`;
- section UX DesignOps dans `AGENTS.md`.

Ajouter une option:

```text
--no-ux
```

pour les projets non UI ou minimalistes.

### `clai sync --target codex`

Doit synchroniser les assets UX sans ecraser les documents vivants:

- create-if-missing par defaut;
- overwrite seulement avec `--force`;
- `DESIGN.md`, `Decision_Log.md`, `Visual_Debt.md`, screens/components/flows sont vivants et ne doivent pas etre remplaces silencieusement.

### `clai global --target codex`

Ne doit pas devenir le canal principal de distribution des skills UX.

La distribution des skills reste le plugin Workflow Skills / marketplace Codex.

## Integration plugin Codex

Mettre a jour:

```text
plugins/codex/workflow-skills/.codex-plugin/plugin.json
plugins/codex/README.md
plugins/codex/workflow-skills/skills/
```

Changements:

- retirer `ux-refactor`;
- ajouter les skills UX DesignOps adaptes;
- remplacer `ux-review-no-playwright` par `ux-visual-verification`;
- mettre a jour description, longDescription, defaultPrompt;
- mentionner Stitch MCP;
- mentionner `[DOC]-*/11-UX-DesignOps`.

## Integration Stitch MCP

### Project map

La documentation vivante doit etre:

```text
[DOC]-*/11-UX-DesignOps/07-Stitch/Project_Map.md
```

Elle doit contenir:

- project id;
- project title;
- screen id;
- screen instance id si disponible;
- source screen;
- device type;
- status: draft | selected | implemented | deprecated;
- route/component associe;
- liens screenshot/html;
- date de synchronisation.

### Design system sync

Workflow cible:

1. Lire `DESIGN.md`.
2. Lire `11-UX-DesignOps/02-Design-System`.
3. Appeler `list_design_systems`.
4. Comparer repo vs Stitch.
5. Si necessaire, `upload_design_md`.
6. Puis `create_design_system_from_design_md`.
7. Puis `apply_design_system` aux screens selectionnes.

### Screen sync

Workflow cible:

1. `get_project`.
2. `list_screens`.
3. Documenter chaque screen dans `11-UX-DesignOps/07-Stitch/Screens`.
4. Referencer `htmlCode.downloadUrl` et `screenshot.downloadUrl`.
5. Alimenter `ux-visual-verification` avec ces references.

## Files a ajouter ou modifier

### A retirer ou archiver

```text
ux-refactor/
plugins/codex/workflow-skills/skills/ux-refactor/
```

### A ajouter

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
```

Et leurs copies plugin sous:

```text
plugins/codex/workflow-skills/skills/
```

### A modifier

```text
feature-specification/
feature-research/
implementation-planner/
feature-implementer/
test-plan-generator/
test-executor/
ux-design-sync/
workflow-challenger/
feature-workflow/
```

Et leurs copies plugin sous:

```text
plugins/codex/workflow-skills/skills/
```

### Templates `clai`

Ajouter:

```text
clai/templates/codex/ux-designops/
```

Incluant:

- `DESIGN.md`;
- `11-UX-DesignOps` templates de contenu;
- `MOC-UX.md`;
- `TPL-UX-*.md`;
- `design/stitch`;
- `scripts/ux/uxkit-lite.mjs`.

## Risques

### Documentation drift

Risque: `DESIGN.md`, Stitch, code et `[DOC]-*` divergent.

Mitigation: `ux-design-sync`, phases documentaires explicites, Stitch MCP sync, visual verification.

### Capacites Stitch MCP partielles

Risque: le namespace MCP courant ne fournit pas generation directe de screens.

Mitigation: automatiser ce qui est disponible, documenter le reste, et deleguer aux plugins officiels Stitch Skills si installes.

### Overwrite de memoire projet

Risque: `clai sync` remplace des docs UX vivantes.

Mitigation: create-if-missing par defaut, overwrite uniquement avec `--force`.

### Anciennes skills globales

Risque: les anciennes skills UI restent installees globalement chez l'utilisateur.

Mitigation: le plugin officiel ne les expose plus; cleanup global optionnel apres implementation.

## Acceptance criteria

- `ux-refactor` n'est plus expose par le plugin Workflow Skills.
- `ux-review-no-playwright` n'est pas expose; `ux-visual-verification` le remplace.
- Les 13 skills UX DesignOps adaptes sont exposes par le plugin.
- Aucun skill UX n'ecrit dans `docs/obsidian`.
- Si `[DOC]-*` absent, le skill demande/initie la documentation au lieu d'ecrire ailleurs.
- `clai init --target codex` cree `11-UX-DesignOps`, `MOC-UX.md`, templates UX, `DESIGN.md`.
- `clai init --target codex --no-ux` skippe l'installation UX.
- `AGENTS.md.template` documente UX DesignOps, Stitch MCP, Playwright/browser verification.
- `uxkit-lite.mjs` ecrit dans `11-UX-DesignOps/08-Audits`.
- Les skills Stitch consomment `mcp__stitch` quand disponible.
- `DESIGN.md` peut etre synchronise vers Stitch via MCP.
- `Project_Map.md` vit dans `[DOC]-*/11-UX-DesignOps/07-Stitch`.
- Les screenshots/html Stitch sont references dans la doc UX.
- Les changements UI passent par verification Playwright/browser ou sont marques bloques.

## References

- [[FEAT-004-Findings]]
- [[FEAT-004-Skill-Audit]]
- [[FEAT-004-Stitch-MCP-Research]]
- [[ADR-003-Structure-UX-DesignOps]]
- Google Stitch Skills: https://github.com/google-labs-code/stitch-skills
- Google Stitch SDK: https://github.com/google-labs-code/stitch-sdk
- Google Labs DESIGN.md: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/

## Next step

Passer a `implementation-planner` pour generer `FEAT-004-Plan.md` a partir de ces findings finaux.
