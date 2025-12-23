# Guide d'Analyse des Gaps

Méthodologie pour identifier systématiquement les lacunes et incohérences.

---

## Types de Gaps

### 1. Gap de Spécification
**Définition:** Information manquante ou incomplète dans les documents.

**Exemples:**
- Critère d'acceptation absent
- Comportement en cas d'erreur non défini
- Edge case non adressé
- Exigence non-fonctionnelle oubliée

**Détection:**
```
Pour chaque exigence, vérifier:
- Est-elle complète ? (qui, quoi, quand, comment, pourquoi)
- Est-elle testable ? (critères mesurables)
- Est-elle non-ambiguë ? (une seule interprétation possible)
```

### 2. Gap de Contexte
**Définition:** Éléments existants non pris en compte.

**Exemples:**
- Fonctionnalité existante similaire ignorée
- Composant réutilisable non mentionné
- Contrainte d'architecture non respectée
- Convention du projet non suivie

**Détection:**
```
Comparer le document avec:
- Le codebase existant (recherche de patterns similaires)
- La documentation projet ([DOC]-* folders)
- Les autres deliverables du workflow
```

### 3. Gap de Cohérence
**Définition:** Contradiction entre différentes sources.

**Exemples:**
- CDC dit X, findings dit Y
- Plan contredit l'architecture documentée
- Terminologie différente entre documents
- Scope différent entre CDC et Plan

**Détection:**
```
Créer une matrice de cohérence:
| Élément | CDC | Findings | Plan | Codebase | Status |
|---------|-----|----------|------|----------|--------|
| Auth    | JWT | JWT      | JWT  | Session  | ⚠️     |
```

### 4. Gap de Faisabilité
**Définition:** Élément spécifié mais difficile/impossible à réaliser.

**Exemples:**
- Technologie incompatible
- Contrainte irréaliste
- Dépendance indisponible
- Scope trop ambitieux

**Détection:**
```
Pour chaque élément technique:
- Existe-t-il un précédent dans le projet ?
- La technologie est-elle compatible ?
- Les ressources sont-elles disponibles ?
```

---

## Méthodologie d'Analyse

### Étape 1: Collecte du Contexte

**1.1 Lire le deliverable à challenger**
```
- Lire intégralement le document
- Noter les questions immédiates
- Identifier les sections floues
```

**1.2 Explorer la documentation projet**
```
Rechercher et lire:
Glob: [DOC]-*/**/*.md
Glob: docs/**/*.md
Glob: README.md, ARCHITECTURE.md, CONTRIBUTING.md
```

**1.3 Analyser le codebase**
```
Recherches pertinentes:
- Grep pour les termes clés du deliverable
- Glob pour les fichiers liés au domaine
- Read des fichiers critiques identifiés
```

**1.4 Consulter les autres deliverables**
```
Lire dans l'ordre:
CDC.md → findings.md → Plan.md → test-plan.md
```

### Étape 2: Analyse Systématique

**2.1 Analyse par section**
```
Pour chaque section du document:
1. Comprendre l'intention
2. Vérifier la complétude
3. Vérifier la clarté
4. Vérifier la cohérence avec le contexte
5. Noter les gaps identifiés
```

**2.2 Analyse par exigence**
```
Pour chaque exigence/décision:
1. Est-elle justifiée ?
2. Est-elle complète ?
3. Est-elle cohérente ?
4. Est-elle réalisable ?
5. Est-elle testable ?
```

**2.3 Analyse croisée**
```
Comparer:
- Document vs Codebase
- Document vs Documentation projet
- Document vs Autres deliverables
- Sections entre elles
```

### Étape 3: Classification des Gaps

**Sévérité:**

| Niveau | Description | Action |
|--------|-------------|--------|
| Critique | Bloque la progression | Doit être résolu immédiatement |
| Majeur | Impact significatif | Devrait être résolu avant de continuer |
| Mineur | Impact limité | Peut être résolu plus tard |

**Type:**

| Type | Description |
|------|-------------|
| Manquant | Information absente |
| Ambigu | Plusieurs interprétations possibles |
| Incohérent | Contradiction avec autre source |
| Irréaliste | Difficile/impossible à réaliser |

### Étape 4: Formulation des Challenges

**Template de challenge:**
```markdown
### [Titre court et descriptif]

**Sévérité:** Critique / Majeur / Mineur
**Type:** Manquant / Ambigu / Incohérent / Irréaliste
**Localisation:** [Section ou fichier concerné]

**Observation:**
[Description factuelle de ce qui a été trouvé ou manque]

**Impact:**
[Conséquence si non résolu]

**Question:**
[Question précise pour résoudre le gap]

**Suggestion:**
[Proposition de résolution si applicable]
```

---

## Patterns de Gaps Courants

### Dans les CDC

**Pattern: Scope Flou**
```
Signal: "Le système devra gérer les notifications"
Gap: Quels types ? Quels canaux ? Quelle fréquence ?
Question: Pouvez-vous détailler les types de notifications attendus ?
```

**Pattern: Critères Vagues**
```
Signal: "Le système doit être performant"
Gap: Aucune métrique mesurable
Question: Quel temps de réponse est acceptable ? Quelle charge ?
```

**Pattern: Cas d'Erreur Oubliés**
```
Signal: Description uniquement du cas nominal
Gap: Comportement en cas d'échec non défini
Question: Que se passe-t-il si [action] échoue ?
```

### Dans les Findings

**Pattern: Alternative Non Explorée**
```
Signal: Choix technique sans justification comparative
Gap: Autres options non évaluées
Question: Pourquoi [choix] plutôt que [alternative] ?
```

**Pattern: Existant Ignoré**
```
Signal: Proposition de créer un nouveau composant
Gap: Composant similaire existe déjà
Question: Pourquoi ne pas étendre [composant existant] ?
```

**Pattern: Risque Sous-Estimé**
```
Signal: Nouvelle technologie sans évaluation des risques
Gap: Impact sur maintenance, équipe, performance
Question: Quels sont les risques de cette approche ?
```

### Dans les Plans

**Pattern: Étape Trop Large**
```
Signal: "Implémenter le backend de notifications"
Gap: Pas assez granulaire pour être actionnable
Question: Quelles sont les sous-étapes de cette implémentation ?
```

**Pattern: Dépendance Implicite**
```
Signal: Étapes qui semblent indépendantes mais ne le sont pas
Gap: Ordre d'exécution incorrect possible
Question: L'étape X nécessite-t-elle que Y soit terminée ?
```

**Pattern: Validation Absente**
```
Signal: Phase sans critères de validation
Gap: Impossible de savoir si la phase est complète
Question: Comment valide-t-on que cette phase est terminée ?
```

### Dans les Test Plans

**Pattern: Test Redondant**
```
Signal: E2E teste la même chose qu'un test API
Gap: Duplication d'effort
Question: Ce test apporte-t-il une valeur unique ?
```

**Pattern: Couverture Partielle**
```
Signal: Tests uniquement positifs
Gap: Cas d'erreur non testés
Question: Que se passe-t-il si [condition d'erreur] ?
```

---

## Questions Universelles

### Questions de Complétude
- Qu'est-ce qui manque ?
- Qu'est-ce qui est ambigu ?
- Qu'est-ce qui n'est pas testable ?

### Questions de Cohérence
- Est-ce aligné avec l'existant ?
- Y a-t-il des contradictions ?
- La terminologie est-elle cohérente ?

### Questions de Faisabilité
- Est-ce réalisable techniquement ?
- Les ressources sont-elles disponibles ?
- Le scope est-il réaliste ?

### Questions d'Impact
- Qu'est-ce qui pourrait mal tourner ?
- Quel est l'impact sur l'existant ?
- Quels sont les risques non adressés ?

---

## Outils de Détection

### Recherches Codebase

**Trouver des fonctionnalités similaires:**
```bash
Grep: "notification|email|alert" -i
Glob: **/*Notification*.*
Glob: **/*Email*.*
```

**Trouver l'architecture:**
```bash
Glob: **/services/**/*
Glob: **/controllers/**/*
Glob: **/models/**/*
```

**Trouver les configurations:**
```bash
Glob: **/*.config.*
Glob: **/.env*
Glob: **/appsettings*.json
```

### Recherches Documentation

**Trouver la doc projet:**
```bash
Glob: [DOC]-*/**/*.md
Glob: docs/**/*.md
Glob: wiki/**/*.md
```

**Trouver les décisions:**
```bash
Grep: "decision|décision|ADR"
Glob: **/adr/**/*
Glob: **/decisions/**/*
```

---

## Output: Rapport de Gap Analysis

```markdown
# Rapport d'Analyse des Gaps

**Document analysé:** [Nom du document]
**Date:** [Date]
**Analyste:** Claude Code

## Résumé Exécutif

[2-3 phrases sur l'état général et les findings principaux]

## Statistiques

| Sévérité | Nombre |
|----------|--------|
| Critique | X |
| Majeur | X |
| Mineur | X |

## Gaps Identifiés

### Critiques

[Liste des gaps critiques avec template complet]

### Majeurs

[Liste des gaps majeurs]

### Mineurs

[Liste des gaps mineurs]

## Matrice de Cohérence

| Source A | Source B | Status | Issue |
|----------|----------|--------|-------|
| ... | ... | ✅/⚠️/❌ | ... |

## Recommandations Prioritaires

1. [Action prioritaire 1]
2. [Action prioritaire 2]
3. [Action prioritaire 3]

## Questions Ouvertes

1. [Question nécessitant réponse utilisateur]
2. [Question nécessitant réponse utilisateur]
```
