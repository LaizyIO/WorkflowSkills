# Challenge Checklist by Stage

Checklist complète pour challenger chaque type de deliverable.

---

## CDC.md (Cahier Des Charges)

### Contexte et Problématique
- [ ] Le problème est-il clairement défini ?
- [ ] Le contexte actuel est-il décrit ?
- [ ] L'origine de la demande est-elle documentée ?
- [ ] Le "pourquoi" est-il explicite ?

### Objectifs
- [ ] Les objectifs sont-ils mesurables ?
- [ ] Les KPIs sont-ils définis ?
- [ ] Les critères de succès sont-ils vérifiables ?
- [ ] Y a-t-il des objectifs contradictoires ?

### Périmètre
- [ ] Le scope "In" est-il explicite ?
- [ ] Le scope "Out" est-il explicite ?
- [ ] Les limites sont-elles claires ?
- [ ] Le scope est-il réaliste ?

### Exigences Fonctionnelles
- [ ] Chaque exigence a-t-elle des critères d'acceptation ?
- [ ] Les priorités sont-elles définies ?
- [ ] Les acteurs sont-ils identifiés ?
- [ ] Les cas d'erreur sont-ils couverts ?
- [ ] Les edge cases sont-ils adressés ?

### Exigences Non-Fonctionnelles
- [ ] Performance spécifiée (temps de réponse, charge) ?
- [ ] Sécurité spécifiée (auth, données sensibles) ?
- [ ] Accessibilité mentionnée ?
- [ ] Compatibilité définie (navigateurs, devices) ?

### Contraintes et Prérequis
- [ ] Contraintes techniques identifiées ?
- [ ] Contraintes métier identifiées ?
- [ ] Prérequis listés avec statut ?
- [ ] Dépendances externes identifiées ?

### Utilisateurs
- [ ] Personas définis ?
- [ ] Niveaux techniques identifiés ?
- [ ] Workflows actuels compris ?

### Scénarios d'Usage
- [ ] Cas nominal décrit ?
- [ ] Cas alternatifs décrits ?
- [ ] Cas d'erreur décrits ?
- [ ] Préconditions et postconditions claires ?

### Risques
- [ ] Risques identifiés ?
- [ ] Impact et probabilité évalués ?
- [ ] Mitigations proposées ?

### Cohérence
- [ ] Aligné avec l'architecture existante ?
- [ ] Terminologie cohérente avec le projet ?
- [ ] Pas de contradiction interne ?
- [ ] Fonctionnalités existantes prises en compte ?

---

## findings.md (Recherche)

### Analyse du Besoin
- [ ] Tous les requirements du CDC sont-ils adressés ?
- [ ] Les contraintes sont-elles respectées ?
- [ ] Le scope est-il respecté ?

### Approche Choisie
- [ ] Le choix est-il justifié ?
- [ ] Les alternatives ont-elles été considérées ?
- [ ] Les trade-offs sont-ils explicites ?
- [ ] L'approche est-elle réaliste ?

### Recherche Technique
- [ ] Documentation consultée citée ?
- [ ] Patterns de design identifiés ?
- [ ] Best practices mentionnées ?
- [ ] Limites techniques découvertes ?

### Points d'Intégration
- [ ] Composants existants identifiés ?
- [ ] Modifications nécessaires listées ?
- [ ] Nouveaux composants définis ?
- [ ] Flux de données compris ?

### POC (si réalisé)
- [ ] POC représentatif du problème ?
- [ ] Résultats documentés ?
- [ ] Leçons apprises capturées ?
- [ ] Recommandations claires ?

### Dépendances
- [ ] Dépendances externes listées ?
- [ ] Versions spécifiées ?
- [ ] Compatibilité vérifiée ?
- [ ] Licences acceptables ?

### Risques Techniques
- [ ] Risques techniques identifiés ?
- [ ] Performance anticipée ?
- [ ] Scalabilité considérée ?
- [ ] Sécurité évaluée ?

### Cohérence
- [ ] Aligné avec le CDC ?
- [ ] Aligné avec l'architecture projet ?
- [ ] Aligné avec les conventions du codebase ?
- [ ] Pas de contradiction avec la doc projet ?

---

## Plan.md (Plan d'Implémentation)

### Structure
- [ ] Phases clairement définies ?
- [ ] Étapes avec granularité appropriée (2-4h) ?
- [ ] Checkboxes pour le suivi ?
- [ ] Progress tracker présent ?

### Couverture
- [ ] Tous les requirements du CDC couverts ?
- [ ] Toutes les recommandations des findings intégrées ?
- [ ] Tests inclus ?
- [ ] Documentation incluse ?

### Dépendances
- [ ] Dépendances entre étapes explicites ?
- [ ] Ordre logique respecté ?
- [ ] Parallélisation identifiée ?
- [ ] Bloqueurs potentiels identifiés ?

### Clarté des Étapes
- [ ] Chaque étape est-elle actionnable ?
- [ ] Localisation des fichiers indiquée ?
- [ ] Détails suffisants sans sur-spécifier ?
- [ ] Critères de validation par phase ?

### Réalisme
- [ ] Scope réaliste ?
- [ ] Pas d'étapes manquantes évidentes ?
- [ ] Complexité correctement estimée ?
- [ ] Ressources disponibles ?

### Cohérence
- [ ] Aligné avec findings.md ?
- [ ] Aligné avec CDC.md ?
- [ ] Terminologie cohérente ?
- [ ] Pas de contradiction interne ?

---

## test-plan.md (Plan de Tests)

### Couverture
- [ ] Tous les requirements testés ?
- [ ] Cas nominaux couverts ?
- [ ] Cas d'erreur couverts ?
- [ ] Edge cases couverts ?

### Types de Tests
- [ ] E2E pour les workflows critiques ?
- [ ] API tests pour les endpoints ?
- [ ] Unit tests pour la logique complexe ?
- [ ] Integration tests pour les dépendances ?
- [ ] Performance tests si requis ?

### Non-Redondance
- [ ] Pas de duplication entre niveaux de tests ?
- [ ] Chaque test apporte de la valeur unique ?
- [ ] Priorités correctement assignées ?

### Praticabilité
- [ ] Tests exécutables ?
- [ ] Données de test définies ?
- [ ] Environnement de test clair ?
- [ ] Critères de succès mesurables ?

### Cohérence
- [ ] Aligné avec CDC (critères d'acceptation) ?
- [ ] Aligné avec Plan.md (scope) ?
- [ ] Couvre les risques identifiés ?

---

## Vérifications Transversales

### Cohérence Inter-Documents
- [ ] CDC → Findings : Tous les requirements adressés
- [ ] Findings → Plan : Toutes les recommandations intégrées
- [ ] CDC → Plan : Scope cohérent
- [ ] CDC → Test Plan : Critères d'acceptation testés
- [ ] Plan → Test Plan : Fonctionnalités implémentées testées

### Cohérence avec le Codebase
- [ ] Patterns existants respectés ?
- [ ] Conventions de nommage suivies ?
- [ ] Architecture existante respectée ?
- [ ] Composants existants réutilisés quand pertinent ?

### Cohérence avec la Documentation Projet
- [ ] Architecture documentée respectée ?
- [ ] Contraintes documentées respectées ?
- [ ] Décisions passées considérées ?
- [ ] Terminologie cohérente ?

---

## Red Flags (Signaux d'Alerte)

### Dans les Documents
- "TBD", "TODO", "À définir" non résolus
- Sections vides ou placeholder
- Langage vague ("peut-être", "probablement", "si possible")
- Scope très large sans priorisation
- Pas de critères d'acceptation

### Dans l'Analyse
- Fonctionnalité existante ignorée
- Dépendances non mentionnées
- Risques évidents non listés
- Complexité sous-estimée
- Contraintes projet ignorées

### Dans la Cohérence
- Terminologie incohérente entre documents
- Scope qui change entre documents
- Décisions contradictoires
- Références à des éléments inexistants
