export default {
  namespaced: true,
  state: () => ({
    goodsList: [],
    sellList: [],
    update: false
  }),
  getters: {
    reservationList(state) {
      return state.sellList.filter(list => !list.isCanceled && !list.done)
    },
    buyList(state) {
      return state.sellList.filter(list => list.done)
    },
    cancelList(state) {
      return state.sellList.filter(list => list.isCanceled)
    }
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    updateAdmin({ commit }, data) {
      commit('assignState', data)
    },
    logout({ commit }) {
      commit('assignState', { update: false })
    },
    goodsListNull({ commit }) {
      commit('assignState', { goodsList: [] } )
    },
    sellListNull({ commit }) {
      commit('assignState', { sellList: [] } )
    },
  }
}
