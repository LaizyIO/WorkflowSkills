---
argument-hint:
description: Affiche l'état Ruflo (claude-flow) du projet courant
---

# /ruflo-status

Vérifie l'état d'intégration Ruflo dans ce projet et affiche un diagnostic.

## Action

Exécute `clai ruflo status` puis interprète les résultats pour l'utilisateur.

## Étapes

1. Lance `clai ruflo status` via Bash
2. Si Ruflo n'est pas installé globalement : propose `clai ruflo install`
3. Si Ruflo n'est pas initialisé dans le projet : propose `clai ruflo init`
4. Si tout est en place : confirme et liste les outils MCP `mcp__claude-flow__*` disponibles
5. Vérifie aussi :
   - Présence de la section "## Ruflo - Orchestration Multi-Agents" dans CLAUDE.md
   - Présence de hooks Ruflo dans `.claude/settings.json`
   - État du serveur MCP (si autoStart=true ou non)

## Format de sortie

Tableau Markdown récapitulatif + recommandations actionnables.
