<script lang="ts" setup>
import { computed, type Component } from 'vue';

import { useRoute } from 'vue-router';

import BaseLayout from './layouts/BaseLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

defineOptions({ name: 'App' });

const route = useRoute();

const layoutComponent = computed<Component>(() =>
  route.name === 'LOGIN' ? EmptyLayout : BaseLayout
);
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<style lang="scss">
@import "./assets/styles/base";
@import "./assets/styles/keyframes";
</style>
