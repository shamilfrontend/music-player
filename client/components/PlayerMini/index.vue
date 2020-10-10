<template>
  <div class="player-mini" @click="handleWrapperClick">
    <div class="player-mini__content">
      <img :src="currentTrack.image" alt="song" style="width: 40px;" />

      <div class="player-mini__info">
        <div class="player-mini__info-name">{{ currentTrack.name }}</div>
        <div class="player-mini__info-author">
          {{ currentTrack.author }} Lorem ipsum dolor sit amet.
        </div>
      </div>

      <div class="player-mini__buttons">
        <button class="player-mini__btn">
          <i class="fa fa-backward" aria-hidden="true"></i>
        </button>
        <button class="player-mini__btn" @click.stop="handlePlayBtnClick">
          <i
            class="fa"
            :class="isPlaying ? 'fa-play' : 'fa-pause'"
            aria-hidden="true"
          />
        </button>
        <button class="player-mini__btn">
          <i class="fa fa-forward" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <audio ref="audio" class="player-mini__audio">
      <source :src="currentTrack.musicUrl" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
export default {
  name: 'PlayerMini',

  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    currentTrack: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {}
  },

  watch: {
    currentTrack(value) {},
    isPlaying(value) {}
  },

  methods: {
    handleWrapperClick() {
      this.$emit('open')
    },

    handlePlayBtnClick() {
      this.$emit('toggle-playing', !this.isPlaying)

      if (this.isPlaying) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player-mini {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--player-color);
  padding: 16px 20px;
  margin-top: auto;

  &__content {
    display: flex;
    align-items: center;
  }

  &__info {
    width: 170px;
    margin-left: 10px;

    * {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-name {
      color: var(--font-color);
      font-weight: 600;
    }

    &-author {
      color: var(--secondary-font-color);
      font-size: 12px;
    }
  }

  &__buttons {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  &__btn {
    & > i {
      font-size: 20px;
    }

    &:nth-child(2) {
      margin: 0 20px;

      & > i {
        font-size: 24px;
      }
    }
  }

  &__audio {
    display: none;
  }
}

.time {
  display: inline-block;
  font-size: 8px;
  line-height: 12px;
  color: var(--font-color);

  &:first-of-type {
    color: var(--secondary-font-color);
  }
}
</style>
