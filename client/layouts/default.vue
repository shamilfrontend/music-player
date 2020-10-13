<template>
  <div class="default-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
