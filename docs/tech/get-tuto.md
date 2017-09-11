# Extraction des tutos [Proposition]

Cette partie est purement technique, elle décrit les workflows qui nous permetent, en fin de compte, d'ouvrir un tuto :

## Lister les tutos

Le premier besoin qu'on a est de lister les tutos qu'on a, dans un bucket (en local ou en Amazon S3).

La structure serait la suivante :

```
├── tutos
|   ├── fr-creer-une-api-avec-api-platform
|   |   ├── step1.md
|   |   ├── step2.md
|   |   ├── step3.md
|   |   └── step4.md
|   ├── en-migrate-a-react-client-side-application-to-server-side-with-nextjs
|   |   ├── step1.md
|   |   ├── step2.md
|   |   └── step3.md
```

Pour pouvoir lister et afficher les tutos, on va avoir besoin d'un fichier qui nous fournira les détails (titre, description, date, ...) de chaque tuto. ce fichier doit être structuré de façon à ce qu'il soit facile à parser. On peut envisager du `json` ou du `yaml`, qu'on peut mettre quelque part dans notre bucket.

```
├── index.json (ou index.yml)
├── tutos
|   ├── fr-creer-une-api-avec-api-platform
|   |   ├── step1.md
|   |   ├── ...
|   ├── en-migrate-a-react-client-side-application-to-server-side-with-nextjs
|   |   ├── step1.md
|   |   ├── ...
```

Il va falloir qu'on puisse identifier facilement les metadata des tutos, à savoir :

- `uuid`
- `permalink`
- `title`
- `description`
- `date`
- `author`
- `step_count`
- `categories`

L'exemple suivant serait plus approrié à ce besoin :

```json
[
  {
    "uuid": "d4e4e432-1c02-4d7f-817a-4fe6be1703c2",
    "title": "Contruire une API avec API Platform",
    "description": "Api Platform se définit comme un « framework PHP pour construire des APIs web modernes ». En effet, cet outil va nous permettre de construire rapidement une API riche et facilement utilisable.",
    "permalink": "creer-une-api-avec-api-platform",
    "date": 1504931975000,
    "author": {
      "name": "Romain Pierlot",
      "username": "rpierlot"
    },
    "step_count": 4,
    "categories": [
      "API",
      "API Platform"
    ]
  },
  {
    "uuid": "d9c4adcf-07e0-492d-967b-80ed767f67c7",
    "title": "Migrate a React client-side application to server-side with Next.JS",
    "description": "Most of the front-end applications using React that I’ve been able to work on are browser-based (client-side) applications.",
    "permalink": "migrate-a-react-client-side-application-to-server-side-with-nextjs",
    "date": 1504795411000,
    "author": {
      "name": "Vincent Composieux",
      "username": "vcomposieux"
    },
    "step_count": 3,
    "categories": [
      "React",
      "Server side rendering",
      "Next.JS"
    ]
  }
]
```

ou en `yaml` :

```yaml
---
courses:
  - uuid: d4e4e432-1c02-4d7f-817a-4fe6be1703c2
    title: Contruire une API avec API Platform
    description: Api Platform se définit comme un « framework PHP pour construire des
      APIs web modernes ». En effet, cet outil va nous permettre de construire rapidement
      une API riche et facilement utilisable.
    permalink: creer-une-api-avec-api-platform
    date: 1504931975000
    author:
      name: Romain Pierlot
      username: rpierlot
    step_count: 4
    categories:
      - API
      - API Platform
  - uuid: d9c4adcf-07e0-492d-967b-80ed767f67c7
    title: Migrate a React client-side application to server-side with Next.JS
    description: Most of the front-end applications using React that I’ve been able
      to work on are browser-based (client-side) applications.
    permalink: migrate-a-react-client-side-application-to-server-side-with-nextjs
    date: 1504795411000
    author:
      name: Vincent Composieux
      username: vcomposieux
    step_count: 3
    categories:
      - React
      - Server side rendering
      - Next.JS
```

