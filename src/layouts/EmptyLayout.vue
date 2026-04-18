<script lang="ts" setup>
defineOptions({ name: 'EmptyLayout' });
</script>

<template>
  <div class="empty-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.empty-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  overflow: auto;
}
</style>
