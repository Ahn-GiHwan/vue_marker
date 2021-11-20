export default {
  namespaced: true,
  state: () => ({
    goodsList: [],
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
      })
    },
  }
}
