export default {
  namespaced: true,
  state: () => ({
    totalBalance: 0,
    accounts: [],
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
    logout({ commit }) {
      commit('assignState', { currentAccount: null })
    },
    updateAccountInfo({ commit }, { totalBalance, accounts }) {
      commit('assignState', {
        totalBalance,
        accounts,
        update: true
      })
    },
    
  }
}
