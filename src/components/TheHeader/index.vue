<template>
  <header class="the-header">
    <div class="the-header__title">Music Player</div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader'
});
</script>

<style lang="scss" scoped>
.the-header {
  padding: 12px;
  background-color: var(--dark-color);

  &__title {
    color: var(--font-color);
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }
}
</style>
