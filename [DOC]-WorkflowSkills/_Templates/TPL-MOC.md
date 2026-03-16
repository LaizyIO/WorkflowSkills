---
title: MOC-{{domain}}
type: moc
status: active
created: {{date}}
updated: {{date}}
tags:
  - moc
  - index
---

# {{domain}}

> Description du domaine couvert par ce MOC

## Documents

### Principaux

-

### Associés

-

## Vue dynamique

```dataview
TABLE status, updated
FROM "{{folder}}"
WHERE type != "moc"
SORT updated DESC
```

## Liens

- [[MOC-Principal]]
