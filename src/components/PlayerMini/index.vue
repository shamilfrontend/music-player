<template>
  <div
    class="player-mini"
    @click="handleWrapperClick"
  >
    <div class="player-mini__content">
      <img
        :src="currentTrack?.imageUrl"
        alt="song"
        class="player-mini__image"
      />

      <div class="player-mini__info">
        <div class="player-mini__info-name">{{ currentTrack?.name }}</div>
        <div class="player-mini__info-author">
          {{ currentTrack?.author }} Lorem ipsum dolor sit amet.
        </div>
      </div>

      <div class="player-mini__buttons">
        <button
          v-if="isLoading"
          type="button"
        >
          <i
            class="player-mini__icon player-mini__icon-loading fa fa-spinner"
            aria-hidden="true"
          />
        </button>

        <button
          v-else
          type="button"
          @click.stop="toggleTrack"
        >
          <i
            class="player-mini__icon fa"
            :class="isPlaying ? 'fa-pause' : 'fa-play'"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <audio
      ref="audio"
      class="player-mini__audio"
      :loop="isLooping"
      :src="currentTrack?.trackUrl"
      preload="auto"
      @timeupdate="handleTimeUpdate"
      @loadeddata="handleLoad"
      @volumechange="handleVolumeChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

import type { Nullable } from '../../types';

import { useTracksStore } from '../../store';
import type { PlayerMiniInstance } from './types';

export default defineComponent({
  name: 'PlayerMini',

  setup(): PlayerMiniInstance {
    const tracksStore = useTracksStore();

    const audio = ref<Nullable<HTMLAudioElement>>(null);
    const currentTime = ref<number>(0);

    const isPlaying = computed<boolean>(() => tracksStore.state.isPlaying);
    const isLooping = computed<boolean>(() => tracksStore.state.isLooping);
    const currentTrack = computed(() => tracksStore.currentTrack);
    const isPlayerScreenShown = computed<boolean>(() => tracksStore.state.isPlayerScreenShown);
    const isLoading = computed<boolean>(() => tracksStore.state.isLoadingTrack);

    const handleWrapperClick = (): void => {
      tracksStore.state.isPlayerScreenShown = true;
    };

    const toggleTrack = (): void => {
      // if (isPlaying.value) {
      //   audio.value?.pause();
      // } else {
      //   audio.value?.play();
      // }
      //
      // tracksStore.state.isPlaying = !isPlaying.value;
    };

    const handleTimeUpdate = () => {
      if (!audio.value) return;

      tracksStore.currentSeconds = Number(audio.value.currentTime);
    };

    const handleVolumeChange = (event: Event) => {
      const value = (event.target as HTMLAudioElement);

      tracksStore.volume = value.volume * 100;
    };

    const handleLoad = () => {
      if (!audio.value) return;

      if (audio.value.readyState >= 2) {
        tracksStore.state.isLooping = true;
        tracksStore.durationSeconds = Number(audio.value.duration);

        audio.value.play();
        return tracksStore.state.isPlaying = true;
      }

      throw new Error('Failed to load sound file.');
    };

    watch(() => tracksStore.state.isPlaying, (value: boolean) => {
      if (!audio.value) return;

      if (value && audio.value.readyState >= 2) {
        audio.value.play();
        return;
      }

      audio.value.pause();
    });

    watch(() => tracksStore.volume, () => {
      if (!audio.value) return;

      audio.value.volume = tracksStore.volume / 100;
    });

    return {
      audio,
      currentTime,
      isPlaying,
      isLooping,
      currentTrack,
      isPlayerScreenShown,
      isLoading,
      handleWrapperClick,
      toggleTrack,
      handleTimeUpdate,
      handleVolumeChange,
      handleLoad,
    }
  }
})
</script>

<style lang="scss" scoped>
.player-mini {
  min-height: var(--player-mini-height);
  padding: 12px;
  background-color: var(--second-color);
  border-top: 1px solid var(--dark-color);

  &__content {
    display: flex;
    align-items: center;
  }

  &__image {
    display: block;
    min-width: 48px;
    height: 48px;
    margin-right: 12px;
  }

  &__info {
    width: calc(100% - 150px);
    color: var(--font-color);

    * {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-name {
      font-weight: 600;
    }

    &-author {
      font-size: 12px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    margin-left: auto;
  }

  &__icon {
    font-size: 28px;
    color: var(--font-color);

    &-loading {
      animation: track-icon-rotating 1s linear infinite;
    }
  }

  &__audio {
    visibility: visible;
  }
}
</style>
