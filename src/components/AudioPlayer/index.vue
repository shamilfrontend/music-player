<template>
  <div class="player">
    <div class="player-controls">
      <div id="stop">
        <button
          title="Stop"
          class="player-control"
          @click.prevent="stop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M16,4.995v9.808C16,15.464,15.464,16,14.804,16H4.997C4.446,16,4,15.554,4,15.003V5.196C4,4.536,4.536,4,5.196,4h9.808C15.554,4,16,4.446,16,4.995z"
            />
          </svg>
        </button>
      </div>

      <div id="play">
        <button
          @click.prevent="state.playing = !state.playing"
          :title="state.playing ? 'Pause' : 'Play'"
          class="player-control"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              v-if="!state.playing"
              fill="currentColor"
              d="M15,10.001c0,0.299-0.305,0.514-0.305,0.514l-8.561,5.303C5.51,16.227,5,15.924,5,15.149V4.852c0-0.777,0.51-1.078,1.135-0.67l8.561,5.305C14.695,9.487,15,9.702,15,10.001z"
            />
            <path
              v-else
              fill="currentColor"
              d="M15,3h-2c-0.553,0-1,0.048-1,0.6v12.8c0,0.552,0.447,0.6,1,0.6h2c0.553,0,1-0.048,1-0.6V3.6C16,3.048,15.553,3,15,3z M7,3H5C4.447,3,4,3.048,4,3.6v12.8C4,16.952,4.447,17,5,17h2c0.553,0,1-0.048,1-0.6V3.6C8,3.048,7.553,3,7,3z"
            />
          </svg>
        </button>
      </div>

      <div id="seek">
        <div class="player-timeline">
          <div
            :style="progressStyle"
            class="player-progress"
          />
          <div
            class="player-seeker"
            title="Seek"
            @click="seek"
          />
        </div>

        <div class="player-time">
          <div class="player-time-current">{{ currentSecondsConverted }}</div>
          <div class="player-title">
            <p>Louis-Emmanuel Jadin &mdash; Nocturne No. 3 in G minor&nbsp;&nbsp;</p>
            <p>Louis-Emmanuel Jadin &mdash; Nocturne No. 3 in G minor&nbsp;&nbsp;</p>
          </div>
          <div class="player-time-total">{{ durationSecondsConverted }}</div>
        </div>
      </div>

      <div
        v-show="!state.showVolume"
        id="download"
      >
        <button
          class="player-control"
          title="Download"
          @click.prevent="download"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M15,7h-3V1H8v6H5l5,5L15,7z M19.338,13.532c-0.21-0.224-1.611-1.723-2.011-2.114C17.062,11.159,16.683,11,16.285,11h-1.757l3.064,2.994h-3.544c-0.102,0-0.194,0.052-0.24,0.133L12.992,16H7.008l-0.816-1.873c-0.046-0.081-0.139-0.133-0.24-0.133H2.408L5.471,11H3.715c-0.397,0-0.776,0.159-1.042,0.418c-0.4,0.392-1.801,1.891-2.011,2.114c-0.489,0.521-0.758,0.936-0.63,1.449l0.561,3.074c0.128,0.514,0.691,0.936,1.252,0.936h16.312c0.561,0,1.124-0.422,1.252-0.936l0.561-3.074C20.096,14.468,19.828,14.053,19.338,13.532z"
            />
          </svg>
        </button>
      </div>

      <div id="loop" v-show="!state.showVolume">
        <button
          class="player-control"
          title="Loop"
          @click.prevent="state.looping = !state.looping"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              v-if="!state.looping"
              fill="currentColor"
              d="M1,12V5h3v6h10V8l5,4.5L14,17v-3H3C1.895,14,1,13.104,1,12z"
            />
            <path
              v-else
              fill="currentColor"
              d="M20,7v7c0,1.103-0.896,2-2,2H2c-1.104,0-2-0.897-2-2V7c0-1.104,0.896-2,2-2h7V3l4,3.5L9,10V8H3v5h14V8h-3V5h4C19.104,5,20,5.896,20,7z"
            />
          </svg>
        </button>
      </div>

      <div
        v-show="!state.showVolume"
        id="mute"
      >
        <button
          class="player-control"
          title="Mute"
          @click.prevent="mute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              v-if="!muted"
              fill="currentColor"
              d="M5.312,4.566C4.19,5.685-0.715,12.681,3.523,16.918c4.236,4.238,11.23-0.668,12.354-1.789c1.121-1.119-0.335-4.395-3.252-7.312C9.706,4.898,6.434,3.441,5.312,4.566z M14.576,14.156c-0.332,0.328-2.895-0.457-5.364-2.928C6.745,8.759,5.956,6.195,6.288,5.865c0.328-0.332,2.894,0.457,5.36,2.926C14.119,11.258,14.906,13.824,14.576,14.156zM15.434,5.982l1.904-1.906c0.391-0.391,0.391-1.023,0-1.414c-0.39-0.391-1.023-0.391-1.414,0L14.02,4.568c-0.391,0.391-0.391,1.024,0,1.414C14.41,6.372,15.043,6.372,15.434,5.982z M11.124,3.8c0.483,0.268,1.091,0.095,1.36-0.388l1.087-1.926c0.268-0.483,0.095-1.091-0.388-1.36c-0.482-0.269-1.091-0.095-1.36,0.388L10.736,2.44C10.468,2.924,10.642,3.533,11.124,3.8z M19.872,6.816c-0.267-0.483-0.877-0.657-1.36-0.388l-1.94,1.061c-0.483,0.268-0.657,0.878-0.388,1.36c0.268,0.483,0.877,0.657,1.36,0.388l1.94-1.061C19.967,7.907,20.141,7.299,19.872,6.816z"
            />
            <path
              v-else
              fill="currentColor"
              d="M14.201,9.194c1.389,1.883,1.818,3.517,1.559,3.777c-0.26,0.258-1.893-0.17-3.778-1.559l-5.526,5.527c4.186,1.838,9.627-2.018,10.605-2.996c0.925-0.922,0.097-3.309-1.856-5.754L14.201,9.194z M8.667,7.941c-1.099-1.658-1.431-3.023-1.194-3.26c0.233-0.234,1.6,0.096,3.257,1.197l1.023-1.025C9.489,3.179,7.358,2.519,6.496,3.384C5.568,4.31,2.048,9.261,3.265,13.341L8.667,7.941z M18.521,1.478c-0.39-0.391-1.023-0.391-1.414,0L1.478,17.108c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.023,0.391,1.414,0l15.629-15.63C18.912,2.501,18.912,1.868,18.521,1.478z"
            />
          </svg>
        </button>
      </div>

      <div id="volume">
        <button
          :title="volumeTitle"
          class="player-control"
          @click.prevent=""
          @mouseenter="state.showVolume = true"
          @mouseleave="state.showVolume = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M19,13.805C19,14.462,18.462,15,17.805,15H1.533c-0.88,0-0.982-0.371-0.229-0.822l16.323-9.055C18.382,4.67,19,5.019,19,5.9V13.805z"
            />
          </svg>

          <input
            v-model.lazy.number="state.volume"
            v-show="state.showVolume"
            class="player-volume"
            type="range"
            min="0"
            max="100"
          />
        </button>
      </div>
    </div>

    <audio
      ref="audio"
      :loop="state.looping"
      :src="file"
      preload="auto"
      @timeupdate="update"
      @loadeddata="load"
      @pause="state.playing = false"
      @play="state.playing = true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from 'vue';

function convertTimeHHMMSS(val: number): string {
  let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);

  return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
}

export default defineComponent({
  name: 'AudioPlayer',

  props: {
    autoPlay: {
      type: Boolean,
      default: false
    },
    file: {
      type: String,
      default: null
    },
    loop: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const audio = ref<HTMLAudioElement | null>(null);

    const state = reactive({
      currentSeconds: 0,
      durationSeconds: 0,
      loaded: false,
      looping: false,
      playing: false,
      previousVolume: 35,
      showVolume: false,
      volume: 100
    });

    const currentSecondsConverted = computed(() => convertTimeHHMMSS(state.currentSeconds));

    const durationSecondsConverted = computed(() => convertTimeHHMMSS(state.durationSeconds));

    const muted = computed(() => state.volume / 100 === 0);

    const percentComplete = computed(() => Number(state.currentSeconds / state.durationSeconds * 100));

    const progressStyle = computed(() => ({ width: `${percentComplete.value}%` }));

    const volumeTitle = computed(() => `Volume (${state.volume}%)`);

    const download = () => {
      audio.value?.pause();
      window.open(props.file, 'download');
    };

    const load = () => {
      if (!audio.value) return;

      if (audio.value.readyState >= 2) {
        state.loaded = true;
        state.durationSeconds = Number(audio.value.duration);

        return state.playing = props.autoPlay;
      }

      throw new Error('Failed to load sound file.');
    };

    const mute = () => {
      if (muted.value) {
        return state.volume = state.previousVolume;
      }

      state.previousVolume = state.volume;
      state.volume = 0;
    };

    const seek = (e: any) => {
      if (!state.loaded || !audio.value) return;

      const bounds = e.target.getBoundingClientRect();
      const seekPos = (e.clientX - bounds.left) / bounds.width;

      audio.value.currentTime = Number(audio.value.duration * seekPos);
    };

    const stop = () => {
      if (!audio.value) return;

      state.playing = false;
      audio.value.currentTime = 0;
    };

    const update = (e: any) => {
      if (!audio.value) return;

      state.currentSeconds = Number(audio.value.currentTime);
    }

    watch(() => state.playing, (value: boolean) => {
      if (!audio.value) return;

      if (value) {
        audio.value.play();
        return;
      }

      audio.value.pause();
    });

    watch(() => state.volume, () => {
      if (!audio.value) return;

      audio.value.volume = state.volume / 100;
    });

    return {
      audio,
      state,
      currentSecondsConverted,
      durationSecondsConverted,
      muted,
      progressStyle,
      volumeTitle,
      download,
      load,
      stop,
      mute,
      seek,
      update,
    }
  }
})
</script>

<style lang="scss" scoped>
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: grid;
  font-family: 'Nunito', sans-serif;
  place-items: center;
}

$player-bg: #fff;
$player-border-color: darken($player-bg, 12%);
$player-link-color: darken($player-bg, 75%);
$player-progress-color: $player-link-color;
$player-text-color: $player-link-color;
$player-timeline-color: $player-border-color;

.player-wrapper {
  align-items: center;
  background-color: $player-bg;
  display: flex;
  height: 100vh;
  justify-content: center;
}

.player {
  background-color: $player-bg;
  border-radius: 0.3125rem;
  border: 1px solid $player-border-color;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
  color: $player-text-color;
  display: inline-block;
  line-height: 1.5625;
  position: relative;
}

.player-controls {
  display: grid;
  grid-template-areas: "a b c d e f g";
  max-width: 31.25rem;

  > div {
    border-right: 1px solid $player-border-color;

    &:last-child {
      border-right: none;
    }
  }
}

.player-control {
  background-color: #fff;
  border: none;
  color: $player-link-color;
  cursor: pointer;
  display: flex;
  line-height: 0;
  margin: 0;
  padding: 1em;
  text-decoration: none;

  > svg {
    width: 1.125rem;
  }
}

.player-timeline {
  background-color: $player-timeline-color;
  height: 50%;
  max-width: 12.8125rem;
  position: relative;

  .player-progress,
  .player-seeker {
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
  }

  .player-progress {
    background-color: $player-progress-color;
    z-index: 1;
  }

  .player-seeker {
    cursor: pointer;
    width: 100%;
    z-index: 2;
  }
}

.player-time {
  display: flex;
  justify-content: space-between;

  .player-time-current {
    font-weight: 700;
    padding: 0 0.3125rem;
  }

  .player-title {
    display: flex;
    flex-grow: 1;
    max-width: 6rem;
    overflow: hidden;

    p {
      animation: slide-x 10s linear infinite;
      white-space: nowrap;

      @keyframes slide-x {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    }
  }

  .player-time-total {
    opacity: 0.5;
    padding: 0 0.3125rem;
  }
}

.player-volume {
  display: inline-block;
  height: 1.1rem;
  margin: 0 0 0 0.625rem;
  width: 7.925rem;
}
</style>
