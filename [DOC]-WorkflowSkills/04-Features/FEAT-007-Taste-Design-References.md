---
title: FEAT-007 Taste et références DESIGN.md dans le workflow
type: feature
status: approved
created: 2026-10-05
updated: 2026-10-05
tags:
  - ux
  - skills
  - clai
---

# FEAT-007 — Taste et références DESIGN.md

## Demande

L'utilisateur demande d'analyser, installer/tester et ancrer Taste Skill et Awesome DESIGN.md dans la méthode de design commune aux sites et applications web/mobile/natives. Cette demande actualise [[FEAT-006-Design-Contextuel]], sans supprimer la mémoire produit ni la vérification des plateformes.

## Contrat

- Taste fournit des techniques de conception ; Awesome DESIGN.md fournit un catalogue de références. Un adaptateur explicite choisit les sources selon la surface, le contexte et la plateforme.
- Les versions auditées sont identifiées par commits et empreintes, avec licences MIT conservées. Aucun script amont n'est exécuté pour importer des fichiers Markdown.
- Le workflow choisit et documente des propriétés utiles avant de produire le design ; les références importées sont des candidates, jamais des décisions implicites.
- DESIGN.md reste le contrat propre au projet. Les règles esthétiques, stack et outils externes sont adaptés aux exigences approuvées ; les parcours, composants, tokens et conventions natives restent des contraintes du projet.
- La CLI installe les sources Taste localement, propose le catalogue et importe une référence ciblée à la révision auditée. Init/sync Codex livrent la méthode et les sources sans écraser des documents vivants. Les autres agents peuvent utiliser l'installation explicite.
- Sources et copies plugin identiques ; validation de l'installation, intégrité, préservation et routage. Distinguer ces tests d'une évaluation esthétique sur de vrais projets.

## Critères d'acceptation

Catalogue disponible hors ligne ; installation Taste idempotente ; import réseau réel de références contrastées ; refus des identifiants inconnus, fichiers modifiés et vaults ambigus ; aucune réécriture de DESIGN.md ou de directions existantes ; init/sync stables ; parité des sources distribuées ; méthode explicite pour landing, produit dense, refonte et Android.

## Liens

Livraison préparée localement : plugin 1.7.0, CLI 1.4.0, 21 skills existants enrichis et nouvel adaptateur. Voir les tests techniques et la passe indépendante. Une publication ou un push ne sont pas inclus dans cette livraison locale.

- [[ADR-007-Integration-Taste-Awesome-Design]]
- [[FEAT-007-Findings]]
- [[FEAT-007-Plan]]
- [[FEAT-007-Test-Results]]
