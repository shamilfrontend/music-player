<template>
  <div class="home-page">
    <div class="home-page__header">
      <div class="home-page__title">Music Player</div>
    </div>

    <div class="home-page__popular-tracks">
      <track-item
        v-for="(track, index) in tracks"
        :key="index"
        :track="track"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useTracksStore } from '../../store';

import TrackItem from '../../components/TrackItem/index.vue';

export default defineComponent({
  components: {
    TrackItem,
  },

  setup() {
    const tracksStore = useTracksStore();

    const tracks = computed(() => tracksStore.tracks);

    return {
      tracks
    }
  }
})
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  height: 100%;
  background-color: var(--dark-color-medium);

  &__header {
    padding: 20px;
    background-color: var(--dark-color);
  }

  &__title {
    color: var(--font-color);
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }

  &__popular-tracks {
    overflow: auto;
    height: calc(100% - var(--player-mini-height));
  }
}
</style>
