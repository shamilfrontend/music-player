export const state = () => ({
  tracks: [
    {
      _id: 1,
      imageUrl: '/albums/enrique_iglesias_lil_wayne_push.jpg',
      name: 'Push',
      author: 'Enrique Iglesias feat Lil Wayne',
      musicUrl: '/musics/enrique_iglesias_lil_wayne_push.mp3'
    },
    {
      _id: 2,
      imageUrl: '/albums/the_runaways_cherry_bomb.jpg',
      name: 'Cherry Bomb',
      author: 'The Runaways',
      musicUrl: '/musics/the_runaways_cherry_bomb.mp3'
    },
    {
      _id: 3,
      imageUrl: '/albums/k_maro_femme_like_u.jpg',
      name: 'Femme Like U',
      author: 'K-Maro',
      musicUrl: '/musics/k_maro_femme_like_u.mp3'
    },
    {
      _id: 4,
      imageUrl:
        '/albums/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.jpg',
      name: 'Scared of the Dark',
      author: 'Lil Wayne, Ty Dolla $ign, Xxxtentacion',
      musicUrl:
        '/musics/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.mp3'
    }
  ],

  currentTrack: {
    _id: 1,
    imageUrl: '/albums/enrique_iglesias_lil_wayne_push.jpg',
    name: 'Push',
    author: 'Enrique Iglesias feat Lil Wayne',
    musicUrl: '/musics/enrique_iglesias_lil_wayne_push.mp3'
  },

  isPlaying: true,
  isPlayerScreenShown: false
})

export const getters = {}

export const mutations = {}

export const actions = {
  async fetchMusics({ commit }) {}
}
