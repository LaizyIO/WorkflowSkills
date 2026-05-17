# Issue Classification Guide

Extended examples and edge cases for the classification tree.

---

## Decision Tree (reminder)

```
Broken existing behavior?           → BUG
Active prod emergency right now?    → HOTFIX
Cleanup / refacto / tech update?    → TECH-DEBT
Clear new capability?               → FEATURE
Everything else (vague/exploratory) → IDÉE
```

---

## Examples by Type

### BUG
- "La suppression de conversation ne nettoie pas les entrées mémoire associées" → BUG (cascade manquante dans une feature existante)
- "L'affichage en liste du Marketplace est cassé" → BUG (UI existante, rendu incorrect)
- "L'export CSV plante sur les caractères accentués" → BUG
- "Le formulaire de contact ne valide pas les emails avec des sous-domaines" → BUG
- "La recherche full-text retourne des résultats vides après migration de schéma" → BUG

### HOTFIX
- "Le backend est down depuis 30 min en prod" → HOTFIX
- "Credential leak dans les logs visible en production" → HOTFIX
- "L'authentification est cassée pour tous les utilisateurs ce matin" → HOTFIX
- "La base de données refuse les nouvelles connexions — pool exhausted" → HOTFIX

### TECH-DEBT
- "Config MSAL scope — demander le consentement avec le bon scope Azure AD" → TECH-DEBT (audit + refacto config)
- "Évaluer la mise à jour de la lib d'authentification (v2 → v4)" → TECH-DEBT (investigation)
- "Extraire la logique d'auth du controller vers un middleware dédié" → TECH-DEBT
- "Remplacer les appels raw SQL par l'ORM dans les scripts legacy" → TECH-DEBT
- "Mettre à jour les dépendances npm avec des CVE critiques" → TECH-DEBT
- "Supprimer le code mort dans le module de notifications" → TECH-DEBT

### FEATURE
- "Ajouter l'authentification webhook pour les appels entrants N8N" → FEATURE
- "Back-office de gestion des configurations globales" → FEATURE
- "Permettre la mise à jour de fichiers individuels dans une KB SharePoint" → FEATURE
- "Système de backup automatique avant déploiement" → FEATURE
- "Ajouter une page d'analytics pour les admins" → FEATURE

### IDÉE
- "Analytics CO2 pour les appels LLM" → IDÉE (exploratory, ROI incertain)
- "Permettre aux utilisateurs de créer leur propre stratégie RAG" → IDÉE (scope/risque flous)
- "Voir si on pourrait intégrer un outil de monitoring de dépendances" → IDÉE
- "Rendre visible la consommation IA des workflows N8N dans les stats" → IDÉE
- "Ajouter un mode sombre à toute l'application" → IDÉE (si non cadré) ou FEATURE (si les maquettes existent)

---

## Tricky Cases

### "Amélioration" — Bug ou Feature ?

- Feature existante qui **fonctionne mal** → **BUG**
- Capacité qui **n'existe pas encore** → **FEATURE**

Exemple : "améliorer les performances de synchronisation SharePoint"
- Si la sync existe et est lente → **BUG** (ou TECH-DEBT si c'est un problème d'architecture)
- Si la sync n'existe pas encore → **FEATURE**

### Tech-Debt vs Feature

- **TECH-DEBT** : l'utilisateur obtient déjà un résultat ; on améliore la qualité du code qui le produit
- **FEATURE** : l'utilisateur obtient une capacité nouvelle qu'il n'avait pas

Exemples :
- "Extraire le service email dans une classe dédiée" → TECH-DEBT (refacto interne)
- "Ajouter un service email pour les notifications de bienvenue" → FEATURE (nouvelle capacité)

### Issues d'investigation

- "Évaluer X", "Analyser les options pour Y", "Rechercher si Z est faisable" → **TECH-DEBT** (type investigation)
- Le livrable est un rapport/ADR, pas du code — c'est quand même un work item valide
- Ne pas classer en IDÉE juste parce que c'est flou : une investigation a un livrable clair

### Bucket "hotfix" dans les outils de gestion (Jira, Planner, etc.)

Un item dans un bucket "hotfix" n'est pas nécessairement un **HOTFIX** au sens DEV-007 :
- S'il s'agit d'une urgence prod active → HOTFIX (priorité Urgent)
- S'il s'agit d'un bug important mais non actif → **BUG** (priorité High)

Toujours vérifier la sévérité réelle avant de classifier en HOTFIX.

### Idée déjà partiellement implémentée

Si l'exploration du code révèle qu'une partie de l'idée existe déjà :
- Mentionner ce qui existe dans la description
- Requalifier en **FEATURE** si le périmètre restant est clair
- Rester en **IDÉE** si le périmètre reste flou même avec le code partiel

---

## Confidence Levels

| Confidence | When | Action |
|-----------|------|--------|
| High | Clear match to one type | Create directly |
| Medium | Two types could apply | Create with justification, note uncertainty in report |
| Low | Very vague, no code context found | Create as IDÉE, flag clearly in report |

Quand la classification est incertaine, le noter dans le rapport post-création :
> "_Classé Feature — à requalifier en Bug si ce comportement existait déjà avant la v2.3_"
