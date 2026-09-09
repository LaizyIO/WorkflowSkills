---
title: FEAT-005 Maquettes images Codex
type: feature
status: approved
created: 2026-09-09
updated: 2026-09-09
tags:
  - ux
  - codex
  - clai
---

# Maquettes images Codex

## Besoin

Conserver la methode UX DesignOps et remplacer Stitch par la generation native d'images Codex pour toute maquette UI/UX necessaire. Supprimer les output styles du workflow et de l'installation clai.

## Livraison

- Plugin Codex 1.5.0, clai 1.2.0.
- Cinq skills : `ux-mockup-brief`, `ux-mockup-generate`, `ux-mockup-iterate`, `ux-code-to-mockup`, `ux-implement-from-mockup`.
- Audit, flows, composants, polish, Storybook, implementation, synchronisation documentaire et verification navigateur conserves.
- Images dans `design/mockups/images/`, references dans `design/mockups/references/`, prompts et index dans `[DOC]-*/11-UX-DesignOps/07-Mockups/`.
- Chaque maquette demandee produit une image reelle via l'outil image de Codex. Le prompt seul ne suffit pas. Une retouche mineure ne force pas une maquette inutile.
- Les images sont inspectees, versionnees et reliees a la cible, au prompt et aux decisions. Aucun identifiant de service de design externe n'est necessaire.
- Si l'outil image manque, la generation est signalee bloquee ; une API/CLI payante ou authentifiee n'est pas utilisee implicitement.
- `clai init` n'installe plus de styles de sortie pour aucune cible. `sync` actualise les sections generees des guides et le contrat de maquettage tout en conservant les contenus personnalises et les anciens artefacts utilisateurs.

## Validation

Tests d'integration automatises : initialisation Codex, migration et idempotence de sync, preservation des documents/images existants, initialisation Claude sans styles, option `--no-ux`, execution du scan UX.

Les tests portent sur le routage, les fichiers installes et la preservation des contenus. Une generation d'image live n'est pas executee pour cette migration d'instructions ; la qualite visuelle des maquettes futures devra etre inspectee lors de leur production.

## Liens

- [[ADR-005-Maquettes-Images-Codex]]
- [[DEV-Maintenance-templates-et-skills-dual-target]]
- [[MOC-Principal]]
