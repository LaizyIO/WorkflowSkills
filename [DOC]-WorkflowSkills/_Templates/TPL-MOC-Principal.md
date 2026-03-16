---
title: MOC Principal - {{project}}
type: moc
status: active
created: {{date}}
updated: {{date}}
tags:
  - moc
  - index
  - principal
---

# {{project}}

> {{description}}

## Statut du projet

| Métrique | Valeur |
|----------|--------|
| Phase | |
| Sprint actuel | |
| Avancement | |

## Navigation rapide

### Spécifications
- [[CDC-{{project}}]] - Cahier des charges
- [[MOC-Features]] - Fonctionnalités

### Architecture
- [[MOC-Architecture]] - Vue technique
- [[MOC-API]] - Documentation API

### Décisions
- [[MOC-Decisions]] - ADRs

### Développement
- [[DEV-Setup-Local]] - Setup local
- [[DEV-Conventions]] - Conventions de code

## Réunions récentes

```dataview
TABLE date, status
FROM "06-Meetings"
SORT date DESC
LIMIT 5
```

## Features en cours

```dataview
TABLE status, priority, assignee
FROM "03-Features"
WHERE status = "in-progress"
SORT priority DESC
```

## Décisions récentes

```dataview
TABLE status, decision-date
FROM "05-ADR"
SORT decision-date DESC
LIMIT 5
```

## Structure du vault

| Dossier | Contenu |
|---------|---------|
| `00-MOC/` | Index et navigation |
| `01-Specs/` | Cahier des charges, spécifications |
| `02-Architecture/` | Documentation technique |
| `03-Features/` | Fonctionnalités détaillées |
| `04-API/` | Documentation API |
| `05-ADR/` | Décisions d'architecture |
| `06-Meetings/` | Comptes-rendus |
| `07-Dev/` | Notes développement |
| `08-Resources/` | Ressources externes |
| `09-Archives/` | Documents obsolètes |

## Équipe

| Rôle | Personne |
|------|----------|
| | |

## Liens externes

- Repository :
- Production :
