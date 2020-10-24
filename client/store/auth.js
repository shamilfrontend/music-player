import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const isJWTValid = (token) => {
  if (!token) return false

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return new Date().getTime() / 1000 < expires
}

export const state = () => ({
  token: 'null'
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
    this.$axios.setToken(false)
    Cookies.remove('jwt-token')
  },

  setToken({ commit }, token) {
    commit('setToken', token)
  },

  createUser({ commit }, formData) {
    try {
      //
    } catch (e) {}
  },

  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}
