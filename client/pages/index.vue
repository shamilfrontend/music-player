<template>
  <div class="index-page">
    <div class="index-page__header">
      <span class="index-page__title">Популярные треки</span>
      <nuxt-link to="/tracks" class="index-page__link">Все треки</nuxt-link>
    </div>

    <div class="content">
      <track-item
        v-for="(track, index) in tracks"
        :key="index"
        :track="track"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TrackItem from '../components/TrackItem'

export default {
  name: 'HomePage',

  middleware: 'is-auth',

  layout: 'player',

  components: {
    TrackItem
  },

  computed: {
    ...mapState('musics', ['tracks']),

    playerScreenClasses() {
      return {
        'player-screen': true,
        'player-screen_active': this.isPlayerScreenShown
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  position: relative;
  height: 100%;
  background-color: var(--dark-color-medium);

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: var(--dark-color);
  }

  &__title {
    color: var(--font-color);
    font-size: 16px;
    font-weight: 500;
  }

  &__link {
    text-decoration: none;
    color: var(--second-color);
  }
}

.content {
  overflow: auto;
  color: #fff;
}

.proggres-bar {
  height: 2px;
  width: 100%;
  margin: 0 8px;
  background-color: var(--dark-color);
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  display: block;
  position: relative;
  width: 40%;
  height: 100%;
  background-color: var(--second-color);
  border-radius: 6px;
}

.cover-img {
  position: relative;
  z-index: 2;
}
</style>
