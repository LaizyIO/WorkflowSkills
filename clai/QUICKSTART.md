# Guide de Démarrage Rapide - CLAI

Installation et configuration en 5 minutes.

## 1. Installation

```bash
npm install -g clai
```

## 2. Vérifier Claude Code CLI

```bash
clai check
```

Si Claude n'est pas installé:
```bash
clai install
```

## 3. Configuration du Marketplace (Une seule fois)

```bash
clai setup
```

Cette commande :
- Affiche les instructions pour ajouter le marketplace plugin
- **Configure automatiquement le serveur MCP DeepWiki** pour la documentation

Ensuite, dans Claude Code:
```bash
claude
/plugin
# Ajoutez: LaizyIO/WorkflowSkills
```

## 4. Initialiser un Projet

### Nouveau projet

```bash
mkdir my-app && cd my-app
clai init my-app
```

### Projet existant

```bash
cd existing-project
clai init
```

## 5. Utiliser avec Claude Code

```bash
# Lancer Claude dans le projet
claude

# Suivre le workflow feature et maintenir [DOC]-* pendant les phases de travail
```

## Installation Globale (Optionnelle)

Pour avoir les commandes dans TOUS vos projets:

```bash
clai global
```

## Mise à Jour

```bash
npm update -g clai
clai sync
```

## Commandes Essentielles

```bash
clai check          # Vérifier Claude CLI
clai setup          # Setup marketplace + skills
clai init [name]    # Initialiser projet
clai global         # Commandes globales
clai sync           # Mise à jour
```

## Structure Créée

```
votre-projet/
├── CLAUDE.md                 # Guide auto-généré pour Claude Code
├── .claude/
│   ├── commands/
│   ├── agents/
│   │   └── non-dev-explanatory.md
│   └── cache/
└── [DOC]-VotreProjet/
    ├── 00-MOC/
    ├── 06-ADR/
    ├── 08-Dev/
    └── _Templates/
```

**Important**: Le fichier `CLAUDE.md` contient les conventions, règles et workflows pour votre projet. Consultez-le pour comprendre comment documenter et travailler avec les Feature Workflow Skills.

## Prochaines Étapes

1. Lancez Claude Code: `claude`
2. Créez une conversation
3. Suivez le workflow feature
4. Mettez à jour `[DOC]-*` pendant les phases de specification, research, plan, implementation, tests et documentation

## Aide

```bash
clai --help
clai <command> --help
```

Pour plus de détails, voir [README.md](./README.md)


## Dual target Claude/Codex

`clai init` supporte maintenant `--target claude|codex` (ou prompt interactif).

- `--target claude`: initialise `.claude/` et g?n?re/maj `CLAUDE.md`
- `--target codex`: initialise `.codex/` et g?n?re/maj `AGENTS.md`
- Ruflo reste disponible uniquement en target Claude


## Maquettes UI avec Codex (clai 1.2.0)

Le workflow UX conserve audit, flux, composants, implementation et verification visuelle. Des qu'une maquette est necessaire, utiliser `ux-mockup-generate` pour generer une image avec Codex. Preparer le brief avec `ux-mockup-brief`, iterer avec `ux-mockup-iterate`, puis implementer via `ux-implement-from-mockup`.

Les images vivent dans `design/mockups/images/`, les prompts et decisions dans `[DOC]-*/11-UX-DesignOps/07-Mockups/`. Les skills proviennent du plugin WorkflowSkills 1.5.0 ; clai configure le projet. La generation exige un outil image disponible ; un prompt seul ne constitue pas une maquette.

`clai sync --target codex` actualise les sections de guide et le contrat de maquettage. Les anciennes images et les fichiers personnalises restent conserves ; leur archivage est explicite. Aucun style de sortie n'est installe ni impose.
