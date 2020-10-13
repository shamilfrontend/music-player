<template>
  <div class="wrapper">
    <nuxt />

    <player-mini />

    <div class="player-footer">
      <nuxt-link to="/" class="player-footer__btn">
        <i class="fa fa-home fa-lg" />
      </nuxt-link>
      <nuxt-link to="/add" class="player-footer__btn">
        <i class="fa fa-plus fa-lg" />
      </nuxt-link>
      <!--nuxt-link to="/tracks2" class="player-footer__btn">
        <i class="fa fa-heart fa-lg" />
      </nuxt-link -->
      <nuxt-link to="/tracks" class="player-footer__btn">
        <i class="fa fa-bars fa-lg" />
      </nuxt-link>
      <button class="player-footer__btn" @click="handleLogoutClick">
        <i class="fa fa-sign-out fa-lg" />
      </button>
    </div>
    <player-screen />
  </div>
</template>

<script>
import PlayerMini from '../components/PlayerMini'
import PlayerScreen from '../components/PlayerScreen'

export default {
  name: 'PlayerLayout',

  components: {
    PlayerMini,
    PlayerScreen
  },

  methods: {
    handleLogoutClick() {
      this.$router.push('/signin')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
}

.player-footer {
  display: flex;
  justify-content: space-between;
  padding-right: 12px;
  padding-left: 12px;

  &__btn {
    padding: 16px;
    color: var(--font-color);

    &.nuxt-link-exact-active {
      color: var(--purple);
    }
  }
}
</style>
