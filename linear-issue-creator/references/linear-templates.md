# Linear Issue Templates — DEV-007

Source: `[DOC]-Laizy/08-Dev/Linear/DEV-007-Linear-Templates.md`
Last sync: 2026-05-13

Copy the section headers **exactly** when filling templates. Do not rename, reorder, or skip sections.

---

## Template 1 — Feature

**Labels**: `Feature` | **Priority**: Medium (3) | **State**: `À clarifier`

### Title
```
[Feature] Titre court et clair
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
- [ ] Branche : `feature/LAI-XXX-slug-feature`
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

**Labels**: `Bug` | **Priority**: High (2) | **State**: `À clarifier`

### Title
```
[Bug] Description courte du symptôme
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
- [ ] Branche : `fix/LAI-XXX-slug-bug`
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

**Labels**: `tech-debt`, `refactor` | **Priority**: Low (4) | **State**: `À clarifier`

### Title
```
[Tech-Debt] Description courte du problème technique
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
- [ ] Branche : `refactor/LAI-XXX-slug`
- [ ] Tests de non-régression couvrant les zones touchées

### Phase Tests
- [ ] Bench avant/après si perf concernée
```

---

## Template 4 — Idée

**Labels**: `Improvement` | **Priority**: No priority (0) | **State**: `À clarifier`

### Title
```
[Idée] Description courte de l'idée
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

**Labels**: `Bug` | **Priority**: Urgent (1) | **State**: `À clarifier`

### Title
```
[Hotfix] Description courte de l'urgence
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

- [ ] Branche : `hotfix/LAI-XXX-slug`
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
