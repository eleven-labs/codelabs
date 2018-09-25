# Déploiement de notre application sur Google Cloud PLatform

pour cette quatrième et dernière partie nous allons voir comment déployer notre application sur Google Cloud PLatform (GCP) avec App Engine.

Pour ce faire nous allons devoir :
 - Créer un projet sur Google Cloud Platform.
 - Configurer le projet Google Cloud Platform.
 - Créer un credential pour pouvoir se connecter depuis notre CI/CD.
 - Créer du fichier app.yml pour App Engine.
 - Créer une image docker personnaliser pour notre déploiement
 - Créer un token pour pouvoir faire des push depuis notre CI/CD
 - Ajouter un `stage` de déploiement.

## Création du projet Google Cloud Platform

La première chose à faire c’est de se connecter ou s'inscrire sur la [console de Google Cloud Platform](https://console.cloud.google.com). Si tout vas bien vous arriverez sur cette page là :

![Home page de la console Google Cloud Platform ](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-home-page-gcp-console.png)

Puis vous cliquez sur créer et vous entrez le nom de votre projet. Vous pouvez aussi customiser l’ID de votre projet :

![Page de création de projet GCP](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-create-project-gcp.png)

> /!\ Dans mon cas l’ID du projet est déjà utilisée car je l’avai déjà créer.

## Configuration du projet Google Cloud Platform

Pour que le déploiement sur GCP App Engine il faut activer deux APIs :

 - App Engine Admin API : Cette API permet de provisionner et de manager des application App Engine.
 - Compute Engine API : Cette API permet de créer et de démarrer des machines dans GCP.

Pour activer une API il faut, depuis la console GCP, aller dans le menu droite dans `API et services`. Ensuite aller dans la bibliothèque et avec la barre de recherche trouver les API que vous intéresse. Accéder à la page de l’API et activait la.

## Création de credential

Il nous faudra aussi des des identifiant pour nous connecter depuis la CI/CD. Pour ce faire, toujours dans `API et services` aller dans le sous-section `identifiant` et cliquez sur `créer des identifiants` puis `créer une clé de compte de service`.

Vous arrivez sur l'écran ci-dessous. Sélectionnez `App Engine default service account` et `json`.

![Création de clé de compte de service](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-create-service-key.png)

Un fichier au format `json` est automatiquement télécharger sur votre ordinateur. Copier l'intégralité du contenu de ce fichier et aller dans l’interface web de Gitlab dans `Settings > CI/CD > Variables`.

Ici nous créons une nouvelle variables que l’on vas nommer `GCP_CREDENTIALS` et contenant le contenu du fichier précédemment téléchargé.

![Gitlab - CI/CD Settings - Variables](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-gitlab-ci-cd-settings-variables.png)

Voilà pour le credential.

> /!\ n'activer pas la protection autrement la variable ne pourra pas être utiliser dans les prochaines étapes

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

Nous allons nommé ce fichier `app.template.yaml`. Dans notre CI/CD nous éxécuterons la commande suivant `envsubst < app.template.yaml > app.yaml`, elle nous permettera modifier les variables d'environnement de notre fichier et créer le fichier `app.yml`.


## Création d'une image docker personnaliser pour notre déploiement

Nous allons avoir besoin d'une image personnaliser car nous allons avoir besoin de node, de git et du sdk de Google Cloud Plateform.

> Dans le cas où vous n'avais pas besoin de git et de node sachez qui éxiste une image docker avec le sdk de GCP déjà installé. [google/cloud-sdk](https://hub.docker.com/r/google/cloud-sdk/)

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

Nous allons mettre notre image sur le registry de notre dêpot. Pour ce faire nous éxécutons les commande suivante:

```bash
# On se connecte au registry de gitlab.com
docker login registry.gitlab.com

# Nous construissons notre image docker
docker build -t registry.gitlab.com/ngrevin/gitlab-ci-js/deploy-image .

# Et nous poussons notre image sur le registry
docker push registry.gitlab.com/ngrevin/gitlab-ci-js/deploy-image
```

## Token gitlab

Pour créer un `token` sur gitlab rendez vous sur la page [Personal Access Token](https://gitlab.com/profile/personal_access_tokens) `Profile > Personal Access Token`.
Donner lui un nom, ici j'ai choisi `PERSONAL_ACCESS_TOKEN` et donner lui les droits suiffisants.

En suite, comme pour les credentials de GCP créer une variable d'environnement dans votre projet avec l'access token précédement créé.

> /!\ n'activer pas la protection autrement la variable ne pourra pas être utiliser dans les prochaines étapes

## Le stage deploy

Maintenant que tout est prêt il nous reste juste à déploier notre application avec Gitlab-ci.

Nous allons donc ajouter ajouter deux nouveaux `jobs` dans notre dernière `stage`.

```yaml
.deploy_template: &deploy_template # On defini notre template pour le deploiement de notre application
  stage: deploy # On lie nous prochain job avec le stage 'deploy'
  image: registry.gitlab.com/ngrevin/gitlab-ci-js/deploy-image # 
  before_script: # Avant le script principale nous faisons :
    - echo ${GCP_CREDENTIALS} > /tmp/${CI_PIPELINE_ID}.json # Nous récuperons notre variables 'GCP_CREDENTIALS' et on la sauvegarde dans un fichier
    - gcloud auth activate-service-account --key-file /tmp/$CI_PIPELINE_ID.json # Grâce au fichier précédement créer nous nous connectons à GCP 
    - envsubst < app.template.yaml > app.yaml # Nous créons notre fichier 'app.yml'
  after_script: # Après le script principale nous faisons :
    - rm /tmp/$CI_PIPELINE_ID.json  # On supprime toute trace de nos credentials GCP
  cache: # Définition des règles de cache pour récuperer les caches de l'étape de build
    paths:
      - ./dist
    policy: pull

deploy:demo:
  <<: *deploy_template # on appel notre template
  environment: # On définit notre environnment
    name: demo
    url: https://demo-dot-gitlab-ci-js.appspot.com # on indique l'url de notre application de demo
  script:
    # Nous déployons notre applictaion avec la commande 'gcloud app deploy ./app.yml --project=gitlab-ci-js'
    # Comme nous ne voulons pas d'intéraction nous ajoutons l'option 'quiet'
    # Comme nous voulons voir le log lors du déployement nous ajoutons l'option 'verbosity' avec la valeur à 'error'
    # Le numéro de version seron l'id de la pipeline
    # Avec '--promote --stop-previous-version' nous arretons la version précédante en promovant la nouvelle version
    - gcloud --quiet --verbosity=error app deploy ./app.yaml --project=gitlab-ci-js --version=${CI_PIPELINE_ID} --promote --stop-previous-version
  only:
    - demo

deploy:production:
  <<: *deploy_template # on appel notre template
  environment: # On définit notre environnment
    name: production
    url: https://production-dot-gitlab-ci-js.appspot.com # on indique l'url de notre application de production
  script:
    # Idem que pour l'environnment de demo
    - gcloud --quiet --verbosity=error app deploy ./app.yaml --project=gitlab-ci-js --version=${CI_PIPELINE_ID} --promote --stop-previous-version
    # Nous configurons git et nous mettons a jour l'orignie avec notre token
    - git config --global user.name "ngrevin"
    - git config --global user.email "${GITLAB_USER_EMAIL}"
    - git remote rm origin
    - git remote add origin https://${GITLAB_USER_LOGIN}:${PERSONAL_ACCESS_TOKEN}@gitlab.com/ngrevin/gitlab-ci-js.git
    - git fetch --all
    # Nous passons sur demo et nous copions 'dist/package.json' à la racine de notre projet pour remplacer l'ancien fichier 'package.json' car la version a était mise a jour lors de job build:app
    - git checkout demo
    - cp dist/package.json .
    # On récupére le numero de version grâce a la commande 'yarn versions' et nous la formattons sans tout les informations, juste le numéron et sans couleur
    - NEW_VERSION=$(yarn versions | grep gitlab-ci-js | sed "s/\('\| \|,\)//g" | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" | cut -d":" -f2)
    # ON ajoute nos modifications, on commit et on pousse les modifications
    - git add --all
    - git commit -m "NEW VERSION - v${NEW_VERSION}"
    - git push https://${GITLAB_USER_LOGIN}:${PERSONAL_ACCESS_TOKEN}@gitlab.com/ngrevin/gitlab-ci-js.git demo
    # Ici nous allons merge demo dans master en écrassant master par rapport a demo, puis nous poussons les modifications sur master
    - git merge -s ours origin/master -m "Merge for new version"
    - git checkout master
    - git merge --no-ff --commit -m "NEW VERSION - v${NEW_VERSION}" demo
    - git push https://${GITLAB_USER_LOGIN}:${PERSONAL_ACCESS_TOKEN}@gitlab.com/ngrevin/gitlab-ci-js.git master
  artifacts:
    name: "${CI_COMMIT_TAG:1}"
    untracked: false
    paths:
      - .
  only:
    - tags
```


On push nos modifications :

```bash
git checkout -b gitlab-ci-js/step3
git add .
git commit -m “gitlab-ci-js/step3 - add .gitlab-ci.yml”
git origin gitlab-ci-js/step3
```

Vous créez un PR et vous la mergé dans demo

Et voila le résultat de notre CI/CD pour le déploiement en démo :

![résultat CI/CD stage lint et test](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-deploy-demo.png)
