## Création du player Exoplayer :

## Prérequis :

Créer un fichier versions.gradle dans le repertoire de votre projet
Y introduire la liste des versions que vous utiliserez dans vos dépendances,
ici :

```java
ext {
	exoPlayerVersion = '2.9.6'
}
```

Dans votre fichier build.gradle applicatif ajoutez en haut :

apply from: 'versions.gradle'

enfin ajoutez dans votre fichier build.gradle les dépendances à exoplayer :

```java
    // exoplayer
    implementation "com.google.android.exoplayer:exoplayer-core:$exoPlayerVersion"
    implementation "com.google.android.exoplayer:exoplayer-ui:$exoPlayerVersion"
```

## En ce qui concerne le Player

Nous allons créer une classe Player. cette classe va avoir un role de façade sur notre player exoplayer pour executer toutes nos actions type play, pause, instancier notre player, le configurer en fonction du flux d'entrée etc..

Pour commencer nous allons créer une variable privé de type SimpleExoPlayer et l'initialiser dans notre objet :

```java
class Player(val context: Context) {

    private var player: SimpleExoPlayer? = null

    init {
        player = ExoPlayerFactory.newSimpleInstance(context)
    }
}
```

A partir d'ici nous avons notre player instancié, maintenant il faut lui permettre de lire des vidéos locales. Pour se faire nous allons créer une methode qui va lui permettre de décoder notre fichier video. Exoplayer est capable de lire un nombre assez conséquent de format vidéo différent, que ce soit des vidéos locales ou des streams live. Pour différencier ces types de flux d'entrées nous devons créer un fichier de type MediaSource, qui est le media finale que nous passerons à notre player exoplayer pour qu'il le lise. Pour créer ce fichier, nous devons passer par une des factory Exoplayer, qui différra en fonction du flux. A savoir qu'en entrée, la factory va demander une URI.

Ici j'ai choisis de lire un fichier MP4, donc format consideré comme standard par exoplayer :

```java
    private fun buildMediaSource(uri: Uri): MediaSource {
        val factorymediaSourceFactory: ExtractorMediaSource.Factory =
            ExtractorMediaSource.Factory(
                DefaultDataSourceFactory(
                    context,
                    Util.getUserAgent(context, "MyNetflix")
                )
            )
        return factorymediaSourceFactory.createMediaSource(uri)
    }
```

Nous avons donc notre player, notre MediaSource resultant de la transformation de notre URI. Il nous manque un dernier détail. Pour pouvoir s'afficher correctement, exoplayer a besoin qu'on lui fournisse une SurfaceView, custom view de la librairie Exoplayer sur laquelle il va pouvoir afficher son contenu.

Nous allons donc pour l'instant ajouter une methode pour fournir à notre objet Player une surfaceView :

```java
    fun setVideoSurface(surfaceview: SurfaceView) {
        player?.setVideoSurfaceView(surfaceview)
    }
```

Enfin biensur, nous allons ajouter plusieurs actions, pour pouvoir tester notre super player par la suite.

Pour charger notre média :

```java
    fun prepare(uri: Uri) {
        player?.prepare(buildMediaSource(uri), false, true);
    }
```

Pour reset notre player :

```java
    fun stop() {
        player?.stop(true)
        player?.seekToDefaultPosition()
    }
```

Pour lancer la lecture :

```java
    fun play() {
        player?.playWhenReady = true
    }
```

Et pour le mettre en pause :

```java
    fun pause() {
        player?.playWhenReady = false
    }
```

A savoir que pour indiquer que l'on veux jouer la vidéo de notre player, il faut modifier la valeur du boolean playWhenReady, Exoplayer écoute cette valeur, dès qu'elle est modifié et si il n'est pas en cours d'initialition, il lancera instanément la vidéo, sinon il attendra de finir son initialisation puis la lancera.

