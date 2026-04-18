<script lang="ts" setup>
defineOptions({ name: 'EmptyLayout' });
</script>

<template>
  <div class="empty-layout">
    <div class="empty-layout__inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty-layout {
  display: flex;
  align-items: stretch;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: var(--space-4);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0));

  &__inner {
    display: flex;
    flex: 1;
    width: 100%;
    max-width: var(--page-max-width);
    min-height: calc(100vh - (var(--space-4) * 2) - env(safe-area-inset-bottom, 0));
    min-height: calc(100dvh - (var(--space-4) * 2) - env(safe-area-inset-bottom, 0));
    border: 1px solid var(--color-border);
    border-radius: 32px;
    background:
      radial-gradient(circle at top right, rgba(127, 92, 255, 0.18), transparent 28%),
      rgba(8, 17, 31, 0.9);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    backdrop-filter: blur(16px);
  }
}
</style>
