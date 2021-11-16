export default {
  namespaced: true,
  state: () => ({
    totalBalance: 0,
    accounts: [],
    ableBanks: [],
    update: false
  }),
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
    deleteAccount(state, id) {
      state.accounts = state.accounts.filter(account => account.id != id)
    },
    pushAccount(state, newAccount) {
      state.accounts.push(newAccount)
      state.ableBanks = state.ableBanks.filter(bank => bank.code !== newAccount.bankCode)
    },
  },
  actions: {
    logout({ commit }) {
      commit('assignState', { currentAccount: null, update: false })
    },
    updateAccountInfo({ commit }, { totalBalance, accounts, ableBanks }) {
      commit('assignState', {
        totalBalance,
        accounts,
        ableBanks,
        update: true
      })
    },
    updateAbleBanks({ commit }, { ableBanks }) {
      commit('assignState', { ableBanks })
    },
  }
}
