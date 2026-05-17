# Exemples d'Utilisation - CLAI

Ce document montre des exemples concrets d'utilisation de `clai`.

## Exemple 1: Nouveau Projet

### Initialisation complète

```bash
$ mkdir my-new-project
$ cd my-new-project
$ clai init my-app

🚀 Initialisation du projet...

? Nom du projet: my-app
Installation des commandes...
Installation des output-styles...
Configuration du cache...
? Créer la structure documentation Obsidian [DOC]-? Yes
? Nom du dossier de documentation: my-app
Configuration documentation Obsidian...

✅ Projet initialisé avec succès!

📁 Actions effectuées:

   ✨ .claude/commands/        → Créées
   ✨ .claude/output-styles/   → Créés
   ✨ .claude/cache/           → Créé
   ✨ [DOC]-my-app/            → Créée
   ✨ CLAUDE.md                → Créé

🎯 Prochaines étapes:
   1. Lancez Claude Code dans ce dossier
   2. Utilisez /doc-manager pour générer la doc

✅ Projet initialisé avec succès!
```

**Structure créée:**
```
my-new-project/
├── .claude/
│   ├── commands/
│   │   └── doc-manager.md
│   ├── output-styles/
│   │   └── non-dev-explanatory.md
│   └── cache/
│       └── doc-manager/
│           ├── .gitignore
│           └── metadata.template.json
└── [DOC]-my-app/
    ├── 00-MOC/
    ├── 06-ADR/
    ├── 08-Dev/
    └── _Templates/
```

---

## Exemple 2: Projet Existant (Première Installation)

### Projet déjà créé sans .claude/

```bash
$ cd existing-project
$ ls -la
.git/
src/
package.json
README.md

$ clai init

🚀 Initialisation du projet...

? Nom du projet: existing-project
Installation des commandes...
Installation des output-styles...
Configuration du cache...
? Créer la structure documentation Obsidian [DOC]-? No

✅ Projet initialisé avec succès!

📁 Actions effectuées:

   ✨ .claude/commands/        → Créées
   ✨ .claude/output-styles/   → Créés
   ✨ .claude/cache/           → Créé

🎯 Prochaines étapes:
   1. Lancez Claude Code dans ce dossier
   2. Utilisez /doc-manager pour générer la doc
```

---

## Exemple 3: Mise à Jour (Détection Intelligente)

### Re-initialisation avec fichiers existants

```bash
$ cd my-project
$ ls .claude/
commands/  output-styles/  cache/

$ clai init

🚀 Initialisation du projet...

? Nom du projet: my-project
Installation des commandes...

⚠️  Commandes existe déjà avec 3 fichier(s)
? Que voulez-vous faire?
❯ ✅ Écraser (mettre à jour)
  ⏭️  Ignorer (garder l'existant)
  🔍 Afficher les fichiers existants

# Choix: Écraser
Installation des output-styles...

⚠️  Output-styles existe déjà avec 1 fichier(s)
? Que voulez-vous faire?
❯ ✅ Écraser (mettre à jour)
  ⏭️  Ignorer (garder l'existant)

# Choix: Ignorer
Configuration du cache...

⚠️  Cache existe déjà avec 2 fichier(s)
? Que voulez-vous faire?
❯ 🔍 Afficher les fichiers existants

Fichiers existants:
  - doc-manager/.gitignore
  - doc-manager/metadata.template.json

? Action:
❯ ✅ Écraser
  ⏭️  Ignorer

# Choix: Ignorer

✅ Projet initialisé avec succès!

📁 Actions effectuées:

   🔄 .claude/commands/        → Mises à jour
   ⏭️ .claude/output-styles/   → Ignorés
   ⏭️ .claude/cache/           → Ignoré

🎯 Prochaines étapes:
   1. Lancez Claude Code dans ce dossier
   2. Utilisez /doc-manager pour générer la doc
```

---

## Exemple 4: Force Mode (Sans Confirmation)

### Écrasement automatique avec --force

```bash
$ cd my-project
$ clai init --force

🚀 Initialisation du projet...

? Nom du projet: my-project
Installation des commandes...
Installation des output-styles...
Configuration du cache...

✅ Projet initialisé avec succès!

📁 Actions effectuées:

   🔄 .claude/commands/        → Mises à jour
   🔄 .claude/output-styles/   → Mis à jour
   🔄 .claude/cache/           → Mis à jour

🎯 Prochaines étapes:
   1. Lancez Claude Code dans ce dossier
   2. Utilisez /doc-manager pour générer la doc
```

**Cas d'usage:** Automatisation, CI/CD, scripts

---

## Exemple 5: Installation Globale

### Commandes disponibles partout

```bash
$ clai global

🌍 Installation des commandes globales...

Installation de /doc-manager...
Installation de /commit...
Installation de /release...

✅ Commandes globales installées!
   Location: /Users/you/.claude/commands
   Disponibles dans tous vos projets Claude

$ cd any-project
$ claude
# /doc-manager est disponible sans clai init!
```

---

## Exemple 6: Setup Marketplace

### Configuration du plugin

```bash
$ clai setup

⚙️  Setup Workflow Skills Suite...

✅ Claude Code CLI est installé
   Version: 1.0.0
   Path: /usr/local/bin/claude

📚 Configuration du Marketplace Plugin

✅ Pour ajouter Workflow Skills Suite à Claude Code:

1. Lancez Claude Code dans votre projet:
   $ claude

2. Exécutez la commande plugin:
   /plugin

3. Ajoutez le repository:
   LaizyIO/WorkflowSkills

🎉 Le marketplace sera disponible avec tous les skills et commandes!

🔌 Configuration du serveur MCP DeepWiki

Installation du serveur MCP DeepWiki...
✅ Serveur MCP DeepWiki configuré avec succès!

💡 Alternative: Ajoutez manuellement dans ~/.claude/settings.json:

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

✅ Configuration terminée!
   Après avoir ajouté le plugin, utilisez: clai init [name]
```

---

## Exemple 7: Workflow Complet

### De zéro à un projet documenté

```bash
# 1. Installer clai
$ npm install -g clai

# 2. Vérifier Claude Code CLI
$ clai check
✅ Claude Code CLI est installé
   Version: 1.0.0

# 3. Setup marketplace et MCP DeepWiki
$ clai setup
# Configure automatiquement le serveur MCP DeepWiki
# Suivre instructions pour /plugin

# 4. Installer commandes globalement (optionnel)
$ clai global
✅ Commandes globales installées!

# 5. Créer nouveau projet
$ mkdir awesome-app && cd awesome-app
$ clai init awesome-app --doc AwesomeApp

✅ Projet initialisé avec succès!
📁 Actions effectuées:
   ✨ .claude/commands/        → Créées
   ✨ .claude/output-styles/   → Créés
   ✨ .claude/cache/           → Créé
   ✨ [DOC]-AwesomeApp/        → Créée

# 6. Lancer Claude Code
$ claude

# 7. Travailler et documenter
# ... conversation avec Claude ...

# 8. Générer la documentation
/doc-manager

✅ Agent de documentation lancé en background (Mode incrémental)

📊 Session analysée:
   - Messages totaux: 150
   - Nouveaux messages: 150 (première génération)
   - Génération: #1
   - Projet: [DOC]-AwesomeApp

⏳ L'agent analyse les nouveaux messages et génère la documentation...

# 9. Vérifier la documentation générée
$ ls [DOC]-AwesomeApp/08-Dev/
DEV-001-Setup-Initial.md
DEV-002-Architecture-Choice.md

$ cat .claude/cache/doc-manager/metadata.json
{
  "session_id": "...",
  "last_generation": {
    "generation_number": 1,
    "last_processed_message_index": 150,
    "files_generated": [...]
  }
}
```

---

## Exemple 8: Mode Append pour CLAUDE.md

### Projet avec CLAUDE.md existant

```bash
$ cd my-project
$ ls
CLAUDE.md  src/  package.json

$ cat CLAUDE.md
# My Project
This is my project documentation...
[contenu existant]

$ clai init

🚀 Initialisation du projet...

? Nom du projet: my-project
Installation des commandes...
Installation des output-styles...
Configuration du cache...
? Créer la structure documentation Obsidian [DOC]-? No
Génération du guide CLAUDE.md...

✅ Projet initialisé avec succès!

📁 Actions effectuées:

   ✨ .claude/commands/        → Créées
   ✨ .claude/output-styles/   → Créés
   ✨ .claude/cache/           → Créé
   ➕ CLAUDE.md                → Mis à jour (ajouté)

$ cat CLAUDE.md
# My Project
This is my project documentation...
[contenu existant]

---

# Workflow Skills Suite - Configuration Ajoutée

# My Project - Guide pour Claude Code

## Documentation Requirements
[...]

## Feature Workflow Skills
[...]

## RÈGLE CRITIQUE : Suivre la Documentation Obsidian
[...]
```

**Comportement:**
- Contenu existant conservé
- Séparateur ajouté (`---`)
- Configuration Workflow Skills ajoutée à la fin
- Si relancé et contenu déjà présent → Ignoré (pas de duplication)

---

## Scénarios Courants

### Mettre à jour les commandes

```bash
$ npm update -g clai
$ cd my-project
$ clai sync

🔄 Synchronisation...
✅ Synchronisation terminée!
```

### Ajouter documentation plus tard

```bash
$ cd my-project
$ clai init --doc MyProject

# Seule la doc sera créée (commandes déjà présentes)
📁 Actions effectuées:
   ⏭️ .claude/commands/        → Ignorées
   ⏭️ .claude/output-styles/   → Ignorés
   ⏭️ .claude/cache/           → Ignoré
   ✨ [DOC]-MyProject/         → Créée
```

### Réinitialiser complètement

```bash
$ cd my-project
$ rm -rf .claude/
$ clai init --force

# Tout sera recréé
📁 Actions effectuées:
   ✨ .claude/commands/        → Créées
   ✨ .claude/output-styles/   → Créés
   ✨ .claude/cache/           → Créé
```

---

## Tips & Tricks

### Alias Bash

Ajoutez à votre `.bashrc` ou `.zshrc`:

```bash
alias ci='clai init'
alias cg='clai global'
alias cs='clai sync'
```

### Git Integration

Ajoutez à `.gitignore`:

```gitignore
# Cache doc-manager (données générées)
.claude/cache/doc-manager/metadata.json
.claude/cache/doc-manager/*.md

# Mais gardez les templates
!.claude/cache/doc-manager/.gitignore
!.claude/cache/doc-manager/metadata.template.json
```

### CI/CD

Dans votre pipeline:

```yaml
# .github/workflows/init-claude.yml
- name: Initialize Claude structure
  run: |
    npm install -g clai
    clai init --force
```

---

Voir aussi:
- [README.md](./README.md) - Documentation complète
- [QUICKSTART.md](./QUICKSTART.md) - Guide rapide


## Dual target Claude/Codex

`clai init` supporte maintenant `--target claude|codex` (ou prompt interactif).

- `--target claude`: initialise `.claude/` et g?n?re/maj `CLAUDE.md`
- `--target codex`: initialise `.codex/` et g?n?re/maj `AGENTS.md`
- Ruflo reste disponible uniquement en target Claude
