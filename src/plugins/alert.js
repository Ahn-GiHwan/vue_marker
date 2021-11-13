import store from '../store/index'


export default {
  install(app) {
    app.config.globalProperties.$openAlert = async (title, text = '', path = '') => {
      store.dispatch('alert/showAlert', {
        title,
        text,
        path
      })
      setTimeout(() => {
        store.dispatch('alert/closeAlert')
      }, 5000)
    }
    app.config.globalProperties.$closeAlert = async () => {
      store.dispatch('alert/closeAlert')
    }
  }
}
