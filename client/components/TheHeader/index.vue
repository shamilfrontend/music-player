<template>
  <header class="header">
    <button type="button" class="header__btn">
      <i class="fa fa-plus" aria-hidden="true" />
    </button>
    <span>Моя музыка</span>
    <button type="button" class="header__btn" @click="handleLogoutClick">
      <i class="fa fa-sign-out" aria-hidden="true" />
    </button>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',

  methods: {
    handleLogoutClick() {
      this.$router.push('/signin')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: var(--player-color);
  color: var(--font-color);

  &__btn {
    & > i {
      color: var(--font-color);
      font-size: 22px;
    }
  }
}
</style>
