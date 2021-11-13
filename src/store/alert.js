export default {
  namespaced: true,
  state: () => ({
    show: false,
    title: '',
    text: '',
    path: ''
  }),
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    showAlert({ commit }, data) {
      commit('assignState', { ...data, show: true })
    },
    closeAlert({ commit },) {
      commit('assignState', {
        show: false,
        title: '',
        text: '',
        path: ''
      })
    },
  }
}
