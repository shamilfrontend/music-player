<script setup lang="ts">
defineOptions({ name: 'UiInput' });

interface Props {
  modelValue: string;
  label: string;
  type?: 'text' | 'password' | 'email';
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  error?: string | null;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  name: '',
  placeholder: '',
  autocomplete: '',
  error: null
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement;

  emit('update:modelValue', target.value);
}
</script>

<template>
  <label class="ui-input">
    <span class="ui-input__label">{{ label }}</span>
    <input
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="ui-input__control"
      :class="{ 'ui-input__control_error': error }"
      @input="handleInput"
    />
    <span v-if="error" class="ui-input__error">{{ error }}</span>
  </label>
</template>

<style scoped lang="scss">
.ui-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  &__label {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  &__control {
    min-height: 52px;
    padding: 0 var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface-soft);
    color: var(--color-text);
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      border-color: var(--color-border-strong);
    }

    &:focus {
      border-color: var(--color-primary);
      background-color: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 4px var(--color-primary-soft);
    }

    &_error {
      border-color: rgba(255, 107, 129, 0.6);
    }
  }

  &__error {
    font-size: 12px;
    color: var(--color-danger);
  }
}
</style>
