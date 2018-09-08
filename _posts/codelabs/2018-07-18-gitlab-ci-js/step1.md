# Définition des besoin et préparation de notre application

Pour cette première étape nous allons déjà définir nos besoin en terme de technologie à mettre en place mais aussi les workflows git et de CI/CD. Puis nous allons initialiser notre application.

## Définition des besoins

### Les technologies
Docker pour notre environnement de développement.
Node avec npm et yarn pour exécuter notre application sur notre environnement de dev.
Make pour simplifier nos commande dans la phase de développement.

### Les workflows
Pour git :
Nous allons protéger la branche master.
Toute modification passera par des PRs.
Les PRs valider par la CI et par les contributeur seront merge dans master.
La convention de nommages des branches se fera suivant ce modèle : [NOM_DU_PROJET]/[NOM_DE_LA_FEATURE].
La convention de nommage des commit se fera suivant ce modèle : [NOM_DE_LA_BRANCHE] - [BREF_EXPLICATION_DE_LA_MODIFICATION].

![Workfolw git ](https://storage.googleapis.com/tutos/assets/2018-07-18-gitlab-ci-js/workflow-git.png)
![Workflow git](https://storage.googleapis.com/tutos/assets/2018-07-18-gitlab-ci-js/workflow-git.svg)

Pour la CI/CD :
La CI sera lancé à chaque fois que du code sera poussé sur une branche y compris master.
La CD sera lancé à chaque fois qu’un branche sera mergé dans master et à chaque tag fait par le mainteneur du projet.
La CD effectuer à chaque merge sur master aboutira au déploiement sur l'environnement de démonstration.
La CD effectuer à chaque tag aboutira au déploiement sur l'environnement de production.
Une étape de build pour les dépense node sera fait à chaque CI.
Une étape de build de l’application sera fait à chaque CD.
Les code style et tests seront effectués à chaque CI

<!-- TODO: schema ou autre -->

## Initialisation de l’application VueJS

Pour faire simple et pour aller vite nous allons utiliser vue-cli. Donc pour ça nous allons installer vue-cli et initialiser une projet vueJS.

```
$ yarn global add @vue/cli-service-global
# ...
$ vue --version
3.0.1
```

> Si vous avez des soucis avec la commande `vue` pensez à regarder votre configuration npm/yarn et si le chemin des exécutable npm/yarn est bien déclaré dans la variable $PATH

```
vue create .

Vue CLI v3.0.1
? Generate project in current directory? (Y/n) y

Vue CLI v3.0.1
? Please pick a preset:
  default (babel, eslint)
❯ Manually select features

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project:
❯◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◉ Unit Testing
 ◉ E2E Testing

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) Y

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
❯ SCSS/SASS
  LESS
  Stylus

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
❯ ESLint + Standard config
  ESLint + Prettier

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
? Pick a linter / formatter config: Standard
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ Lint on save
 ◯ Lint and fix on commit

 Vue CLI v3.0.1
 ? Please pick a preset: Manually select features
 ? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
 ? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
 ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
 ? Pick a linter / formatter config: Standard
 ? Pick additional lint features: Lint on save
 ? Pick a unit testing solution: (Use arrow keys)
 ❯ Mocha + Chai
   Jest

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Pick a E2E testing solution: (Use arrow keys)
❯ Cypress (Chrome only)
 Nightwatch (Selenium-based)

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Pick a E2E testing solution: Cypress
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.?
 In dedicated config files
❯ In package.json

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Pick a E2E testing solution: Cypress
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In package.json
? Save this as a preset for future projects? (y/N) y

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Pick a E2E testing solution: Cypress
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In package.json
? Save this as a preset for future projects? Yes
? Save preset as: .vuerc
```
Voilà pour l’installation, on vérifie que l’application fonctionne avec cette commande :

```
yarn serve
```
![Screenshot app vueJS init](https://storage.googleapis.com/tutos/assets/2018-07-18-gitlab-ci-js/screenshot-app-vue-js-init.png)

## Make 

Pour simplifier les commande docker et pour que l’application soit sous docker fait fait un makefile, je l’utilise dans la majorité de mes applications et ça fonctionne bien.

Comme le tuto ne porte pas sur ce sujet je vous le donne sans vous donner l'explication mais ça sera peut-être un sujet que j’aborderai dans l’avenir :).

voici le lien vers le makefile : [Makefile pour application node](link)
