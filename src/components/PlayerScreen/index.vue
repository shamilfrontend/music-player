<template>
  <div
    ref="playerScreen"
    :class="playerScreenClasses"
  >
    <div class="player-screen__top">
      <div class="player-screen__cover">
        <img :src="currentTrack?.imageUrl" alt="" />

        <player-equilizer v-if="false" />
      </div>

      <div class="player-screen__progress">
        <progress
          :value="progressValue"
          max="100"
        />
      </div>

      <div class="player-screen__times">
        <div class="current-time">{{ currentSecondsConverted }}</div>
        <div class="end-time">{{ durationSecondsConverted }}</div>
      </div>
    </div>

    <div class="player-screen__bottom">
      <div class="player-screen__info">
        <p class="player-screen__info-name">{{ currentTrack?.name }}</p>
        <p class="player-screen__info-author">{{ currentTrack?.author }}</p>
      </div>

      <div class="music-controls">
        <button
          v-if="isLoading"
          type="button"
        >
          <i
            class="music-controls__icon music-controls__icon-loading fa fa-spinner"
            aria-hidden="true"
          />
        </button>

        <template v-else>
          <button
            class="music-controls__btn"
            type="button"
            disabled
          >
            <i
              class="fa fa-repeat"
              aria-hidden="true"
            />
          </button>

          <button
            class="music-controls__btn"
            type="button"
            disabled
          >
            <i
              class="fa fa-backward"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            class="music-controls__play-pause"
            @click="handlePlayBtnClick"
          >
            <i
              class="fa"
              :class="isPlaying ? 'fa-pause' : 'fa-play'"
              aria-hidden="true"
            />
          </button>

          <button
            class="music-controls__btn"
            type="button"
            disabled
          >
            <i
              class="fa fa-forward"
              aria-hidden="true"
            />
          </button>

          <button
            class="music-controls__btn"
            type="button"
            disabled
          >
            <i
              class="fa fa-random"
              aria-hidden="true"
            />
          </button>
        </template>
      </div>

      <input
        v-model.lazy.number="volume"
        type="range"
        class="volume-slider"
        :style="{ 'background-size': `${volume}% 100%` }"
        min="0"
        max="100"
        @input="handleVolumeInput"
      />
    </div>

    <button
      class="player-screen__close"
      type="button"
      @click="closePlayerScreen"
    >
      <i
        class="fa fa-arrow-down"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from 'vue';
import { useTracksStore } from '../../store';

import { PlayerEquilizer } from './PlayerEquilizer'

function convertTimeHHMMSS(value: number): string {
  let hhmmss = new Date(value * 1000).toISOString().substr(11, 8);

  return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
}

export default defineComponent({
  name: 'PlayerScreen',

  components: {
    PlayerEquilizer
  },

  setup() {
    const tracksStore = useTracksStore();

    const playerScreenClasses = computed<Record<string, boolean>>(() => ({
      'player-screen': true,
      'player-screen_active': tracksStore.state.isPlayerScreenShown
    }));

    const isPlaying = computed<boolean>(() => tracksStore.state.isPlaying);

    const currentTrack = computed(() => tracksStore.currentTrack);

    const isLoading = computed<boolean>(() => tracksStore.state.isLoadingTrack);

    const volume = computed<number>(() => tracksStore.volume);

    const currentSecondsConverted = computed(
      () => convertTimeHHMMSS(tracksStore.currentSeconds)
    );

    const durationSecondsConverted = computed(
      () => convertTimeHHMMSS(tracksStore.durationSeconds)
    );

    const progressValue = computed(() => {
      if (!tracksStore.currentSeconds && !tracksStore.durationSeconds) return 0;

      return Number(tracksStore.currentSeconds / tracksStore.durationSeconds * 100)
    });

    const handlePlayBtnClick = (): void => {
      tracksStore.state.isPlaying = !isPlaying.value;
    };

    const handleVolumeInput = (event: Event): void => {
      const value = (event.target as HTMLInputElement).value;
      tracksStore.volume = Number(value);
    };

    const closePlayerScreen = (): void => {
      tracksStore.state.isPlayerScreenShown = false;
    };

    const handleEscapeKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closePlayerScreen()
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleEscapeKeyDown);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
    });

    return {
      isPlaying,
      currentTrack,
      isLoading,
      volume,
      playerScreenClasses,
      currentSecondsConverted,
      durationSecondsConverted,
      progressValue,
      handlePlayBtnClick,
      handleVolumeInput,
      closePlayerScreen,
    }
  }
});
</script>

<style lang="scss" scoped>
.player-screen {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--dark-color);
  height: 0;
  padding: 0;
  overflow: hidden;
  transform: translatey(100%);
  transition: all 0.4s ease;

  &__top {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  &__close {
    display: block;
    width: 100%;
    margin-top: auto;
    padding: 16px;
    color: #fff;
    font-size: 18px;
  }

  &__cover {
    position: relative;
    margin: 0 auto 4px;

    img {
      width: 100%;
      height: auto;
      display: block;
      margin-right: auto;
      margin-left: auto;
    }
  }

  &__progress {
    & > progress {
      border: 0;
      color: #ed5483;
      height: 5px;
      width: 100%;
      appearance: none;

      &::-webkit-progress-value {
        background-color: #b8235a;
        border-radius: 10px;
      }

      &::-webkit-progress-bar {
        height: 5px;
        background-color: #d8d8d8;
        border-radius: 10px;
      }
    }
  }

  &__times {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 12px;
    color: var(--font-color);
  }

  &__info {
    color: var(--font-color);
    text-align: center;

    &-name {
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 18px;
    }

    &-author {
      font-size: 14px;
    }
  }

  &_active {
    top: 0;
    height: 100%;
    padding: 0 16px 16px;
    transform: translatey(0);
    transition: all 0.4s ease;
  }
}

.music-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  width: 100%;

  &__btn {
    width: 40px;
    height: 40px;
    color: #fff;
    border-radius: 12px;
    background-color: var(--second-color);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    i {
      font-size: 14px;
    }
  }

  &__icon {
    font-size: 28px;
    color: var(--font-color);

    &-loading {
      animation: track-icon-rotating 1s linear infinite;
    }
  }

  &__play-pause {
    width: 60px;
    height: 60px;
    font-size: 20px;
    color: #fff;
    border-radius: 12px;
    background-color: var(--secong);
  }
}

.song-progress {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 30px 6px 0;
  margin: 0 auto;

  &__time {
    display: inline-block;
    font-size: 8px;
    line-height: 12px;
    color: #fff;
  }

  &__bar {
    border-radius: 6px;
    height: 4px;
    width: 100%;
    margin: 0 8px;
    overflow: hidden;
    background-color: var(--dark-color-medium);

    &-fill {
      display: block;
      position: relative;
      width: 0;
      height: 100%;
      background-color: #6343e4;
      border-radius: 6px;
    }
  }
}

.volume-slider {
  appearance: none;
  margin-right: 15px;
  width: 100%;
  height: 7px;
  border-radius: 5px;
  background-color: #fff;
  background-image: linear-gradient(to right, var(--secong), var(--secong));
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 26px;
    width: 26px;
    border-radius: 50%;
    background-color: var(--second-color);
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 var(--dark-color-light);
    transition: background .3s ease-in-out;
  }

  &::-webkit-slider-runnable-track  {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
}
</style>
