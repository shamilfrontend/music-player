import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const BASE_MUSIC_URL = 'http://shamil-frontend.ru/musics/';

const store = new Vuex.Store({
  state: {
    musicData: [
      {
        "name": "Zayn feat Sia - Dusk Till Dawn",
        "src": `${BASE_MUSIC_URL}zayn_feat_sia-dusk-till-dawn.mp3`,
        "musicImgSrc": "https://zaycev4.net/uploads/mini/poster/81/1544712523_200.jpg"
      },
      {
        "name": "Jah Khalib - Лейла",
        "src": `${BASE_MUSIC_URL}jah_khalib_leyla.mp3`,
        "musicImgSrc": "https://avatars.yandex.net/get-music-content/163479/f1a7265d.a.3834283-1/100x100"
      },
      {
        "name": "Hans Zimmer - time",
        "src": `${BASE_MUSIC_URL}hans_zimmer_time.mp3`,
        "musicImgSrc": "https://avatars.yandex.net/get-music-content/49876/4eedd65c.a.85625-1/100x100"
      },
      {
        "name": "Ринат Каримов – Шестиструнная гитара",
        "src": `${BASE_MUSIC_URL}rinat_karimov_shestistrunnaya_gitara.mp3`,
        "musicImgSrc": "http://cdnimg.zaycev.net/artist/1275/127554-96782.jpg"
      },
      {
        "name": "Enrique Iglesias feat Nicole Scherzinger - Heartbeat",
        "src": `${BASE_MUSIC_URL}enrique_Iglesias_nicole_scherzinger_-_heartbeat_53296803.mp3`,
        "musicImgSrc": "https://avatars.yandex.net/get-music-content/38044/a4509087.a.2486727-1/100x100"
      },
      {
        "name": "Hans Zimmer - Interstellar",
        "src": `${BASE_MUSIC_URL}hans_zimmer_interstellar.mp3`,
        "musicImgSrc": "https://avatars.yandex.net/get-music-content/41288/b7b59f24.a.2365812-2/400x400"
      },
      {
        "name": "Юлия Савичева - Москва-Владивосток",
        "src": `${BASE_MUSIC_URL}yuliya_savicheva_moskva_vladivostok.mp3`,
        "musicImgSrc": "https://avatars.yandex.net/get-music-content/32236/70c91a7b.a.68187-2/100x100"
      },
      {
        "name": "Pitbull red One rush rain over me",
        "src": `${BASE_MUSIC_URL}pitbull_redone_rush_rain_over_me.mp3`,
        "musicImgSrc": "https://zenmusic.org/cover/song/47995449.jpg"
      },
      {
        "name": "Dj Layla Feat. Alissa - Single Lady",
        "src": `${BASE_MUSIC_URL}dj-layla-feat.-alissa-single-lady-(megapesni.me).mp3`,
        "musicImgSrc": "https://avatars.yandex.net/get-music-content/33216/f69aa9f5.a.58365-1/200x200"
      },
    ],
    skinColor: localStorage.skinColor || '#B72712',
    isShowIndex: true,
    isPlaying: false,
    isAnimation: false,
    isShowAsideMenu: false,
    isShowMiniMusic: false,
    isShowAbout: false,
    linkBorderIndex: '',
    DOM: {},
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    }
  },
  mutations: {
    del(state, index) {
      if (state.musicData.length === 0) {
        return;
      }
      state.musicData.splice(index, 1);
    },
    play(state, flag) {
      state.isPlaying = flag;
    },
    addMusic(state, payload) {
      for (let music of state.musicData) {
        if (JSON.stringify(music) === JSON.stringify(payload)) {
          return;
        }
      }
      state.musicData.unshift(payload);
    },
    toggleMusic(state, index) {
      state.audio.name = state.musicData[index].name;
      state.audio.src = state.musicData[index].src;
      state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
      state.audio.index = index;
    },
    playMusic(state, payload) {
      state.audio.name = payload.name;
      state.audio.src = payload.src;
      state.audio.musicImgSrc = payload.imgSrc;
      state.isPlaying = true;
    },
    findDOM(state, payload) {
      state.DOM[payload.name] = payload.dom;
    },
    showIndex(state, flag) {
      state.isShowIndex = flag;
    },
    showAsideMenu(state, flag) {
      state.isShowAsideMenu = flag;
    },
    showMiniMusic(state, flag) {
      state.isShowMiniMusic = flag;
    },
    showAbout(state, flag) {
      state.isShowAbout = flag;
    },
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    },
    changeSkinColor(state, color) {
      state.skinColor = color;
    }
  },
  actions: {
    getData({commit, state}) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
        return;
      }
      return new Promise((resolve, reject) => {
        Vue.axios.get('/api/music-data')
          .then(res => {
            if (res.data.errno === 0) {
              state.musicData = res.data.musicData;
              localStorage.musics = JSON.stringify(state.musicData);
            }
          })
          .then(() => {
            commit('toggleMusic', 0)
          });
        resolve();
      });
    }
  },
  modules: {},
});

export default store;
