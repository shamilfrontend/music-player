<script lang="ts" setup>
import { computed, ref } from 'vue';

import TrackItem from '../../components/TrackItem/index.vue';

import { useTracksStore } from '../../store';
import { usePageLayout } from '../../composables/usePageLayout';
import UiCard from '../../ui/UiCard.vue';
import UiEmptyState from '../../ui/UiEmptyState.vue';
import UiInput from '../../ui/UiInput.vue';

defineOptions({ name: 'HomePage' });

const tracksStore = useTracksStore();
const { pageClassName } = usePageLayout('home-page');

const searchQuery = ref('');

const tracks = computed(() => tracksStore.tracks);

const filteredTracks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();

  if (!q) {
    return tracks.value;
  }

  return tracks.value.filter(
    ({ name, author }) =>
      name.toLowerCase().includes(q) || author.toLowerCase().includes(q)
  );
});

const isLibraryEmpty = computed(() => tracks.value.length === 0);

const isSearchEmpty = computed(
  () => !isLibraryEmpty.value && filteredTracks.value.length === 0
);
</script>

<template>
  <div :class="pageClassName">
    <div class="page-heading">
      <span class="page-heading__eyebrow">Библиотека</span>
      <h1 class="page-heading__title">Сейчас в коллекции</h1>
      <p class="page-heading__description">
        Основной каталог треков с быстрым запуском воспроизведения и переходом в
        полноэкранный плеер.
      </p>
    </div>

    <div
      v-if="!isLibraryEmpty"
      class="home-page__search"
    >
      <ui-input
        v-model="searchQuery"
        label="Поиск по названию или исполнителю"
        name="library-search"
        placeholder="Начните вводить…"
        autocomplete="off"
      />
    </div>

    <ui-card
      class="home-page__list"
      :padded="false"
      elevated
    >
      <ui-empty-state
        v-if="isLibraryEmpty"
        class="home-page__empty"
        icon="fa-music"
        title="Коллекция пока пуста"
        description="Когда появятся треки, они будут доступны здесь для быстрого запуска."
      />

      <ui-empty-state
        v-else-if="isSearchEmpty"
        class="home-page__empty"
        icon="fa-search"
        title="Ничего не найдено"
        description="Попробуйте изменить запрос или сбросить поиск."
      />

      <track-item
        v-for="track in filteredTracks"
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

  &__search {
    margin-bottom: var(--space-4);
  }

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
