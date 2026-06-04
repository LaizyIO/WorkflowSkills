---
title: FEAT-003 UX Design Skills - Findings
type: research
status: completed
created: 2026-06-04
updated: 2026-06-04
feature: FEAT-003
tags:
  - feature-workflow
  - research
  - ux
  - design
  - codex
---

# FEAT-003 - UX Design Skills - Findings

## Overview

Objectif: créer un skill Codex réutilisable pour améliorer une UI de manière professionnelle, sans dépendre d'un prompt vague comme "rends ça moderne".

Le premier skill recommandé est `ux-refactor`: un workflow unique capable de faire audit-only ou refactor selon la demande.

## Requirements

- Déclenchement explicite possible avec `$ux-refactor`.
- Compatible avec Workflow Skills et le marketplace Codex.
- Orienté product design + frontend engineering.
- Préserve la logique métier.
- Inspecte le design system existant avant modification.
- Couvre hiérarchie, spacing, typographie, états, responsive, accessibilité.
- Produit un résultat vérifiable, pas seulement esthétique.

## Research Summary

Les sources professionnelles convergent sur quatre piliers:

- Heuristiques UX: feedback système, langage utilisateur, prévention/récupération d'erreur, reconnaissance plutôt que mémorisation, design esthétique et minimaliste.
- Accessibilité: WCAG 2.2 ajoute notamment focus non masqué, apparence du focus, taille minimale des cibles, réduction des saisies redondantes et authentification accessible.
- Design systems: les tokens doivent relier décisions design et code via primitives, tokens sémantiques et tokens composant.
- IA/prompt engineering: il faut des prompts clairs, spécifiques, contextualisés et itératifs; les modèles de raisonnement répondent mieux à des instructions directes qu'à des incantations longues.

## Design Decisions

### Chosen Approach

Créer `ux-refactor` comme skill principal polyvalent:

- mode audit si l'utilisateur demande de ne pas modifier;
- mode refactor si l'utilisateur demande une amélioration UI;
- inspection obligatoire du code et du design system;
- checklist de qualité avant finalisation.

### Alternatives Considered

- Deux skills séparés `ux-audit` et `ux-refactor`: intéressant plus tard, mais plus lourd à installer et à maintenir pour le premier jet.
- Règles uniquement dans `AGENTS.md`: utile mais insuffisant, car il manque un workflow déclenchable et spécialisé.
- Prompt court uniquement: trop fragile; ne force pas l'inspection, la vérification ni l'intégration au design system.

## Integration Points

- Racine repo: `ux-refactor/SKILL.md`.
- Marketplace Codex: copier le skill dans `plugins/codex/workflow-skills/skills/ux-refactor`.
- Workflow suite: utiliser après `feature-research`, pendant `implementation-planner`, pendant `feature-implementer`, et avant `test-plan-generator`.

## References

- Nielsen Norman Group, 10 Usability Heuristics: https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1_A4_compressed.pdf
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Figma Design Tokens: https://www.figma.com/resource-library/design-tokens/
- shadcn/ui Introduction: https://v3.shadcn.com/docs
- OpenAI Prompt Engineering Best Practices: https://help.openai.com/en/articles/10032626-prompt-engineering-best--practices-for-chatgpt
- OpenAI Reasoning Best Practices: https://developers.openai.com/api/docs/guides/reasoning-best-practices

## Next Steps

- Tester le skill sur une vraie page Next.js/Tailwind/shadcn.
- Ajouter ensuite un skill `ux-audit` séparé si l'usage audit-only devient fréquent.
- Ajouter éventuellement un skill `design-system-maintainer` pour tokens, composants et documentation design system.
