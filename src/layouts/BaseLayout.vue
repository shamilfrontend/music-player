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
  <div
    class="base-layout"
    :class="{ 'base-layout--no-mini': !currentTrack }"
  >
    <div class="base-layout__inner">
      <the-header />

      <main class="base-layout__content">
        <slot />
      </main>
    </div>

    <div class="base-layout__footer">
      <player-mini v-show="currentTrack" />

      <the-footer />
    </div>

    <player-screen />
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  height: 100vh;
  height: 100dvh;

  &__inner {
    display: flex;
    flex-direction: column;
    max-width: var(--page-max-width);
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0 auto;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent),
      rgba(8, 17, 31, 0.9);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    backdrop-filter: blur(14px);
  }

  &__content {
    flex: 1 1 auto;
    min-height: 0;
    padding: 0 var(--page-padding) var(--page-padding);
    padding-bottom: calc(
      var(--player-menu-height) + var(--space-3) + var(--space-4) + var(--player-mini-height) +
        var(--space-3) * 2 + env(safe-area-inset-bottom, 0)
    );
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%);

    .base-layout--no-mini & {
      padding-bottom: calc(
        var(--player-menu-height) + var(--space-3) + var(--space-4) + env(safe-area-inset-bottom, 0)
      );
    }
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: min(100%, var(--page-max-width));
    padding-bottom: env(safe-area-inset-bottom, 0);
    translate: -50% 0;
  }
}
</style>
