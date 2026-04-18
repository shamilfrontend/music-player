<script lang="ts" setup>
import { computed } from 'vue';

import TrackItem from '../../components/TrackItem/index.vue';

import { useTracksStore } from '../../store';
import { usePageLayout } from '../../composables/usePageLayout';
import UiCard from '../../ui/UiCard.vue';
import UiEmptyState from '../../ui/UiEmptyState.vue';

defineOptions({ name: 'FavoritePage' });

const tracksStore = useTracksStore();
const { pageClassName } = usePageLayout('favorite-page');

const favoriteTracks = computed(() => tracksStore.favoriteTracks);
</script>

<template>
  <div :class="pageClassName">
    <div class="page-heading">
      <span class="page-heading__eyebrow">Избранное</span>
      <h1 class="page-heading__title">Избранные треки</h1>
      <p class="page-heading__description">
        Композиции, к которым вы возвращаетесь чаще всего — быстрый запуск и тот же плеер, что в библиотеке.
      </p>
    </div>

    <ui-card class="favorite-page__list" :padded="false" elevated>
      <ui-empty-state
        v-if="!favoriteTracks.length"
        class="favorite-page__empty"
        icon="fa-heart-o"
        title="Избранное пока пусто"
        description="Отметьте треки сердечком в списке на главной — они появятся здесь."
      />

      <track-item
        v-for="track in favoriteTracks"
        v-else
        :key="track.id"
        :track="track"
        class="favorite-page__track"
      />
    </ui-card>
  </div>
</template>

<style lang="scss" scoped>
.favorite-page {
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
