<template>
  <div class="page-wrap">
    <div class="page-wrap__header">
      <div class="page-wrap__title">Избранное</div>
    </div>
    <div class="page-wrap__content">
      <track-item
        v-for="(track, index) in favoriteTracks"
        :key="index"
        :track="track"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import TrackItem from '../../components/TrackItem/index.vue';
import { useTracksStore } from '../../store';

export default defineComponent({
  name: 'FavoritesTracksPage',

  components: {
    TrackItem
  },

  setup() {
    const tracksStore = useTracksStore();

    const favoriteTracks = computed(() => tracksStore.favoriteTracks);

    return {
      favoriteTracks,
    };
  }
})
</script>
