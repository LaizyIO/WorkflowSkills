---
title: FEAT-004 Stitch MCP - Recherche d'integration
type: research
status: completed
created: 2026-06-07
updated: 2026-06-07
feature: FEAT-004
tags:
  - feature-workflow
  - research
  - ux
  - stitch
  - mcp
  - designops
---

# FEAT-004 - Recherche Stitch MCP

## Objectif

Verifier si le nouveau workflow UX DesignOps consomme correctement les capacites Stitch/MCP, et definir les adaptations necessaires pour l'integrer proprement dans la Workflow Skills Suite.

## Sources consultees

- Repository officiel Google Labs `stitch-skills`: https://github.com/google-labs-code/stitch-skills
- Repository officiel Google Labs `stitch-sdk`: https://github.com/google-labs-code/stitch-sdk
- Article Google Labs sur `DESIGN.md`: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
- Outils MCP exposes dans cette session: namespace `mcp__stitch`
- Nouveau kit local: `codex_ux_ui_designops_kit`

## Capacites Stitch officielles identifiees

Le repository officiel `google-labs-code/stitch-skills` decrit trois groupes de plugins:

### `stitch-design`

Skills design:

- `stitch::code-to-design`
- `stitch::generate-design`
- `stitch::manage-design-system`
- `stitch::extract-design-md`
- `stitch::extract-static-html`
- `stitch::upload-to-stitch`

### `stitch-build`

Skills build:

- `react-components`
- `react-native`
- `remotion`
- `shadcn-ui`

### `stitch-utilities`

Skills utilitaires:

- `design-md`
- `enhance-prompt`
- `stitch-loop`
- `taste-design`

Ces skills exigent un serveur Stitch MCP configure dans l'environnement agent.

## Capacites Stitch MCP exposees dans cette session

Le namespace `mcp__stitch` expose les outils suivants:

| Outil | Role |
|-------|------|
| `create_project` | Creer un projet Stitch |
| `list_projects` | Lister les projets Stitch accessibles |
| `get_project` | Lire les details d'un projet, screen instances, theme |
| `list_screens` | Lister les screens d'un projet |
| `list_design_systems` | Lister les design systems |
| `create_design_system` | Creer un design system |
| `update_design_system` | Mettre a jour un design system |
| `upload_design_md` | Uploader un `DESIGN.md` vers un projet |
| `create_design_system_from_design_md` | Creer un design system depuis `DESIGN.md` |
| `apply_design_system` | Appliquer un design system a des screens |

Test operationnel effectue:

- `list_projects` fonctionne et retourne un projet accessible.
- `get_project` fonctionne.
- `list_screens` fonctionne et retourne des screens avec `htmlCode.downloadUrl` et `screenshot.downloadUrl`.
- `list_design_systems` fonctionne et retourne un design system avec tokens/theme/designMd.

## Ecart entre Stitch officiel et MCP disponible ici

Les outils MCP exposes dans cette session couvrent bien:

- inventaire projets/screens;
- lecture de metadata de projet;
- lecture de screens avec URLs HTML et screenshots;
- lecture et gestion design systems;
- import de `DESIGN.md`;
- application de design system aux screens.

Mais ils ne couvrent pas explicitement, dans l'outil expose ici:

- generation directe d'ecrans depuis prompt (`generate_screen_from_text`);
- edition directe d'un screen depuis prompt;
- generation de variantes;
- upload d'HTML/assets vers Stitch;
- extraction HTML statique depuis une app locale;
- conversion Stitch -> React/shadcn/React Native;
- boucle complete `stitch-loop`.

Ces capacites existent dans la surface officielle `stitch-skills` / `stitch-sdk`, mais ne sont pas exposees par les outils actuellement charges dans cette session.

## Analyse du nouveau kit local

Le kit local consomme Stitch surtout sous forme de workflow manuel:

- `ux-stitch-brief` cree un brief texte.
- `ux-stitch-generate` cree un prompt Stitch dans `design/stitch/prompts`.
- `ux-stitch-iterate` cree un prompt d'iteration.
- `ux-code-to-stitch` prepare un prompt ou des instructions.
- `ux-implement-from-stitch` attend un lien, screenshot, ou export HTML.
- `design/stitch/project-map.md` est une table manuelle.
- `design/stitch/README.md` documente prompts, exports, screenshots.

Conclusion: **le kit ne consomme pas encore vraiment le MCP Stitch**. Il prepare des prompts et structure les artefacts, mais ne lit pas automatiquement les projets, screens, screenshots, HTML, ni design systems via `mcp__stitch`.

## Ce qui est bien couvert

- `DESIGN.md` est bien identifie comme source portable de contraintes design.
- Stitch est correctement traite comme direction visuelle, pas comme source de verite code.
- Le kit dit de ne pas copier le HTML Stitch brut si le projet a deja des composants.
- Les prompts incluent deja des contraintes anti-slop.
- Le dossier `design/stitch` permet de versionner prompts, exports, screenshots et map.

## Ce qui manque

### 1. Resolution MCP de projet Stitch

Les skills devraient accepter:

- une URL Stitch;
- un project id;
- un screen id;
- un titre de projet;
- ou une demande de creation de projet.

Puis utiliser:

- `list_projects`;
- `get_project`;
- `list_screens`;
- `list_design_systems`.

### 2. Synchronisation `DESIGN.md` vers Stitch

Le workflow doit consommer:

- `upload_design_md`;
- `create_design_system_from_design_md`;
- `apply_design_system`.

Cela permet d'appliquer le contrat design du repo a Stitch, au lieu de seulement coller un resume de `DESIGN.md` dans un prompt.

### 3. Import de screens Stitch dans la memoire UX

`list_screens` retourne:

- `name`;
- `title`;
- `deviceType`;
- `width`;
- `height`;
- `htmlCode.downloadUrl`;
- `screenshot.downloadUrl`.

Ces donnees doivent alimenter:

```text
[DOC]-*/11-UX-DesignOps/07-Stitch/Project_Map.md
[DOC]-*/11-UX-DesignOps/07-Stitch/Screens/<screen>.md
[DOC]-*/11-UX-DesignOps/08-Audits/
```

### 4. Design system Stitch comme source de comparaison

`list_design_systems` expose un design system riche avec:

- `designMd`;
- named colors;
- typography;
- spacing;
- roundness;
- style guidelines.

Les skills doivent comparer:

- `DESIGN.md` repo;
- `11-UX-DesignOps/02-Design-System/*`;
- design system Stitch.

Objectif: detecter drift entre repo et Stitch.

### 5. Verification visuelle avec screenshots Stitch

Les screenshots Stitch doivent etre utilises comme references visuelles pour `ux-visual-verification`, en complement de Playwright/browser local.

Flux cible:

1. Recuperer screenshot Stitch via `list_screens`.
2. Capturer l'app locale via Playwright/browser.
3. Comparer structure, hierarchy, density, states, responsive.
4. Documenter ecarts dans `08-Audits` et/ou `09-Debt`.

### 6. Remplacement du project map manuel

`design/stitch/project-map.md` ne doit pas etre la seule source. Il faut une version documentee dans:

```text
[DOC]-*/11-UX-DesignOps/07-Stitch/Project_Map.md
```

Ce document doit contenir:

- project id;
- project title;
- screen id;
- screen instance id si disponible;
- source screen;
- device type;
- status: draft | selected | implemented | deprecated;
- repo route/component associe;
- lien screenshot/html;
- date de synchronisation.

## Adaptations par skill Stitch

### ux-stitch-brief

Garder le role de cadrage. Ajouter:

- lecture de `11-UX-DesignOps`;
- generation d'un brief lie a une FEAT/flow/screen;
- section "MCP target" optionnelle: create project, existing project, existing screen.

Ne doit pas appeler MCP obligatoirement.

### ux-stitch-generate

Renommer ou etendre vers `ux-stitch-generate-or-sync`.

Doit:

1. Lire `DESIGN.md`.
2. Si project id fourni, appeler `get_project`.
3. Si aucun project id et creation demandee, appeler `create_project`.
4. Si design system absent ou obsolete, appeler `upload_design_md` puis `create_design_system_from_design_md`.
5. Enregistrer prompt dans `11-UX-DesignOps/07-Stitch/Prompts`.
6. Mettre a jour `11-UX-DesignOps/07-Stitch/Project_Map.md`.

Limite actuelle: l'outil MCP expose ici ne fournit pas `generate_screen_from_text`. Si cette capacite n'est pas disponible, le skill doit produire le prompt et demander generation dans Stitch UI ou via plugin officiel `stitch-design`.

### ux-stitch-iterate

Doit utiliser `get_project` et `list_screens` pour identifier l'ecran cible au lieu de demander seulement un lien manuel.

Doit versionner:

```text
11-UX-DesignOps/07-Stitch/Prompts/<target>-vN-iterate.md
11-UX-DesignOps/10-Decisions/Decision_Log.md
```

### ux-code-to-stitch

Le kit local est trop leger.

Si les outils officiels `extract-static-html` / `upload-to-stitch` ne sont pas exposes, le skill doit:

- capturer HTML/screenshot via Playwright/browser local;
- stocker les artefacts localement;
- produire un prompt Stitch robuste;
- indiquer explicitement que l'upload MCP n'est pas disponible dans l'environnement.

Si les outils officiels sont installes plus tard, il doit consommer:

- `extract-static-html`;
- `upload-to-stitch`;
- potentiellement `code-to-design`.

### ux-implement-from-stitch

Doit consommer MCP quand project/screen id fourni:

- `get_project`;
- `list_screens`;
- `list_design_systems`;
- URLs `htmlCode` et `screenshot`.

Puis comparer avec:

- code local;
- `DESIGN.md`;
- `11-UX-DesignOps`;
- plan FEAT actif.

Il ne doit pas creer de plan concurrent: il doit s'integrer au `FEAT-XXX-Plan.md` existant.

### ux-design-sync

Doit synchroniser aussi Stitch:

- `Project_Map.md`;
- design system drift;
- decisions prises depuis Stitch;
- statut des screens: draft, selected, implemented, deprecated.

## Recommandation sur plugin officiel Stitch Skills

La Workflow Skills Suite ne doit pas reimplementer tout `google-labs-code/stitch-skills`.

Recommandation:

1. Garder dans WorkflowSkills des skills UX orchestration adaptes a notre norme `[DOC]-*`.
2. Ajouter une dependance/documentation optionnelle vers le marketplace officiel Stitch Skills pour les operations avancees:
   - generate design;
   - code-to-design;
   - upload-to-stitch;
   - extract-static-html;
   - react-components;
   - shadcn-ui;
   - stitch-loop.
3. Dans les skills WorkflowSkills, detecter les outils `mcp__stitch` disponibles et adapter le niveau d'automatisation.

## Decisions recommandees

### Decision 1 - Consommer MCP Stitch quand disponible

Les skills Stitch ne doivent plus etre seulement des generateurs de prompts. Ils doivent utiliser `mcp__stitch` pour lire projets, screens, design systems, et synchroniser la documentation.

### Decision 2 - Ne pas bloquer si generation screen MCP absente

Dans cette session, les outils de generation directe ne sont pas exposes. Le workflow doit donc:

- automatiser ce qui est disponible;
- produire un prompt et une trace documentaire pour le reste;
- recommander l'installation du plugin officiel Stitch Skills si generation directe necessaire.

### Decision 3 - DESIGN.md doit etre synchronisable vers Stitch

Le workflow doit utiliser `upload_design_md` + `create_design_system_from_design_md` pour aligner Stitch avec le repo.

### Decision 4 - Project map dans `[DOC]`, pas seulement `design/stitch`

La source documentaire doit etre:

```text
[DOC]-*/11-UX-DesignOps/07-Stitch/Project_Map.md
```

`design/stitch/` peut rester un dossier d'artefacts locaux, mais la documentation vivante est dans `[DOC]`.

## Acceptance criteria

- Les skills Stitch resolvent toujours `DOC_ROOT` et `UX_DOCS_ROOT`.
- Les skills Stitch peuvent lire un project id Stitch et appeler `get_project`.
- Les skills Stitch peuvent lister les screens via `list_screens`.
- Les design systems Stitch peuvent etre listes et compares a `DESIGN.md`.
- `DESIGN.md` peut etre uploade et transforme en design system Stitch.
- `Project_Map.md` est maintenu dans `11-UX-DesignOps/07-Stitch`.
- Les screenshots/html Stitch sont references dans la doc UX.
- Le workflow signale clairement quand une capacite officielle Stitch existe mais n'est pas exposee dans l'environnement MCP courant.
- Les operations avancees peuvent deleguer au plugin officiel `google-labs-code/stitch-skills`.

## Next steps

1. Adapter `ux-stitch-*`, `ux-code-to-stitch`, `ux-implement-from-stitch`, `ux-design-sync`.
2. Ajouter une section Stitch MCP dans `AGENTS.md.template`.
3. Ajouter les templates:
   - `TPL-UX-Stitch-Project.md`
   - `TPL-UX-Stitch-Screen.md`
   - `TPL-UX-Stitch-Audit.md`
4. Mettre a jour `FEAT-004-Plan.md` lors de la phase implementation-planner.
