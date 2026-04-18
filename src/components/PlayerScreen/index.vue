<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import type { Nullable } from '../../types';

import { useTracksStore } from '../../store';

function convertTimeHHMMSS(value: number): string {
  const hhmmss = new Date(value * 1000).toISOString().slice(11, 19);

  return hhmmss.startsWith('00:') ? hhmmss.slice(3) : hhmmss;
}

defineOptions({ name: 'PlayerScreen' });

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

  return Number(tracksStore.currentSeconds / tracksStore.durationSeconds * 100);
});

const dialogLabelledBy = computed(() =>
  currentTrack.value ? 'player-screen-title' : undefined
);

const dialogAriaLabel = computed(() =>
  currentTrack.value ? undefined : 'Плеер'
);

const previousActiveElement = ref<Nullable<Element>>(null);

const handleProgressClick = (event: MouseEvent): void => {
  const duration = tracksStore.durationSeconds;

  if (!duration) return;

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));

  tracksStore.seekToSeconds(ratio * duration);
};

const handlePlayBtnClick = (): void => {
  tracksStore.state.isPlaying = !isPlaying.value;
};

const handleVolumeInput = (event: Event): void => {
  const { value } = event.target as HTMLInputElement;
  tracksStore.volume = Number(value);
};

const closePlayerScreen = (): void => {
  tracksStore.state.isPlayerScreenShown = false;
};

const handleEscapeKeyDown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closePlayerScreen();
  }
};

const setBodyScrollLocked = (locked: boolean): void => {
  const overflow = locked ? 'hidden' : '';
  document.body.style.overflow = overflow;
  document.documentElement.style.overflow = overflow;
};

watch(
  () => tracksStore.state.isPlayerScreenShown,
  async (shown) => {
    setBodyScrollLocked(shown);

    if (shown) {
      previousActiveElement.value = document.activeElement;
      await nextTick();

      return;
    }

    const restore = previousActiveElement.value;

    previousActiveElement.value = null;

    if (restore instanceof HTMLElement) {
      restore.focus();
    }
  },
  { immediate: true }
);

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKeyDown);
  setBodyScrollLocked(false);
});
</script>

<template>
  <div
    :class="playerScreenClasses"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="dialogLabelledBy"
    :aria-label="dialogAriaLabel"
  >
    <div class="player-screen__body">
      <div class="player-screen__top">
        <div class="player-screen__cover">
          <img :src="currentTrack?.imageUrl" alt="" />
        </div>

        <div
          class="player-screen__progress"
          role="presentation"
          @click="handleProgressClick"
        >
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
          <p
            v-if="currentTrack"
            id="player-screen-title"
            class="player-screen__info-name"
          >
            {{ currentTrack.name }}
          </p>
          <p class="player-screen__info-author">{{ currentTrack?.author }}</p>
        </div>

        <div class="music-controls">
          <button
            v-if="isLoading"
            type="button"
            aria-label="Загрузка трека"
          >
            <i
              class="music-controls__icon music-controls__icon-loading fa fa-spinner"
              aria-hidden="true"
            />
          </button>

          <template v-else>
            <button
              type="button"
              class="music-controls__play-pause"
              :aria-label="isPlaying ? 'Пауза' : 'Воспроизведение'"
              @click="handlePlayBtnClick"
            >
              <i
                class="fa"
                :class="isPlaying ? 'fa-pause' : 'fa-play'"
                aria-hidden="true"
              />
            </button>
          </template>
        </div>

        <label class="player-screen__volume">
          <span class="player-screen__volume-label">Громкость</span>
          <input
            :value="volume"
            type="range"
            class="volume-slider"
            :style="{ 'background-size': `${volume}% 100%` }"
            min="0"
            max="100"
            aria-label="Громкость"
            @input="handleVolumeInput"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-screen {
  position: fixed;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  max-height: 100dvh;
  padding: 24px;
  overflow: hidden;
  pointer-events: none;
  background: radial-gradient(circle at top, rgba(91, 140, 255, 0.18), transparent 30%), rgba(8, 17, 31, 0.98);
  transform: translateY(100%);
  transition: transform 0.4s ease;

  &__body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }

  &__top {
    width: min(360px, 100%);
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
    width: min(360px, 100%);
    margin-right: auto;
    margin-bottom: auto;
    margin-left: auto;
  }

  &__cover {
    position: relative;
    margin: 0 auto var(--space-4);

    img {
      width: 100%;
      aspect-ratio: 1;
      display: block;
      margin: 0 auto;
      object-fit: cover;
      border-radius: 32px;
      box-shadow: var(--shadow-lg);
    }
  }

  &__progress {
    cursor: pointer;

    & > progress {
      border: 0;
      color: var(--color-primary);
      height: 5px;
      width: 100%;
      appearance: none;

      &::-webkit-progress-value {
        background: linear-gradient(90deg, var(--color-primary), var(--color-primary-strong));
        border-radius: 10px;
      }

      &::-webkit-progress-bar {
        height: 5px;
        background-color: var(--color-surface-soft);
        border-radius: 10px;
      }

      &::-moz-progress-bar {
        background: linear-gradient(90deg, var(--color-primary), var(--color-primary-strong));
        border-radius: 10px;
      }
    }
  }

  &__times {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 12px;
    color: var(--color-text-muted);
  }

  &__info {
    color: var(--color-text);
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
    transform: translateY(0);
    pointer-events: auto;
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
    color: var(--color-text);
    border-radius: 12px;
    background-color: var(--color-surface-elevated);
    border: 1px solid var(--color-border);

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
    color: var(--color-text);

    &-loading {
      animation: track-icon-rotating 1s linear infinite;
    }
  }

  &__play-pause {
    width: 60px;
    height: 60px;
    font-size: 20px;
    color: var(--color-text);
    border-radius: 18px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-strong));
    box-shadow: var(--shadow-md);
  }
}

.player-screen__volume {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
}

.player-screen__volume-label {
  font-size: 12px;
  color: var(--color-text-muted);
}

.volume-slider {
  appearance: none;
  margin-right: 15px;
  width: 100%;
  height: 7px;
  border-radius: 5px;
  background-color: var(--color-surface-soft);
  background-image: linear-gradient(to right, var(--color-primary), var(--color-primary));
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 26px;
    width: 26px;
    border-radius: 50%;
    background-color: var(--color-primary);
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 var(--color-text-soft);
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
