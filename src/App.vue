<template>
  <div class="app">
    <div class="app__inner">
      <the-header />

      <div class="app__content">
        <router-view />
      </div>

      <div class="app__footer">
        <player-mini v-show="currentTrack" />

        <nav-bar />
      </div>
    </div>

    <player-screen />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import { useTracksStore } from './store';
import type { Nullable } from './types';

import TheHeader from './components/TheHeader';
import PlayerMini from './components/PlayerMini';
import PlayerScreen from './components/PlayerScreen';
import NavBar from './components/NavBar';

export default defineComponent({
  name: 'App',

  components: {
    TheHeader,
    PlayerMini,
    PlayerScreen,
    NavBar
  },

  setup() {
    const isPlaying = ref<boolean>(false);
    const audioElement = ref<Nullable<HTMLAudioElement>>(null);
    const isListShown = ref<boolean>(false);

    const tracksStore = useTracksStore();

    const tracks = computed(() => tracksStore.tracks);
    const currentTrack = computed(() => tracksStore.currentTrack);

    const handleLogoutClick = () => {};

    return {
      audioElement,
      isPlaying,
      tracks,
      currentTrack,
      isListShown,
      handleLogoutClick,
    };
  }
});
</script>

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
