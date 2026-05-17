# Techniques de Force de Proposition

Ce guide décrit comment être proactif et force de proposition lors de la spécification.

## Principe Fondamental

Ne pas être passif (seulement poser des questions) mais actif (proposer des solutions basées sur l'analyse du contexte).

---

## 1. Proposer des Simplifications

### Quand l'Utiliser
- La demande semble complexe pour le bénéfice attendu
- Une version minimale pourrait valider le concept
- Le scope risque de dériver

### Formulation Type
```
"Plutôt qu'un système complet de [X], je propose de commencer par [Y] uniquement.
Cela permettrait de [bénéfice] avant d'investir dans [complexité]."
```

### Exemples

**Notifications multi-canaux:**
> "Plutôt qu'un système complet de notifications (email + push + SMS + in-app), je propose de commencer par les emails uniquement. Cela valide le concept et les templates avant d'ajouter les autres canaux."

**Dashboard complexe:**
> "Plutôt qu'un dashboard avec 15 widgets configurables, je propose 5 widgets fixes pour le MVP. On pourra ajouter la personnalisation en v2 selon les retours utilisateurs."

**Workflow multi-étapes:**
> "Ce workflow à 8 étapes pourrait être simplifié en 3 étapes pour la première version. Les étapes intermédiaires peuvent être automatisées ou groupées."

---

## 2. Suggérer des Alternatives Basées sur le Contexte

### Quand l'Utiliser
- L'analyse du projet révèle des outils/patterns déjà disponibles
- Une approche différente serait plus adaptée à l'architecture
- Il existe des solutions existantes réutilisables

### Formulation Type
```
"J'ai remarqué que [observation du projet]. Au lieu de [approche demandée],
je suggère [alternative] qui [avantage]."
```

### Exemples

**Queue/Background jobs:**
> "J'ai remarqué que Hangfire est déjà configuré dans le projet. Pour le traitement asynchrone des emails, je suggère d'utiliser Hangfire plutôt que de créer un nouveau système de queue."

**Composants UI:**
> "Le projet utilise déjà un composant `DataTable` dans `src/components/`. Je suggère de l'étendre plutôt que de créer un nouveau composant de grille."

**Authentification:**
> "L'API utilise déjà JWT avec refresh tokens. Pour cette nouvelle fonctionnalité, je suggère d'utiliser le même mécanisme plutôt qu'une session séparée."

---

## 3. Identifier des Quick Wins

### Quand l'Utiliser
- Du code existant peut être réutilisé
- Une petite modification donne un grand bénéfice
- Un sous-ensemble peut être livré rapidement

### Formulation Type
```
"On pourrait réutiliser [élément existant] pour [bénéfice].
Cela permettrait de livrer [fonctionnalité] rapidement."
```

### Exemples

**Réutilisation de templates:**
> "Le template d'email de confirmation de commande peut être réutilisé pour la notification d'expédition. Seuls le titre et le contenu changent."

**Extension de fonctionnalité:**
> "L'export PDF des factures existe déjà. En ajoutant 3 champs, on peut également exporter les devis avec le même composant."

**Configuration existante:**
> "Le système de feature flags est déjà en place. On peut l'utiliser pour déployer progressivement cette nouvelle fonctionnalité."

---

## 4. Anticiper les Problèmes

### Quand l'Utiliser
- L'architecture actuelle pose des limites
- La demande a des implications non évidentes
- Des problèmes classiques sont prévisibles

### Formulation Type
```
"Attention: [observation]. Si on [approche actuelle], on risque [problème].
Je recommande [solution préventive]."
```

### Exemples

**Scalabilité:**
> "Attention: le stockage local des fichiers ne fonctionnera pas avec plusieurs instances serveur. Je recommande d'utiliser Azure Blob Storage dès le départ."

**Performance:**
> "Cette requête sur la table `orders` avec 2M de lignes sera lente sans index. Je recommande d'ajouter un index sur `created_at` et `status`."

**Sécurité:**
> "Stocker le numéro de carte en base de données pose des problèmes PCI-DSS. Je recommande d'utiliser Stripe Tokens à la place."

**Concurrence:**
> "Si deux utilisateurs modifient le même document simultanément, le dernier écrasera les changements du premier. Je recommande d'implémenter un verrouillage optimiste."

---

## 5. Recommander des Bonnes Pratiques

### Quand l'Utiliser
- Une approche standard existe pour ce type de problème
- Le projet pourrait bénéficier d'un pattern établi
- Une dette technique peut être évitée

### Formulation Type
```
"Pour ce type de [situation], la bonne pratique est [recommandation].
Cela permet [bénéfice à long terme]."
```

### Exemples

**Validation:**
> "Pour la validation des formulaires, je recommande de valider côté client ET côté serveur. Cela améliore l'UX tout en garantissant la sécurité."

**Logging:**
> "Pour le debugging en production, je recommande d'ajouter des logs structurés avec correlation ID. Cela facilitera le diagnostic des problèmes."

**Tests:**
> "Pour cette logique métier critique, je recommande des tests unitaires exhaustifs. Cela évitera des régressions lors des futures modifications."

**API Design:**
> "Pour cette API REST, je recommande de suivre les conventions HTTP (201 pour création, 204 pour suppression sans contenu). Cela rend l'API plus intuitive."

---

## 6. Proposer des Options avec Trade-offs

### Quand l'Utiliser
- Plusieurs approches sont valides
- L'utilisateur doit faire un choix éclairé
- Les compromis ne sont pas évidents

### Formulation Type
```
"Pour [besoin], deux options sont possibles:

Option A: [description]
- Avantage: [pro]
- Inconvénient: [con]

Option B: [description]
- Avantage: [pro]
- Inconvénient: [con]

Je recommande [option] car [justification basée sur le contexte]."
```

### Exemples

**Synchrone vs Asynchrone:**
> "Pour l'envoi d'emails:
> - Option A: Synchrone - Plus simple, mais l'utilisateur attend
> - Option B: Queue asynchrone - Plus complexe, mais meilleure UX
>
> Je recommande l'option B car le volume prévu (1000 emails/jour) justifie la complexité."

**SQL vs NoSQL:**
> "Pour stocker les logs d'activité:
> - Option A: PostgreSQL - Cohérent avec le reste, mais volume important
> - Option B: MongoDB - Optimisé pour ce cas, mais nouvelle techno
>
> Je recommande l'option A pour garder la stack simple, avec partitionnement par date."

---

## Erreurs à Éviter

1. **Proposer sans contexte** - Toujours baser les propositions sur l'analyse du projet
2. **Imposer au lieu de suggérer** - Formuler comme des suggestions, pas des ordres
3. **Ignorer les contraintes utilisateur** - Respecter le budget, temps, compétences
4. **Sur-ingénierie** - Ne pas proposer des solutions complexes pour des problèmes simples
5. **Oublier le "pourquoi"** - Toujours expliquer le bénéfice de la proposition

---

## Checklist Force de Proposition

Avant de soumettre une spécification, vérifier:

- [ ] Ai-je proposé au moins une simplification possible ?
- [ ] Ai-je identifié des éléments réutilisables dans le projet ?
- [ ] Ai-je anticipé des problèmes potentiels ?
- [ ] Ai-je recommandé des bonnes pratiques pertinentes ?
- [ ] Mes propositions sont-elles justifiées par le contexte ?
- [ ] Ai-je présenté des options quand plusieurs approches sont valides ?
