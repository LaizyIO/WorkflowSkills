---
title: FEAT-004 UX DesignOps Skills - Audit d'integration
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
  - skills
  - obsidian
---

# FEAT-004 - Audit d'integration des skills UX DesignOps

## Objectif

Analyser chaque skill du nouveau Codex UX/UI DesignOps Kit pour definir les adaptations necessaires avant integration dans la Workflow Skills Suite.

Cette analyse complete `FEAT-004-Findings.md`. Elle se concentre sur:

- compatibilite avec la norme documentaire `[DOC]-*`;
- role exact dans le cycle `specification -> research -> plan -> implement -> test -> fix -> documentation`;
- sorties attendues;
- chemins a corriger;
- risques d'ambiguite ou de duplication documentaire;
- modifications requises dans chaque `SKILL.md`.

## Verdict global

Les 13 skills sont une bonne base fonctionnelle, mais ils sont encore formates comme un kit autonome. Ils doivent etre adaptes avant publication dans Workflow Skills Suite.

Problemes communs:

1. Ils referencent `docs/obsidian` au lieu d'un dossier UX dedie dans `[DOC]-*`.
2. Les documents UX fournis par le kit n'ont pas de frontmatter Obsidian.
3. Les outputs ne precisent pas les conventions WorkflowSkills: langue francaise, statut, dates, tags, wikilinks, MOC.
4. Les skills ne disent pas comment se comporter quand `[DOC]-*` n'existe pas.
5. Les skills ne distinguent pas assez les artefacts projet vivants (`DESIGN.md`, docs UX) des artefacts temporaires ou d'exploration (`design/stitch/prompts`).
6. Aucun skill ne reference explicitement la hierarchie documentaire existante: CDC > DB > Meetings > ADR > FEAT.

## Regle commune a ajouter a tous les skills UX

Chaque skill UX doit commencer par une section commune de resolution documentaire:

```markdown
## WorkflowSkills Project Context

Before acting, resolve project documentation roots:

1. Look for a `[DOC]-*` directory at project root.
2. If found, set `DOC_ROOT` to that directory and `UX_DOCS_ROOT` to `[DOC]-*/11-UX-DesignOps`.
3. If `[DOC]-*` is absent, stop and ask to initialize project documentation first; never write persistent UX documentation to `docs/obsidian`.
4. If UX docs do not exist inside `[DOC]-*`, run or follow `ux-bootstrap` before producing persistent UX documentation.
5. Keep `DESIGN.md` at project root as the portable design contract.
6. All persistent documentation must be in French and include YAML frontmatter.
7. Update `00-MOC/MOC-Principal.md` and `00-MOC/MOC-UX.md` when creating new UX documents.
```

## Frontmatter requis pour docs UX

Ajouter un format dedie pour les documents sous `11-UX-DesignOps`.

### Document screen

```yaml
---
title: UX Screen - Nom ecran
type: ux-screen
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
route:
tags:
  - ux
  - screen
---
```

### Document component

```yaml
---
title: UX Component - ComponentName
type: ux-component
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
component: ComponentName
tags:
  - ux
  - component
---
```

### Document flow

```yaml
---
title: UX Flow - Nom flow
type: ux-flow
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
feature:
tags:
  - ux
  - flow
---
```

### Document decision log / visual debt

```yaml
---
title: UX Decision Log
type: ux-decision-log
status: active
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - ux
  - decisions
---
```

## Dossier documentaire recommande

Pour integration WorkflowSkills:

```text
[DOC]-Project/
  00-MOC/
    MOC-UX.md
  _Templates/
    TPL-UX-Screen.md
    TPL-UX-Component.md
    TPL-UX-Flow.md
    TPL-UX-Audit.md
  11-UX-DesignOps/
    01-Product/
      Product_Context.md
      UX_Principles.md
      UI_Principles.md
      Anti_Slop_Vocabulary.md
    02-Design-System/
      Design_Tokens.md
      Component_Registry.md
      Accessibility_Rules.md
    03-Interaction/
      Interaction_Patterns.md
      Responsive_Adaptive_Rules.md
      Desktop_Mobile_Patterns.md
    04-Screens/
    05-Components/
    06-Flows/
    07-Stitch/
      Project_Map.md
      Prompts/
      Exports/
    08-Audits/
      Project_Scan_Report.md
    09-Debt/
      Visual_Debt.md
    10-Decisions/
      Decision_Log.md
```

`00-MOC/MOC-UX.md` doit etre ajoute au `MOC-Principal.md`.

## Matrice d'integration par skill

| Skill | Statut actuel | Integration cible |
|-------|---------------|-------------------|
| `ux-bootstrap` | Base OK, chemins incompatibles | Skill d'initialisation memoire UX projet |
| `ux-audit` | Base OK, output docs a normaliser | Phase research/audit avant plan ou code |
| `ux-flow` | Base OK, output docs a normaliser | Phase specification/research pour feature UI |
| `ux-component-spec` | Base OK, output docs a normaliser | Phase research/planning pour composants partages |
| `ux-stitch-brief` | OK, mais doit lire UX_DOCS_ROOT | Phase exploration design |
| `ux-stitch-generate` | OK, mais doit lier prompts aux docs UX | Phase design avant implementation |
| `ux-stitch-iterate` | OK, mais doit versionner decisions | Phase iteration design |
| `ux-code-to-stitch` | Trop leger | Bridge code -> exploration Stitch |
| `ux-implement-from-stitch` | Base OK, doit s'integrer au plan | Phase implementation UI |
| `ux-polish` | Base OK, doit etre relie a docs/tests | Phase implementation/refinement |
| `ux-review-no-playwright` | A remplacer | Ne pas integrer de mode sans Playwright |
| `ux-design-sync` | Trop vague | Phase documentation UX obligatoire |
| `ux-storybook` | Base OK, optionalite claire | Phase test/visual catalog |

## Analyse detaillee par skill

### ux-bootstrap

**Role cible**

Initialiser la memoire UX/UI d'un projet, surtout via `clai init --target codex` ou lorsqu'un projet legacy n'a pas encore de structure UX.

**Problemes actuels**

- Cree `docs/obsidian/*`, incompatible avec la source de verite `[DOC]-*`.
- Ne precise pas les frontmatter requis.
- Ne met pas a jour `MOC-Principal.md`.
- Cree `design/stitch/exports` et `screenshots`, mais ces dossiers ne sont pas dans le zip initial.
- Lance `scripts/ux/uxkit-lite.mjs scan`, qui ecrit actuellement dans `docs/obsidian/Project_Scan_Report.md`.

**Adaptations requises**

- Remplacer tous les chemins `docs/obsidian/*` par `UX_DOCS_ROOT/*`.
- Si `[DOC]-*` existe, creer `11-UX-DesignOps`.
- Si `[DOC]-*` n'existe pas, demander ou creer une structure doc via `clai init`; ne jamais utiliser `docs/obsidian` comme fallback d'ecriture.
- Creer `[DOC]-*/00-MOC/MOC-UX.md` avec frontmatter `type: moc`.
- Ajouter `[[MOC-UX]]` dans `[DOC]-*/00-MOC/MOC-Principal.md`.
- Mettre a jour `uxkit-lite.mjs` pour accepter ou detecter `UX_DOCS_ROOT`, sinon son rapport part au mauvais endroit.

**Phase WorkflowSkills**

- Avant `feature-research` pour un projet legacy.
- Pendant `clai init --target codex`.
- Jamais pendant implementation sauf si la memoire UX n'existe pas.

**Priorite**

Critique.

### ux-audit

**Role cible**

Auditer une surface UI avant modification et produire des observations exploitables par `feature-research` ou `implementation-planner`.

**Problemes actuels**

- Output vers `docs/obsidian/screens|components|flows`.
- Ne precise pas le format de priorisation attendu dans WorkflowSkills.
- Ne relie pas les findings au document `FEAT-XXX-Findings.md`.
- Ne demande pas de lire CDC/FEAT/ADR existants.

**Adaptations requises**

- Utiliser `UX_DOCS_ROOT/screens|components|flows`.
- Ajouter frontmatter aux documents crees.
- Ajouter une section standard:
  - `Problemes critiques`;
  - `Quick wins`;
  - `Corrections structurelles`;
  - `Impacts sur implementation-planner`;
  - `Tests UX requis`.
- Mettre a jour `UX_DOCS_ROOT/Visual_Debt.md`.
- Si un workflow feature est en cours, ajouter un resume dans `FEAT-XXX-Findings.md`.

**Phase WorkflowSkills**

- Phase `research` pour UI existante.
- Peut etre invoque avant `ux-polish`.

**Priorite**

Critique.

### ux-flow

**Role cible**

Documenter le parcours utilisateur avant toute conception d'ecran ou implementation.

**Problemes actuels**

- Output vers `docs/obsidian/flows`.
- Ne precise pas le lien avec CDC/FEAT.
- Ne precise pas que le flow doit etre en francais.
- Ne definit pas les criteres d'acceptation UX a reinjecter dans le plan.

**Adaptations requises**

- Output vers `UX_DOCS_ROOT/flows/UXF-<slug>.md` ou `Flow-<slug>.md`.
- Ajouter frontmatter `type: ux-flow`.
- Lire `01-Specs/CDC-*.md` et `04-Features/FEAT-*.md` si presents.
- Ajouter sections:
  - `Criteres d'acceptation UX`;
  - `State matrix`;
  - `Risques accessibilite`;
  - `Documents lies`.
- Ajouter wikilinks vers la FEAT ou CDC associee.

**Phase WorkflowSkills**

- Phase `specification` si la feature est floue.
- Phase `research` si la feature est claire mais user-facing.

**Priorite**

Critique.

### ux-component-spec

**Role cible**

Creer une specification design-system pour un composant partage.

**Problemes actuels**

- Output vers `docs/obsidian/components`.
- Ne formalise pas les props comme source de verite code.
- Ne precise pas la verification code vs doc.
- Ne cree pas de lien avec `Design_Tokens.md`.

**Adaptations requises**

- Output vers `UX_DOCS_ROOT/components/UXC-ComponentName.md` ou `Component-ComponentName.md`.
- Ajouter frontmatter `type: ux-component`.
- Lire le code reel du composant avant d'ecrire.
- Distinguer:
  - API reelle actuelle;
  - API souhaitee;
  - ecarts a corriger.
- Ajouter sections:
  - `Variants`;
  - `State matrix`;
  - `Accessibility contract`;
  - `Token usage`;
  - `Storybook coverage`;
  - `Tests attendus`.

**Phase WorkflowSkills**

- Research/planning si composant nouveau ou partage.
- Documentation apres implementation si composant modifie.

**Priorite**

Critique.

### ux-stitch-brief

**Role cible**

Transformer une demande vague en brief Stitch structure avant generation visuelle.

**Problemes actuels**

- Lit seulement `DESIGN.md`.
- Ne force pas la consultation des docs UX et specs existantes.
- Ne precise pas comment sauvegarder le brief avec metadonnees.

**Adaptations requises**

- Lire `DESIGN.md`, `UX_DOCS_ROOT`, et documents FEAT/CDC lies.
- Sauvegarder sous `design/stitch/prompts/<target>-brief.md`.
- Ajouter en haut du prompt:
  - source docs consultees;
  - date;
  - target route/component/flow;
  - contraintes non negociables.
- Mettre a jour `design/stitch/project-map.md`.

**Phase WorkflowSkills**

- Research/design exploration.
- Avant `ux-stitch-generate`.

**Priorite**

Moyenne.

### ux-stitch-generate

**Role cible**

Generer un prompt Stitch exploitable a partir des docs projet.

**Problemes actuels**

- Ne precise pas le mode si Stitch n'est pas disponible.
- Ne relie pas le prompt a une FEAT/flow/screen.
- Ne consigne pas la decision dans `Decision_Log.md`.

**Adaptations requises**

- Lire `UX_DOCS_ROOT/screens|flows|components`.
- Enregistrer prompt sous `design/stitch/prompts`.
- Mettre a jour `design/stitch/project-map.md`.
- Ajouter une entree dans `UX_DOCS_ROOT/Decision_Log.md` seulement si une direction est choisie, pas a la generation initiale.
- Toujours formuler des prompts anti-slop et sans fausses donnees.

**Phase WorkflowSkills**

- Optionnelle entre planning et implementation.
- Utile si direction visuelle incertaine.

**Priorite**

Moyenne.

### ux-stitch-iterate

**Role cible**

Preparer une iteration sur une direction Stitch existante.

**Problemes actuels**

- Ne formalise pas la notion de version/iteration.
- Ne demande pas de conserver la logique UX documentee.
- Ne met pas a jour `project-map.md` de facon stricte.

**Adaptations requises**

- Nommer les prompts `target-vN-iterate.md`.
- Comparer la direction actuelle aux docs UX.
- Documenter:
  - `A conserver`;
  - `A corriger`;
  - `A ne pas changer`;
  - `Raison produit`.
- Mettre a jour `design/stitch/project-map.md`.

**Phase WorkflowSkills**

- Research/design exploration.

**Priorite**

Basse a moyenne.

### ux-code-to-stitch

**Role cible**

Preparer un ecran ou composant existant pour exploration visuelle Stitch sans casser le code.

**Problemes actuels**

- Trop leger pour WorkflowSkills.
- Ne precise pas comment inspecter le code existant.
- Ne documente pas les contraintes actuelles de layout, data, et states.
- Ne dit pas ou stocker les captures ou exports.

**Adaptations requises**

- Lire composant/page cible et styles associes.
- Produire un document dans `UX_DOCS_ROOT/screens` ou `components`.
- Produire un prompt `design/stitch/prompts/<target>-code-to-stitch.md`.
- Documenter:
  - structure actuelle;
  - composants existants;
  - contraintes data/API;
  - etats visibles/non visibles;
  - objectifs d'exploration.
- Ne jamais demander a Stitch de reimaginer la logique metier.

**Phase WorkflowSkills**

- Research pour refonte UI existante.

**Priorite**

Moyenne.

### ux-implement-from-stitch

**Role cible**

Transformer une direction Stitch choisie en code projet maintenable.

**Problemes actuels**

- Indique "Create an implementation plan" alors que WorkflowSkills a deja `implementation-planner`.
- Ne precise pas comment relier au plan existant.
- Ne precise pas comment consigner les ecarts entre Stitch et code final.

**Adaptations requises**

- Si un `FEAT-XXX-Plan.md` existe, ne pas creer un plan concurrent; ajouter ou suivre les etapes UI du plan.
- Lire `DESIGN.md`, `UX_DOCS_ROOT`, FEAT/CDC/Plan.
- Comparer:
  - direction Stitch;
  - design system existant;
  - code actuel;
  - contraintes d'accessibilite.
- Documenter les adaptations dans `UX_DOCS_ROOT/Decision_Log.md`.
- Executer `ux-design-sync` apres implementation.
- Indiquer que le code Stitch brut est une reference visuelle, jamais source de verite logique.

**Phase WorkflowSkills**

- Implementation.
- Eventuellement apres planning si une direction Stitch a ete choisie.

**Priorite**

Critique.

### ux-polish

**Role cible**

Ameliorer une UI existante sans changer le comportement.

**Problemes actuels**

- Ne dit pas comment eviter de contourner `implementation-planner` dans une feature suivie.
- Ne mentionne pas les docs `[DOC]-*`.
- Ne precise pas les criteres de test.

**Adaptations requises**

- Si un plan existe, implementer seulement les etapes prevues ou demander validation avant ajout.
- Lire `UX_DOCS_ROOT` et documents FEAT/Plan lies.
- Ajouter une mini-checklist finale:
  - comportement preserve;
  - tokens respectes;
  - states couverts;
  - responsive verifie;
  - accessibilite minimale;
  - docs mises a jour.
- Appeler/follow `ux-design-sync` apres modifications significatives.

**Phase WorkflowSkills**

- Implementation.
- Peut remplacer l'ancien `ux-refactor` pour les demandes d'amelioration UI.

**Priorite**

Critique.

### ux-review-no-playwright

**Role cible**

Ne pas integrer ce skill tel quel.

**Problemes actuels**

- Il encode explicitement un mode sans Playwright, contraire a la direction retenue.
- Il risque de normaliser une verification uniquement statique alors que les changements UI doivent etre verifies visuellement.
- Il duplique partiellement les responsabilites de `test-executor` et d'un futur skill de verification visuelle.

**Adaptations requises**

- Remplacer par un skill `ux-visual-verification` ou `ux-ui-qa`.
- Le nouveau skill doit utiliser Playwright, le Browser plugin, ou le mecanisme de verification visuelle disponible dans l'environnement.
- Il doit verifier au minimum desktop, mobile, etats UI, focus, responsive, overflow, contraste apparent, et coherence tokens.
- Il doit produire une sortie exploitable par `test-executor` et `FEAT-XXX-Test-Results.md`.
- Si Playwright/browser n'est pas disponible, il doit signaler le blocage et demander l'initialisation de l'outillage, pas basculer en mode degrade comme comportement normal.

**Phase WorkflowSkills**

- Testing/visual QA.
- Apres implementation UI et avant `ux-design-sync`.

**Priorite**

Critique, mais sous forme de remplacement/renommage, pas integration directe.

### ux-design-sync

**Role cible**

Synchroniser les docs UX apres changement UI.

**Problemes actuels**

- Trop vague.
- References `Decision_Log.md` et `Visual_Debt.md` sans chemin.
- Ne precise pas comment comparer code vs documentation.
- Ne respecte pas explicitement la philosophie WorkflowSkills `Code = Source de verite`.

**Adaptations requises**

- Utiliser `UX_DOCS_ROOT/Decision_Log.md` et `UX_DOCS_ROOT/Visual_Debt.md`.
- Process obligatoire:
  1. Identifier les fichiers UI modifies.
  2. Lire le code reel.
  3. Lire docs UX existantes.
  4. Comparer code vs doc.
  5. Mettre a jour docs et dates.
  6. Ajouter liens MOC.
- Ne pas inventer de decisions: si incertain, noter comme hypothese.
- Integrer a la phase documentation de `feature-implementer`.

**Phase WorkflowSkills**

- Documentation.
- Derniere etape apres implementation ou review.

**Priorite**

Critique.

### ux-storybook

**Role cible**

Creer ou mettre a jour les stories pour les etats UI difficiles a verifier.

**Problemes actuels**

- Ne precise pas comment detecter Storybook selon framework.
- Ne relie pas les stories au test plan.
- Output documentation vers `docs/obsidian/components`.

**Adaptations requises**

- Detecter Storybook via `.storybook`, `*.stories.*`, dependances package.json.
- Si absent, ne pas installer sans demande; proposer `design-lab` interne comme alternative.
- Documenter stories dans `UX_DOCS_ROOT/components`.
- Ajouter les stories au test plan UI.
- Verifier etats: default, hover/focus si representable, loading, empty, error, success, disabled, long content, mobile.

**Phase WorkflowSkills**

- Planning/testing pour composants critiques.

**Priorite**

Moyenne.

## Changements transverses requis dans les skills WorkflowSkills existants

### feature-specification

Ajouter un bloc "UI impacted?".

Si oui, la specification doit capturer:

- user goal;
- primary task;
- target surfaces;
- states;
- accessibility constraints;
- responsive constraints;
- expected UX docs to produce.

### feature-research

Ajouter recherche UX/UI:

- lire `DESIGN.md`;
- lire `UX_DOCS_ROOT`;
- declencher `ux-audit` pour UI existante;
- declencher `ux-flow` pour parcours;
- documenter `UX/UI Research` dans findings.

### implementation-planner

Ajouter phases conditionnelles:

- UX flow/component spec;
- Stitch exploration si utile;
- implementation UI;
- UX review;
- UX design sync.

### feature-implementer

Ajouter regles UI:

- suivre `ux-polish` ou `ux-implement-from-stitch`;
- preserve business logic;
- update docs UX;
- verifier states/responsive/accessibility.

### test-plan-generator

Ajouter tests UX:

- state matrix;
- responsive;
- keyboard/focus;
- accessibility basics;
- Storybook if present;
- no anti-slop.

### test-executor

Executer ou exiger `ux-visual-verification` pour les changements UI. La verification doit utiliser Playwright, Browser plugin, ou un outil equivalent de rendu/capture. Si aucun outil de verification visuelle n'est disponible, le test doit etre marque bloque et le plan doit ajouter l'initialisation de cet outillage.

### Synchronisation documentaire

`source-command-doc-manager` est retire du workflow actif. La synchronisation des docs UX passe par `ux-design-sync` et par les phases documentaires explicites des workflows feature.

### workflow-challenger

Ajouter checks UX:

- le flow existe-t-il pour une feature UI complexe?
- les states sont-ils couverts?
- le plan respecte-t-il `DESIGN.md`?
- la doc UX et le code divergent-ils?
- une decision UX importante manque-t-elle dans `Decision_Log.md`?

## Recommandation sur dossier dedie

Decision retenue apres cadrage: utiliser un dossier dedie de premier niveau.

### Structure cible - `11-UX-DesignOps`

Avantages:

- plus propre et plus visible que `09-Resources/UX`;
- separe clairement la memoire UX/UI des ressources externes;
- permet des sous-domaines ordonnes: product, design system, interactions, screens, components, flows, Stitch, audits, debt, decisions;
- reste compatible avec le vault existant sans deplacer les dossiers metier deja etablis.

Contraintes:

- necessite de mettre a jour `AGENTS.md`, `clai/templates/obsidian`, `ux-design-sync`, et les skills WorkflowSkills;
- doit etre reference dans `00-MOC/MOC-Principal.md`.

`09-Resources` reste reserve aux ressources externes ou generales. La memoire UX projet devient un domaine documentaire explicite.

## Priorites d'adaptation

### P0 - Obligatoire avant integration plugin

- `ux-bootstrap`
- `ux-audit`
- `ux-flow`
- `ux-component-spec`
- `ux-implement-from-stitch`
- `ux-polish`
- remplacement `ux-visual-verification`
- `ux-design-sync`

### P1 - Important mais peut suivre

- `ux-stitch-brief`
- `ux-stitch-generate`
- `ux-code-to-stitch`
- `ux-storybook`

### P2 - Confort / iteration

- `ux-stitch-iterate`
- `agents/openai.yaml` par skill

## Acceptance criteria pour adaptation des 13 skills

- Aucun skill ne reference `docs/obsidian` comme destination ou fallback d'ecriture.
- Tous les skills utilisent `UX_DOCS_ROOT`.
- Tous les documents persistants crees ont un frontmatter valide.
- Tous les documents persistants sont en francais.
- Les docs UX crees sont linkees dans `MOC-UX.md`.
- `ux-design-sync` respecte `Code = Source de verite`.
- `ux-implement-from-stitch` ne cree pas de plan concurrent si `FEAT-XXX-Plan.md` existe.
- `ux-review-no-playwright` n'est pas expose tel quel; il est remplace par un skill de verification visuelle Playwright/browser.
- Les skills Stitch restent optionnels et ne bloquent jamais l'implementation.
- Les skills indiquent quand demander confirmation utilisateur.

## Next Step

Le plan d'implementation FEAT-004 doit commencer par normaliser les 13 `SKILL.md` avant de modifier `clai` et le plugin manifest. Sinon le plugin exposera des skills qui fonctionnent, mais qui ecrivent dans la mauvaise structure documentaire.
