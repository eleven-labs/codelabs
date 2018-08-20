### Créer un projet Symfony Flex pour l'API

Nous allons utiliser Symfony 4.1 avec le plugin Flex.

```bash
composer create-project symfony/website-skeleton api
```

### Installer sapient-bundle

Le bundle possède une recette dans le dépôt _recipe-contrib_. Pour l'utiliser, il faut activer une option dans composer.

```bash
cd api
composer config extra.symfony.allow-contrib true
```

Ensuite, installer le bundle.

```bash
composer require lepiaf/sapient-bundle
```

### Recommencer avec le client

Nous avons une API en Symfony, maintenant nous allons créer un projet pour le client. Le client va aller interroger l'API.

Cette fois-ci, nous utiliserons le squelette simple. 

```bash
composer create-project symfony/skeleton client
cd api
composer config extra.symfony.allow-contrib true
composer require lepiaf/sapient-bundle
```

Nous avons donc une API et un client installé. Passons à la configuration du bundle.
