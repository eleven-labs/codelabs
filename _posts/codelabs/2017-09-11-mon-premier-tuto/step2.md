---
title: la step 2
excerpt: Pour rendre l'expérience utilisateur de nos applications web de plus en plus agréable, nous somme de plus en plus obligé d'utiliser plusieurs technologies en même temps. Nous allons mettre en place un flux infini en utilisant un backend Symfony et un front en ReactJs.
cover: /assets/2017-09-11-mon-premier-tuto/step2.jpg
---

P```yaml
# parameters.yml
parameters:
    database_host: '%env(POSTGRES_HOST)%'
    database_port: '%env(POSTGRES_PORT)%'
    database_name: '%env(POSTGRES_DB)%'
    database_user: '%env(POSTGRES_USER)%'
    database_password: '%env(POSTGRES_PASSWORD)%'
    secret: '%env(SECRET)%'
```

Vous pouvez alors créer votre fichier .env avec les valeurs de vos variables.

```yaml
// .env
# PATH DIR
SYMFONY_APP_PATH=./
LOGS_DIR=./docker/logs

# DATABASE
POSTGRES_HOST=postgres
POSTGRES_DB=infinite
POSTGRES_USER=infinite
POSTGRES_PASSWORD=infinitepass
POSTGRES_PORT=5432

# PORT WEB
WEB_PORT=80

# SYMFONY
SECRET=d3e2fa9715287ba25b2d0fd41685ac031970f555
```

Si vous avez fait un peu attention, vous avez vu que dans le fichier `.env` il y a d'autres variables, c'est parce que l'application utilise [docker](https://www.docker.com/).

### Mettez en place votre docker (optionnel)

Pour allez plus vite dans les suites de notre projet, nous avons mis en place une architecture docker permettant d'utiliser l'application. La mise en place est optionnel mais vous aidera pour avancer dans votre développement.

A la racine de votre projet,  ajouter un dossier `docker` qui contiendra la configuration de votre stack technique. Pour le projet nous allons utiliser:

 1. Php7 pour la partie symfony
 2. Nodejs pour bulder l'application React
 3. Nginx comme serveur web pour servir le site

Vous devez créer les trois dossiers suivant à l'intéreieur du dossier `docker`.

 - `nginx`
 - `php`
 - `node`
