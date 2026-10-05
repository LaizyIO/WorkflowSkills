---
title: DEV-Maintenance-templates-et-skills-dual-target
type: dev
status: approved
created: 2026-05-17
updated: 2026-10-05
tags:
  - dev
  - codex
  - claude
---

# Conventions de maintenance dual-target

## Templates
- Source historique: `clai/templates/*` pour Claude.
- Cible Codex: `clai/templates/codex/*`.
- Toute commande/agent ajout? c?t? Claude doit ?tre port? c?t? Codex.
- Les templates Codex doivent inclure le guide `AGENTS.md`, les artefacts `.codex/`, `DESIGN.md`, `design/mockups/`, `scripts/ux/`, et la memoire UX dans `[DOC]-*/11-UX-DesignOps/`.
- La vérification web privilégie Codex Browser quand disponible ; Playwright reste un outil E2E ou fallback. Le natif nécessite un rendu/appareil natif, suivant [[ADR-006-Methode-Design-Contextuel]].
- Les outils projet communs vivent dans `clai/templates/project/` et doivent etre installes par `clai init` et `clai sync`, quelle que soit la cible.
- Controle mojibake suspendu : ne pas installer ni executer le script. Utiliser `clai remove-mojibake [directory]` pour retirer le controle d'un projet existant. Voir [[DEV-Desactivation-Mojibake]].

## Guides racine
- Claude: `CLAUDE.md`.
- Codex: `AGENTS.md`.
- `clai sync --target codex` doit aussi synchroniser `AGENTS.md`; un fichier qui ne contient qu'un bloc `<claude-mem-context>` doit etre remplace par le guide Codex complet.

## Skills
- Sources de design : [[FEAT-007-Taste-Design-References]] et [[DEV-Taste-Design-References]]. `ux-design-direction` route les sources Taste et les candidates Awesome DESIGN.md. Les assets sous `ux-design-direction/assets/design-sources/` sont canoniques ; maintenir leurs copies plugin et `clai/templates/design-sources/` identiques, avec commits, empreintes, notices MIT et protection des octets dans `.gitattributes`.
- Design contextuel : [[FEAT-006-Design-Contextuel]]. Méthode et vocabulaire sous `ux-mockup-brief/references/`, vérification des plateformes sous `ux-visual-verification/references/`. Copier les ressources avec leurs skills dans le plugin.
- `Product_Context`, `Design_Direction` et `Platform_Profile` sont des documents vivants. La CLI ne les écrase pas pendant sync ; elle actualise seulement le bloc de méthode délimité et ajoute les supports absents. Un scanner personnalisé reste conservé ; seule l'empreinte d'une version standard autorise sa migration automatique.
- Maquettage : utiliser les cinq skills `ux-mockup-brief`, `ux-mockup-generate`, `ux-mockup-iterate`, `ux-code-to-mockup`, `ux-implement-from-mockup`. L'outil image natif Codex produit les maquettes ; la verification navigateur controle l'implementation.
- Conserver les prompts exacts et decisions dans `07-Mockups/Mockup_Index.md`, les images dans `design/mockups/images/`.
- Toute modification d'un skill source doit etre reportee a l'identique dans `plugins/codex/workflow-skills/skills/`.
- Les output styles ne font plus partie des composants installes. Ne pas reintroduire une dependance de service de design externe dans les templates.
- Executer `npm test` dans `clai/` pour verifier init/sync et la preservation des fichiers utilisateurs. Voir [[FEAT-005-Maquettes-Images-Codex]] et [[ADR-005-Maquettes-Images-Codex]].
- Les `SKILL.md` doivent inclure un mapping explicite Claude -> Codex quand primitives diff?rentes.
- Pr?f?rer primitives Codex (`request_user_input`, `spawn_agent`, outillage shell natif).
