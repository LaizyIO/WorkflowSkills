---
title: API-{{module}}
type: api
status: draft
created: {{date}}
updated: {{date}}
version: 1.0
base-url: /api/v1/{{module}}
auth-required: true
tags:
  - api
---

# API {{module}}

## Vue d'ensemble

Description du module API.

## Authentification

- Type : Bearer Token
- Header : `Authorization: Bearer {token}`

## Endpoints

### GET /{{module}}

**Description** : Liste des éléments

**Paramètres query** :

| Param | Type | Requis | Description |
|-------|------|--------|-------------|
| page | int | Non | Page (défaut: 1) |
| limit | int | Non | Limite (défaut: 20) |

**Réponse 200** :

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### GET /{{module}}/:id

**Description** : Détail d'un élément

**Paramètres path** :

| Param | Type | Description |
|-------|------|-------------|
| id | uuid | ID de l'élément |

**Réponse 200** :

```json
{
  "id": "uuid"
}
```

### POST /{{module}}

**Description** : Création

**Body** :

```json
{
}
```

**Réponse 201** :

```json
{
  "id": "uuid"
}
```

### PUT /{{module}}/:id

**Description** : Mise à jour complète

**Body** :

```json
{
}
```

**Réponse 200** :

```json
{
}
```

### DELETE /{{module}}/:id

**Description** : Suppression

**Réponse** : `204 No Content`

## Codes d'erreur

| Code | Description |
|------|-------------|
| 400 | Bad Request - Paramètres invalides |
| 401 | Unauthorized - Token manquant/invalide |
| 403 | Forbidden - Permissions insuffisantes |
| 404 | Not Found - Ressource inexistante |
| 422 | Validation Error - Données invalides |
| 500 | Internal Server Error |

## Liens

- [[MOC-API]]
- [[API-Overview]]
