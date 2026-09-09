---
title: ADR-005 Maquettes images Codex sans service de design externe
type: adr
status: approved
created: 2026-09-09
updated: 2026-09-09
tags:
  - adr
  - ux
  - codex
---

# Maquettes images Codex

## Decision

A la demande de l'utilisateur, Stitch sort du workflow actif. La generation native d'images Codex devient l'outil de maquettage. Les output styles sont retires de la suite et de clai.

Le cycle reste : audit et contexte produit, brief, image generee, iteration, selection, implementation avec les composants du projet, verification du frontend, mise a jour de la memoire UX.

`07-Mockups/Mockup_Index.md` remplace la carte de projets externes. Les images versionnees sont des references visuelles, jamais des preuves de comportement, de conformite d'accessibilite ou de rendu responsive. La verification navigateur conserve son role.

## Compatibilite

Les anciens noms de skills sont retires des catalogues actifs et remplaces par les cinq noms `ux-*-mockup` / `ux-mockup-*`. Les deux copies source et plugin Codex restent identiques. Les environnements sans generation d'images doivent annoncer la limite et conserver le brief sans simuler une execution.

La synchronisation clai migre les sections generees des guides ; elle ne supprime pas les images, archives ou styles personnalises d'autres projets. Ces artefacts ne sont plus installes ni recommandes. Leur suppression physique eventuelle necessite une action explicite dans le projet concerne.

Les recherches historiques restent archivees et ne constituent plus des instructions d'integration actives. Cette decision actualise la partie maquettage de [[ADR-003-Structure-UX-DesignOps]].

## Consequences

- Plus de dependance MCP ou d'identifiants de projets de design externe.
- Prompts, images et decisions doivent rester accessibles dans le projet.
- Les textes et details d'une image peuvent etre inexacts : inspection et traduction en vrais composants requises.
- La mise a jour du marketplace doit etre suivie d'une actualisation du plugin dans Codex ; un push Git ne modifie pas les caches deja installes.

## Liens

- [[FEAT-005-Maquettes-Images-Codex]]
- [[MOC-Principal]]
