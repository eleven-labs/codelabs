# Codelabs

> Le principe de ce nouveau projet est plutôt simple : doter Eleven Labs de sa propre plateforme de tutos, simple, belle et intuitive (rien que ça). L'idée étant de commencer dans ce [style là](http://eleven-labs.us12.list-manage.com/track/click?u=10742232891cd45dd4db4277e&id=d9e264840f&e=d71465835f).
>
> C'est sur cette plateforme qu'iront les tutos qui aujourd'hui sont rédigés sous formes d'articles de blogs, ou de workshops. Cela permettrait à chacun de les suivre, étape par étape.
>
> —— [@MaxLf](https://github.com/MaxLf)

[![CircleCI](https://circleci.com/gh/eleven-labs/codelabs/tree/master.svg?style=svg)](https://circleci.com/gh/eleven-labs/codelabs/tree/master)
  
# Comment rédiger son tutoriel Codelabs

## 1/ “Au programme…”

Le but de cette partie est de présenter deux éléments :  
1/Une brève présentation de ce qui va être présenté dans le tutoriel  
2/ Les différentes notions techniques abordées  
3/ Les prérequis matériels ou softwares  

## 2/ Mise à disposition des ressources

Il convient ensuite de donner au participants les ressources nécessaires afin qu’il puisse effectuer le tutoriel sans avoir à aller chercher d’eux-mêmes. Il convient de bien préciser les versions utilisées, et de rediriger vers le Github du projet pour éviter toute confusion.  
Il y a du sample code à donner ? C’est ici  
Il faut installer des éléments ? On donne les liens pour qu’ils n’aient plus qu’à cliquer.  
Il y a des petites subtilités de configuration ? On les donne  
En bref il faut que le participant ait tout de prêt à la fin de cette partie.


## 3/ Les étapes de mise en place

On peut maintenant s’attaquer au vrai tutoriel et rentrer dans le vif du sujet.  
Il est important de découper intelligemment les étapes.  
Une étape doit faire le focus sur un élément spécifique et être considérée un peu comme une marche d’escalier. La fin d’une étape doit être une avancée significative, mais aussi une possibilité de s’arrêter, et revenir facilement vers ce qui a déjà été fait.  
Chaque étape doit disposer d’un moyen de tester si le résultat est correct avant d’avancer à la suivante. Elle doit aussi mettre en garde si des erreurs fréquentes peuvent constituer des pièges.


## 4/ Vérification et tests

Une fois le parcours du tutoriel complété, il s’agit maintenant d’accompagner le lecteur dans la vérification de son travail.  
En lui donnant les moyens d’observer le résultat de ses actions, en attirant son attention vers certains points critiques où des erreurs sont faciles, à tester sa création...

## 5/ Félicitations

1/ Ici, on commence par féliciter le courageux qui a su aller au bout du tutoriel.  
2/ Ensuite, on lui fait un petit récap’ de tout le travail accompli, de ce qu’il est maintenant capable de mettre en place.  
3/ On peut même lui donner quelques exercices à faire, qui allongeront la durée de vie du tutoriel.  
4/ Pour finir, on lui met à disposition des ressources supplémentaires, si il veut continuer à creuser par lui-même.

# Installer CodeLabs

CodeLabs s'installe comme un projet classique.

**1 - Cloner le projet**
```bash
git clone git@github.com:eleven-labs/codelabs.git
```

**2 - En local**
```bash
yarn install
yarn start
```

**3 - Via docker**
```bash
docker-compose up -d
```

Ajoutez dans votre `/etc/hosts`

```bash
127.0.0.1 codelabs.local
```

Go to [http://codelabs.local](http://codelabs.local)

--------------------------------------------------------------------

Créer votre page auteur
-------------------------

Suivez la procédure sur le repo du blog Eleven-Labs [ici](https://github.com/eleven-labs/blog.eleven-labs.com)


-------------------------

Créer votre article
----------------------------

**1 - Ajoutez votre tuto**

Dans le dossier `_posts/codelabs` ajoutez un dossier pour votre codelabs avec le naming suivant :

```bash
AAAA-MM-DD-titre
```
Puis créez l'architecture suivante :

├── index.json
├── index.md
├── step1.md
├── step2.md
├── step3.md

**2 - index.json**

C'est le fichier qui permet de configurer votre codelabs. Il doit absolument comporter les informations suivantes :


```json
{
  "title": "TITRE",
  "permalink": "URL",
  "excerpt": "DESCIPTION",
  "stepTitles": [
    "TITRE STEP 1",
    "TITRE STEP 2",
    "TITRE STEP 3"
  ],
  "date": "DATE",
  "cover": "URL DE LA COVER",
  "time": "TEMPS",
  "authors": [
    {
      "name": "NOM DE L'AUTHOR",
      "username": "LOGIN"
    }
  ]
}
```

**3 - index.md**

Il s'agit du fichier de description du tutoriel. Cette étape permet d'expliquer ce que la personne va apprendre et ce qu'il a besoin d'installer avant de commencer le tutoriel.

Il s'agit d'un fichier en markdown.

**4 - step.md**

Le découpage du codelabs se fait par étape, il faut alors créer un fichier markdown par étape.

Votre codelabs doit être écrit en [markdown](https://guides.github.com/features/mastering-markdown/). Il existe de nombreuses solutions online pour écrire en markdown comme par exemple :

 - https://stackedit.io
 - http://dillinger.io

 Si vous avez besoin de mettre des images dans votre article il faut d'abord les ajouter dans le dossier suivant `_posts/assets/AAAA-MM-DD-titre/`, puis les insérer dans votre article.

**5 - Publication**

Il vous suffit de faire une pull request avec le nom de branche suivant :

```bash
git checkout -b feat/add-codelabs-TITRE
```

N'oubliez pas le tag  `publication`.

 Mettre en ligne un CodeLabs
 -----------

 **1 - Validation d'un CodeLabs**

 Tout le monde peut commenter une pull request de `publication`. Une fois approuvée, elle est mergée dans master.

 **ATTENTION**: Seulement quelques personnes ont le droit de merger les pulls requests

 **2 - On partage**

 Le CodeLabs est en ligne !!! Vous n'avez plus qu'à le partager.

 ---------------------------------

 Bonnes pratiques sur les images
-----------

**1 - Attention à la taille des images**

Ne mettez pas d'image ayant une résolution trop grande sur vos articles. Cela engendrerait des baisses de performance. Il ne sert à rien que votre image fasse plus de 800px de large.

**2 - Optimiser vos images**

Toujours afin de garder des performances satisfaisantes, optimisez vos images à l'aide de logiciels adaptés.
Des logiciels comme [ImageOptim](https://imageoptim.com/) sur Mac, [Trimage](https://trimage.org/) sur Linux ou [FileOptimizer](http://nikkhokkho.sourceforge.net/static.php?page=FileOptimizer) sur Windows offrent des interfaces très faciles d'utilisation et des compressions efficaces.
