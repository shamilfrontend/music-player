<template>
  <div class="nav-bar">
    <router-link
      v-for="(menuItem, index) in MENU_LIST"
      :key="index"
      :to="menuItem.link"
      class="nav-bar__btn"
    >
      <i :class="`fa ${menuItem.icon} fa-lg`" />
    </router-link>

    <button
      type="button"
      class="nav-bar__btn"
      @click="handleLogoutClick"
    >
      <i class="fa fa-sign-out fa-lg" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useTelegram } from '../../hooks/useTelegram';

const MENU_LIST = [
  {
    link: '/',
    icon: 'fa-heart'
  },
  {
    link: '/add',
    icon: 'fa-plus'
  },
];

export default defineComponent({
  name: 'PlayerScreen',

  setup() {
    const handleLogoutClick = (): void => {
      const { onClose } = useTelegram();

      onClose();
    };

    return {
      MENU_LIST,
      handleLogoutClick
    }
  }
});
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;

  &__btn {
    width: 20%;
    padding: 16px;
    color: var(--font-color);
    text-align: center;

    &.router-link-exact-active {
      color: var(--second-color);
    }
  }
}
</style>
