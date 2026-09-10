---
title: FEAT-006 Design contextuel dans WorkflowSkills
type: feature
status: approved
created: 2026-09-10
updated: 2026-09-10
tags:
  - ux
  - skills
  - clai
---

# FEAT-006 — Design contextuel

## Besoin et autorisation

Suite à [[DEV-Audit-Skills-Design-Contextuel]], l'utilisateur autorise la mise à jour du workflow, des skills et de la CLI. La méthode doit convenir aux sites, applications web et applications natives sans imposer une identité commune.

## Contrat

- Contexte exploitable avant conception : public, expertise, fréquence, tâche, contenu, marque, plateforme, conditions d'usage et réussite attendue. Réutiliser les faits connus ; signaler les inconnues sans inventer de recherche utilisateur.
- Direction explicite pour création/refonte : vocabulaire positif traduit en choix observables, raisons, références et critères. Exploration proportionnée ; aucune obligation de produire plusieurs variantes pour une retouche.
- Choix des composants selon les tâches et les données. Identité du projet distincte des conventions de la plateforme.
- Vérification sur chaque plateforme concernée. Séparer rendu, interactions, accessibilité et réussite de tâche ; ne pas déclarer une app native validée depuis une capture web.
- Documentation des écarts : le code décrit l'existant, les exigences approuvées définissent l'attendu.
- CLI : nouveaux templates remplissables, méthode ajoutée sans écraser les documents vivants ; scanner avec portée, troncature et indices natifs explicites.
- Sources et copies Codex identiques, ressources comprises ; aucun changement de cache utilisateur ou publication implicite.

## Validation attendue

Tests init/sync et idempotence ; préservation de marque, contexte, directions, MOC et scanner personnalisés ; migration du scanner standard antérieur ; inventaire natif et déclaration de troncature ; parité des ressources distribuées et validation des skills.

La qualité visuelle devra ensuite être évaluée sur les projets représentatifs décrits dans l'audit. Des tests de fichiers ne démontrent pas un gain esthétique ou UX.

## Liens

Implémenté le 2026-09-10 : versions préparées plugin 1.6.0 et CLI 1.3.0. Les validations sont consignées dans [[FEAT-006-Test-Results]]. La publication et l'évaluation visuelle multi-projets sont distinctes de cette livraison.

- [[ADR-006-Methode-Design-Contextuel]]
- [[DEV-Lexique-Design-Contextuel]]
