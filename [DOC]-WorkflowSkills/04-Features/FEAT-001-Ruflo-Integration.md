---
title: FEAT-001 Intégration Ruflo dans clai (multi-agents orchestration)
type: feature
status: completed
created: 2026-05-01
updated: 2026-05-01
tags:
  - feature
  - ruflo
  - clai
  - multi-agents
---

# FEAT-001 — Intégration Ruflo dans `clai`

## Résumé

Ajouter au CLI `clai` la capacité d'intégrer **Ruflo** (claude-flow@alpha) dans :
- Un **projet vierge** (en option lors de `clai init`)
- Un **projet existant** (via `clai ruflo init`) **sans casser** le setup en place

## Critères d'acceptation

| ID | Critère | Status |
|----|---------|--------|
| AC-1 | `clai ruflo install` installe `claude-flow@alpha` globalement et vérifie le binaire | ✅ |
| AC-2 | `clai ruflo init` détecte si Ruflo est installé, l'installe sinon | ✅ |
| AC-3 | `clai ruflo init` exécute `claude-flow init --wizard` dans `cwd` | ✅ |
| AC-4 | Les fichiers `CLAUDE.md` et `.claude/settings.local.json` ne sont JAMAIS modifiés (snapshot+restore) | ✅ |
| AC-5 | `.claude/settings.json` et `.mcp.json` font l'objet d'un **deep-merge** avec backup `.bak-<timestamp>` | ✅ |
| AC-6 | Une section `## Ruflo - Orchestration Multi-Agents` est **appendée** à `CLAUDE.md` (jamais écrasée, skip si déjà présente) | ✅ |
| AC-7 | `clai init` propose Ruflo en prompt opt-in (par défaut: non) | ✅ |
| AC-8 | `clai init --with-ruflo` intègre Ruflo sans prompt | ✅ |
| AC-9 | `clai init --no-ruflo` skip le prompt Ruflo | ✅ |
| AC-10 | `clai ruflo status` diagnostique : Ruflo global, .claude-flow/, .swarm/, hooks, MCP | ✅ |
| AC-11 | `clai ruflo remove` supprime artefacts projet sans toucher CLAUDE.md/settings.json | ✅ |
| AC-12 | Les MCP servers existants (microsoft-planner, deepwiki) sont préservés dans `.mcp.json` | ✅ |
| AC-13 | Slash command `/ruflo-status` fournit un diagnostic depuis Claude Code | ✅ |

## Spécifications techniques

### Module `src/ruflo.js`

API publique :
```js
checkRufloInstalled(): { installed: boolean, version: string }
installRufloGlobal(): boolean
initRufloInProject(options): { success, settingsResult, mcpResult, sectionResult }
statusRufloInProject(): void  // affiche
removeRufloFromProject(): void
```

Helpers internes :
- `deepMerge(target, source)` — merge récursif avec dédup d'arrays
- `snapshotFiles(projectDir)` — lit le contenu original
- `restoreSnapshot(filePath, content)` — réécrit l'original
- `safeMergeJsonFile(filePath, original, label)` — merge JSON avec backup
- `appendRufloSection(claudeMdPath, projectName)` — append section
- `runRufloInit(projectDir)` — execAsync `claude-flow init --wizard`

### Modifications `src/cli.js`

Nouveau bloc `program.command('ruflo')` avec sous-commandes `install`, `init`, `status`, `remove`.

### Modifications `src/project.js`

Ajout d'un prompt avant le bloc "Prochaines étapes" :
```js
if (options.ruflo !== false) {
  let doRuflo = options.withRuflo === true;
  if (!doRuflo) {
    const answer = await inquirer.prompt([{
      type: 'confirm', name: 'doRuflo',
      message: 'Intégrer Ruflo (...) ?', default: false
    }]);
    doRuflo = answer.doRuflo;
  }
  if (doRuflo) {
    const { initRufloInProject } = require('./ruflo');
    await initRufloInProject({ projectName: name, force: options.force });
  }
}
```

### Templates

- `templates/ruflo/CLAUDE-RUFLO-SECTION.md` — section Markdown (~110 lignes) appendée au CLAUDE.md projet
- `templates/commands/ruflo-status.md` — slash command `/ruflo-status`

## Workflow utilisateur

### Cas A — Nouveau projet

```bash
cd MonProjet
clai init MonProjet
# ... commandes, agents, vault Obsidian ...
# Prompt: "Intégrer Ruflo ? [oN]" → Y
# → claude-flow init --wizard exécuté
# → Settings mergés, backup créé
# → Section Ruflo ajoutée au CLAUDE.md
# Prompt: "Redémarrez Claude Code"
```

### Cas B — Projet existant

```bash
cd ProjetExistant
clai ruflo install      # si pas encore global
clai ruflo init         # safe-merge
clai ruflo status       # diagnostic
```

### Cas C — Rollback

```bash
clai ruflo remove
# Restaurer manuellement depuis les .bak-*
mv .claude/settings.json.bak-1777656800000 .claude/settings.json
mv .mcp.json.bak-1777656800000 .mcp.json
npm uninstall -g claude-flow
```

## Dépendances

- Ajout : aucune nouvelle dépendance npm directe (utilise `child_process.exec` pour appeler `claude-flow`)
- Externe : `claude-flow@alpha` installé globalement

## Risques & mitigations

| Risque | Mitigation |
|--------|-----------|
| `claude-flow init` échoue à mi-chemin | Snapshots permettent restauration manuelle |
| Deep-merge produit config invalide | Backup `.bak-*` permet rollback ; logs explicites |
| Conflit hooks Ruflo ↔ hooks utilisateur | Dedup d'arrays par JSON.stringify ; user peut éditer manuellement |
| Ruflo désactivé temporairement | `clai ruflo remove` + désinstall global |
| Version alpha de Ruflo break la CLI | Pin de version possible via `RUFLO_PACKAGE` constante |

## Liens

- ADR : `06-ADR/ADR-001-Integration-Ruflo-clai.md`
- Code : `clai/src/ruflo.js`
- Tests réels : projet `D:\FormationAzure`
