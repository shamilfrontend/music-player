<script setup lang="ts">
defineOptions({ name: 'UiEmptyState' });

interface Props {
  icon: string;
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <div class="ui-empty-state">
    <div class="ui-empty-state__icon" aria-hidden="true">
      <i class="fa" :class="icon" />
    </div>
    <h2 class="ui-empty-state__title">{{ title }}</h2>
    <p class="ui-empty-state__description">{{ description }}</p>
    <div v-if="$slots.action" class="ui-empty-state__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;

  &__icon {
    display: grid;
    place-items: center;
    width: 72px;
    height: 72px;
    border: 1px solid var(--color-border);
    border-radius: 24px;
    background-color: var(--color-surface-soft);
    color: var(--color-primary);
    font-size: 28px;
  }

  &__title {
    font-size: 24px;
    line-height: 1.2;
    font-weight: 700;
    color: var(--color-text);
  }

  &__description {
    max-width: 420px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  &__action {
    margin-top: var(--space-2);
  }
}
</style>
