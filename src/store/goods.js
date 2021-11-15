export default {
  namespaced: true,
  state: () => ({
    goodsList: [],
    update: false
  }),
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    searchGoodsList({ commit }, goodsList) {
      commit('assignState', {
        goodsList,
        update: true
      })
    },
    update({ state, commit }) {
      commit('assignState', { update: !state.update })
    }
  }
}
