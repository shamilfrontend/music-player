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
          v-if="0"
          type="button"
          class="player-mini__btn"
          @click.stop
        >
          <i
            class="fa fa-backward"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          class="player-mini__btn"
          @click.stop="toggleTrack"
        >
          <i
            class="fa"
            :class="isPlaying ? 'fa-pause' : 'fa-play'"
            aria-hidden="true"
          />
        </button>

        <button
          v-if="0"
          type="button"
          class="player-mini__btn"
          @click.stop
        >
          <i
            class="fa fa-forward"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <audio
      ref="audio"
      loop
      class="player-mini__audio"
    >
      <source
        :src="currentTrack?.trackUrl"
        type="audio/mpeg"
      />
    </audio>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import type { Nullable } from '@/types';

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
    const currentTrack = computed(() => tracksStore.currentTrack);
    const isPlayerScreenShown = computed<boolean>(() => tracksStore.isPlayerScreenShown);

    const handleWrapperClick = (): void => {
      tracksStore.setPlayerScreen(true);
    };

    const toggleTrack = (): void => {
      if (isPlaying.value) {
        audio.value?.pause();
      } else {
        audio.value?.play();
      }

      tracksStore.setPlaying(!isPlaying.value);
    };

    watch(() => isPlaying.value, (value: boolean) => {
      if (value) {
        audio.value?.play();
      } else {
        audio.value?.pause();
      }
    });

    watch(() => currentTrack.value, (track: Track) => {
      if (!audio.value || !currentTrack.value) return;

      audio.value.setAttribute('src', track.trackUrl);

      if (currentTrack.value?.id === track.id) {
        if (isPlaying.value) {
          audio.value.play();
        } else {
          audio.value.pause();
        }
      } else {
        if (!isPlaying.value) {
          audio.value.play();
        } else {
          audio.value.pause();
        }
      }
    });

    return {
      audio,
      currentTime,
      isPlaying,
      currentTrack,
      isPlayerScreenShown,
      handleWrapperClick,
      toggleTrack,
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

  &__btn {
    & > i {
      font-size: 28px;
      color: var(--font-color);
    }

    &:nth-child(2) {
      margin: 0 20px;

      & > i {
        font-size: 24px;
      }
    }
  }

  &__audio {
    //display: none;
    visibility: visible;
  }
}

.time {
  display: inline-block;
  font-size: 8px;
  line-height: 12px;
  color: var(--font-color);

  &:first-of-type {
    color: var(--dark-color-light);
  }
}
</style>
