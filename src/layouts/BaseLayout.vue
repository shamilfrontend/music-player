<script lang="ts" setup>
import { computed } from 'vue';

import { useTracksStore } from '../store';

import { TheHeader } from '../components/TheHeader';
import { PlayerMini } from '../components/PlayerMini';
import { PlayerScreen } from '../components/PlayerScreen';
import { TheFooter } from '../components/TheFooter';

defineOptions({ name: 'BaseLayout' });

const tracksStore = useTracksStore();

const currentTrack = computed(() => tracksStore.currentTrack);
</script>

<template>
  <div class="base-layout">
    <div class="base-layout__inner">
      <the-header />

      <main class="base-layout__content">
        <slot />
      </main>

      <div class="base-layout__footer">
        <player-mini v-show="currentTrack" />

        <the-footer />
      </div>
    </div>

    <player-screen />
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  min-height: 100vh;
  padding: var(--space-4);

  &__inner {
    display: flex;
    flex-direction: column;
    max-width: var(--page-max-width);
    min-height: calc(100vh - (var(--space-4) * 2));
    margin: 0 auto;
    border: 1px solid var(--color-border);
    border-radius: 32px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent),
      rgba(8, 17, 31, 0.9);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    backdrop-filter: blur(14px);
  }

  &__content {
    flex: 1;
    padding: 0 var(--page-padding) var(--page-padding);
    overflow-y: auto;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%);
  }

  &__footer {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background:
      linear-gradient(180deg, rgba(8, 17, 31, 0), rgba(8, 17, 31, 0.92) 32%),
      rgba(8, 17, 31, 0.92);
  }
}
</style>
