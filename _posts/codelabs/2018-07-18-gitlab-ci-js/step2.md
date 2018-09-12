# Initialisation de la CI/CD et préparation du notre application pour notre CI/CD

Pour cette deuxième étape nous allons initialiser notre CI/CD et préparer notre application pour le temps d'exécution de notre CI/CD.

## Initialisation du repository gitlab
Bon, sur cette partie je pense que je ne vais rien vous apprendre. Rendez -ous sur l’interface de gitlab, puis dans projet, et enfin cliquez sur `New project`.

![Screenshot create project gitlab](screenshot-create-project-gitlab.png)

Ensuite depuis votre console :
```bash
git init
git remote add origin git@gitlab.com:ngrevin/gitlab-ci-js.git
git add .
git commit -m "Initial commit"
git push -u origin master

# Si vous avez plusieurs comptes Github / GitLab / … pensez à changer votre config
git config user.name "Nicolas Grévin"
git config user.email "ngrevin@eleven-labs.com"
```

## Initialisation de la CI/CD de gitlab-ci

Pour cette partie, rien de compliqué. Il faut juste ajouter un fichier `.gitlab-ci.yml` à la racine de votre projet et pour que la CI puisse fonctionner nous allons juste mettre une déclaration `script` dans un `jobs`.

```yaml
init:gitlab-ci:
  script:
   - echo 'hello gitlab-ci'
```
On push nos modifications :

```bash
git checkout -b gitlab-ci-js/hello-gitlab-ci
git add .
git commit -m “gitlab-ci-js/hello-gitlab-ci - add .gitlab-ci.yml”
git push origin gitlab-ci-js/hello-gitlab-ci
```
Et voilà le résultat :
```bash
```
![Result init gitlab-ci](URLassets/2018-07-18-gitlab-ci-js/result-init-gitlab-ci.png)

## Préparation de notre application pour notre CI/CD

Lors de l'exécution de la CI/CD nous aurons besoin de notre application déjà construite avec toutes ces dépendances.

On va avoir besoin de notre application dans deux états :
La version construite avec les dépendances de développement pour les codes styling et les tests
La version construite sans les dépendances de développement et les fichiers compilés pour le futur déploiement
```yaml
stages:
  - build

.template_build: &template_build # Template commun aux deux jobs de la stage build
  stage: build # On lie les jobs au stage de build
  image: node:8-alpine # On utilise l’image de node 8

build:node_modules:
  <<: *template_build # on appelle notre template
  script: # Les scripts exécutés pendant ce job
    - yarn install
  cache: # on définit notre cache
    policy: push
    paths:
      - ./node_modules
  except: # On définit une règle d'exécution : ce job sera fait tout le temps sauf en cas de tag
    - tags

build:app:
  <<: *template_build # on appelle notre template
  script: # Les scripts exécutés pendant ce job
    - yarn install
    - yarn build
  cache: # on définit notre cache
    policy: push
    paths:
      - ./dist
  only: # On définit une règle d'exécution : ce job sera fait uniquement sur master ou en cas de tag
    - master
    - tags
```
<!-- TODO: screenshot -->
