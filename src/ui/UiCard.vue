<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'UiCard' });

interface Props {
  as?: 'div' | 'section' | 'article';
  elevated?: boolean;
  padded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  elevated: false,
  padded: true
});

const cardClasses = computed<Record<string, boolean>>(() => ({
  'ui-card': true,
  'ui-card_elevated': props.elevated,
  'ui-card_padded': props.padded
}));
</script>

<template>
  <component :is="as" :class="cardClasses">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.ui-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
    var(--color-surface);

  &_padded {
    padding: var(--space-6);
  }

  &_elevated {
    box-shadow: var(--shadow-md);
  }
}
</style>
