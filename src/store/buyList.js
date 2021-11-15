export default {
  namespaced: true,
  state: () => ({
    allList: [],
    update: false
  }),
  getters: {
    reservationList(state) {
      return state.allList.filter(list => !list.isCanceled && !list.done)
    },
    buyList(state) {
      return state.allList.filter(list => list.done)
    },
    cancelList(state) {
      return state.allList.filter(list => list.isCanceled)
    },
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    updateBuyList({ commit }, data) {
      commit('assignState', data )
    },
    logout({ commit }) {
      commit('assignState', {
        allList: [], update: false
      })
    },
    update({ commit }) {
      commit('assignState', { update: true })
    }
  }
}
