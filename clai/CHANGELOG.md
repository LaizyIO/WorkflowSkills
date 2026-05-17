# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

## [1.0.4] - 2026-01-14

### Modifié
- **Commande /doc-manager** : Prompt mis à jour pour refléter la nouvelle mission
  - Description changée : "Tient la documentation à jour avec le code réellement implémenté"
  - Prompt d'appel de l'agent enrichi avec la mission complète
  - Message de confirmation à l'utilisateur plus détaillé
  - Cohérence totale avec le prompt de l'agent

## [1.0.3] - 2026-01-14

### Amélioré
- **Agent doc-manager** : Mission clarifiée et processus renforcé
  - Philosophie "Code = Source de vérité" ajoutée
  - Processus de comparaison Code ↔ Documentation détaillé
  - Instructions pour lire le code réel et pas seulement les messages
  - Analyse comparative en 3 phases (Identifier, Comparer, Décider)
  - Support de tous les types de docs : ADR, FEAT, DB, DEV, ARCH, MOC
  - Détection et correction automatique des documentations obsolètes
  - Création automatique des documentations manquantes

### Modifié
- **Prompt de l'agent doc-manager** entièrement revu pour :
  - Tenir la documentation à jour sur la feature en cours
  - Analyser ce qui est RÉELLEMENT fait dans le code
  - Comparer avec la documentation existante
  - Créer/mettre à jour selon les écarts détectés
  - Assurer la cohérence entre code et documentation

## [1.0.2] - 2026-01-14

### Ajouté
- Agent dédié `doc-manager` pour la génération de documentation Obsidian
- Installation automatique des agents dans `.claude/agents/`
- Support des agents globaux dans `~/.claude/agents/`
- Synchronisation des agents avec `clai sync`

### Modifié
- Commande `/doc-manager` simplifiée pour appeler l'agent dédié en background
- La commande `/doc-manager` utilise maintenant le Task tool avec `subagent_type: "doc-manager"`
- Architecture améliorée : séparation de la logique de commande et de l'agent

## [1.0.0] - 2026-01-14

### Ajouté
- CLI `clai` avec commandes principales
- Commande `check` pour vérifier l'installation de Claude Code CLI
- Commande `install` pour installer Claude Code CLI automatiquement
- Commande `setup` pour configurer le marketplace et les skills
- Commande `init` pour initialiser un projet avec commandes et documentation
- Commande `global` pour installer les commandes au niveau utilisateur
- Commande `sync` pour mettre à jour les commandes et skills
- Alias courts: `i`, `g`, `s`
- Template de documentation Obsidian
- Commande `/doc-manager` pour génération de documentation
- Support du mode incrémental dans doc-manager
- Configuration automatique du marketplace plugin
- Documentation complète (README, QUICKSTART, PUBLISHING)

### Fonctionnalités
- Vérification automatique de l'installation Claude Code CLI
- Installation guidée avec prompts interactifs
- Configuration du marketplace GitHub
- Structure [DOC]-{ProjectName} avec templates Obsidian
- Cache doc-manager avec .gitignore
- Support Windows/macOS/Linux
- Génération de documentation en français

### Technique
- Package npm avec CLI Node.js
- Dépendances: commander, chalk, ora, inquirer, fs-extra
- Structure modulaire (checker, marketplace, project)
- Templates embarqués dans le package

## [1.0.1] - 2026-01-14

### Ajouté
- Installation automatique du serveur MCP DeepWiki dans `clai setup`
- Configuration du serveur MCP avec la commande `claude mcp add -s user -t http deepwiki https://mcp.deepwiki.com/mcp`

### Modifié
- `clai setup` utilise maintenant directement `LaizyIO/WorkflowSkills` comme repository
- Package publié sous `@glamazere/clai` au lieu de `@workflow-skills/clai`
- URLs du repository mis à jour vers `https://github.com/LaizyIO/WorkflowSkills`

## [1.0.0] - 2026-01-14

### Ajouté
- Génération automatique de `CLAUDE.md` avec conventions et workflows
- Mode append pour `CLAUDE.md` (ajoute à la fin si existe déjà)
- Détection intelligente anti-duplication pour `CLAUDE.md`
- Documentation complète des Feature Workflow Skills dans `CLAUDE.md`
- Hiérarchie des sources de vérité (CDC > DB > Meetings > ADR > FEAT)
- Règles critiques pour suivre la documentation Obsidian

### Prévu
- Support des skills personnalisés
- Configuration avancée du marketplace
- Templates additionnels (FEAT, DB, DEV, MEETINGS)
- Tests unitaires
- CI/CD avec GitHub Actions
- Documentation API

---

## Types de Changements

- **Ajouté**: Nouvelles fonctionnalités
- **Modifié**: Changements dans les fonctionnalités existantes
- **Déprécié**: Fonctionnalités qui seront supprimées
- **Supprimé**: Fonctionnalités supprimées
- **Corrigé**: Corrections de bugs
- **Sécurité**: Corrections de vulnérabilités


## Dual target Claude/Codex

`clai init` supporte maintenant `--target claude|codex` (ou prompt interactif).

- `--target claude`: initialise `.claude/` et g?n?re/maj `CLAUDE.md`
- `--target codex`: initialise `.codex/` et g?n?re/maj `AGENTS.md`
- Ruflo reste disponible uniquement en target Claude
