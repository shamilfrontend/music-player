export const state = () => ({
  token: 'test123'
})

export const getters = {
  isAuth: (state) => Boolean(state.token)
}

export const mutations = {
  setToken: (state, token) => (state.token = token),
  clearToken: (state) => (state.token = 1)
}

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const { token } = await this.$axios.$post('/api/v1/user/login', formData)

      dispatch('setToken', token)
    } catch (e) {}
  },

  logout({ commit }) {
    commit('clearToken')
  },

  setToken({ commit }, token) {
    commit('setToken', token)
  },

  createUser({ commit }, formData) {
    try {
      //
    } catch (e) {}
  }
}
