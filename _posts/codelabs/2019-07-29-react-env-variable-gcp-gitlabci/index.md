## Qu'allons-nous faire ?

Lors du developpement d'une application, il est toujours nécessaire d'avoir un environnement de recette et de production indépendant l'un de l'autre, pour tester de nouvelles features en recette et ensuite être capable de les déployer en production en toute sérénité.

Problématique :
Ces applications nécessite parfois de faire appel à des services externes, comme des API ( Rest // Graphql ).
Si nous prenons l'exemple d'un appel vers une API Rest ou GraphQL, l'URL appellée par notre application de recette devra être différente de l'URL appellée par l'application de production.

Solution :
Afin de gérer cette problématique, il est nécessaire d'utiliser ce que l'on appelle des variables d'environnements pour dissocier la configuration de nos deux applications.

Il est assez facile de gérer ces variables d'environnement dans un projet perso mais qu'en est il dans un environnement tel que Google Cloud Platform pour des projets professionnels.

Dans ce codelabs, nous allons donc voir comment créer et déployer ( Via Gitlab CI ) une application React sur différents environnements d'execution ( Recette // Production ) dans l'ecosysteme Google Cloud Platform ( App Engine ) et comment gérer ses variables d'environnements.

## Liens utiles

Nous allons créer une application [React](https://facebook.github.io/create-react-app/docs/documentation-intro)
Nous aurons besoin d'avoir un compte [Google Cloud Platform](https://console.cloud.google.com)
Nous aurons également besoin d'un compte [Gitlab](https://about.gitlab.com/)

## Pré-requis

Nous aurons besoin d'une installation de [Npm & Nodejs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
Le code fourni pour le tutoriel est disponible [ici](https://github.com/RedPi/codelabs-env-var)

