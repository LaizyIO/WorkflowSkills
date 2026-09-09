---
title: Desactivation temporaire du controle mojibake
type: dev
status: approved
created: 2026-09-09
updated: 2026-09-09
tags:
  - clai
  - maintenance
---

# Desactivation temporaire du controle mojibake

A la demande de l'utilisateur, le controle est suspendu pour evaluer le travail de Codex sans ce script.

## Comportement clai 1.2.1

- `init` et `sync` n'installent plus `scripts/check-mojibake.ps1`.
- Les templates et guides synchronises ne prescrivent plus le controle `Encoding Guard`.
- `check-mojibake` reste un alias de compatibilite inactif : message explicite, aucun script execute. Son code de sortie zero ne constitue pas une validation d'encodage.
- La source est conservee dans `clai/disabled/`, hors templates installes.
- Aucun changement des skills n'est necessaire : les skills actifs ne prescrivent pas ce controle.

## Projets existants

```powershell
node D:\WorkflowSkills\clai\bin\clai.js remove-mojibake "D:\MonProjet"
```

Sans argument, la commande cible le dossier courant. Elle supprime uniquement le fichier nomme et retire les sections `Encoding Guard` des guides racine AGENTS.md, CLAUDE.md et CODEX.md. Les autres scripts et instructions sont conserves. La commande peut etre repetee ; une synchronisation ulterieure ne reinstalle pas le script.

Les references personnalisees restantes dans les guides sont signalees. Les scripts npm, hooks et workflows CI personnalises ne sont pas modifies automatiquement. Aucun nettoyage global des autres projets n'a ete effectue.

## Verification

Les tests CLI couvrent la non-installation, la suppression ciblee, la preservation des autres scripts et projets, l'idempotence et l'absence d'execution de l'ancienne commande. Le controle mojibake lui-meme n'est pas execute.

## Essais sur projets existants

Le 2026-09-09, migration appliquee a D:/MDM, D:/Ghesquiers, D:/NAE et D:/MailOps. Les scripts ont ete retires sans execution et les consignes UX actualisees. Une note DEV-Migration-UX-Images-Codex est ajoutee dans chaque vault.

Les essais ont revele l'absence de .codex dans NAE (dossier cree avant sync) et une reference obsolete dans les scans UX existants. La migration corrige desormais uniquement le nom du skill dans ces scans, conservant leur code personnalise. Une erreur de sync retourne maintenant un code non nul au lieu d'annoncer une reussite.

Les commandes runtime personnalisees ont ete preservees, les artefacts historiques conserves et aucune modification applicative, generation d'image ou publication n'a ete effectuee.

## Liens

- [[DEV-Maintenance-templates-et-skills-dual-target]]
- [[MOC-Principal]]
