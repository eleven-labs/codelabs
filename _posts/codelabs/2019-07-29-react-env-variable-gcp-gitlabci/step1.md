## Creation de l'application React

### Pré-requis

Pour commencer, vous devez installer [Npm & Nodejs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Création de l'application REACT

A l'heure ou je redige ce codelabs, le framework React permet facilement de créer des interfaces utilisateurs interactives.
Nous allons donc créer une application très simple avec React.
Si vous désirez plus d'informations sur ce framework, rendez-vous [ici](https://fr.reactjs.org/)

Pour créer votre application, suivez les instructions suivantes  :  

  Dans un dossier *react-app*, lancer la commande suivante :
  
    ```bash
    npx create-react-app reat-app
    cd react-app
    npm start
    ```
Nous avons utiliser *create-react-app* qui génere automatiquement les fichiers nécessaires au bon fonctionnement d'une application React et ces dépendances. Nous pouvons consulter maintenant tous ces fichiers à la racine de notre projet.

Ensuite en nous plaçant dans le dossier du projet, nous avons lancer l'application avec la dernière ligne de commande.
En quelques instants, nous avons une application fonctionnelle dans notre environnement local.

Rendez-vous à cette adresse : http://localhost:3000 pour comptempler notre résultat :)

### Modification en vue du déploiement sur Google Cloud Platform

Notre objectif est de déployer notre application dans l'ecosysteme Google Cloud Platform et plus précisément via le sevice App Engine dont on parlera un peu plus loin.
Il est important de savoir que toutes les applications déployées sur App Engine sont servies via le port 8080.
Si vous avez suivi, notre application est disponible via le port 3000 par défaut, nous devons donc préventivement faire en sorte que notre application utilise le port 8080 pour éviter des surprises dans un futur proche.

Pour se faire, nous allons éditer le fichier *package.json*, qui gère une grande partie de la configuration de notre application.
Nous allons remplacer la ligne suivante :

    ```js
        "start": "react-scripts start"
    ```
par :

    ```js
        "start": "PORT=8080 react-scripts start"
    ```

Relancer ensuite votre application :

    ```bash
      Ctrl + C 
      npm start
    ```

Rendez vous ensuite [ici](http://localhost:8080) pour vérifier que votre application est disponible sur ce port.
Ce simple changement permettra de forcer l'application à utiliser le port 8080 et sera utiliser pour servir notre application par le service App Engine.

### Utiliser des variables d'environnement

Un des moyens de gérer les variables d'environnement dans une application React est d'utiliser un fichier .env dans lequel on stockera toutes les variables relatives à l'envirronement.

Pour eviter que personne ne puiss accéder à ce fichier sensible, nous allons ajouter ce dernier dans un fichier *.gitignore*
Notre application pourra faire réference à la même varaible d'environnement ( process.env.REACT_APP_API_URL par exemple) pour nos deux environnements d'execution ( Recette et Production ) mais lors de la compilation, cette varaible aura une valeur différente selon l'environnement.

Créons ce fichier .env.
Nous devons créer ce fichier à la racine du projet. Ajoutons maintenant une variable : 
    ```js
        REACT_APP_API_URL=http://api-url.com
    ```

Affichons cette variable dans notre application : 
Nous allons éditer le fichier *App.js* de notre application et remplacer le code par ce qui va suivre :

  ```js
    import React from 'react';
    import './App.css';

    const maVariable = process.env.REACT_APP_API_URL;

    function App() {
      return {maVariable};
    }

    export default App;
  ```

Avec ces modifications, nous avons supprimer le logo et le texte par defaut de React.
Nous avons définit une variable qui récupère la valeur de notre variable d'environnement.
Et demandons à notre component App d'afficher cette variable sur la home page de notre application.

Après sauvegarde du fichier, l'application va se recharger automatiquement et nous pourrons voir apparaitre la valeur de notre variable.
Nous verrons plus tard comment faire pour que cette variable changer de valeur selon l'environenent d'execution.

Notre application est fin prete, nous allons pouvoir la déployer sur Google Cloud Platform via le service App Engine.
Pour se faire nous devons tout d'abord créer un projet sur GCP.
