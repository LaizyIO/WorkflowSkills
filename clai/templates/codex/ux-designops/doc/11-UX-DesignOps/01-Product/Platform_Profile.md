---
title: Profil des plateformes
type: ux-guidelines
status: draft
created: {{DATE}}
updated: {{DATE}}
tags:
  - ux
  - platform
---

# Profil des plateformes

Documenter uniquement les cibles du projet, sans inventer de support supplémentaire.

| Plateforme / runtime | Appareils / fenêtres | Entrées | Conventions et états requis | Outil de rendu / preuve |
|---|---|---|---|---|

## Adaptations

Selon le contexte : organisation des panneaux, navigation, densité, toucher/clavier/pointeur, texte agrandi, clavier logiciel, zones système, retour, rotation, interruptions et récupération réseau. Les conventions du système et l'identité du projet peuvent coexister.

## Vérification

Web : rendu navigateur et parcours réels. Natif : appareil, émulateur/simulateur ou runner natif ; une preview de layout ne prouve pas les interactions système. Une cible web d'un framework multiplateforme ne valide pas les autres runtimes. Nommer les preuves absentes ou bloquées.

- [[Product_Context]]
- [[Design_Direction]]
- [[Responsive_Adaptive_Rules]]
