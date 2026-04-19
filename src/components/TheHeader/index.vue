<script lang="ts" setup>
import { computed } from 'vue';

import { useRoute } from 'vue-router';

defineOptions({ name: 'TheHeader' });

const route = useRoute();

const pageMeta = computed<{ title: string; description: string }>(() => {
  switch (route.name) {
    case 'HOME':
      return {
        title: 'Главная',
        description: 'Библиотека и воспроизведение'
      };
    case 'FAVORITE':
      return {
        title: 'Избранное',
        description: 'Сохранённые треки'
      };
    case 'ADD_TRACK':
      return {
        title: 'Добавить трек',
        description: 'Загрузка новых композиций'
      };
    case 'LOGIN':
      return {
        title: 'Вход',
        description: 'Авторизация в приложении'
      };
    default:
      return {
        title: 'Music player',
        description: 'Прослушивание музыки'
      };
  }
});
</script>

<template>
  <header class="the-header">
    <div class="the-header__brand">
      <div class="the-header__badge">
        <img src="/favicon.ico" alt="">
      </div>

      <div>
        <div class="the-header__title">{{ pageMeta.title }}</div>
        <div class="the-header__description">{{ pageMeta.description }}</div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.the-header {
  align-items: center;
  min-height: var(--header-height);
  padding: var(--space-3) var(--page-padding);
  border-bottom: 1px solid var(--color-border);
  background-color: rgba(255, 255, 255, 0.02);

  &__brand {
    display: grid;
    grid-template-columns: 64px 1fr;
    align-items: center;
    gap: var(--space-4);
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    height: 64px;
    border-radius: 18px;
    background: linear-gradient(135deg, var(--color-primary-soft), rgba(127, 92, 255, 0.18));
    color: var(--color-primary);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    img {
      border-radius: 50%;
    }
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
