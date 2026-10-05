---
title: Déploiement Taste et DESIGN.md dans Codex et Running
type: dev
status: approved
created: 2026-10-05
updated: 2026-10-05
tags:
  - ux
  - codex
  - release
  - clai
---

# Déploiement du 5 octobre 2026

Après la livraison locale FEAT-007, Guillaume autorise commit/push, actualisation du plugin Codex et synchronisation. Il limite explicitement les fichiers projet à Running pour l'instant.

## Résultat

- Commit fonctionnel `bf22934483df355cc104e06d644b0bdce394cedb`, `feat(ux): integrate Taste and DESIGN.md references`, poussé sur `origin/main` ; SHA distant vérifié.
- `codex plugin marketplace upgrade workflow-skills`, puis `codex plugin add workflow-skills@workflow-skills --json` : plugin **1.7.0** installé. `codex plugin list` confirme installé et activé. `ux-design-direction` et les quatre sources Taste du cache ont été contrôlés, empreintes conformes.
- CLI **1.4.0** installée localement depuis un paquet construit avec `npm pack`, puis `npm install -g <paquet-local>`. `clai --version` vérifié. Aucune publication sur le registre npm.
- `clai sync --target codex` effectué uniquement dans `D:\Running`. Méthode AGENTS/DESIGN actualisée, registre Design_References ajouté, snapshots Taste installés et MOC-UX complété.

## Préservation et vérifications

Les 24 tests CLI restent réussis, sans échec ni skip. Le contrôle des fichiers staged est réussi ; les octets des snapshots sont conservés par `.gitattributes`, y compris les sauts de ligne Markdown amont.

Un instantané temporaire des 133 fichiers existants concernés de Running a permis de comparer les empreintes. Seuls AGENTS.md, DESIGN.md et MOC-UX ont changé parmi ces fichiers. Les textes AGENTS/DESIGN hors des blocs gérés sont identiques. Contexte, direction, profil iPhone, tokens, spécifications, données métier et commandes/agents sont inchangés. Une note de maintenance est ajoutée dans le vault Running. Aucun fichier des autres projets n'a été modifié ; leur inspection initiale était en lecture seule.

Running contenait déjà des travaux documentaires non commités. Aucun commit/push n'a été effectué dans son dépôt. Dans WorkflowSkills, le nettoyage préexistant de l'installation Codex est resté hors du commit de cette feature.

## Usage

Le plugin fournit le nouveau skill aux projets Codex. Pour une nouvelle demande de conception dans Running, utiliser `ux-design-direction` en réutilisant le contexte iPhone/Tempo. Les imports de références restent des candidates, pas une refonte implicite. La recette native demeure nécessaire après une implémentation UI.

Les commandes de gestion du plugin ont été vérifiées dans le CLI installé et dans [OpenAI Docs](https://learn.chatgpt.com/docs/developer-commands#codex-plugin).

## Liens

- [[FEAT-007-Taste-Design-References]]
- [[FEAT-007-Test-Results]]
- [[DEV-Taste-Design-References]]
