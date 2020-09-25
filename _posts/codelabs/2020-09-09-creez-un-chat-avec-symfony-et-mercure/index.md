## Qu'allons-nous faire ?

Le but de ce tutoriel est de maîtriser le protocole Mercure. Pour cela, nous allons le combiner au framework Symfony pour créer un petit système de chat. C'est une suite à l'article de blog de [découverte de Mercure](https://blog.eleven-labs.com/), que vous retrouverez sur notre blog.

Voici les étapes que nous allons suivre au cours de ce tutoriel :
-   Initialisation de l'environnement
-   Liaison entre notre application et Mercure
-   Mise en place : les Publisher/Subscriber
-   Gestion de la sécurité avec Mercure
-   Tests et conclusion

Le code source du projet est disponible sur mon github : 
-   [Astrochat](https://github.com/ArthurJCQ/astrochat)


## Pré-requis

Pour les besoins de ce tutoriel il vous faudra :

-   Avoir lu [notre article](https://blog.eleven-labs.com/) pour connaître les bases de Mercure
-   Avoir Docker d'installé sur son PC

Tout sera expliqué pas à pas, mais vous pouvez tout de même vous accompagnez de ces docs pendant le tutoriel si vous le souhaitez :
-   [Documentation officielle de Mercure](https://mercure.rocks/docs)
-   [Documentation de l'utilisation de Symfony avec Mercure](https://symfony.com/doc/current/mercure.html)
