---
title: Audit des skills de design et conception contextuelle
type: dev
status: review
created: 2026-09-10
updated: 2026-09-10
tags:
  - design
  - ux
  - research
  - skill-review
---

# Audit des skills de design et conception contextuelle

Suite de la revue : l'utilisateur a autorisé l'intégration des recommandations le 2026-09-10. L'état décrit ci-dessous est celui observé avant modification ; voir [[FEAT-006-Design-Contextuel]] pour l'évolution implémentée.

## Conclusion

La suite organise correctement la production et la vérification d'une interface, mais guide insuffisamment la sélection d'une direction propre au produit. Ajouter des adjectifs esthétiques ne suffira pas : il manque un passage explicite entre contexte documenté, choix de conception et critères d'évaluation.

Le défaut principal est une méthode de contextualisation sous-spécifiée. Le vocabulaire positif manque aussi. La couverture des plateformes natives reste partielle, malgré l'ambition multi-projets.

Cette revue livre des recommandations, pas une nouvelle politique approuvée. Aucun skill, template distribué ou cache installé n'a été modifié. Aucun benchmark visuel n'a été exécuté : les mécanismes identifiés peuvent favoriser l'uniformité, mais cet audit ne prouve pas leur contribution causale aux résultats de toutes les applications.

## Périmètre et preuves

- Lecture intégrale des 13 skills `ux-*` à la racine ; comparaison par hash avec leurs 13 copies Codex : identiques.
- Lecture du contrat `clai/templates/codex/ux-designops/root/DESIGN.md`, des templates produit et interaction, du prompt de génération, du template d'audit, du scanner et des tests `clai/test/design-workflow.test.js`.
- Contrôle des points d'intégration UX de specification, research, planning et orchestration.
- Références projet : FEAT-003 Findings, FEAT-004 Findings finaux, ADR-003, FEAT-005, guide de maintenance dual-target. Aucun schéma de données n'est impacté. Aucun CDC applicable à cette nouvelle revue n'a été identifié dans le dossier de spécifications.
- Relecture des premiers échanges de la tâche [Design](codex://threads/01a07bdd-312b-7080-8a84-9ece29df808a), dont la recherche initiale et le retour d'audit GOUDA. Les captures et l'application GOUDA n'ont pas été réauditées ici ; ses résultats restent des constats rapportés par cette tâche.
- Recherche externe complémentaire sur les sources primaires citées ci-dessous, consultées le 2026-09-10.

## Ce que la première recherche apporte

Conserver le vocabulaire de direction artistique, les instructions observables et les exclusions ciblées. La combinaison « une direction dominante, une influence secondaire et quelques caractéristiques » est une aide à la rédaction, pas une règle universelle.

La direction Swiss editorial / precision enterprise répondait à GOUDA. Elle ne doit pas devenir le style de WorkflowSkills. Le retour de cette même tâche est instructif : une identité typographique plus forte n'avait pas résolu la sélection de membres, les formulaires répétitifs et les composants manquants. Ces problèmes demandent une conception des interactions et du contenu.

## Recherche complémentaire : apports et limites

| Source | Apport | Limite d'application |
|---|---|---|
| [Anthropic : frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills) | Des consignes précises sur plusieurs axes visuels peuvent orienter les sorties ; un nouveau choix récurrent peut remplacer le précédent. | Démonstrations Claude, pas une garantie Codex ni une étude multi-plateformes. Les exemples interdisant les fontes système ou favorisant les effets de fond ne sont pas des règles générales à importer. |
| [Government Design Principles](https://www.gov.uk/guidance/government-design-principles) | Partir des besoins, comprendre les conditions d'usage, tester et faire évoluer les solutions. | Adopter la méthode ne signifie pas copier l'identité GOV.UK. |
| [Android : Adapt layouts](https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout?hl=en) | Adapter la présentation, les panneaux et la navigation à l'espace, aux entrées et aux appareils. | Une capture web étroite ne couvre pas un comportement Android. |
| [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines?lang=en) | Respecter les conventions des plateformes et la hiérarchie du contenu. | Les matériaux et commandes Apple ne constituent pas un thème universel. |
| [Carbon : Data table](https://carbondesignsystem.com/components/data-table/usage/) | Les tableaux relient densité, recherche, sélection, expansion et actions. | Source de critères fonctionnels ; pas une obligation d'utiliser Carbon. |
| [NN/g : Information scent](https://www.nngroup.com/articles/information-scent/) | Les indices et libellés aident à anticiper ce qu'une destination contient. | La navigation ne se juge pas uniquement sur sa propreté graphique. |
| [W3C : Combobox APG](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | Un composant de sélection exige un contrat d'interaction et de focus. | Une combobox personnalisée n'est pas systématiquement préférable à un contrôle natif ; APG concerne le web. |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Critères vérifiables de contraste, reflow, focus, cibles et interaction. | Un jugement sur une image générée ne constitue pas une validation de conformité. |

La proposition de méthode ci-dessous est une synthèse de cette revue, pas une norme publiée par ces sources.

## Constats prioritaires

### D01 — P1 : le contexte est nommé mais pas suffisamment structuré

**Preuve :** `Product_Context.md:14` contient une seule phrase à compléter. `ux-bootstrap` demande de créer les documents sans préciser quand le contexte est suffisamment établi. `ux-mockup-brief/SKILL.md:14` couvre tâche, hiérarchie, densité et tokens, mais pas explicitement expertise, fréquence, conditions d'usage, identité ou mesure de réussite.

**Conséquence probable :** remplir les blancs avec une interface familière au modèle, même si les artefacts documentaires existent.

**Correction :** demander un profil compact avec faits sourcés, inconnues et hypothèses : surface, plateforme, utilisateurs, tâche, fréquence, contenu, conditions d'usage, marque, contraintes et résultat attendu. Réutiliser la documentation disponible ; ne questionner que les inconnues qui changent réellement la conception.

### D02 — P1 : le lexique est essentiellement négatif

**Preuve :** `Anti_Slop_Vocabulary.md:14` introduit sept exclusions. Aucun glossaire de composition, typographie, interaction ou identité ne suit. `ux-audit` et `ux-visual-verification` demandent de contrôler l'anti-slop sans définition observable.

**Conséquence probable :** retirer les dégradés et cartes, puis produire partout la même sobriété. Absence d'effets ne signifie ni identité ni efficacité.

**Correction :** utiliser le lexique compagnon. Chaque terme retenu doit désigner une décision visible, une raison produit et une limite. Les interdictions de faible contraste ou de fausses données doivent être distinguées des préférences esthétiques conditionnelles.

### D03 — P1 : la direction artistique n'a pas de livrable explicite

**Preuve :** `ux-mockup-brief` énumère les dimensions visuelles ; `ux-mockup-generate` permet des variantes, mais ne définit pas une comparaison fondée sur le produit ni la diversité substantielle des directions.

**Correction :** ajouter une fiche de direction : contexte → intention → composition → typographie → images → interactions → raisons → critères. Pour une création ou refonte ouverte, explorer deux ou trois options réellement distinctes si utile. Une retouche locale conserve la direction retenue. Choisir des références annotées pour leurs propriétés ; ne pas recopier leur structure entière ni leurs données.

### D04 — P1 : le natif est insuffisamment explicite

**Preuve :** `ux-visual-verification/SKILL.md:34` commence par deux viewports ; les outils listés sont orientés navigateur. `ux-component-spec` cite ARIA ; `ux-polish` cite CSS/Tailwind. Le scanner détecte des dépendances web et des extensions TSX/JSX/Vue/Svelte, sans inventaire Kotlin, Swift ou Dart.

**Correction :** établir une matrice plateforme × surface × entrée. Web : navigateur, clavier, zoom et lecteur d'écran selon les tests. Natif : émulateur/simulateur ou appareil, commandes système, clavier logiciel, agrandissement du texte et technologies d'assistance correspondantes. Vérifier selon le besoin retour Android, safe areas, rotation, restauration d'état et interruptions. Respecter le choix d'outillage déjà présent. Une cible web d'un projet multiplateforme ne valide que cette cible.

### D05 — P1 : synchroniser le code peut entériner un écart

**Preuve :** `ux-design-sync/SKILL.md:15` affirme que le code fait autorité et que la documentation le reflète. Cela entre en tension avec la hiérarchie CDC/DB/Meetings/ADR/FEAT du projet. `ux-code-to-mockup` distingue déjà comportement actuel et comportement attendu.

**Correction :** le code prouve l'état implémenté ; les sources métier définissent l'état attendu. Documenter un écart et sa justification, puis corriger ou enregistrer la décision autorisée. Ne pas réécrire une exigence pour faire disparaître un défaut.

### D06 — P2 : certaines règles de présentation sont trop générales

**Preuve :** `DESIGN.md:21` assimile notamment les cartes aux modales ; ligne 34, la mise à l'échelle typographique liée au viewport est rejetée globalement.

**Correction :** distinguer carte de contenu, panneau, section et dialogue. Prévenir la typographie exclusivement dépendante du viewport qui gêne le zoom ; autoriser une typographie fluide bornée si le rendu et l'agrandissement sont vérifiés. Ne pas interdire une police système, un dégradé ou une forte expressivité sans considérer la plateforme et la marque.

### D07 — P2 : la bibliothèque guide les états plus que le choix du composant

**Preuve :** `ux-component-spec` documente les entrées, états et tokens, mais ne demande pas explicitement de justifier le choix entre liste, recherche, tableau, sélecteur, vue détail ou formulaire progressif.

**Correction :** préciser volume, recherche nécessaire, comparaison, sélection simple/multiple, fréquence, expertise et coût d'erreur. Une liste de quatre options peut garder un contrôle simple ; une sélection dans un grand annuaire peut nécessiter recherche, sélection persistante et récapitulatif. Pas de seuil universel arbitraire.

### D08 — P2 : correction du rendu et efficacité restent mélangées

**Preuve :** la vérification liste débordements, états, contraste et comparaison avec la maquette ; elle n'impose pas de résultat de tâche observable. Les tests CLI contrôlent l'installation, les migrations et la préservation des fichiers, pas la qualité des designs.

**Correction :** séparer fidélité à la direction, exactitude des interactions, accessibilité et réussite des tâches. Mesurer selon le projet : tâche accomplie, erreurs, temps, compréhension, retour utilisateur. Ne pas annoncer de gain sans comparaison. L'absence de chevauchement est nécessaire mais ne prouve pas l'utilité.

### D09 — P2 : le scanner peut donner un inventaire incomplet

**Preuve :** `uxkit-lite.mjs:26` et `:67` plafonnent le parcours à 250 fichiers avant classification. Il n'expose pas explicitement la troncature dans son rapport. `:68-69` filtre les composants/routes sur quelques extensions web.

**Correction :** afficher portée, exclusions et troncature ; reconnaître les projets natifs ou annoncer la non-couverture. Ne jamais interpréter « non détecté » comme « inexistant ». Le scanner doit rester un assistant d'inventaire, pas une évaluation de design.

## Revue des 13 skills

| Skill | Base à conserver | Évolution recommandée |
|---|---|---|
| ux-bootstrap | Mémoire projet et contrat portable | Profil contextuel rempli avec preuves ; distinguer template vide et contexte exploitable. |
| ux-audit | Audit avant code, priorité par impact | Critères de pertinence produit ; preuve, scénario, conséquence et recommandation pour chaque constat. |
| ux-flow | Parcours alternatifs et récupération | Modèle mental, fréquence, continuité multi-appareils et interruptions selon contexte. |
| ux-component-spec | États, focus, tokens | Comparer les composants possibles selon tâche et données ; conventions natives. |
| ux-mockup-brief | Labels exacts, contraintes, états | Direction artistique justifiée, références annotées et vocabulaire positif observable. |
| ux-mockup-generate | Image réelle, inspection, historique | Comparer les variantes sur la même tâche et le même contenu ; diversité de composition, pas seulement de palette. |
| ux-mockup-iterate | Modifications ciblées, invariants | Quand le problème est structurel, revenir au brief plutôt que polir indéfiniment. |
| ux-code-to-mockup | Code et captures réelles | Distinguer contraintes approuvées et habitudes héritées ; documenter ce que la refonte peut remettre en cause. |
| ux-implement-from-mockup | Composants réels, métier préservé | Traduire les intentions dans la plateforme ; résoudre les états omis avec les specs. |
| ux-polish | Petites corrections et rendu vérifié | Annoncer quand le problème dépasse le polish ; ne pas imposer la stack web. |
| ux-visual-verification | Rendu obligatoire | Matrice de plateformes, parcours et technologies d'assistance ; critères anti-slop définis. |
| ux-storybook | Catalogue optionnel d'états | Conserver son rôle spécialisé ; accepter le catalogue natif existant dans le workflow général. |
| ux-design-sync | Traçabilité maquette/code/doc | Séparer état réel, intention approuvée et dette ; ne pas normaliser un écart. |

## Méthode cible proposée

1. **Qualifier la demande.** Création, refonte, fonctionnalité, audit ou polish ; plateforme(s) réellement concernée(s).
2. **Établir le contexte.** Récupérer les faits ; poser seulement les questions déterminantes encore ouvertes.
3. **Concevoir l'usage.** Tâche, contenu, navigation, composants et états ; identifier les critères de réussite.
4. **Définir la direction.** Choix artistiques et références justifiés ; marge d'expression adaptée à chaque surface.
5. **Explorer si nécessaire.** Maquettes réelles via le workflow image existant ; même contenu pour comparer les directions. Ne pas imposer une exploration pour chaque correction.
6. **Implémenter et vérifier.** Rendu sur la plateforme cible, parcours, accessibilité et fidélité aux décisions.
7. **Capitaliser.** Décisions et raisons dans le projet ; préférences visuelles d'un client non transférées automatiquement aux autres.

Le socle partagé contient la méthode et les exigences de qualité. Le profil de plateforme contient les conventions d'interaction. Le projet conserve son identité. Une même application peut avoir une vitrine expressive et un espace de travail dense, avec des liens de marque cohérents.

## Ordre de correction proposé

| Lot | Cibles | Critère d'acceptation |
|---|---|---|
| 1 — Contexte et vocabulaire | bootstrap, brief, templates Product_Context / Anti_Slop_Vocabulary / DESIGN | Chaque choix principal renvoie à un besoin, contenu ou élément de marque ; aucun style par défaut. |
| 2 — Direction et routage | brief, generate, research, planner, workflow | Création/refonte et polish suivent des parcours proportionnés ; une UI sans maquette n'est pas automatiquement traitée comme du polish. |
| 3 — Plateformes et composants | flow, component-spec, polish, visual-verification, scanner | Android natif ne peut être déclaré vérifié sur la seule base d'un viewport web. |
| 4 — Preuves et synchronisation | audit, design-sync, templates d'audit | Un écart au CDC reste visible jusqu'à résolution ; qualité visuelle et réussite des tâches sont distinctes. |
| 5 — Distribution et évaluation | copies plugin, templates clai, tests et documentation | Parité source/plugin ; initialisation et synchronisation préservent les identités existantes ; évaluation multi-projets documentée. |

Préférer d'abord des références partagées et de meilleurs contrats dans les skills existants. Un nouveau skill de direction artistique n'est utile que si son déclenchement autonome apporte une valeur claire ; multiplier les skills n'est pas en soi une correction.

## Évaluation à exécuter avant d'affirmer un progrès

Comparer version actuelle et version révisée sur un petit corpus : outil métier dense, commerce, site culturel/editorial, service grand public, application Android de terrain, application mobile de contenu. Fixer modèle, effort, brief, contenu et budget comparables ; conserver prompts et versions. Faire plusieurs essais pour tenir compte de la variabilité.

Examiner en aveugle, si possible : pertinence à la tâche, cohérence de marque, qualité de composition, choix des composants, conventions de plateforme, accessibilité et réussite des parcours. Les évaluateurs donnent des exemples observables plutôt qu'une note globale de « beauté ». Une différence de palette ne suffit pas à démontrer une diversité ; deux produits peuvent légitimement partager des composants standards.

Pour chaque cas, distinguer revue experte, tests automatisés et retours de vrais utilisateurs. Ne pas présenter des personas simulés comme de la recherche utilisateur. Aucun résultat de cette évaluation n'est revendiqué aujourd'hui.

## Liens

- [[DEV-Lexique-Design-Contextuel]]
- [[FEAT-003-Findings]]
- [[FEAT-005-Maquettes-Images-Codex]]
- [[ADR-003-Structure-UX-DesignOps]]
- [[DEV-Maintenance-templates-et-skills-dual-target]]
