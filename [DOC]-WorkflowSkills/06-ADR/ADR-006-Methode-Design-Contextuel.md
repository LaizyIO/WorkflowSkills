---
title: ADR-006 Méthode de design contextuel et migration additive
type: adr
status: approved
created: 2026-09-10
updated: 2026-09-10
tags:
  - design
  - architecture
  - clai
---

# ADR-006 — Méthode de design contextuel

## Décision

Conserver les 13 skills UX, enrichir leurs contrats et charger les références détaillées seulement lorsque nécessaires. La méthode commune n'impose ni style, ni palette, ni fonte. Le projet documente ses choix dans Product_Context, Design_Direction et Platform_Profile. Le lexique fournit des décisions observables, pas une liste d'incantations.

Le workflow distingue audit, polish, création, refonte et implémentation selon spécification sans maquette. Le rendu est obligatoire pour une modification UI, avec outil correspondant à la cible : navigateur pour le web, appareil ou environnement natif pour le natif. Cette précision complète [[ADR-003-Structure-UX-DesignOps]] sans diminuer l'exigence de rendu réel.

La CLI conserve les documents existants. Une section de méthode identifiée par marqueurs peut être actualisée ; les décisions projet restent hors de cette section. Les supports manquants sont ajoutés. Le scanner antérieur est remplacé seulement s'il correspond à une empreinte connue ; une version personnalisée est préservée.

## Conséquences

Les projets existants reçoivent une méthode à appliquer progressivement, pas une nouvelle identité ni un remplissage artificiel des décisions. Les copies plugin incluent les références. La validation documentaire et CLI ne remplace pas une évaluation sur des designs réels.

## Alternatives

- Nouveau skill obligatoire de direction artistique : écarté pour éviter une étape supplémentaire sur les petites demandes.
- Style universel anti-slop : écarté, il recréerait l'uniformité.
- Remplacement global des templates existants : écarté, il effacerait la mémoire produit.

## Liens

- [[FEAT-006-Design-Contextuel]]
- [[DEV-Audit-Skills-Design-Contextuel]]
