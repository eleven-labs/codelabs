Nous allons donc avoir besoin de spécifier les changements de rétro-compatibilité à appliquer lorsqu'une version précédente est demandée.

Il nous faut alors implémenter une liste des versions dans la configuration de Symfony avec, pour chaque version, le namespace complet du fichier qui contient les versions à appliquer.

# Spécifions les versions rétro-compatibles

Editez alors le fichier `app/config/parameters.yml` de votre projet (ou `config/services.yaml` sous Symfony 4) et ajoutez-y l'entrée suivante sous `parameters` :

```yaml
parameters:
    versions:
        1.1.0: Acme\VersionChanges\VersionChanges110
        1.0.0: Acme\VersionChanges\VersionChanges100
        0.9.0: Acme\VersionChanges\VersionChanges009
        0.8.0: Acme\VersionChanges\VersionChanges008
```

Nous spécifions une liste de la version la plus récente à la plus ancienne.

> **Note** : La version actuelle (1.2.0) n'apparaît pas dans cette liste car il s'agit ici uniquement de la liste des versions sur lesquels nous souhaitons appliquer une rétro-compatibilité.

Les changements de rétro-compatibilité seront alors appliqués dans ce même ordre.

Ainsi, dans le cas ou un client ajoute un header `X-Accept-Version: 0.9.0` dans ses requêtes, alors, les changements de rétro-compatibilité des versions seront joués respectivement dans l'ordre `1.1.0`, `1.0.0` puis `0.9.0`.

La version `0.8.0` ne devra quand à elle ne pas être jouée car elle correspond à un modèle encore plus ancien que celui demandé.

# Prochaine étape

Cette configuration doit ensuite être interprêtée par Symfony et les changements nécessaires appliqués à la réponse de votre API en fonction de la version demandée.
