# Exemples clai

## Nouveau projet Codex

Depuis le dossier du projet :

```powershell
clai init MonProjet --target codex --doc MonProjet --no-ruflo
```

Le projet recoit AGENTS.md, les instructions de commandes, la documentation Obsidian, DESIGN.md, design/mockups/ et les scripts projet. Aucun style de sortie n'est installe.

## Projet existant

```powershell
clai sync --target codex
```

Les fichiers UX personnalises sont conserves. Les sections de maquettage des guides sont actualisees ; les anciennes images restent disponibles pour archivage explicite. Eviter init --force sur une documentation personnalisee.

## Workflow de maquette

1. Auditer la page avec ux-audit et cadrer les etats avec ux-flow.
2. Preparer le brief avec ux-mockup-brief, ou extraire le contexte existant avec ux-code-to-mockup.
3. Generer une image avec ux-mockup-generate, via l'outil image de Codex.
4. Iterer avec ux-mockup-iterate si necessaire et enregistrer la version selectionnee.
5. Implementer avec ux-implement-from-mockup puis verifier le vrai frontend avec ux-visual-verification.
6. Actualiser la memoire UX avec ux-design-sync.

Une correction UI mineure n'impose pas une maquette inutile ; lorsqu'une maquette est demandee ou necessaire, produire une vraie image. Une capture de l'application sert a verifier l'implementation, une image generee sert a proposer le design.

## Claude Code

```powershell
clai init MonProjet --target claude --doc MonProjet --no-ruflo
```

La cible Claude conserve son guide et ses commandes. Pour la generation d'images, utiliser Codex si l'environnement courant ne fournit pas l'outil requis ; ne pas simuler une generation reussie.

## Encodage

```powershell
clai check-mojibake
```
