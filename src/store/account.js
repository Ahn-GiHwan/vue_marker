export default {
  namespaced: true,
  state: () => ({
    currentAccount: null
  }),
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    logout({ commit }) {
      commit('assignState', { currentAccount: null })
    }
  }
}
