<script lang="ts" setup>
defineOptions({ name: 'TheFooter' });

const MENU_LIST = [
  {
    link: '/',
    icon: 'fa-bars'
  },
  {
    link: '/favorite',
    icon: 'fa-heart'
  },
  {
    link: '/add',
    icon: 'fa-plus'
  },
];

const handleLogoutClick = (): void => {};
</script>

<template>
  <div class="the-footer">
    <router-link
      v-for="(menuItem, index) in MENU_LIST"
      :key="index"
      :to="menuItem.link"
      class="the-footer__btn"
    >
      <i :class="`fa ${menuItem.icon} fa-lg`" />
    </router-link>

    <button
      type="button"
      class="the-footer__btn"
      @click="handleLogoutClick"
    >
      <i class="fa fa-sign-out fa-lg" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.the-footer {
  display: flex;
  justify-content: space-between;

  &__btn {
    width: 100%;
    padding: 18px;
    color: var(--font-color);
    font-size: 16px;
    line-height: 24px;
    text-align: center;

    &.router-link-exact-active {
      color: var(--second-color);
    }
  }
}
</style>
