<template>
  <transition name="showRouter">
    <div class="find">
      <div class="search-input">

        <div class="input">
          <i class="icon-search"></i>
          <input
            v-model="keywords"
            @keyup.enter="toSearch(keywords)"
            @focus="inputFocus"
            :class="{'input-focus': !isShowHot}"
            type="text"
            placeholder="Поиск..."
          >
          <i @click="keywords = ''" v-show="keywords !=='' && !isShowHot" class="icon-cancel"></i>
          <button
            v-show="!isShowHot"
            @click="isShowHot = true"
            class="cancel-btn"
          >Отмена</button>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: 'find',
    beforeCreate() {
      this.$store.commit('showMiniMusic', true);
    },
    data() {
      return {
        keywords: '',
        isShowHot: true,
        musicList: [],
        playIndex: '',
        isLoading: false,
        isShowHistory: false,
        searchHistory: (localStorage.searchHistory && JSON.parse(localStorage.searchHistory)) || []
      }
    },
    computed: {
      musicData() {
        return this.$store.state.musicData;
      }
    },
    watch: {
      musicData: {
        handler(val) {
          localStorage.musics = JSON.stringify(val);
        },
        deep: true
      },
      searchHistory: {
        handler(val) {
          localStorage.searchHistory = JSON.stringify(val);
        },
        deep: true
      }
    },
    methods: {
      toSearch(keywords) {
        if (keywords.trim()) {
          this.isShowHistory = false;
          this.isShowHot = false;
          this.playIndex = null;
          this.isLoading = true;
          this.$store.commit('showMiniMusic', false);
          this.keywords = keywords;
          this.axios.get('/api/search/100/' + keywords)
            .then(res => res.data.data.song)
            .then(song => {
              this.musicList = song.list;
              this.isLoading = false;
              this.searchHistory.unshift(keywords);
            })
        }
      },

      playMusic(index, name, src, imgSrc) {
        src = 'http://ws.stream.qqmusic.qq.com/' + src + '.m4a?fromtag=46';
        this.$store.commit('playMusic', {name: name, src: src, imgSrc: imgSrc});
        this.$store.commit('addMusic', {name: name, src: src, musicImgSrc: imgSrc});
        this.$store.commit('showMiniMusic', true);
        this.playIndex = index;
      },

      inputFocus() {
        if (this.keywords.trim()) return false;
        else {
          this.isShowHot = false;
          this.isShowHistory = true;
          this.musicList = [];
        }
      },

      strDecode(str) {
        return str.replace(/&#(x)?([^&]{1,5});?/g, function ($, $1, $2) {
          return String.fromCharCode(parseInt($2, $1 ? 16 : 10));
        });
      }
    },
    mounted() {
      this.$store.commit('changeLinkBorderIndex', 2);
    },
  }
</script>

<style lang="scss" scoped>
  .showRouter-enter-active {
    transition: all .3s ease;
  }

  .showRouter-leave-active {
    transition: all 0s ease-out;
  }

  .showRouter-enter, .showRouter-leave-active {
    transform: translateX(250px);
    opacity: 0;
  }

  .find {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 10;
    overflow: auto;

    .search-input {
      position: relative;
      background-color: rgba(0, 0, 0, .1);
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      .input {
        position: relative;
        width: 90%;
        height: 35px;
        margin: 20px auto;
        text-align: left;

        i.icon-search {
          position: absolute;
          top: 7px;
          left: 6px;
          display: inline-block;
          height: 20px;
          width: 20px;
          background: url('./icons/find.svg') no-repeat;
          background-size: contain;
        }

        input {
          border-radius: 3px;
          border: none;
          padding: 0 34px;
          width: 100%;
          height: 100%;
          font-size: 1rem;
          outline: none;
        }

        i.icon-cancel {
          position: absolute;
          top: 7px;
          right: 21%;
          display: inline-block;
          height: 20px;
          width: 20px;
          background: url('./icons/cancel.svg') no-repeat;
          background-size: contain;
        }

        .input-focus {
          width: 80%;
        }

        .cancel-btn {
          vertical-align: top;
          padding: 7px 10px;
          height: 100%;
          background-color: #eee;
          display: inline-block;
        }
      }

    }

    .search-list {
      flex: 9;
      overflow: auto;

      .history + .history {
        border-top: 1px solid rgba(0, 0, 0, .1);
      }

      .history {
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: center;
        align-items: center;

        .icon {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon-history {
          display: inline-block;
          width: 23px;
          height: 23px;
          background: url('./icons/history.svg') no-repeat;
          background-size: contain;
        }

        .icon-del {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url('./icons/del.svg') no-repeat;
          background-size: contain;
        }

        .word {
          flex: 5;
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .tips {
        text-align: center;
        margin: 12px auto;
        width: 200px;
        font-size: 80%;
        color: gray;
      }

      .loading {
        padding-top: 10px;
        text-align: center;

        .icon-loading {
          display: inline-block;
          margin: auto 10px auto;
          width: 22px;
          height: 22px;
          background: url('./icons/loading.svg') no-repeat;
          background-size: contain;
          animation: loading .6s linear infinite;
          vertical-align: text-top;
        }
      }

      .music + .music {
        border-top: 1px solid rgba(0, 0, 0, .1);
      }

      .music {
        display: flex;
        width: 100%;
        height: 60px;
        cursor: pointer;

        .icon-music {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 60px;
          height: 60px;

          img {
            display: inline-block;
            width: 90%;
            height: 90%;
            background: url(./icons/music.svg) no-repeat;
            background-size: contain;
          }
        }

        .music-info {
          position: relative;

          flex: 1;
          padding: 8px 10px;

          .music-name {
            width: 250px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .music-singer {
            padding-top: 3px;
            font-size: 50%;
            color: gray;
          }

          i {
            position: absolute;
            display: inline-block;
            width: 13px;
            height: 13px;

          }

          i.icon-listening {
            background: url('./icons/listening.svg') no-repeat;
            background-size: contain;
            right: 20px;
            top: 22px;
            animation: listening 1s linear infinite;
          }

          i.icon-love {
            background: url('./icons/love.svg') no-repeat;
            background-size: contain;
            right: 40px;
            top: 20px;
          }
        }

      }
    }
  }

  @keyframes listening {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1.3);
    }
    66% {
      transform: scale(1);
    }
  }
</style>
