---
title: ADR-001 Intégration de Ruflo dans la CLI clai
type: adr
status: approved
created: 2026-05-01
updated: 2026-05-01
tags:
  - adr
  - ruflo
  - clai
  - integration
  - architecture
---

# ADR-001 — Intégration de Ruflo dans la CLI `clai`

## Contexte

`clai` est la CLI maison qui scaffolde les projets Claude Code avec :
- Commandes (`/doc-manager`, `/commit`, `/release`)
- Agents dédiés
- Output styles
- Vault Obsidian `[DOC]-*` (00-MOC … 10-Archives)
- Suite Feature Workflow (10 skills)

**Ruflo** (`claude-flow@alpha`, v3.6.x) est une plateforme d'orchestration multi-agents pour Claude Code qui apporte :
- Mémoire vectorielle persistante (HNSW 384-dim)
- Swarm hiérarchique / mesh
- Hive-Mind avec consensus byzantine
- Workflows SPARC
- 230+ outils MCP
- Hooks de routage automatique

Le besoin : intégrer Ruflo à `clai` pour que les utilisateurs bénéficient de cette orchestration **sans casser leur setup existant** (CLAUDE.md, hooks, MCP, vault Obsidian, Feature Workflow Suite).

## Décision

Ruflo est intégré à `clai` comme **module opt-in**, jamais imposé, avec un modèle de **safe-merge** systématique.

### Architecture

```
clai/
├── src/
│   ├── ruflo.js          ← NOUVEAU : install/init/merge/status/remove
│   ├── cli.js            ← MODIFIÉ : commande `clai ruflo <action>`
│   └── project.js        ← MODIFIÉ : prompt opt-in en fin d'init
└── templates/
    ├── ruflo/
    │   └── CLAUDE-RUFLO-SECTION.md   ← section ajoutée au CLAUDE.md projet
    └── commands/
        └── ruflo-status.md            ← slash command /ruflo-status
```

### Commandes exposées

| Commande | Effet |
|----------|-------|
| `clai ruflo install` | `npm install -g claude-flow@alpha` si absent |
| `clai ruflo init` | Intègre Ruflo dans le projet courant (safe merge) |
| `clai ruflo status` | Diagnostic Ruflo (global + projet) |
| `clai ruflo remove` | Supprime artefacts projet (`.claude-flow/`, `.swarm/`, `.hive-mind/`) |
| `clai init --with-ruflo` | Init projet + Ruflo direct |
| `clai init --no-ruflo` | Init projet sans prompt Ruflo |
| `clai init` (default) | Prompt opt-in Ruflo en fin d'init |

### Stratégie safe-merge

`claude-flow init --wizard` écrase normalement `.claude/settings.json` et `.mcp.json`. Notre wrapper :

1. **Snapshot** des fichiers protégés avant exécution :
   - `CLAUDE.md`
   - `.mcp.json`
   - `.claude/settings.json`
   - `.claude/settings.local.json`
2. **Exécution** de `claude-flow init --wizard` dans le `cwd`
3. **Restauration** intégrale de `CLAUDE.md` et `.claude/settings.local.json` (jamais touchés)
4. **Deep-merge JSON** pour `.claude/settings.json` et `.mcp.json` :
   - Préserve les hooks utilisateur existants (concat sans doublon)
   - Préserve les autres MCP servers (microsoft-planner, deepwiki, etc.)
   - Backup automatique en `.bak-<timestamp>`
5. **Append** d'une section `## Ruflo - Orchestration Multi-Agents` à CLAUDE.md (jamais d'écrasement, skip si déjà présente)

### Hiérarchie des sources de vérité (préservée)

L'ADR confirme que Ruflo **n'altère pas** la hiérarchie existante :

1. CDC (`01-Specs/`)
2. Schémas DB (`02-Database/`)
3. Meetings (`07-Meetings/`)
4. ADRs (`06-ADR/`)
5. FEAT (`04-Features/`)

Ruflo est en **rang 6** (couche d'accélération optionnelle), avec règle explicite : en cas de conflit, la Feature Workflow Suite et la doc Obsidian prévalent.

## Conséquences

### Positives

- ✅ Ruflo accessible en une commande sans risque pour les projets existants
- ✅ Modèle opt-in : projets clai sans Ruflo continuent de fonctionner identiquement
- ✅ Backups systématiques permettent un rollback rapide
- ✅ Deep-merge préserve la coexistence avec d'autres MCP servers (microsoft-planner, deepwiki)
- ✅ Slash command `/ruflo-status` pour diagnostic rapide
- ✅ Documentation incluse dans le CLAUDE.md projet via append

### Négatives / risques

- ⚠️ Dépendance externe à `claude-flow@alpha` (alpha = potentielle instabilité)
- ⚠️ ~200 Mo d'install global pour Ruflo
- ⚠️ Hooks Ruflo (11) ajoutent une latence à chaque tool call Claude Code
- ⚠️ Le deep-merge JSON peut produire des configs intermédiaires si l'utilisateur a des hooks complexes — mitigé par les `.bak-*`
- ⚠️ Sur Windows, npm prefix peut être hijacké par certains éditeurs (Zed) — documenté

### Neutres

- 🔄 La version `clai` passe en **1.1.0** (mineur, additif uniquement)
- 🔄 Le node engine reste `>=14.0.0` (Ruflo lui-même requiert >=20, mais clai n'appelle Ruflo qu'en sous-process)

## Alternatives écartées

### Alt 1 — Intégrer Ruflo en hard dans clai init
**Rejeté** : violerait le principe "ne pas casser l'existant" et imposerait Ruflo aux utilisateurs.

### Alt 2 — Plugin marketplace séparé
**Rejeté** : moins pratique, demande à l'utilisateur de gérer deux outils. La CLI clai unifie déjà tout le setup.

### Alt 3 — MCP-only (sans `claude-flow init`)
**Considéré** : enregistrer uniquement le serveur MCP Ruflo sans scaffolding (skills/agents/hooks). Plus chirurgical mais perd 80% de la valeur de Ruflo (hooks, slash commands, mémoire projet). **Rejeté** au profit du safe-merge complet.

## Références

- Ruflo GitHub : <https://github.com/ruvnet/ruflo>
- Code clai modifié : `D:\WorkflowSkills\clai\src\ruflo.js`, `cli.js`, `project.js`
- Template section : `D:\WorkflowSkills\clai\templates\ruflo\CLAUDE-RUFLO-SECTION.md`
- Tests effectués sur projet réel : `D:\FormationAzure` (Ruflo intégré, CLAUDE.md préservé, microsoft-planner MCP coexiste)

## Suivi

- [ ] Publier `@glamazere/clai@1.1.0` sur npm
- [ ] Tester `clai ruflo init` sur 3 projets différents (vide, existant simple, existant complexe)
- [ ] Documenter la procédure de rollback dans `08-Dev/DEV-Ruflo-Rollback.md`
- [ ] Évaluer le passage à `claude-flow@latest` (stable) quand disponible
