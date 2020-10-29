<template>
  <div class="app">
    <div class="app__inner">
      <div class="app__content">
        <nuxt />
      </div>

      <div class="app__footer">
        <player-mini />

        <div class="app-menu">
          <nuxt-link to="/" class="app-menu__btn">
            <i class="fa fa-home fa-lg" />
          </nuxt-link>
          <!--nuxt-link to="/add" class="app-menu__btn">
            <i class="fa fa-plus fa-lg" />
          </nuxt-link-->
          <!--nuxt-link to="/tracks2" class="app-menu__btn">
            <i class="fa fa-heart fa-lg" />
          </nuxt-link -->
          <nuxt-link to="/tracks" class="app-menu__btn">
            <i class="fa fa-bars fa-lg" />
          </nuxt-link>
          <button class="app-menu__btn" @click="handleLogoutClick">
            <i class="fa fa-sign-out fa-lg" />
          </button>
        </div>
      </div>
    </div>

    <player-screen />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import PlayerMini from '../components/PlayerMini'
import PlayerScreen from '../components/PlayerScreen'

export default {
  name: 'PlayerLayout',

  components: {
    PlayerMini,
    PlayerScreen
  },

  methods: {
    ...mapMutations('musics', ['setData']),

    handleLogoutClick() {
      this.setData([
        {
          key: 'isPlaying',
          value: false
        }
      ])
      this.$router.push('/signin')
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;

  &__inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    // background-color: var(--dark-color);
  }

  &__content {
    flex-grow: 1;
  }

  &__footer {
    min-height: calc(var(--player-mini-height) + var(--player-menu-height));
  }
}

.app-menu {
  display: flex;
  justify-content: space-between;

  &__btn {
    width: 25%;
    padding: 16px;
    color: var(--font-color);
    text-align: center;

    &.nuxt-link-exact-active {
      color: var(--second-color);
    }
  }
}
</style>
