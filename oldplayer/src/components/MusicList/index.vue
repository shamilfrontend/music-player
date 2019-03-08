<template>
  <transition name="showRouter">
    <div class="music-list">
      <div
        v-for="(item, index) of musicData"
        :key="index"
        class="music-item"
      >
        <img
          :src="item.musicImgSrc"
          class="music-img"
          alt="musicImgSrc"
        >
        <span
          @click="toggleMusic(index)"
          class="music-name"
        >{{(index + 1) + '.&nbsp;' + item.name}}</span>
        <button @click="del(index)" class="music-delete"></button>
      </div>

      <div class="tips">Записей не найдено</div>

    </div>
  </transition>

</template>

<script>
  export default {
    name: 'MusicList',
    beforeCreate() {
      this.$store.commit('showMiniMusic', true);
    },
    computed: {
      musicData() {
        return this.$store.state.musicData;
      },
      DOM() {
        return this.$store.state.DOM;
      },
      isPlaying() {
        return this.$store.state.isPlaying;
      }
    },
    watch: {
      musicData: {
        handler(val) {
          localStorage.musics = JSON.stringify(val);
        },
        deep: true
      }
    },
    methods: {
      toggleMusic(index) {
        if (this.$store.state.audio.index === index) {
          this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause();
          this.$store.commit('play', !this.isPlaying);
        } else {
          this.DOM.audio.play();
          this.$store.commit('play', true);
        }
        this.$store.commit('toggleMusic', index);
      },
      del(index) {
        this.$store.commit('del', index);
      }
    },
    mounted() {
      this.$store.commit('changeLinkBorderIndex', 1);
    }
  }
</script>

<style lang="scss">
  .showRouter-enter-active {
    transition: all .4s ease;
  }

  .showRouter-leave-active {
    transition: all 0s ease;
  }

  .showRouter-enter, .showRouter-leave-active {
    transform: translateX(-150px);
    opacity: 0;
  }

  .music-list {
    padding-top: 4px;
    padding-left: 4px;
    padding-right: 4px;
    flex: 1;
    overflow: auto;

    .music-item + .music-item {
      border-top: 1px solid rgba(0, 0, 0, .1);
    }

    .music-item {
      padding: 4px 6px 0 6px;
      position: relative;
      border-radius: 5px;
      cursor: pointer;
      border: none;

      .music-img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 10px;
      }

      .music-name {
        display: inline-block;
        width: 65%;
        vertical-align: top;
        margin-top: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;

        padding-bottom: 20px;
      }

      .music-delete {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 20px;
        width: 20px;
        height: 20px;
        border: none;
        background-color: transparent;
        background-image: url('./icons/del.svg');
        background-size: contain;
      }
    }

    .tips {
      text-align: center;
      margin: 12px auto;
      width: 200px;
      font-size: 80%;
      color: gray;
    }
  }
</style>
