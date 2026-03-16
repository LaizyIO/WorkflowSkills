# Agents Dédiés Claude Code

Ce dossier contient les agents dédiés utilisés par les commandes de Workflow Skills Suite.

## Agent: doc-manager

**Fichier:** `doc-manager-agent.md`

### Description

Agent spécialisé dans la génération et la maintenance de documentation Obsidian. Son rôle est de tenir la documentation à jour avec le code réellement implémenté.

### Mission Principale

**Tenir la documentation à jour sur la feature en cours de développement selon la norme.**

L'agent :
1. Analyse ce qui a été **réellement fait dans le code** (pas les intentions)
2. Compare avec la documentation existante pour détecter les écarts
3. Crée les documents manquants (ADR, FEAT, DB, DEV, ARCH, MOC)
4. Met à jour les documents existants s'ils sont obsolètes
5. Assure la cohérence entre code et documentation

### Philosophie

```
Code = Source de vérité
Documentation = Reflet du code
Si Code ≠ Doc → Doc est obsolète → METTRE À JOUR
```

### Configuration

- **Modèle:** Haiku (optimisé coût/vitesse pour tâches structurées)
- **Outils:** Read, Write, Edit, Bash, Glob, Grep
- **Mode:** Background (run_in_background: true)
- **Couleur UI:** #4A90E2 (bleu)

### Processus en 3 Phases

#### Phase 1: Identifier
- Extraire le code réel des nouveaux messages
- Lire les fichiers modifiés/créés
- Chercher la documentation existante

#### Phase 2: Comparer
- Code réel vs Documentation existante
- Détecter les écarts (code nouveau, doc obsolète, etc.)
- Identifier ce qui manque

#### Phase 3: Décider
- Si code nouveau sans doc → **CRÉER**
- Si code différent de la doc → **METTRE À JOUR**
- Si doc à jour → **SKIP**

### Types de Documentation

L'agent peut créer/mettre à jour :

| Type | Dossier | Déclencheur |
|------|---------|-------------|
| ADR | 06-ADR/ | Décision technique prise dans le code |
| FEAT | 04-Features/ | Feature implémentée |
| DB | 02-Database/ | Schéma DB créé/modifié |
| DEV | 08-Dev/ | Problème résolu, config effectuée |
| ARCH | 03-Architecture/ | Structure/pattern implémenté |
| MOC | 00-MOC/ | Index/map of content |

### Exemple d'Utilisation

```bash
# Dans Claude Code
/doc-manager

# L'agent est lancé en background et :
# 1. Lit le transcript de la session
# 2. Analyse les nouveaux messages
# 3. Extrait le code réellement écrit
# 4. Compare avec la doc existante
# 5. Crée/met à jour la documentation
# 6. Génère un rapport
```

### Mode Incrémental

L'agent fonctionne en mode incrémental :
- Seuls les **nouveaux messages** sont analysés à chaque exécution
- Les metadata sont sauvegardées dans `.claude/cache/doc-manager/metadata.json`
- La prochaine exécution reprend où la précédente s'est arrêtée

### Vérification du Code Réel

**IMPORTANT:** L'agent ne se fie pas uniquement aux messages, il vérifie le code RÉEL :

```
Message dit: "J'ai créé une table users avec email et password"

Agent lit le fichier réel:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

Agent documente ce qui est RÉELLEMENT dans le fichier :
- 5 colonnes (pas 2)
- Contraintes UNIQUE, NOT NULL
- Defaults
- Types exacts
```

### Langue

**Toute la documentation générée est en FRANÇAIS** :
- Titres, sections, descriptions
- Analyses, rapports, résumés
- Commentaires et explications

Les extraits de code et noms techniques restent dans leur langue d'origine.

### Sortie

L'agent génère :
1. **Documents Obsidian** dans `[DOC]-Project/`
   - Nouveaux documents créés
   - Documents existants mis à jour
2. **Metadata** dans `.claude/cache/doc-manager/metadata.json`
   - Historique des générations
   - Index des messages traités
   - Liste des fichiers générés
3. **Rapport** dans `[DOC]-Project/DOC-GENERATION-REPORT.md`
   - Statistiques de traitement
   - Fichiers créés/mis à jour
   - Résumé de la session

### Installation

L'agent est automatiquement installé avec :

```bash
# Installation locale
clai init

# Installation globale
clai global
```

### Maintenance

Pour mettre à jour l'agent :

```bash
# Synchroniser le projet
clai sync
```

---

Pour plus d'informations sur la création d'agents Claude Code, consultez :
- [Documentation officielle](https://code.claude.com/docs/en/sub-agents)
- [Building agents with Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
