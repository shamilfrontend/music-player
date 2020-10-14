<template>
  <div class="player-mini" @click="handleWrapperClick">
    <div class="player-mini__content">
      <img :src="currentTrack.imageUrl" class="player-mini__image" alt="song" />

      <div class="player-mini__info">
        <div class="player-mini__info-name">{{ currentTrack.name }}</div>
        <div class="player-mini__info-author">
          {{ currentTrack.author }} Lorem ipsum dolor sit amet.
        </div>
      </div>

      <div class="player-mini__buttons">
        <button class="player-mini__btn">
          <i class="fa fa-backward" aria-hidden="true" />
        </button>
        <button class="player-mini__btn" @click.stop="handlePlayBtnClick">
          <i
            class="fa"
            :class="isPlaying ? 'fa-play' : 'fa-pause'"
            aria-hidden="true"
          />
        </button>
        <button class="player-mini__btn">
          <i class="fa fa-forward" aria-hidden="true" />
        </button>
      </div>
    </div>

    <audio ref="audio" class="player-mini__audio">
      <source :src="currentTrack.musicUrl" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PlayerMini',

  data() {
    return {}
  },

  computed: {
    ...mapState('musics', ['isPlaying', 'isPlayerScreenShown', 'currentTrack'])
  },

  watch: {
    currentTrack(value) {},
    isPlaying(value) {}
  },

  methods: {
    ...mapMutations('musics', ['setData']),

    handleWrapperClick() {
      this.setData([
        {
          key: 'isPlayerScreenShown',
          value: true
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
  height: var(--player-mini-height);
  padding: 12px;
  background-color: var(--dark-color-medium);
  border-top: 1px solid var(--dark-color);

  &__content {
    display: flex;
    align-items: center;
  }

  &__image {
    min-width: 40px;
    height: 40px;
    margin-right: 12px;
  }

  &__info {
    width: calc(100% - 150px);

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
      color: var(--dark-color-light);
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
    color: var(--dark-color-light);
  }
}
</style>
