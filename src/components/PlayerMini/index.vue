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

        <template v-else>
          <button
            v-if="false"
            type="button"
            @click.stop
          >
            <i
              class="player-mini__icon fa fa-backward"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            @click.stop="toggleTrack"
          >
            <i
              class="player-mini__icon fa"
              :class="isPlaying ? 'fa-pause' : 'fa-play'"
              aria-hidden="true"
            />
          </button>

          <button
            v-if="false"
            type="button"
            @click.stop
          >
            <i
              class="player-mini__icon fa fa-forward"
              aria-hidden="true"
            />
          </button>
        </template>
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
      @pause="state.playing = false"
      @play="state.playing = true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

import type { Nullable } from '../../types';

import { useTracksStore } from '../../store';
import type { Track } from '../../store/modules/tracks';
import type { PlayerMiniInstance } from './types';

export default defineComponent({
  name: 'PlayerMini',

  setup(): PlayerMiniInstance {
    const tracksStore = useTracksStore();

    const audio = ref<Nullable<HTMLAudioElement>>(null);
    const currentTime = ref<number>(0);

    const isPlaying = computed<boolean>(() => tracksStore.isPlaying);
    const isLooping = computed<boolean>(() => tracksStore.isLooping);
    const currentTrack = computed(() => tracksStore.currentTrack);
    const isPlayerScreenShown = computed<boolean>(() => tracksStore.isPlayerScreenShown);
    const isLoading = computed<boolean>(() => tracksStore.isLoadingTrack);

    const handleWrapperClick = (): void => {
      tracksStore.isPlayerScreenShown = true;
    };

    const toggleTrack = (): void => {
      if (isPlaying.value) {
        audio.value?.pause();
      } else {
        audio.value?.play();
      }

      tracksStore.isPlaying = !isPlaying.value;
    };

    const handleTimeUpdate = () => {
      if (!audio.value) return;

      tracksStore.currentSeconds = Number(audio.value.currentTime);
    };

    const handleLoad = () => {
      if (!audio.value) return;

      if (audio.value.readyState >= 2) {
        tracksStore.isLooping = true;
        tracksStore.durationSeconds = Number(audio.value.duration);

        return tracksStore.isPlaying = true;
      }

      throw new Error('Failed to load sound file.');
    };

    // watch(() => isPlaying.value, (value: boolean) => {
    //   console.log('isPlaying.value', isPlaying.value);
    //   if (value) {
    //     audio.value?.play();
    //   } else {
    //     audio.value?.pause();
    //   }
    // });

    watch(() => currentTrack.value, (track: Track) => {
      if (!audio.value || !currentTrack.value) return;

      tracksStore.isLoadingTrack = true;
      audio.value.setAttribute('src', track.trackUrl);

      audio.value.addEventListener('canplaythrough', () => {
        tracksStore.isLoadingTrack = false;
      });

      if (currentTrack.value?.id === track.id) {
        if (isPlaying.value) {
          audio.value?.play();
        } else {
          audio.value?.pause();
        }
      } else {
        if (!isPlaying.value) {
          audio.value.play();
        } else {
          audio.value.pause();
        }
      }
    });

    watch(() => tracksStore.isPlaying, (value: boolean) => {
      if (!audio.value) return;
      console.log('tracksStore.isPlaying', value)

      if (value) {
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
      handleLoad,
    }
  }
})
</script>

<style lang="scss" scoped>
.player-mini {
  height: var(--player-mini-height);
  padding: 10px;
  background-color: var(--second-color);
  border-top: 1px solid var(--dark-color);

  &__content {
    display: flex;
    align-items: center;
  }

  &__image {
    display: block;
    min-width: 40px;
    height: 40px;
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
    //visibility: visible;
  }
}
</style>
