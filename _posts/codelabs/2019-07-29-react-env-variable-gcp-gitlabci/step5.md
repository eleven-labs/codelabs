## Script de récupération des fichiers de configuration sur Google Cloud Storage

  
Nous avons maintenant deux applications distinctes mais nous utilisons toujours le même fichier d'environnement *.env*
Souvenez vous, notre application pourra faire référence à la même variable d'environnement ( **process.env.REACT_APP_API_URL** ) pour nos deux applications ( Recette et Production ).

  

Nous devons donc créer deux fichiers *.env.recette* et *.env.production* et les déposer dans le bucket de notre projet GCP.
Contenu *.env.recette*

```bash
REACT_APP_API_URL=http://api-url-recette.com
```

  

Contenu *.env.production*
```bash
REACT_APP_API_URL=http://api-url-prod.com
```

  

Allons dans notre console GCP dans l'onglet Google Cloud Storage ([En savoir plus](https://cloud.google.com/storage/)) et déposer dans le bucket *react-app.appspot.com* nos fichiers d'environnement.
Nous allons maintenant ajouter un script qui permettra lors déploiement de récupèrer le fichier de configuration nécessaire à l'application en fonction de l'environenent ( Recette ou Production ).

  
Créer un dossier *commands* à la racine du projet et ajouter un fichier : *loadEnvCloudStorage.js*
Ajouter le code suivant dans votre fichier :

  

```js
const { Storage } =  require('@google-cloud/storage');
const  fs  =  require('fs');

const  projectId  =  'react-app';
const  bucketName  =  'react-app.appspot.com';
const  keyFile  =  'key.json';
const  gcloudKey  = process.argv[2];
const  env  = process.argv[3];

async  function  createKeyFile() {
    await  fs.writeFile(keyFile, gcloudKey, (resp,  err)  => {
    if  (err)  throw  err;
    return  resp;
    });
}

// write to a new key file
async  function  getConfigFile() {
    console.log(`Downloading config .env.${env} from bucket "${bucketName}"`);
    await  createKeyFile(keyFile, gcloudKey);
    const  storage  =  new  Storage({ projectId, keyFilename:  keyFile });
    const  directory  =  `.env.${env}`;
    await  storage
    .bucket(bucketName)
    .file(directory)
    .download({ destination:  '.env' })
    .then(()  =>  console.info(`Config .env.${env} file downloaded successfully`))
    .catch(error  =>  error);
}
getConfigFile();

```

  

Le script utilise deux librairies:
- **fs**, pour la manipulation de fichier.
- **@google-cloud/storage** pour interagir avec le service Google Cloud Storage.

 
Dans notre function, nous allons créer un fichier contenant notre secret key. Ce fichier est nécessaire lors de l'implémentation du service Storage.
Ensuite, on récupère le bon fichier pour le sauvegarder dans le code source de l'application en le renommant en .env

  

### Mise en place du script via Gitlab CI

Il nous suffit maintenant d'ajouter la commande qui executera ce script lors de la CI
Exemple : 
```bash
npm run start:config '$DEPLOY_KEY_JSON_PRODUCTION' production
```

Modifier le fichier *.gitlab-ci.yml* comme suit (version finale) :

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
    - npm run start:config '$DEPLOY_KEY_JSON_PRODUCTION' recette
    - gcloud app deploy ./app.recette.yml --version=$CI_PIPELINE_ID --promote --stop-previous-version

deploy_production:
    environment: production
    script:
    - npm run build
    - npm run start:config '$DEPLOY_KEY_JSON_PRODUCTION' production
    - gcloud app deploy ./app.yml --version=$CI_PIPELINE_ID --promote --stop-previous-version

```
Comme pour le step précédent, je vous invite à pusher vos modifications sur votre repository.

Gitlab CI devra faire le reste.
Nous pouvons observer l'execution du script dans les logs de la CI.

Vous pouvez ainsi vérifiez le résultat en allant sur les deux URLS suivantes :
https://react-app-recette.react-app.appspot.com et https://react-app.appspot.com


Si tout c'est bien passé, la valeur affichée doit être différente selon l'environnement. :)