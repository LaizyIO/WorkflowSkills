# CLAI - Claude AI Workflow Skills CLI

CLI simple et puissant pour installer et configurer Workflow Skills Suite pour Claude Code.

## Installation

```bash
npm install -g clai
```

## Commandes

### `clai check`
Vérifie si Claude Code CLI est installé sur votre système.

```bash
clai check
```

### `clai install`
Installe Claude Code CLI automatiquement (macOS via Homebrew).

```bash
clai install
```

### `clai setup`
Affiche les instructions pour ajouter le marketplace plugin dans Claude Code et configure automatiquement le serveur MCP DeepWiki.

```bash
clai setup
```

**Cette commande:**
- Affiche les instructions pour utiliser `/plugin` dans Claude Code
- Fournit le repository `LaizyIO/WorkflowSkills`
- Permet d'ajouter le marketplace avec tous les skills et commandes
- **Configure automatiquement le serveur MCP DeepWiki** pour la documentation

**Après avoir exécuté `clai setup`, vous devrez:**
1. Lancer Claude Code: `claude`
2. Exécuter: `/plugin`
3. Ajouter le repository: `LaizyIO/WorkflowSkills`

### `clai init [name]`
Initialise un projet (nouveau ou existant) avec:
- Commandes Claude dans `.claude/commands/`
- Output-styles dans `.claude/output-styles/`
- Structure de cache dans `.claude/cache/`
- (Optionnel) Structure documentation Obsidian `[DOC]-{name}/`

```bash
# Dans un projet existant
cd my-project
clai init

# Créer un nouveau projet
mkdir new-project && cd new-project
clai init new-project

# Avec documentation spécifique
clai init my-app --doc MyApp

# Forcer l'écrasement sans confirmation
clai init --force
```

**Options:**
- `-d, --doc <name>` - Nom du dossier de documentation
- `-f, --force` - Force l'écrasement sans demander confirmation

**Détection intelligente:**
Si des fichiers existent déjà, `clai init` vous demandera:
- ✅ Écraser (mettre à jour)
- ⏭️ Ignorer (garder l'existant)
- 🔍 Afficher les fichiers existants

Utilisez `--force` pour écraser automatiquement sans confirmation.

**Rapport d'actions:**
À la fin, un résumé affiche ce qui a été fait pour chaque composant:
- ✨ **Créés** - Nouveaux fichiers ajoutés
- 🔄 **Mis à jour** - Fichiers existants écrasés
- ⏭️ **Ignorés** - Fichiers existants conservés

**Alias court:** `clai i [name]`

### `clai global`
Installe les commandes au niveau global dans `~/.claude/commands/`.
Les commandes seront disponibles dans TOUS vos projets Claude.

```bash
clai global
```

**Alias court:** `clai g`

### `clai sync`
Met à jour les commandes et skills vers la dernière version.

```bash
clai sync
```

**Alias court:** `clai s`

## Workflow Complet

### Installation initiale (une seule fois)

```bash
# 1. Installer CLAI
npm install -g clai

# 2. Vérifier/installer Claude Code CLI
clai check
clai install  # Si nécessaire

# 3. Configuration du marketplace et MCP DeepWiki
clai setup
# Configure automatiquement le serveur MCP DeepWiki
# Suivre les instructions affichées pour ajouter le plugin via /plugin

# 4. (Optionnel) Installer commandes globalement
clai global
```

### Initialiser un nouveau projet

```bash
# Créer et initialiser
mkdir my-project && cd my-project
clai init my-project

# Lancer Claude Code
claude

# Suivre le workflow feature et maintenir [DOC]-* pendant les phases de travail
```

### Initialiser un projet existant

```bash
cd existing-project
clai init

# Les commandes sont maintenant disponibles
claude
```

## Structure créée

Après `clai init`:

```
my-project/
├── CLAUDE.md                 # Guide pour Claude Code (auto-généré)
├── .claude/
│   ├── commands/
│   ├── agents/
│   ├── output-styles/
│   │   └── non-dev-explanatory.md
│   └── cache/
└── [DOC]-MyProject/          # Si création demandée
    ├── 00-MOC/
    ├── 02-Database/
    ├── 04-Features/
    ├── 06-ADR/
    ├── 07-Meetings/
    ├── 08-Dev/
    └── _Templates/
```

### Fichier CLAUDE.md

`clai init` génère automatiquement un fichier `CLAUDE.md` à la racine du projet. Ce fichier contient:

- **Documentation Requirements** - Conventions Obsidian pour documenter
- **Feature Workflow Skills** - Guide d'utilisation des skills
- **Hiérarchie des Sources de Vérité** - Ordre de priorité (CDC > DB > Meetings > ADR > FEAT)
- **Règles Critiques** - Comment suivre la documentation Obsidian
- **Git Workflow** - Conventions de branches et worktrees

**Comportement:**
- **Première initialisation** → Crée `CLAUDE.md`
- **Ré-initialisation** → Ajoute le contenu à la fin (mode append)
- **Contenu déjà présent** → Ignore (évite les duplications)

Ce fichier sert de guide pour Claude Code dans votre projet.

## Configuration

### Marketplace Plugin

Pour ajouter le marketplace à Claude Code, utilisez la commande native `/plugin`:

```bash
# Dans Claude Code
/plugin

# Puis ajoutez le repository
LaizyIO/WorkflowSkills
```

Cela rendra disponibles tous les skills et commandes du marketplace.

**Alternative manuelle**: Éditez `~/.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "workflow-skills": {
      "source": {
        "source": "github",
        "repo": "LaizyIO/WorkflowSkills"
      }
    }
  }
}
```

## Mise à jour

```bash
# Mettre à jour CLAI
npm update -g clai

# Synchroniser un projet
cd my-project
clai sync
```

## Support

- GitHub: https://github.com/your-org/clai
- Issues: https://github.com/your-org/clai/issues

## Licence

MIT


## Dual target Claude/Codex

`clai init` supporte maintenant `--target claude|codex` (ou prompt interactif).

- `--target claude`: initialise `.claude/` et g?n?re/maj `CLAUDE.md`
- `--target codex`: initialise `.codex/` et g?n?re/maj `AGENTS.md`
- Ruflo reste disponible uniquement en target Claude

## Import marketplace Codex

Dans Codex, ajouter une place de marche avec:

- Source: `git@github.com:LaizyIO/WorkflowSkills.git`
- Reference Git: `main`
- Chemins partiels: `plugins/codex`

Le chemin `plugins/codex` contient le `marketplace.json` Codex, qui pointe vers le plugin `workflow-skills`.
