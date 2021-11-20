import axios from 'axios'

const category = 'account'

export default {
  install(app, options) {
    const { endpoint, headers } = options
    app.config.globalProperties.$myAccountInfo = async () => {
      const res = await axios({
        url: `${endpoint}/${category}`,
        method: 'GET',
        headers: {
          ...headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      return res.data
    }
    app.config.globalProperties.$connectAccount = async (data) => {
      const res = await axios({
        url: `${endpoint}/${category}`,
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data
      })
      return res.data
    }
    app.config.globalProperties.$deleteAccount = async (data) => {
      const res = await axios({
        url: `${endpoint}/${category}`,
        method: 'DELETE',
        headers: {
          ...headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data
      })
      return res.data
    }
  }
}
