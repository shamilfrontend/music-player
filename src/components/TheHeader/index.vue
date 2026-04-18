<script lang="ts" setup>
import { computed } from 'vue';

import { useRoute } from 'vue-router';

defineOptions({ name: 'TheHeader' });

const route = useRoute();

const pageMeta = computed<{ title: string; description: string }>(() => {
  switch (route.name) {
    case 'FAVORITE':
      return {
        title: 'Избранное',
        description: 'Быстрый доступ к сохранённым трекам'
      };
    case 'ADD_TRACK':
      return {
        title: 'Добавить трек',
        description: 'Подготовленный экран будущей загрузки'
      };
    default:
      return {
        title: 'Music player',
        description: 'Современный интерфейс прослушивания'
      };
  }
});
</script>

<template>
  <header class="the-header">
    <div class="the-header__brand">
      <span class="the-header__badge">Player</span>
      <div>
        <div class="the-header__title">{{ pageMeta.title }}</div>
        <div class="the-header__description">{{ pageMeta.description }}</div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.the-header {
  display: flex;
  align-items: center;
  min-height: var(--header-height);
  padding: var(--space-5) var(--page-padding);
  border-bottom: 1px solid var(--color-border);
  background-color: rgba(255, 255, 255, 0.02);

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    height: 48px;
    padding: 0 var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: 18px;
    background: linear-gradient(135deg, var(--color-primary-soft), rgba(127, 92, 255, 0.18));
    color: var(--color-primary);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__title {
    color: var(--color-text);
    font-size: 20px;
    font-weight: 700;
    line-height: 1.1;
  }

  &__description {
    margin-top: var(--space-1);
    color: var(--color-text-muted);
    font-size: 13px;
  }
}
</style>
