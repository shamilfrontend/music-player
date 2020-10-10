<template>
  <div class="music-app">
    <header class="header">
      <button type="button" class="header__btn">
        <i class="fa fa-plus" aria-hidden="true" />
      </button>
      <span>Моя музыка</span>
      <button type="button" class="header__btn" @click="handleLogoutClick">
        <i class="fa fa-sign-out" aria-hidden="true" />
      </button>
    </header>

    <div class="content">
      <div class="content__header">
        <span class="content__title">Популярные треки</span>
      </div>

      <ul class="tracks">
        <track-item
          v-for="(track, index) in tracks"
          :key="index"
          :track="track"
          :is-playing="isPlaying"
          :current-track-id="currentTrack.id"
          @play="handlePlayTrack"
          @pause="handlePauseTrack"
        />
      </ul>
    </div>

    <player-mini
      :is-playing="isPlaying"
      :current-track="currentTrack"
      @open="isPlayerScreenShown = true"
      @toggle-playing="isPlaying = $event"
    />

    <player-screen
      :is-playing="isPlaying"
      :is-show="isPlayerScreenShown"
      :current-track="currentTrack"
      @close="isPlayerScreenShown = false"
      @toggle-playing="isPlaying = $event"
    />
  </div>
</template>

<script>
import TrackItem from '../components/TrackItem'
import PlayerMini from '../components/PlayerMini'
import PlayerScreen from '../components/PlayerScreen'

export default {
  name: 'HomePage',

  middleware: 'is-auth',

  components: {
    TrackItem,
    PlayerMini,
    PlayerScreen
  },

  data() {
    return {
      tracks: [
        {
          id: 1,
          image: '/albums/enrique_iglesias_lil_wayne_push.jpg',
          name: 'Push',
          author: 'Enrique Iglesias feat Lil Wayne',
          musicUrl: '/musics/enrique_iglesias_lil_wayne_push.mp3'
        },
        {
          id: 2,
          image: '/albums/the_runaways_cherry_bomb.jpg',
          name: 'Cherry Bomb',
          author: 'The Runaways',
          musicUrl: '/musics/the_runaways_cherry_bomb.mp3'
        },
        {
          id: 3,
          image: '/albums/k_maro_femme_like_u.jpg',
          name: 'Femme Like U',
          author: 'K-Maro',
          musicUrl: '/musics/k_maro_femme_like_u.mp3'
        },
        {
          id: 4,
          image:
            '/albums/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.jpg',
          name: 'Scared of the Dark',
          author: 'Lil Wayne, Ty Dolla $ign, Xxxtentacion',
          musicUrl:
            '/musics/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.mp3'
        }
      ],

      currentTrack: {
        id: 1,
        image: '/albums/enrique_iglesias_lil_wayne_push.jpg',
        name: 'Push',
        author: 'Enrique Iglesias feat Lil Wayne',
        musicUrl: '/musics/enrique_iglesias_lil_wayne_push.mp3'
      },

      isPlaying: true,
      isPlayerScreenShown: false
    }
  },

  computed: {
    playerScreenClasses() {
      return {
        'player-screen': true,
        'player-screen_active': this.isPlayerScreenShown
      }
    }
  },

  methods: {
    handleLogoutClick() {
      this.$router.push('/signin')
    },

    handlePlayTrack(track) {
      this.currentTrack = track
    },

    handlePauseTrack(track) {
      this.currentTrack = track
    },

    handlePlayerScreenToggle() {
      this.isPlayerScreenShown = !this.isPlayerScreenShown
    }
  }
}
</script>

<style lang="scss" scoped>
.music-app {
  position: relative;
  background-color: var(--main-color);
  width: 414px;
  height: 660px;
  box-shadow: 0 0 2px 0 rgba(40, 42, 53, 0.28);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 420px) {
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background-color: var(--player-color);
  color: var(--font-color);

  &__btn {
    & > i {
      color: var(--font-color);
      font-size: 22px;
    }
  }
}

.content {
  flex: 1;
  overflow: auto;
  height: calc(100% - 76px);
  color: #fff;

  &__header {
    display: flex;
    padding: 20px;
  }

  &__title {
    color: var(--font-color);
    font-size: 16px;
    font-weight: 500;
  }
}

.tracks {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.proggres-bar {
  height: 2px;
  width: 100%;
  margin: 0 8px;
  background-color: var(--main-color);
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  display: block;
  position: relative;
  width: 40%;
  height: 100%;
  background-color: var(--purple);
  border-radius: 6px;
}

.player-screen {
  position: absolute;
  top: 0;
  transform: translatey(100%);
  z-index: 2;
  background-color: var(--main-color);
  height: 100%;
  width: 100%;
  padding: 20px;
  transition: all 0.4s ease;

  &_active {
    top: 0;
    transform: translatey(0);
    transition: all 0.4s ease;
  }
}

.cover-img {
  position: relative;
  z-index: 2;
}
</style>
