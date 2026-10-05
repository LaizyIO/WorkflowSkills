---
title: DEV Utiliser Taste et Awesome DESIGN.md dans WorkflowSkills
type: dev
status: approved
created: 2026-10-05
updated: 2026-10-05
tags:
  - ux
  - clai
  - skills
---

# Utiliser les sources de design

Le plugin WorkflowSkills 1.7.0 préparé dans ce dépôt ajoute `ux-design-direction`. Ce skill utilise les snapshots Taste audités et le catalogue Awesome DESIGN.md. Les variantes Taste ne sont pas toutes activées comme skills concurrents. Awesome est un catalogue de documents, sans SKILL.md à installer.

## Dans un projet

Après disponibilité de la version de CLI, depuis la racine du projet :

```powershell
clai sync --target codex
clai design catalog --filter enterprise
clai design import ibm
```

Pour tester la version du dépôt avant publication npm, utiliser `node D:\WorkflowSkills\clai\bin\clai.js` à la place de `clai`. Par exemple, depuis `D:\MonProjet` :

```powershell
node D:\WorkflowSkills\clai\bin\clai.js sync --target codex
node D:\WorkflowSkills\clai\bin\clai.js design catalog --json
node D:\WorkflowSkills\clai\bin\clai.js design import airbnb
```

`init/sync --target codex` installent les quatre sources Taste figées, hors ligne, sous `design/references/taste/<commit>/`. L'installation explicite est `clai design install`, utilisable aussi hors configuration Codex. Les sources actives de routage restent fournies par le plugin ; la CLI seule ne met pas à jour un plugin déjà chargé dans Codex.

Le catalogue propose 74 références à la révision auditée, avec résumés issus des analyses et URLs. `--filter` cherche dans les IDs et ces résumés anglais, pas dans le contenu intégral. Lire le document retenu et ses limites avant d'adopter ses propriétés. Pour plusieurs vaults, `clai design import ibm --doc MonProjet` sélectionne `[DOC]-MonProjet`.

L'import télécharge le fichier depuis GitHub au commit figé, vérifie son empreinte et ajoute une candidate dans `11-UX-DesignOps/01-Product/Design_References.md`. Il conserve le DESIGN.md du projet et ses tokens. Une copie vérifiée reste réutilisable hors ligne ; une copie modifiée provoque un refus et reste conservée. Pour l'annoter, utiliser le registre ou une autre copie, pas modifier le snapshot.

## Demande de design

Exemple : « Utilise ux-design-direction pour cette interface. Lis le contexte produit et le profil de plateforme, compare les propriétés des références utiles, puis adapte la source choisie à nos tâches et à notre marque. »

Le workflow enchaîne la direction, les flows/composants, le brief et les images si nécessaires, l'implémentation, la vérification du rendu et la synchronisation documentaire. Les demandes de polish réutilisent les décisions existantes. Taste frontend ne fournit pas la recette d'un dashboard dense ou d'une application native ; les références visuelles s'adaptent aux composants et conventions de ces cibles.

## Mise à jour des sources

La source canonique est `ux-design-direction/assets/design-sources/` : manifest, quatre fichiers Taste et licences. Le plugin et `clai/templates/design-sources/` distribuent des copies identiques. Conserver les octets via les règles `.gitattributes` et vérifier les empreintes lors d'une actualisation. Le commit Awesome et les empreintes de son catalogue doivent provenir de la même révision.

Une mise à jour amont nécessite une revue du périmètre, des règles et des conflits du routage. Copier la nouvelle licence si nécessaire, mettre à jour le manifest et les copies, puis exécuter les tests et un import réseau. Ne pas suivre `main` silencieusement au moment de la conception.

Les versions livrées sont plugin 1.7.0 et CLI 1.4.0. Le 2026-10-05, après autorisation de Guillaume, la feature est poussée sur main, le plugin Codex installé/activé et la CLI installée localement ; seul Running est synchronisé. Voir [[DEV-Deploiement-Taste-Codex-Running]]. Le registre npm n'est pas mis à jour. Pour l'installation amont non adaptée, Taste documente `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend -a codex` ; elle n'est pas nécessaire en plus de cette intégration.

## Liens

- [[FEAT-007-Taste-Design-References]]
- [[FEAT-007-Findings]]
- [[FEAT-007-Test-Results]]
- [[ADR-007-Integration-Taste-Awesome-Design]]
