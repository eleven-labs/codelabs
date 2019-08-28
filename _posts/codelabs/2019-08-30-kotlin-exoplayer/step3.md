## Allons plus loin

Bon dans ces deux premieres étapes nous avons était plutot straightforward pour avoir un player qui tourne bien.
Il s'agirait maintenant de l'étoffer un peu, et d'utiliser plus d'outil de la librairie.

Retournons sur notre class player et ajoutons un listener. La librairie exoplayer met à disposition un lister, Player.EventListener pour pouvoir écouter et être notifier tout changement de configuration, ou d'état du player.

Nous allons ici nous interesser plus particulièrement à deux des méthodes de ce listener, onPlayerError et onPlayerStateChanged qui notifie en cas de changement d'état et en cas d'erreur du player. Ces informations nous allosn les remontés à notre Custom View par le biais d'un listener que nous allons créer, un PlayerListener définis comme suit :

```java
interface PlayerListener {
    fun onError()
    fun onStateChanged(playerState: PlayerState)
}
```

puis nous allons créer une sealed class PlayerState qui comportera tout les différents état de notre player. L'utilisation d'une sealed class est plus approprié ici car elle marche très bien avec l'utilisation du when en kotlin :) Si jamais vous ne connaissez pas les sealed class, il s'agit d'une interface dont les objets pouvant en hériter sont limités aux objets définis dans son fichier, ça nous permet d'avoir une liste d'objet finis et maitrisé, réunis en un même fichier.

Concernant les états, si l'on regarde du coté d'exoplayer on a : 

```java
  /**
   * The player does not have any media to play.
   */
  int STATE_IDLE = 1;
  /**
   * The player is not able to immediately play from its current position. This state typically
   * occurs when more data needs to be loaded.
   */
  int STATE_BUFFERING = 2;
  /**
   * The player is able to immediately play from its current position. The player will be playing if
   * {@link #getPlayWhenReady()} is true, and paused otherwise.
   */
  int STATE_READY = 3;
  /**
   * The player has finished playing the media.
   */
  int STATE_ENDED = 4;
```

Nous allons donc créer 5 états, IDLE, BUFFERING, PLAYING, PAUSED, ENDED. 

```java
sealed class PlayerState {
    object IDLE : PlayerState()
    object BUFFERING : PlayerState()
    object PLAYING : PlayerState()
    object PAUSED : PlayerState()
    object ENDED : PlayerState()
}
```

Maintenant que nous avons nos objets communiquant, nous allons faire la connexion :

On va implementer Player.EventListener, ajouter en paramètre d'entrée notre nouveau listener et nous enregistrer sur le player Exoplayer:

```java
class Player(val context: Context, listener: PlayerListener) : Player.EventListener {

    private var player: SimpleExoPlayer = ExoPlayerFactory.newSimpleInstance(context)

    init {
        player.addListener(this)
    }
```

Ensuite nous allons override la méthode onPlayerStateChanged pour qu'à chaque état changeant elle puisse transmettre l'information par le biais de notre listener :

```java
    override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {
        when (playbackState) {
            Player.STATE_IDLE -> listener.onStateChanged(PlayerState.IDLE)
            Player.STATE_BUFFERING -> listener.onStateChanged(PlayerState.BUFFERING)
            Player.STATE_READY -> if (playWhenReady) {
                listener.onStateChanged(PlayerState.PLAYING)
            } else {
                listener.onStateChanged(PlayerState.PAUSED)
            }
            Player.STATE_ENDED -> listener.onStateChanged(PlayerState.ENDED)
        }
    }
```

Ensuite nous allons faire de même pour la méthode onPlayerError :

```java
 override fun onPlayerError(error: ExoPlaybackException?) {
        listener.onError()
 }
```

Ici nous entrons pas dans le détail des types d'erreurs et l'adaptation du message qui irait avec, dans le cadre de notre tutoriel nous allons juste remonté qu'il y a un soucis et rendre visible l'erreur. 

## Côté UI :

Retournons sur notre PlayerView, desormais elle va implémenter notre nouveau listener, PlayerListener, et régir à ces changements, je vous laisse aussi le soin d'ajouter à la création du PlayerManager notre listener.

Occupons nous de nos nouvelles méthodes, onStateChanged et onError. Nous allons ajouter un peu de composant UI pour nous aider à mieux visualiser nos états !

Dans votre fichier player_view.xml ajoutez :

```xml
    <ProgressBar
        android:id="@+id/spinner"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:visibility="gone" />

    <androidx.appcompat.widget.AppCompatImageButton
        android:id="@+id/retry_button"
        style="?android:attr/borderlessButtonStyle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="@drawable/exo_controls_play"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:visibility="gone" />

    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/error_message"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/retry_button" />
```

Ici nous avons une progressBar qui indiquera le buffering, un retryButton et un textView pour indiquer une erreur et proposer de relancer la vidéo.

Dans notre fichier PlayerView, nous pouvons donc remplir nos deux méthodes :

```java
   override fun onError() {
        error_message.text = "Une erreur technique est survenue"
        error_message.visibility = View.VISIBLE
    }

    override fun onStateChanged(playerState: PlayerState) {
        when (playerState) {
            is PlayerState.IDLE -> play_pause_button.visibility = View.VISIBLE
            is PlayerState.BUFFERING -> {
                play_pause_button.visibility = GONE
                spinner.visibility = View.VISIBLE
            }
            is PlayerState.PLAYING -> {
            	spinner.visibility = GONE
                play_pause_button.setBackgroundResource(R.drawable.exo_controls_pause)
                play_pause_button.visibility = View.VISIBLE
            }
            is PlayerState.PAUSED -> {
            	spinner.visibility = GONE
                play_pause_button.setBackgroundResource(R.drawable.exo_controls_play)
                play_pause_button.visibility = View.VISIBLE
            }
        }
    }
```

Vous pouvez supprimer le changement d'icone dans le onClickListener du play_plause_button et lancer votre application !


