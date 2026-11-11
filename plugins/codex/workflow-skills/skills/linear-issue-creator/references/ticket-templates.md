# Ticket Body Templates

Five templates for the body (`corps`) of a ticket in the suivi. They come from the agency's former Linear templates (DEV-007, 2026-05-13), adapted on 2026-11-11: no label, no state, no `le ticket` number.

Copy the section headers **exactly** when filling templates. Do not rename, reorder, or skip sections. The title, type and priority shown above each template are the fields to pass to `suivi_creer_ticket`, not text of the body.

---

## Template 1 — Feature

**type**: `tache` | **priorite**: `normale`

### Title
```
Titre court et clair
```

### Description
```markdown
## 🎯 Contexte

_Pourquoi cette feature ? Quel besoin métier ?_

## 📋 Description

_Description fonctionnelle de la feature en quelques phrases._

## ✅ Critères d'acceptation

- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3
- [ ] Documentation mise à jour dans `[DOC]-Laizy/04-Features/`

---

## 📦 Artefacts attendus

### Phase Spécification
- [ ] CDC : `[DOC]-Laizy/10-Archives/FEAT-XXX-NomFeature/FEAT-XXX-CDC.md`

### Phase Plan
- [ ] Findings : `FEAT-XXX-Findings.md`
- [ ] Plan : `FEAT-XXX-Plan.md`

### Phase Implémentation
- [ ] Branche : `feature/slug-feature`
- [ ] Test plan : `FEAT-XXX-Test-Plan.md`

### Phase Tests
- [ ] Résultats : `FEAT-XXX-Test-Results.md`

---

## 🔗 Liens

- Specs : (à remplir)
- Maquettes : (à remplir)
- Conversation Slack/email d'origine : (à remplir)
```

---

## Template 2 — Bug

**type**: `bug` | **priorite**: `haute`

### Title
```
Description courte du symptôme
```

### Description
```markdown
## 🐛 Symptôme observé

_Que se passe-t-il ? Décrire ce qui ne marche pas._

## 🔁 Reproduction

1. Étape 1
2. Étape 2
3. Étape 3

**Résultat actuel** : _ce qui se passe_
**Résultat attendu** : _ce qui devrait se passer_

## 🌐 Environnement

- Navigateur / OS :
- URL / page :
- Date d'apparition :
- User concerné (si applicable) :

## 🔍 Impact

- [ ] Bloquant utilisateur
- [ ] Dégrade l'expérience
- [ ] Cosmétique

---

## 📦 Artefacts attendus

### Phase Spécification (analyse de la cause)
- [ ] Analyse cause racine : `[DOC]-Laizy/10-Archives/BUG-XXX-NomBug/BUG-XXX-Analysis.md`

### Phase Implémentation
- [ ] Branche : `fix/slug-bug`
- [ ] Test de non-régression ajouté

### Phase Tests
- [ ] Bug reproduit sur env dev avant fix
- [ ] Bug ne se reproduit plus après fix
- [ ] Pas de régression sur fonctions adjacentes

---

## 📎 Pièces jointes

- Capture(s) d'écran :
- Logs :
- Vidéo :
```

---

## Template 3 — Tech-Debt

**type**: `tache` | **priorite**: `basse`

### Title
```
Description courte du problème technique
```

### Description
```markdown
## 🔧 Problème technique

_Qu'est-ce qui pose problème aujourd'hui dans le code/infra ?_

## 💸 Coût actuel de la dette

_Pourquoi c'est un problème ? Que ça coûte de ne rien faire ?_

- Lenteur
- Bugs récurrents
- Difficulté à maintenir
- Dépendance obsolète / faille de sécurité
- Couplage trop fort
- Tests insuffisants

## 🎯 Solution proposée

_Comment on aimerait que ce soit après ?_

## ⚖️ Risques et alternatives

**Risques de la refacto** :
-

**Alternatives considérées** :
- Ne rien faire (pourquoi pas suffisant ?)
- Solution A vs B

## ✅ Critères de succès

- [ ] Aucune régression fonctionnelle
- [ ] Tests passent toujours
- [ ] Performance égale ou meilleure
- [ ] Documentation mise à jour si schéma/architecture impactés

---

## 📦 Artefacts attendus

### Phase Spécification
- [ ] ADR si décision architecturale : `[DOC]-Laizy/06-ADR/ADR-XXX-Title.md`

### Phase Plan
- [ ] Plan de refacto : `[DOC]-Laizy/10-Archives/TECH-XXX-NomRefacto/TECH-XXX-Plan.md`

### Phase Implémentation
- [ ] Branche : `refactor/slug`
- [ ] Tests de non-régression couvrant les zones touchées

### Phase Tests
- [ ] Bench avant/après si perf concernée
```

---

## Template 4 — Idée

**type**: `idee` | **priorite**: `normale`

### Title
```
Description courte de l'idée
```

### Description
```markdown
## 💡 L'idée en une phrase

_Décrivez l'idée le plus simplement possible._

## 🎯 Pourquoi (origine)

_D'où vient cette idée ? Retour client ? Inspiration concurrent ? Besoin métier interne ?_

## 👥 Qui en bénéficierait

- [ ] Tous les utilisateurs
- [ ] Un segment précis : _____
- [ ] Les admins / PO uniquement
- [ ] L'équipe technique

## 🔍 Premières pistes (optionnel)

_Si l'idée est déjà un peu cuite, listez les directions._

---

## 📊 À évaluer ensuite (par le lead)

- [ ] Impact estimé (gros / moyen / petit)
- [ ] Effort estimé (jour / semaine / mois)
- [ ] Type final : Feature / Bug / Tech-Debt / Improvement
- [ ] Projet de destination : Rikka / Desktop / n8n Fork
- [ ] Doublon d'une issue existante ?

> 🚨 Cette issue doit être **transformée** en Feature / Bug / Tech-Debt ou close avant de passer en `Prêt à prendre`.
```

> **Filling rule for Idée**: stay light. Fill "L'idée en une phrase", "Pourquoi", "Qui en bénéficierait". Keep "Premières pistes" optional. Leave "À évaluer ensuite" block intact — it's for the lead, not the agent.

---

## Template 5 — Hotfix

**type**: `bug` | **priorite**: `haute` (titre commençant par « Urgence : »)

### Title
```
Urgence : description courte
```

### Description
```markdown
## 🚨 Urgence

**Sévérité** :
- [ ] Service down (bloquant pour tous les users)
- [ ] Fonction critique cassée (paiement, auth, indexation prod)
- [ ] Régression majeure (> 50% des users impactés)

**Découvert** : _qui ? quand ? comment ?_

## 🐛 Symptôme

_Description précise du problème en prod._

## 🔁 Reproduction (si possible)

1. Étape 1
2. Étape 2

## 🩹 Workaround temporaire

_Y a-t-il un contournement provisoire pour les users en attendant le fix ?_

---

## ⚡ Workflow accéléré

> ⚠️ Pour les hotfix, on **court-circuite** la phase Spec/Plan complète. L'implémentation peut commencer immédiatement.

- [ ] Branche : `hotfix/slug`
- [ ] Tag de release prévu : `vX.Y.Z+1` (patch version)
- [ ] Communication client / interne envoyée
- [ ] Post-mortem prévu après le fix

## 📦 Artefacts attendus (post-fix)

- [ ] Test de non-régression ajouté
- [ ] Post-mortem dans `[DOC]-Laizy/10-Archives/HOTFIX-XXX-NomHotfix/`
- [ ] ADR si la cause révèle un problème architectural

---

## 📎 Logs / contexte

- Logs prod : (à remplir)
- User(s) impactés : (à remplir)
- Heure de détection : (à remplir)
```
