---
allowed-tools: Task, Bash, Read
description: Tient la documentation Obsidian à jour avec le code réellement implémenté
argument-hint: [type]
model: haiku
---

# Doc Manager - Gardien de la Cohérence Code ↔ Documentation

Lance l'agent dédié `doc-manager` qui :
- Analyse ce qui a été **réellement fait dans le code** (pas les intentions)
- Compare avec la documentation existante pour détecter les écarts
- Crée les documents manquants (ADR, FEAT, DB, DEV, ARCH, MOC)
- Met à jour les documents existants s'ils sont obsolètes
- Assure la cohérence entre code et documentation

**Philosophie:** `Code = Source de vérité` | `Documentation = Reflet du code`

## Étape 1: Trouver le Transcript Actuel

**IMPORTANT**: On trouve le transcript directement sans dépendre d'un hook.

Utilise Bash pour trouver le transcript le plus récent:

```bash
# Trouve le projet slug (ex: D--WorkflowSkills)
PROJECT_SLUG=$(pwd | sed 's|/|--|g' | sed 's|^--||' | sed 's|:||g')

# Trouve le transcript le plus récent pour ce projet
TRANSCRIPT=$(ls -t ~/.claude/projects/$PROJECT_SLUG/*.jsonl 2>/dev/null | head -1)

if [ -z "$TRANSCRIPT" ]; then
  echo "❌ Aucun transcript trouvé"
  exit 1
fi

echo "✅ Transcript trouvé: $TRANSCRIPT"
```

## Étape 2: Extraire les Infos de Session

Une fois le transcript trouvé, extrait:
- Le nombre de messages: `wc -l < "$TRANSCRIPT"`
- Le session_id: extraire du nom de fichier (c'est le UUID)
- Le project_dir: `pwd`

Affiche à l'utilisateur:
```
📝 Session trouvée
📄 Transcript: {nom du fichier}
💬 Messages: {count}
📁 Projet: {pwd}
```

## Étape 3: Vérifier les Metadata (Mode Incrémental)

**IMPORTANT**: Le système fonctionne en mode incrémental pour ne traiter que les nouveaux messages.

Utilise Read pour lire les metadata:

```
Read: .claude/cache/doc-manager/metadata.json
```

**Si le fichier existe:**
- Extrait `last_processed_message_index`
- Extrait `files_generated` (liste des docs précédentes)
- Compare avec MESSAGE_COUNT actuel
- Calcule: NEW_MESSAGES = MESSAGE_COUNT - last_processed_message_index

**Si le fichier n'existe pas:**
- C'est la première génération
- NEW_MESSAGES = MESSAGE_COUNT (tout le transcript)
- files_generated = []

Affiche à l'utilisateur:
```
🔄 Mode incrémental
📊 Dernière génération: message {last_processed_index}
💬 Messages actuels: {message_count}
✨ Nouveaux messages: {new_messages}
📁 Docs précédentes: {count} fichiers
```

**Si NEW_MESSAGES == 0:**
```
✅ Aucun nouveau message depuis la dernière génération
💡 La documentation est à jour
```
Et stop ici.

## Étape 4: Détecter le Projet [DOC]-*

Utilise Bash:
```bash
# Trouve le dossier [DOC]-*
DOC_PROJECT=$(find . -maxdepth 1 -type d -name '[DOC]-*' | head -1)

if [ -z "$DOC_PROJECT" ]; then
  echo "⚠️  Aucun projet [DOC]-* détecté"
  echo "La documentation ne sera pas générée"
  exit 1
else
  echo "📚 Projet doc détecté: $(basename $DOC_PROJECT)"
fi
```

## Étape 5: Lancement de l'Agent Dédié en Background

Utilise **Task tool** pour lancer l'agent dédié `doc-manager`:

```
Task:
  subagent_type: "doc-manager"
  run_in_background: true
  description: "Documentation Obsidian - Synchronisation Code ↔ Doc"
  prompt: |
    MISSION: Tenir la documentation à jour avec le code RÉELLEMENT implémenté.

    Tu dois :
    1. Analyser ce qui a été RÉELLEMENT fait dans le code (pas les intentions)
    2. Lire les fichiers réels modifiés/créés pour voir le code exact
    3. Comparer avec la documentation existante
    4. Créer les documents manquants (ADR, FEAT, DB, DEV, ARCH, MOC)
    5. Mettre à jour les documents obsolètes pour refléter le code réel
    6. Assurer que Documentation = Reflet exact du Code

    PARAMÈTRES:
    - TRANSCRIPT_PATH: {transcript_path}
    - PROJECT_DIR: {pwd}
    - DOC_PROJECT: {doc_project_name}
    - MESSAGE_COUNT: {message_count}
    - SESSION_ID: {session_id}
    - LAST_PROCESSED_INDEX: {last_processed_index}
    - NEW_MESSAGES_START: {new_messages_start}
    - NEW_MESSAGES_COUNT: {new_messages_count}
    - PREVIOUS_FILES: {previous_files_json}
    - GENERATION_NUMBER: {generation_number}

    PROCESSUS:
    - Lis le transcript (nouveaux messages uniquement)
    - Identifie les fichiers modifiés/créés
    - Lis le CODE RÉEL de ces fichiers (avec Read tool)
    - Compare code réel vs documentation existante
    - Crée/met à jour selon les écarts détectés
    - Génère la documentation normée en FRANÇAIS

    Suis les instructions de ton prompt système pour le processus détaillé.
```

**Variables à calculer avant l'appel:**
- `transcript_path`: chemin complet du transcript
- `pwd`: répertoire du projet
- `doc_project_name`: nom du dossier [DOC]-* (sans le chemin)
- `message_count`: nombre total de messages
- `session_id`: UUID extrait du nom de fichier
- `last_processed_index`: dernier message traité (0 si première fois)
- `new_messages_start`: last_processed_index + 1
- `new_messages_count`: message_count - last_processed_index
- `previous_files_json`: JSON.stringify(files_generated)
- `generation_number`: incrément du numéro précédent

## Étape 6: Confirmation à l'Utilisateur

Après avoir lancé l'agent:

```
✅ Agent doc-manager lancé en background

🎯 MISSION: Synchroniser Documentation ↔ Code

📊 Session analysée:
   - Messages totaux: {count}
   - Nouveaux messages: {new_count}
   - Génération: #{generation_number}
   - Projet: {doc_project}

📝 Docs existantes (pour comparaison):
   - {file1}
   - {file2}
   ...

⏳ L'agent va :
   1. Analyser le code RÉELLEMENT écrit dans les nouveaux messages
   2. Lire les fichiers modifiés/créés pour voir le code exact
   3. Comparer avec la documentation existante
   4. Créer les docs manquantes (ADR, FEAT, DB, DEV, ARCH, MOC)
   5. Mettre à jour les docs obsolètes pour refléter le code réel

💡 Philosophie : Code = Source de vérité | Doc = Reflet du code

Vous pouvez continuer à travailler normalement.
Pour voir le résultat plus tard:
  Read {doc_project}/DOC-GENERATION-REPORT.md
  Read .claude/cache/doc-manager/metadata.json
```

---

## Notes Importantes

**Pas de hook nécessaire!** Le transcript est lu directement depuis `~/.claude/projects/`.

**Agent dédié:** L'agent `doc-manager` est un subagent spécialisé qui assure la cohérence Code ↔ Documentation.

**Mode incrémental:** Seuls les nouveaux messages sont traités à chaque exécution.

**Vérification du code réel:** L'agent lit les fichiers modifiés pour documenter ce qui est RÉELLEMENT fait, pas les intentions.

**Documentation en français:** L'agent génère toute la documentation en FRANÇAIS.
