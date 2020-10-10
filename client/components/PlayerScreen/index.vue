<template>
  <div ref="playerScreen" :class="playerScreenClasses">
    <button class="player-screen__close" @click="handlePlayerScreenToggle">
      <i class="fa fa-arrow-down" aria-hidden="true" />
    </button>

    <div class="player-screen__cover">
      <img :src="currentTrack.image" class="player-screen__cover-img" alt="" />
    </div>

    <div class="player-screen__info">
      <p class="player-screen__info-name">{{ currentTrack.name }}</p>
      <p class="player-screen__info-author">{{ currentTrack.author }}</p>
    </div>

    <div class="song-progress">
      <span class="song-progress__time">01:24</span>
      <div class="song-progress__bar">
        <span class="song-progress__bar-fill" style="width: 40%;" />
      </div>
      <span class="song-progress__time">03:44</span>
    </div>

    <div class="action-bar">
      <button class="btn btn-repeat"></button>
      <button class="btn btn-back"></button>

      <button class="play-button" @click="handlePlayBtnClick">
        <i
          class="fa"
          :class="isPlaying ? 'fa-play' : 'fa-pause'"
          aria-hidden="true"
        />
      </button>

      <button class="btn btn-play-next"></button>
      <button class="btn btn-list"></button>
    </div>

    <div class="sound-bar">
      <button class="btn btn-volume-down"></button>
      <div class="proggres-bar volume">
        <span class="progress"></span>
      </div>
      <button class="btn btn-volume-up"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerScreen',

  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    currentTrack: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    playerScreenClasses() {
      return {
        'player-screen': true,
        'player-screen_active': this.isShow
      }
    }
  },

  methods: {
    handlePlayerScreenToggle() {
      this.$emit('close')
    },

    handlePlayBtnClick() {
      const value = !this.isPlaying
      this.$emit('toggle-playing', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.player-screen {
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
    display: flex;
    justify-content: center;

    &-img {
      width: 100%;
      height: auto;
    }
  }

  &__info {
    text-align: center;

    &-name {
      color: var(--font-color);
      font-weight: 600;
    }

    &-author {
      color: var(--secondary-font-color);
      font-size: 12px;
    }
  }
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  .btn {
    width: 24px;
    height: 20px;

    &-repeat {
      margin-right: 16px;
    }
    &-list {
      margin-left: 16px;
    }
  }
}

.play-button {
  width: 40px;
  height: 40px;
  color: #fff;
  background-color: var(--purple);
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 0 5px 2px rgba(91, 62, 222, 0.5);
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

.sound-bar {
  display: flex;
  align-items: center;
  margin-top: 24px;

  .btn {
    width: 16px;
    height: 16px;
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

.volume {
  overflow: visible;
  cursor: pointer;
}

.volume .progress:after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--purple);
  right: 0;
  top: 50%;
  transform: translatey(-50%);
}
</style>
