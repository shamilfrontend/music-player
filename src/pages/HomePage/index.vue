<script lang="ts" setup>
import { computed } from 'vue';

import TrackItem from '../../components/TrackItem/index.vue';

import { useTracksStore } from '../../store';
import { usePageLayout } from '../../composables/usePageLayout';
import UiCard from '../../ui/UiCard.vue';
import UiEmptyState from '../../ui/UiEmptyState.vue';

defineOptions({ name: 'HomePage' });

const tracksStore = useTracksStore();
const { pageClassName } = usePageLayout('home-page');

const tracks = computed(() => tracksStore.tracks);
</script>

<template>
  <div :class="pageClassName">
    <div class="page-heading">
      <span class="page-heading__eyebrow">Library</span>
      <h1 class="page-heading__title">Сейчас в коллекции</h1>
      <p class="page-heading__description">
        Основной каталог треков с быстрым запуском воспроизведения и переходом в полноэкранный плеер.
      </p>
    </div>

    <ui-card class="home-page__list" :padded="false" elevated>
      <ui-empty-state
        v-if="!tracks.length"
        class="home-page__empty"
        icon="fa-music"
        title="Коллекция пока пуста"
        description="Когда появятся треки, они будут доступны здесь для быстрого запуска."
      />

      <track-item
        v-for="track in tracks"
        v-else
        :key="track.id"
        :track="track"
        class="home-page__track"
      />
    </ui-card>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-top: var(--space-6);

  &__list {
    overflow: hidden;
  }

  &__empty {
    padding: var(--space-8);
  }

  &__track {
    border-bottom: 1px solid var(--color-border);

    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>
