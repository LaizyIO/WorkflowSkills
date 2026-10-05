---
title: ADR-007 Intégration adaptée de Taste et Awesome DESIGN.md
type: adr
status: approved
created: 2026-10-05
updated: 2026-10-05
tags:
  - design
  - architecture
  - clai
---

# ADR-007 — Sources externes et contrat projet

## Décision

Introduire `ux-design-direction` comme adaptateur des deux ressources demandées. Le workflow existant le charge pour choisir une direction ou une référence, et réutilise les décisions pour les petites corrections. Cela actualise le choix de [[ADR-006-Methode-Design-Contextuel]] de ne pas créer de skill de direction : l'intégration de deux sources externes justifie désormais un point de routage unique.

Distribuer quatre snapshots Taste (frontend v2, audit redesign, images web, images mobile) comme références à charger par sections, avec commit, SHA-256 et licence. Aucun de ces fichiers n'est un SKILL.md actif concurrent. Le catalogue Awesome contient les IDs et empreintes des DESIGN.md ; seuls les fichiers choisis sont téléchargés à un commit figé. Les analyses de marques ne constituent ni des spécifications officielles ni une licence pour leurs ressources visuelles.

La CLI partage ces assets avec le skill et les copie sous `design/references/`. Les versions figées sont vérifiées ; une copie modifiée provoque un conflit explicite, sans écrasement. Les références importées sont inscrites comme candidates dans Design_References. DESIGN.md reçoit la méthode uniquement dans sa section gérée ; ses décisions projet ne sont pas remplacées.

## Raisons

Taste v2 exclut explicitement les dashboards, tables et applications natives, malgré quelques exemples de systèmes. La variante GPT exige AIDA, GSAP et une simulation de tirage aléatoire : l'activer universellement reproduirait l'uniformité signalée. Les règles utiles de composition, audit, états et cohérence doivent être appliquées selon le contexte. Les interfaces natives conservent leurs composants, navigation et outils de vérification.

## Conséquences

Le plugin fonctionne avec les snapshots audités sans installation globale additionnelle. Init/sync Codex installent les références Taste hors ligne ; importer une référence Awesome nécessite le réseau. Les mises à jour amont demandent une nouvelle revue et des empreintes actualisées. La CLI ne choisit pas une marque et ne remplit pas artificiellement la recherche utilisateur.

La génération d'images reste celle de [[ADR-005-Maquettes-Images-Codex]]. Les tests d'import ne prouvent ni qualité esthétique ni accessibilité : le workflow conserve la validation du rendu et des tâches sur la plateforme cible.
