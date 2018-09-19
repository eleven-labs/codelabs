# Déploiement de notre application sur Google Cloud PLatform

pour cette quatrième et dernière partie nous allons voir comment déployer notre application sur Google Cloud PLatform (GCP) avec App Engine.

Pour ce faire nous allons devoir :
 - Créer un projet sur Google Cloud Platform.
 - Configurer le projet Google Cloud Platform.
 - Créer un credential pour pouvoir se connecter depuis notre CI/CD.
 - Créer du fichier app.yml pour App Engine.
 - Créer une image docker personnaliser pour notre déploiement
 - Ajouter un `stage` de déploiement.

## Création du projet Google Cloud Platform

La première chose à faire c’est de se connecter ou s'inscrire sur la [console de Google Cloud Platform](https://console.cloud.google.com). Si tout vas bien vous arriverez sur cette page là :

![Home page de la console Google Cloud Platform ](https://storage.googleapis.com/tutos/assets/screenshot-home-page-gcp-console.png)

Puis vous cliquez sur créer et vous entrez le nom de votre projet. Vous pouvez aussi customiser l’ID de votre projet :

![Page de création de projet GCP](https://storage.googleapis.com/tutos/assets/screenshot-create-project-gcp.png)

> /!\ Dans mon cas l’ID du projet est déjà utilisée car je l’avai déjà créer.

## Configuration du projet Google Cloud Platform

Pour que le déploiement sur GCP App Engine il faut activer deux APIs :

 - App Engine Admin API : Cette API permet de provisionner et de manager des application App Engine.
 - Compute Engine API : Cette API permet de créer et de démarrer des machines dans GCP.

Pour activer une API il faut, depuis la console GCP, aller dans le menu droite dans `API et services`. Ensuite aller dans la bibliothèque et avec la barre de recherche trouver les API que vous intéresse. Accéder à la page de l’API et activait la.

## Création de credential

Il nous faudra aussi des des identifiant pour nous connecter depuis la CI/CD. Pour ce faire, toujours dans `API et services` aller dans le sous-section `identifiant` et cliquez sur `créer des identifiants` puis `créer une clé de compte de service`.

Vous arrivez sur l'écran ci-dessous. Sélectionnez `App Engine default service account` et `json`.

![Création de clé de compte de service](screenshot-create-service-key.png)

Un fichier au format `json` est automatiquement télécharger sur votre ordinateur. Copier l'intégralité du contenu de ce fichier et aller dans l’interface web de Gitlab dans `Settings > CI/CD > Variables`.

Ici nous créons une nouvelle variables que l’on vas nommer `GCP_CREDENTIALS` et contenant le contenu du fichier précédemment téléchargé.

![Gitlab - CI/CD Settings - Variables](screenshot-gitlab-ci-cd-settings-variables.png)

Voilà pour le credential.

## fichier app.yaml pour le deploiement sur App Engine

Nous allons faire un template pour le fichier app.yaml pour qu’il soit générer selon son environnement grâce l’outil `envsubst` du paquet `gettext`.

Voici le template du fichier app.yaml :
```yaml
service: ${CI_ENVIRONMENT_NAME}
runtime: python27
api_version: '1'
env: standard
threadsafe: true
instance_class: F1

handlers:
  - url: /
    application_readable: false
    static_files: dist/index.html
    require_matching_file: false
    upload: dist/index.html

  - url: '/(.*)'
    application_readable: false
    static_files: "dist/\\1"
    require_matching_file: false
    upload: 'dist/.*'

```

J'ai nommé ce fichier `app.template.yaml`.

## Création d'une image docker personnaliser pour notre déploiement

Nous allons avoir besoin d'une image personnaliser car nous allons avoir besoin de node, de git et du sdk de Google Cloud Plateform.

Pour ce faire créé un fichier Dockerfile-ci dans un nouveau répertoire nommer docker.
Voici le Dockerfile :

```dockerfile
FROM node:8-alpine

ARG CLOUD_SDK_VERSION=216.0.0
ENV CLOUD_SDK_VERSION=$CLOUD_SDK_VERSION

ENV PATH /google-cloud-sdk/bin:$PATH
RUN apk --no-cache add \
        curl \
        python \
        py-crcmod \
        bash \
        libc6-compat \
        openssh-client \
        git \
        gnupg \
        gettext \
    && curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    tar xzf google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    rm google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    ln -s /lib /lib64 && \
    gcloud config set core/disable_usage_reporting true && \
    gcloud config set component_manager/disable_update_check true && \
    gcloud config set metrics/environment github_docker_image && \
    gcloud --version


RUN apk add --update --no-cache git

RUN rm -rf /var/cache/apk/*
```

## Le stage `deploy`

Pour le deploiement

```yaml
.deploy_template: &deploy_template # On defini notre template pour le deploiement de notre application
  stage: deploy
  image: registry.gitlab.com/ngrevin/gitlab-ci-js/deploy-image
  before_script:
    - echo ${GCP_CREDENTIALS} > /tmp/${CI_PIPELINE_ID}.json
    - gcloud auth activate-service-account --key-file /tmp/$CI_PIPELINE_ID.json
    - envsubst < app.template.yaml > app.yaml
  after_script:
    - rm /tmp/$CI_PIPELINE_ID.json
  cache:
    paths:
      - ./dist
    policy: pull

deploy:demo:
  <<: *deploy_template
  environment:
    name: demo
    url: https://gitlab-ci-js.appspot.com
  script:
    - gcloud --quiet --verbosity=error app deploy ./app.yaml --project=gitlab-ci-js --version=${CI_PIPELINE_ID} --promote --stop-previous-version
  only:
    - demo

deploy:production:
  <<: *deploy_template
  environment:
    name: production
    url: https://gitlab-ci-js.appspot.com
  script:
    - gcloud --quiet --verbosity=error app deploy ./app.yaml --project=gitlab-ci-js --version=${CI_PIPELINE_ID} --promote --stop-previous-version
    - NEW_VERSION=$(yarn versions | grep gitlab-ci-js | sed "s/\('\| \|,\)//g" | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" | cut -d":" -f2)
    - git config --global user.name "ngrevin"
    - git config --global user.email "${GITLAB_USER_EMAIL}"
    - git checkout master
    - cp dist/package.json .
    - git add --all
    - git merge demo
    - git commit -m "NEW VERSION - v${NEW_VERSION}"
    - git push https://ngrevin:${PERSONAL_ACCESS_TOKEN}@gitlab.com/ngrevin/gitlab-ci-js.git HEAD:master
    - git checkout demo
    - cp dist/package.json .
    - git add -all
    - git commit -m "NEW VERSION - v${NEW_VERSION}"
    - git push https://ngrevin:${PERSONAL_ACCESS_TOKEN}@gitlab.com/ngrevin/gitlab-ci-js.git HEAD:master
  artifacts:
    name: v$(yarn versions | grep gitlab-ci-js | sed "s/\('\| \|,\)//g" | cut -d":" -f2)
    untracked: false
    paths:
      - .
  only:
    - tags
```

resulat

<!-- TODO: result demo and prod -->
