<template>
  <div class="home-page">
    <the-header />

    <div class="home-page__tracks">
      <track-item
        v-for="(track, index) in tracks"
        :key="index"
        :track="track"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import TheHeader from '../../components/TheHeader';
import TrackItem from '../../components/TrackItem/index.vue';

import { useTracksStore } from '../../store';

export default defineComponent({
  components: {
    TheHeader,
    TrackItem
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

  &__tracks {
    overflow: auto;
    height: calc(100% - var(--player-mini-height));
  }
}
</style>
