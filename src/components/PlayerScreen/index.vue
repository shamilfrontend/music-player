<template>
  <div
    ref="playerScreen"
    :class="playerScreenClasses"
  >
    <div class="player-screen__top">
      <div class="player-screen__cover">
        <img :src="currentTrack?.imageUrl" alt="" />

        <player-equilizer v-if="!isLoading" />
      </div>

      <div class="player-screen__progress">
        <progress
          value="1"
          max="100"
        />
      </div>

      <div class="player-screen__times">
        <div class="current-time">1:35</div>
        <div class="end-time">2:43</div>
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
          >
            <i
              class="fa fa-repeat"
              aria-hidden="true"
            />
          </button>

          <button
            class="music-controls__btn"
            type="button"
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
          >
            <i
              class="fa fa-forward"
              aria-hidden="true"
            />
          </button>

          <button
            class="music-controls__btn"
            type="button"
          >
            <i
              class="fa fa-random"
              aria-hidden="true"
            />
          </button>
        </template>
      </div>
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
import { defineComponent, computed } from 'vue';
import { useTracksStore } from '../../store';

import PlayerEquilizer from './PlayerEquilizer'

export default defineComponent({
  name: 'PlayerScreen',

  components: {
    PlayerEquilizer
  },

  setup() {
    const tracksStore = useTracksStore();

    const playerScreenClasses = computed<Record<string, boolean>>(() => ({
      'player-screen': true,
      'player-screen_active': tracksStore.isPlayerScreenShown
    }));

    const isPlaying = computed<boolean>(() => tracksStore.isPlaying);

    const currentTrack = computed(() => tracksStore.currentTrack);

    const isLoading = computed<boolean>(() => tracksStore.isLoadingTrack);

    const closePlayerScreen = (): void => {
      tracksStore.setPlayerScreen(false);
    };

    const handlePlayBtnClick = (): void => {
      tracksStore.setPlaying(!isPlaying.value);
    };

    return {
      isPlaying,
      currentTrack,
      isLoading,
      playerScreenClasses,
      closePlayerScreen,
      handlePlayBtnClick
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
    margin-top: auto;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
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
    width: 310px;
    margin: 0 auto 16px;

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
      -webkit-appearance: none;

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
    padding-top: 8px;
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
  -webkit-appearance: none;
  width: calc(100% - (70px));
  height: 2px;
  border-radius: 5px;
  background-color: #fff;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
</style>
