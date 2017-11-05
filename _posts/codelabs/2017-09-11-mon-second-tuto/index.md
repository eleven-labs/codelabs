---
title: la step 1
excerpt: Pour rendre l'expérience utilisateur de nos applications web de plus en plus agréable, nous somme de plus en plus obligé d'utiliser plusieurs technologies en même temps. Nous allons mettre en place un flux infini en utilisant un backend Symfony et un front en ReactJs.
cover: /assets/2017-09-11-mon-premier-tuto/step1.jpg
---

cool

Pour rendre l'expérience utilisateur de nos applications web de plus en plus agréable, nous somme de plus en plus obligé d'utiliser plusieurs technologies en même temps. Nous allons mettre en place un flux infini en utilisant un backend Symfony et un front en ReactJs.

### Mise en place du backend

Notre site est tout d'abord un site en Symfony 3.3. La mise en place est assez basique, il vous suffit d'installer Symfony en suivant le tutoriel suivant sur le [site officiel](https://symfony.com/doc/current/setup.html).  Pour la suite de notre projet, nous allons avoir besoin de stocker les données du flux, pour cela nous allons mettre en place une base de données [Postgresql](https://www.postgresql.org/). Il vous suffit de changer dans votre fichier de configuration les paramètres par default de la database doctrine.

