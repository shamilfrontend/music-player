<template>
  <div class="home-page">
    <div class="home-page__tracks">
      <track-item
        v-for="(track, index) in tracks"
        :key="index"
        :track="track"
        class="home-page__track"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import TrackItem from '../../components/TrackItem/index.vue';

import { useTracksStore } from '../../store';

export default defineComponent({
  name: 'HomePage',

  components: {
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
  background-color: var(--dark-color-medium);

  &__tracks {
  }

  &__track {
    border-bottom: 1px solid rgba(198, 178, 250, 0.1);

    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>
