---
title: FEAT-006 Design contextuel - Test Results
type: test
status: completed
created: 2026-09-10
updated: 2026-09-10
feature: FEAT-006
tags:
  - feature-workflow
  - testing
  - ux
---

# FEAT-006 — Résultats de validation

## Livraison

- 13 skills UX enrichis et 8 points d'intégration workflow révisés ; ressources de méthode, vocabulaire et vérification des plateformes livrées avec leurs copies Codex.
- Templates de contexte, direction et profil de plateforme ; lexique positif et critères d'audit contextualisés.
- Migration additive de DESIGN.md et des guides Claude/Codex par bloc délimité ; documents vivants préservés, MOC complété sans remplacer ses entrées.
- Scanner web/natif avec limites, exclusions, erreurs, troncature et mode JSON. Migration de l'ancien scanner standard par empreinte normalisée LF ; versions personnalisées conservées.
- Versions préparées : plugin Codex et marketplace Claude 1.6.0, CLI 1.3.0. Ces validations précèdent le commit/push demandé ensuite ; aucune publication npm ni modification du cache installé pendant la validation.

## Contrôles exécutés

| Contrôle | Résultat |
|---|---|
| `npm test` dans `clai/` | 15 tests réussis, aucun échec, aucun test ignoré ; exécution finale 16,4 s |
| `quick_validate.py` avec Python `-X utf8` sur les skills racine | 24 skills valides |
| Parité des arbres source/plugin et résolution des références locales | Réussie dans les tests CLI |
| `npm pack --dry-run --json` | Package 1.3.0 ; nouveaux supports et scanner présents, tests exclus |
| `git diff --check` | Réussi |

Les tests couvrent : init Codex, substitutions de templates, idempotence sync, préservation exacte des décisions de marque/contexte/direction/plateforme, scanner et MOC personnalisés, migration du scanner standard LF/CRLF, préservation d'une version modifiée, indices natifs en sous-projets, exclusions, limites d'inventaire, sortie JSON sans écriture, refus d'un vault ambigu et guides ne contenant que la mémoire pour les deux cibles. Les régressions historiques de la CLI restent couvertes.

## Écarts corrigés pendant la validation

- Le bloc de méthode pouvait empêcher la reconnaissance d'un guide ne contenant que la mémoire : la détection utilise désormais le contenu original. Test de non-régression ajouté pour Claude et Codex.
- Une copie de skill devenue obsolète après la dernière correction a été détectée par le test de parité et resynchronisée. L'exécution finale valide les deux arbres.
- Le validateur Python utilisait par défaut l'encodage Windows ; l'exécution en UTF-8 valide les fichiers sans modifier le validateur.

## Limites

Il s'agit d'une validation des instructions, de leur distribution et des comportements CLI. Aucun benchmark de génération, aucun rendu d'application native/web et aucun test utilisateur n'ont été effectués pour cette livraison de skills. Les projets types et le protocole comparatif de [[DEV-Audit-Skills-Design-Contextuel]] restent la référence pour mesurer l'effet sur les futurs designs. Ne pas présenter les tests de fichiers comme une preuve d'amélioration esthétique ou de conformité d'une application.

## Adoption

Après diffusion de ces versions, mettre à jour le plugin séparément de la CLI. `clai sync --target codex` ajoute la méthode et les supports absents, mais conserve le contenu personnalisé des anciens templates. Les skills enrichissent ces documents au prochain travail pertinent. Le scanner est remplacé seulement si reconnu comme version standard antérieure ; sinon il reste personnalisé.

### Mise à jour du plugin Codex depuis le dépôt Git

Le marketplace `workflow-skills` est déjà configuré sur le poste vérifié. Après push, dans PowerShell :

```powershell
codex plugin marketplace upgrade workflow-skills
codex plugin add workflow-skills@workflow-skills
codex plugin list --marketplace workflow-skills --json
```

Contrôler la version 1.6.0 et l'état activé. Ouvrir une nouvelle tâche pour travailler avec le catalogue actualisé. Les commandes sont confirmées par l'aide du binaire local et la [référence officielle des commandes](https://learn.chatgpt.com/docs/developer-commands#codex-plugin). Ne pas recopier le contenu du plugin vers les skills personnels.

Pour les templates d'un projet existant, lancer depuis sa racine la CLI de ce dépôt, sans attendre une publication npm :

```powershell
node D:\WorkflowSkills\clai\bin\clai.js sync --target codex
```

Cette commande vise le projet courant ; la mise à jour du plugin et la synchronisation documentaire sont deux opérations distinctes.

## Liens

- [[FEAT-006-Design-Contextuel]]
- [[ADR-006-Methode-Design-Contextuel]]
- [[DEV-Audit-Skills-Design-Contextuel]]
