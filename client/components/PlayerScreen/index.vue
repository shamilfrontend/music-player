<template>
  <div ref="playerScreen" :class="playerScreenClasses">
    <div class="player-screen__top">
      <button class="player-screen__close" @click="handlePlayerScreenToggle">
        <i class="fa fa-arrow-down" aria-hidden="true" />
      </button>

      <div class="player-screen__cover">
        <img :src="currentTrack.imageUrl" alt="" />
      </div>

      <div class="player-screen__progress">
        <progress value="35" max="100" />
      </div>
      <div class="player-screen__times">
        <div class="current-time">1:35</div>
        <div class="end-time">2:43</div>
      </div>
    </div>

    <div class="player-screen__bottom">
      <div class="player-screen__info">
        <p class="player-screen__info-name">{{ currentTrack.name }}</p>
        <p class="player-screen__info-author">{{ currentTrack.author }}</p>
      </div>

      <div class="music-controls">
        <button class="music-btn repeat" type="button">
          <i class="fa fa-repeat" aria-hidden="true" />
        </button>

        <button class="music-btn rewind" type="button">
          <i class="fa fa-backward" aria-hidden="true" />
        </button>

        <button
          class="music-btn play-pause"
          type="button"
          @click="handlePlayBtnClick"
        >
          <i
            class="fa"
            :class="isPlaying ? 'fa-play' : 'fa-pause'"
            aria-hidden="true"
          />
        </button>

        <button class="music-btn forward" type="button">
          <i class="fa fa-forward" aria-hidden="true" />
        </button>

        <button class="music-btn shuffle" type="button">
          <i class="fa fa-random" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PlayerScreen',

  computed: {
    ...mapState('musics', ['isPlaying', 'isPlayerScreenShown', 'currentTrack']),

    playerScreenClasses() {
      return {
        'player-screen': true,
        'player-screen_active': this.isPlayerScreenShown
      }
    }
  },

  methods: {
    ...mapMutations('musics', ['setData']),

    handlePlayerScreenToggle() {
      this.setData([
        {
          key: 'isPlayerScreenShown',
          value: false
        }
      ])
    },

    handlePlayBtnClick() {
      this.setData([
        {
          key: 'isPlaying',
          value: !this.isPlaying
        }
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.player-screen {
  position: absolute;
  top: 0;
  transform: translatey(100%);
  z-index: 2;
  background-color: var(--main-color);
  height: 100%;
  width: 100%;
  padding: 16px;
  transition: all 0.4s ease;

  &__close {
    display: block;
    width: 100%;
    margin-bottom: 16px;

    & > i {
      color: #505a6f;
    }
  }

  &__cover {
    width: 100%;
    margin-bottom: 16px;

    img {
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
    text-align: center;

    &-name {
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--font-color);
      font-size: 18px;
    }

    &-author {
      color: var(--secondary-font-color);
      font-size: 12px;
    }
  }

  &_active {
    top: 0;
    transform: translatey(0);
    transition: all 0.4s ease;
  }
}

.music-controls {
  display: flex;
  justify-content: center;
  align-items: center;

  .music-btn {
    padding: 1rem;
  }

  .repeat i,
  .shuffle i {
    color: #818181;
  }

  .forward {
    margin-right: 1.5rem;
  }

  .rewind {
    margin-left: 1.5rem;
  }

  .play-pause {
    margin: 0 16px;
    width: 40px;
    height: 40px;
    color: #fff;
    background-color: var(--purple);
    border-radius: 12px;
    padding: 4px;
    box-shadow: 0 0 5px 2px rgba(91, 62, 222, 0.5);
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
    color: var(--secondary-font-color);
  }

  &__bar {
    border-radius: 6px;
    height: 4px;
    width: 100%;
    margin: 0 8px;
    overflow: hidden;
    background-color: var(--player-color);

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
  background: rgba(255, 255, 255, 0.314);
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
</style>
