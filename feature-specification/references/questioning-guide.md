# Guide de Questionnement

Ce guide fournit des questions types par catégorie pour clarifier les spécifications.

## Principes de Questionnement

1. **Progressivité** - Commencer par le contexte, puis affiner
2. **Concision** - 2-4 questions à la fois, pas de listes écrasantes
3. **Contextualisation** - Adapter les questions au projet découvert
4. **Validation** - Confirmer la compréhension avant d'avancer
5. **Proactivité** - Proposer des options, pas juste interroger

---

## Catégorie 1: Contexte et Motivation

**Objectif:** Comprendre le POURQUOI de la demande.

### Questions Essentielles
- Quel problème cette feature/tâche résout-elle ?
- Quelle est l'origine de cette demande ?
- Qu'est-ce qui se passe si on ne fait rien ?
- Y a-t-il une urgence ou un événement déclencheur ?

### Questions d'Approfondissement
- Comment ce problème est-il géré aujourd'hui ?
- Quelle est la fréquence du problème ?
- Quel est l'impact business du problème ?
- Existe-t-il des solutions de contournement actuelles ?

### Signaux d'Alerte
- Réponses vagues → Creuser davantage
- "On a toujours voulu faire ça" → Questionner la priorité
- Absence de problème clair → Risque de feature inutile

---

## Catégorie 2: Utilisateurs et Personas

**Objectif:** Identifier QUI va utiliser et COMMENT.

### Questions Essentielles
- Qui utilisera cette fonctionnalité ?
- Quel est leur niveau technique ?
- À quelle fréquence l'utiliseront-ils ?

### Questions d'Approfondissement
- Quels sont leurs workflows actuels ?
- Quelles sont leurs frustrations principales ?
- Ont-ils accès à d'autres outils similaires ?
- Y a-t-il plusieurs types d'utilisateurs avec des besoins différents ?

### Adaptation Contextuelle
```
Si projet B2B interne:
"S'agit-il d'utilisateurs internes (employés) ou externes (clients/partenaires) ?"

Si projet B2C:
"Quel est le profil démographique type de l'utilisateur ?"

Si système admin:
"Quels rôles/permissions doivent avoir accès ?"
```

---

## Catégorie 3: Fonctionnalités Détaillées

**Objectif:** Définir précisément QUOI faire.

### Questions Essentielles
- Que doit pouvoir faire l'utilisateur exactement ?
- Quels sont les inputs attendus ?
- Quels sont les outputs/résultats attendus ?
- Comment savoir si l'action a réussi ?

### Questions d'Approfondissement
- Y a-t-il des étapes intermédiaires ?
- L'action est-elle réversible ?
- Faut-il une confirmation avant l'action ?
- Que voit l'utilisateur pendant le traitement ?

### Questions par Type de Feature

**CRUD (Création/Lecture/Modification/Suppression):**
- Quels champs sont obligatoires ?
- Y a-t-il des validations spécifiques ?
- Peut-on supprimer définitivement ou archiver ?
- Faut-il un historique des modifications ?

**Notification:**
- Quels événements déclenchent une notification ?
- Quels canaux (email, push, SMS, in-app) ?
- L'utilisateur peut-il configurer ses préférences ?
- Quelle est la fréquence acceptable ?

**Rapport/Export:**
- Quelles données inclure ?
- Quels formats de sortie (PDF, Excel, CSV) ?
- Peut-on filtrer/personnaliser ?
- Faut-il planifier des rapports automatiques ?

**Import:**
- Quels formats accepter ?
- Comment gérer les erreurs de format ?
- Faut-il un aperçu avant import ?
- Que faire des doublons ?

---

## Catégorie 4: Contraintes et Limites

**Objectif:** Identifier les LIMITES et CONTRAINTES.

### Questions Essentielles
- Y a-t-il des contraintes de performance (temps de réponse, volume) ?
- Y a-t-il des contraintes de sécurité ou compliance ?
- Y a-t-il des contraintes techniques imposées ?
- Y a-t-il des contraintes de budget ou temps ?

### Questions d'Approfondissement
- Doit-on supporter les anciens navigateurs ?
- Y a-t-il des exigences d'accessibilité (WCAG) ?
- Faut-il supporter le mode hors-ligne ?
- Y a-t-il des contraintes de langue/internationalisation ?

### Questions Réglementaires
- RGPD/données personnelles sont-elles concernées ?
- Y a-t-il des données sensibles (santé, finance) ?
- Faut-il des logs d'audit ?
- Y a-t-il des exigences de rétention de données ?

---

## Catégorie 5: Intégration et Dépendances

**Objectif:** Comprendre l'ÉCOSYSTÈME.

### Questions Essentielles
- Avec quels systèmes existants cette feature interagit-elle ?
- Y a-t-il des APIs externes à utiliser ?
- Quelles données existantes sont nécessaires ?
- Impact sur les fonctionnalités existantes ?

### Questions d'Approfondissement
- Comment les données circulent-elles ?
- Y a-t-il des dépendances sur d'autres équipes ?
- Faut-il des migrations de données ?
- Y a-t-il des systèmes legacy à considérer ?

### Adaptation au Projet Découvert
```
Si PostgreSQL détecté:
"Cette feature nécessitera-t-elle de nouvelles tables ? Des modifications de schéma ?"

Si microservices:
"Quel(s) service(s) seront impactés ? Faut-il créer un nouveau service ?"

Si API existante:
"Faut-il de nouveaux endpoints ? Modifier des endpoints existants ?"
```

---

## Catégorie 6: Priorités

**Objectif:** Établir l'ORDRE d'importance.

### Questions Essentielles
- Quelles fonctionnalités sont absolument essentielles (MVP) ?
- Quelles fonctionnalités peuvent attendre une v2 ?
- Y a-t-il un ordre logique d'implémentation ?

### Questions d'Approfondissement
- Si on ne peut livrer que 50%, que garde-t-on ?
- Quel est le "nice to have" vs "must have" ?
- Y a-t-il des dépendances entre fonctionnalités ?

### Technique MoSCoW
- **Must have:** Indispensable, bloque le lancement
- **Should have:** Important mais pas critique
- **Could have:** Souhaitable si le temps le permet
- **Won't have:** Explicitement exclu de cette version

---

## Catégorie 7: Critères de Succès

**Objectif:** Définir COMMENT mesurer le succès.

### Questions Essentielles
- Comment savoir si la feature est réussie ?
- Quels indicateurs (KPIs) suivre ?
- Quel est le seuil d'acceptation ?

### Questions d'Approfondissement
- Faut-il des tests A/B ?
- Comment collecter les métriques ?
- Quelle période d'observation ?
- Qui valide le succès ?

### Exemples de KPIs par Type
```
Feature utilisateur:
- Taux d'adoption
- Temps de complétion
- Taux d'erreur utilisateur
- Score de satisfaction

Feature technique:
- Temps de réponse
- Taux d'erreur système
- Disponibilité
- Consommation ressources
```

---

## Catégorie 8: Exceptions et Edge Cases

**Objectif:** Anticiper les CAS LIMITES.

### Questions Essentielles
- Que se passe-t-il si l'utilisateur entre des données invalides ?
- Que se passe-t-il si le système externe est indisponible ?
- Que se passe-t-il avec des volumes exceptionnels ?
- Que se passe-t-il en cas de conflit (accès concurrent) ?

### Questions d'Approfondissement
- Comment gérer les timeouts ?
- Faut-il une logique de retry ?
- Comment informer l'utilisateur des erreurs ?
- Faut-il un mode dégradé ?

### Checklist Edge Cases Communs
- [ ] Champs vides ou null
- [ ] Caractères spéciaux / unicode
- [ ] Très grandes valeurs / très petites valeurs
- [ ] Formats de date différents
- [ ] Fuseaux horaires
- [ ] Accès concurrent
- [ ] Perte de connexion
- [ ] Session expirée
- [ ] Permissions insuffisantes
- [ ] Données corrompues
- [ ] Rollback / annulation

---

## Stratégies de Questionnement

### Technique de l'Entonnoir
1. Commencer large (contexte général)
2. Réduire progressivement (détails spécifiques)
3. Valider la compréhension à chaque niveau

### Technique des 5 Pourquoi
Pour chaque réponse, demander "Pourquoi ?" jusqu'à atteindre la cause racine.

### Technique du Scénario
"Imaginez que vous êtes [persona]. Vous voulez [action]. Que faites-vous étape par étape ?"

### Technique du Contraste
"Préférez-vous l'option A ou l'option B ? Pourquoi ?"

---

## Anti-Patterns à Éviter

1. **Questions fermées uniquement** → Alterner avec des questions ouvertes
2. **Trop de questions d'un coup** → Maximum 4 questions par message
3. **Questions techniques trop tôt** → Commencer par le besoin métier
4. **Suppositions non validées** → Toujours vérifier avant d'avancer
5. **Ignorer les signaux non-verbaux** → Reformuler si confusion détectée
