<script lang="ts" setup>
defineOptions({ name: 'TheHeader' })
</script>

<template>
  <header class="the-header">
    <div class="the-header__title">Music player</div>
  </header>
</template>

<style lang="scss" scoped>
.the-header {
  padding: 12px;
  background-color: var(--dark-color);

  &__title {
    color: var(--font-color);
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
