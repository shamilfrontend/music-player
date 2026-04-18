<script lang="ts" setup>
import { computed } from 'vue';

import { useTracksStore } from './store';

import { TheHeader } from './components/TheHeader';
import { PlayerMini } from './components/PlayerMini';
import { PlayerScreen } from './components/PlayerScreen';
import { TheFooter } from './components/TheFooter';

defineOptions({ name: 'App' });

const tracksStore = useTracksStore();

const currentTrack = computed(() => tracksStore.currentTrack);
</script>

<template>
  <div class="app">
    <div class="app__inner">
      <the-header />

      <div class="app__content">
        <router-view />
      </div>

      <div class="app__footer">
        <player-mini v-show="currentTrack" />

        <the-footer />
      </div>
    </div>

    <player-screen />
  </div>
</template>

<style lang="scss">
@import "./assets/styles/base";
@import "./assets/styles/keyframes";

.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;

  &__inner {
    display: flex;
    flex-direction: column;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    overflow: hidden;
  }

  &__content {
    flex-grow: 1;
    overflow: auto;
    height: calc(100vh - calc(var(--player-mini-height) + var(--player-menu-height)))
  }

  &__footer {
    position: sticky;
    bottom: 0;
    background-color: var(--dark-color);
  }
}
</style>
