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

const topTracks = computed(() => tracksStore.topTracksByPlays(3));
const newTracks = computed(() => tracksStore.newestTracks(3));

const isLibraryEmpty = computed(() => tracksStore.tracks.length === 0);
</script>

<template>
  <div :class="pageClassName">
    <template v-if="isLibraryEmpty">
      <ui-card
        class="home-page__list"
        :padded="false"
        elevated
      >
        <ui-empty-state
          class="home-page__empty"
          icon="fa-music"
          title="Коллекция пока пуста"
          description="Добавьте треки или дождитесь наполнения библиотеки."
        />
      </ui-card>
    </template>

    <template v-else>
      <section class="home-page__section">
        <div class="home-page__section-head">
          <div class="home-page__section-text">
            <h2 class="home-page__section-title">Топ прослушиваний</h2>
            <p class="home-page__section-desc">
              Чаще всего запускаемые композиции.
            </p>
          </div>
          <router-link
            :to="{ name: 'FAVORITE' }"
            class="home-page__section-link"
          >
            В избранное
            <i class="fa fa-angle-right" aria-hidden="true" />
          </router-link>
        </div>

        <ui-card
          class="home-page__list"
          :padded="false"
          elevated
        >
          <track-item
            v-for="track in topTracks"
            :key="track.id"
            :track="track"
            class="home-page__track"
          />
        </ui-card>
      </section>

      <section class="home-page__section">
        <div class="home-page__section-head">
          <div class="home-page__section-text">
            <h2 class="home-page__section-title">Новые треки</h2>
            <p class="home-page__section-desc">
              Недавно добавленные в каталог.
            </p>
          </div>
          <router-link
            :to="{ name: 'ALL_TRACKS' }"
            class="home-page__section-link"
          >
            Все треки
            <i class="fa fa-angle-right" aria-hidden="true" />
          </router-link>
        </div>

        <ui-card
          class="home-page__list"
          :padded="false"
          elevated
        >
          <track-item
            v-for="track in newTracks"
            :key="track.id"
            :track="track"
            class="home-page__track"
          />
        </ui-card>
      </section>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-top: var(--space-6);

  &__section {
    margin-bottom: var(--space-4);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-head {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }

  &__section-text {
    min-width: 0;
  }

  &__section-title {
    margin: 0;
    color: var(--color-text);
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
  }

  &__section-desc {
    margin: var(--space-2) 0 0;
    color: var(--color-text-muted);
    font-size: 0.9375rem;
    line-height: 1.45;
  }

  &__section-link {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border-radius: 12px;
    background-color: var(--color-surface-soft);
    color: var(--color-primary);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      background-color: var(--color-primary-soft);
    }

    .fa {
      font-size: 0.75rem;
      opacity: 0.85;
    }
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
