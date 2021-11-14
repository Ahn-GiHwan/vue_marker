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
      }, 6000)
    }
    app.config.globalProperties.$closeAlert = async () => {
      console.log('false')
      await store.dispatch('alert/closeAlert')
    }
  }
}

