export default {
  namespaced: true,
  state: () => ({
    currentUser: null
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
      commit('assignState', { currentUser: null })
    },
    update({ commit }, currentUser) {
      commit('assignState', { currentUser })
    }
  }
}
