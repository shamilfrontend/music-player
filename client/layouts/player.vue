<template>
  <div class="wrapper">
    <the-header />
    <nuxt />
    <player-mini />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader'
import PlayerMini from '../components/PlayerMini'

export default {
  name: 'PlayerLayout',

  components: {
    TheHeader,
    PlayerMini
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
}
</style>
