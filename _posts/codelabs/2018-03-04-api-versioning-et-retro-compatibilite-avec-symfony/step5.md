Félicitations, vous avez terminé l'implémentation du versioning et de la gestion de rétrocompatibilités dans votre API !

### Utilisation

Vous pouvez dès maintenant tester votre implémentation en effectuant des requêtes à votre API et en spécifiant un header de version de la façon suivante :

```
$ curl -H 'X-Accept-Version: 1.0.1' http://monapi.local

<données retro-compatibles>
```

Enfin, souvenez vous que si aucun header n'est spécifié, aucune rétrocompatibilité ne sera appliquée : vous serez donc sur la version la plus récente de votre API.

Je suis preneur de feedbacks sur cette implémentation donc n'hésitez pas à me contacter si vous avez des soucis de mise en place ou d'utilisation.

### Conclusion

Bien que les fichiers de rétrocompatibilités soient simples à mettre en place par les développeurs, il ne faut pas se faire influencer par vos clients (d'API) et gérer trop de versions de rétrocompatibilités.

Au mieux, vous devez toujours avoir une seule version rétrocompatible. Cependant, dans certains cas comme le déploiement d'application mobile, vous êtes dépendants des utilisateurs qui ne font pas forcément les mises à jour dès la sortie et devez donc garder une ou deux versions supplémentaires rétrocompatibles.

Vous détenez le coeur métier de vos clients, n'hésitez pas à les pousser à évoluer sur les nouvelles versions.
