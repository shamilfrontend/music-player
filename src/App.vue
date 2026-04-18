<script lang="ts" setup>
import { computed, type Component } from 'vue';

import { useRoute } from 'vue-router';

import BaseLayout from './layouts/BaseLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

defineOptions({ name: 'App' });

const route = useRoute();

const layoutComponent = computed<Component>(() =>
  route.meta.layout === 'empty' ? EmptyLayout : BaseLayout
);
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<style lang="scss">
@use "./assets/styles/base.scss" as *;
@use "./assets/styles/keyframes.scss" as *;

.page-shell {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-height: 100%;
}

.page-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.page-heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.page-heading__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.page-heading__title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
}

.page-heading__description {
  max-width: 620px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

@media (max-width: 520px) {
  .page-heading__title {
    font-size: 22px;
  }

  .page-heading__description {
    font-size: 13px;
  }
}
</style>
