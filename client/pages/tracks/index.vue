<template>
  <div class="tracks">
    <header class="tracks__header">
      <h1 class="tracks__title">Все треки</h1>
    </header>

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
import TrackItem from '../../components/TrackItem'

export default {
  name: 'TracksPage',

  middleware: 'is-auth',

  layout: 'player',

  components: {
    TrackItem
  },

  computed: {
    ...mapState('musics', ['tracks'])
  }
}
</script>

<style lang="scss" scoped>
.tracks {
  &__header {
    padding: 16px;
    border-bottom: 1px solid var(--dark-color-medium);
  }

  &__title {
    margin: 0;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
}
</style>
