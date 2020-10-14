const tracks = [
  {
    _id: 1,
    imageUrl: '/albums/kansas_carry_on_wayward_son.jpg',
    name: 'Carry on Wayward Son',
    author: 'Kansas',
    musicUrl: '/musics/kansas_carry_on_wayward_son.mp3'
  },
  {
    _id: 2,
    imageUrl: '/albums/kleinod_another_ight.jpg',
    name: 'Another Fight',
    author: 'KLEINOD',
    musicUrl: '/musics/kleinod_another_ight.mp3'
  },

  {
    _id: 3,
    imageUrl: '/albums/enrique_iglesias_lil_wayne_push.jpg',
    name: 'Push',
    author: 'Enrique Iglesias feat Lil Wayne',
    musicUrl: '/musics/enrique_iglesias_lil_wayne_push.mp3'
  },
  {
    _id: 4,
    imageUrl: '/albums/the_runaways_cherry_bomb.jpg',
    name: 'Cherry Bomb',
    author: 'The Runaways',
    musicUrl: '/musics/the_runaways_cherry_bomb.mp3'
  },
  {
    _id: 5,
    imageUrl: '/albums/k_maro_femme_like_u.jpg',
    name: 'Femme Like U',
    author: 'K-Maro',
    musicUrl: '/musics/k_maro_femme_like_u.mp3'
  },
  {
    _id: 6,
    imageUrl:
      '/albums/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.jpg',
    name: 'Scared of the Dark',
    author: 'Lil Wayne, Ty Dolla $ign, Xxxtentacion',
    musicUrl:
      '/musics/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.mp3'
  }
]

export const state = () => ({
  tracks,
  currentTrack: tracks[0],

  isPlaying: true,
  isPlayerScreenShown: false
})

export const getters = {}

export const mutations = {
  setData(state, payload = []) {
    payload.forEach(({ key, value }) => {
      state[key] = value
    })
  }
}

export const actions = {
  async fetchMusics({ commit }) {}
}
