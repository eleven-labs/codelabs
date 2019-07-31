## Déploiement de l'application React ( recette et production ) via Gitlab CI

  

Nous allons survoler également cette étape assez rapidement.
Pour commencer, je vous invite à lire [ceci](https://codelabs.eleven-labs.com/course/fr/gitlab-ci-js/)


### Pré-requis

Vous devez posséder un compte gitlab.
Créer un projet et un repository dans lequel vous aurez déposer votre code source.

 
### Mise en place de la CI ( Continuous integration )


Nous allons utiliser le service CI/CD pour déployer notre application.
Pour se faire nous devons créer un fichier **gitlabci.yml** à la racine de notre projet et ajouter les instructions suivantes:

  
```bash

image: node:10
cache:
    paths:
    - node_modules/

stages:
    - deploy_recette
    - deploy_production

before_script:
    - echo  "deb http://packages.cloud.google.com/apt cloud-sdk-jessie main"  | tee /etc/apt/sources.list.d/google-cloud-sdk.list
    - curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
    - apt-get update && apt-get install -y google-cloud-sdk
    - echo  $DEPLOY_KEY_JSON_PRODUCTION  > /tmp/$CI_PIPELINE_ID.json
    - gcloud auth activate-service-account --key-file /tmp/$CI_PIPELINE_ID.json
    - npm install


after_script:
    - rm /tmp/$CI_PIPELINE_ID.json
  
deploy_recette:
    environment: recette
    script:
    - npm run build
    - gcloud app deploy ./app.recette.yml --version=$CI_PIPELINE_ID --promote --stop-previous-version

deploy_production:
    environment: production
    script:
    - npm run build
    - gcloud app deploy ./app.yml --version=$CI_PIPELINE_ID --promote --stop-previous-version

```

Cet exemple est une version simplifiée, mais elle contient les éléments nécessaires au déploiement de nos deux applications.

Les principaux éléments ici sont:
**before_script** : Cette partie nous permet d'installer le *SDK GCP* nécessaire au déploiement et d'initialiser ce dernier avec notre compte de service créé dans l'étape précédente via la variable d'environnement Gitlab ( *DEPLOY_KEY_JSON_PRODUCTION* )

D'ailleurs, nous allons nous rendre dans notre projet Gitlab, dans l'onglet *Settings* du repository.
Et nous allons insérer ce compte de service, dans CI/CD >> Variables.
Indiquez *DEPLOY_KEY_JSON_PRODUCTION* dans le champ *KEY*, et dans le champ *VALUE*, ajoutez le contenu de notre fichier **key.json**
Ceci permettra à notre script de récupérer notre clé secrete, sans qu'elle puisse accessible par des tiers.

Enfin si nous jetons un oeil aux deux parties qui concernent les déploiements, le script va tout d'abord ajouter nos dépendances et ensuite lancer la commande que nous avons lancé à la main dans le step précédent.
Une fois ce fichier crée, je vous invite à pusher vos modifications sur votre repository.
Gitlab va détecter automatiquement notre fichier de CI et va executer ce dernier.

A la fin du script de CI, si tout s'est bien passé, nous pouvons voir le résultat dans votre console GCP et verifier que de nouvelles versions de nos services sont maintenant fonctionnels.