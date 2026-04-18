<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'UiButton' });

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  block: false,
  loading: false,
  disabled: false
});

const buttonClasses = computed<Record<string, boolean>>(() => ({
  'ui-button': true,
  [`ui-button_variant_${props.variant}`]: true,
  [`ui-button_size_${props.size}`]: true,
  'ui-button_block': props.block,
  'ui-button_loading': props.loading
}));
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true">
      <i class="fa fa-spinner" />
    </span>
    <span class="ui-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 48px;
  padding: 0 var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  box-shadow: var(--shadow-sm);

  &:not(:disabled):hover {
    transform: translateY(-1px);
  }

  &_block {
    width: 100%;
  }

  &_size_lg {
    min-height: 56px;
    padding: 0 var(--space-6);
    font-size: 15px;
  }

  &_variant_primary {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-strong));
    color: var(--color-text);
  }

  &_variant_secondary {
    background-color: var(--color-surface-elevated);
    border-color: var(--color-border);
    color: var(--color-text);
  }

  &_variant_ghost {
    background-color: transparent;
    border-color: var(--color-border);
    box-shadow: none;
    color: var(--color-text-muted);
  }

  &_loading {
    pointer-events: none;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__spinner {
    display: inline-flex;
    font-size: 14px;
    animation: track-icon-rotating 1s linear infinite;
  }
}
</style>
