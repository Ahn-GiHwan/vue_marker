import axios from 'axios'

export default {
  install(app, options) {
    const { endpoint, headers } = options
    app.config.globalProperties.$signup = async (data) => {
      const res = await axios({
        url: `${endpoint}/auth/signup`,
        method: 'POST',
        headers,
        data
      })
      console.log('signup', res.data)
      return res.data        
    }
    app.config.globalProperties.$login = async (data) => {
      const res = await axios({
        url:`${endpoint}/auth/login`,
        method: 'POST',
        headers,
        data
      })
      console.log('login', res.data)
      return res.data
    }
    app.config.globalProperties.$logout = async () => {
      const res = await axios({
        url:`${endpoint}/auth/logout`,
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      console.log('logout', res.data)
      return res.data
    }
    app.config.globalProperties.$userPut = async (data) => {
      const res = await axios({
        url:`${endpoint}/auth/user`,
        method: 'PUT',
        headers: {
          ...headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data
      })
      console.log('userPut', res.data)
      return res.data
    }
  }
}
