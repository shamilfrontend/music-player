<template>
  <div class="music-app">
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
  </div>
</template>

<script>
import TrackItem from '../components/TrackItem'

export default {
  name: 'HomePage',

  middleware: 'is-auth',

  layout: 'player',

  components: {
    TrackItem
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
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  // height: calc(100% - 51px);
  overflow: hidden;
  background-color: var(--main-color);
  box-shadow: 0 0 2px 0 rgba(40, 42, 53, 0.28);
}

.content {
  overflow: auto;
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

.cover-img {
  position: relative;
  z-index: 2;
}
</style>
