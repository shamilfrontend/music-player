export const state = () => ({
  token: null
})

export const getters = {
  isAuth: (state) => Boolean(state.token)
}

export const mutations = {
  setToken: (state, token) => (state.token = token),
  clearToken: (state) => (state.token = null)
}

export const actions = {
  async signIn({ commit, dispatch }, formModel) {
    try {
      const { token } = await this.$axios.$post(
        '/api/v1/user/signin',
        formModel
      )

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
