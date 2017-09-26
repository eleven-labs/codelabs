---
title: la step 1
excerpt: Pour rendre l'expérience utilisateur de nos applications web de plus en plus agréable, nous somme de plus en plus obligé d'utiliser plusieurs technologies en même temps. Nous allons mettre en place un flux infini en utilisant un backend Symfony et un front en ReactJs.
cover: /assets/2017-09-11-mon-premier-tuto/step1.jpg
---

Pour rendre l'expérience utilisateur de nos applications web de plus en plus agréable, nous somme de plus en plus obligé d'utiliser plusieurs technologies en même temps. Nous allons mettre en place un flux infini en utilisant un backend Symfony et un front en ReactJs.

### Mise en place du backend

Notre site est tout d'abord un site en Symfony 3.3. La mise en place est assez basique, il vous suffit d'installer Symfony en suivant le tutoriel suivant sur le [site officiel](https://symfony.com/doc/current/setup.html).  Pour la suite de notre projet, nous allons avoir besoin de stocker les données du flux, pour cela nous allons mettre en place une base de données [Postgresql](https://www.postgresql.org/). Il vous suffit de changer dans votre fichier de configuration les paramètres par default de la database doctrine.

```yaml
# config.yml
# Doctrine Configuration
doctrine:
    dbal:
        driver: pdo_pgsql
        host: '%database_host%'
        port: '%database_port%'
        dbname: '%database_name%'
        user: '%database_user%'
        password: '%database_password%'
        charset: UTF8
    orm:
        auto_generate_proxy_classes: '%kernel.debug%'
        naming_strategy: doctrine.orm.naming_strategy.underscore
        auto_mapping: true
```

Comme nous aimons le code propre, nous allons utiliser les variables d'environnement pour notre configuration de base de donnée. Il vous faut alors changez dans votre fichier parameters.yml les valeurs des variables pour aller chercher les valeurs dans votre environnements.
