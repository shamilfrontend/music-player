<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { usePageLayout } from '../../composables/usePageLayout';
import UiButton from '../../ui/UiButton.vue';
import UiCard from '../../ui/UiCard.vue';
import UiEmptyState from '../../ui/UiEmptyState.vue';

defineOptions({ name: 'AddTrackPage' });

const router = useRouter();
const { pageClassName } = usePageLayout('add-track-page');

function goHome(): void {
  router.push({ name: 'HOME' });
}
</script>

<template>
  <div :class="pageClassName">
    <div class="page-heading">
      <span class="page-heading__eyebrow">Загрузка</span>
      <h1 class="page-heading__title">Добавление треков</h1>
      <p class="page-heading__description">
        Экран подготовлен под будущий сценарий загрузки, поэтому здесь уже есть финальное пустое состояние.
      </p>
    </div>

    <ui-card class="add-track-page__card" elevated>
      <ui-empty-state
        icon="fa-plus"
        title="Форма загрузки скоро появится"
        description="Пока новый трек можно выбрать из уже доступной библиотеки на главном экране."
      >
        <template #action>
          <ui-button variant="secondary" @click="goHome">
            Перейти в библиотеку
          </ui-button>
        </template>
      </ui-empty-state>
    </ui-card>
  </div>
</template>

<style lang="scss" scoped>
.add-track-page {
  padding-top: var(--space-6);

  &__card {
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
