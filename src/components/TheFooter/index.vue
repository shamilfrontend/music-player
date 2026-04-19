<script lang="ts" setup>
defineOptions({ name: 'TheFooter' });

const MENU_LIST = [
  {
    routeName: 'HOME' as const,
    icon: 'fa-home',
    label: 'Главная'
  },
  {
    routeName: 'ALL_TRACKS' as const,
    icon: 'fa-list',
    label: 'Все треки'
  },
  {
    routeName: 'FAVORITE' as const,
    icon: 'fa-heart',
    label: 'Избранное'
  },
  {
    routeName: 'ADD_TRACK' as const,
    icon: 'fa-plus',
    label: 'Добавить'
  },
];
</script>

<template>
  <nav class="the-footer" aria-label="Основная навигация">
    <router-link
      v-for="menuItem in MENU_LIST"
      :key="menuItem.routeName"
      :to="{ name: menuItem.routeName }"
      class="the-footer__btn"
    >
      <i :class="`fa ${menuItem.icon} fa-lg`" />
      <span>{{ menuItem.label }}</span>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
.the-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  min-height: var(--player-menu-height);
  padding: var(--space-3) var(--page-padding) var(--space-4);
  background:
    linear-gradient(180deg, rgba(8, 17, 31, 0), rgba(8, 17, 31, 0.92) 32%),
    rgba(8, 17, 31, 0.92);

  &__btn {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: 56px;
    padding: var(--space-2);
    border: 1px solid transparent;
    border-radius: 20px;
    color: var(--color-text-muted);
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.01em;
    text-align: center;

    &:hover {
      background-color: var(--color-surface-soft);
      color: var(--color-text);
    }

    &.router-link-exact-active {
      border-color: var(--color-border);
      background: linear-gradient(180deg, var(--color-primary-soft), rgba(255, 255, 255, 0.02));
      color: var(--color-primary);
    }
  }
}
</style>
