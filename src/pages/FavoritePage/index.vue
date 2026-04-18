<script lang="ts" setup>
import { computed } from 'vue';

import { useTracksStore } from '../../store';
import { usePageLayout } from '../../composables/usePageLayout';
import UiCard from '../../ui/UiCard.vue';
import UiEmptyState from '../../ui/UiEmptyState.vue';

defineOptions({ name: 'FavoritePagePage' });

const tracksStore = useTracksStore();
const { pageClassName } = usePageLayout('favorite-page');

const favoriteCount = computed(() => tracksStore.favoriteTracks.length);
</script>

<template>
  <div :class="pageClassName">
    <div class="page-heading">
      <span class="page-heading__eyebrow">Favorites</span>
      <h1 class="page-heading__title">Избранные треки</h1>
      <p class="page-heading__description">
        В этом разделе собираются композиции, к которым пользователь возвращается чаще всего.
      </p>
    </div>

    <ui-card class="favorite-page__card" elevated>
      <ui-empty-state
        v-if="!favoriteCount"
        icon="fa-heart-o"
        title="Избранное пока пусто"
        description="Добавьте любимые треки в коллекцию, и они появятся на отдельном экране."
      />

      <div v-else class="favorite-page__summary">
        В коллекции уже {{ favoriteCount }} избранных трек(ов).
      </div>
    </ui-card>
  </div>
</template>

<style lang="scss" scoped>
.favorite-page {
  padding-top: var(--space-6);

  &__card {
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__summary {
    font-size: 15px;
    color: var(--color-text-muted);
  }
}
</style>
