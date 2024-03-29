import axios from 'axios'

const category = 'products'

export default {
  install(app, options) {
    const { endpoint, headers } = options
    app.config.globalProperties.$productInfo = async (id) => {
        const res = await axios({
          url: `${endpoint}/${category}/${id}`,
          method: 'GET',
          headers,
        })
        return res.data        
    }
    app.config.globalProperties.$productsSearch = async (data) => {
        const res = await axios({
          url:`${endpoint}/${category}/search`,
          method: 'POST',
          headers,
          data
        })
        return res.data
    }
    app.config.globalProperties.$productsBuy  = async (data) => {
        const res = await axios({
          url:`${endpoint}/${category}/buy`,
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          data
        })
        return res.data
    }
    app.config.globalProperties.$productsCancel = async (data) => {
        const res = await axios({
          url:`${endpoint}/${category}/cancel`,
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          data
        })
        return res.data
    }
    app.config.globalProperties.$productsOk = async (data) => {
        const res = await axios({
          url:`${endpoint}/${category}/ok`,
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          data
        })
        return res.data
    }
    app.config.globalProperties.$buyAllList = async () => {
        const res = await axios({
          url:`${endpoint}/${category}/transactions/details `,
          method: 'GET',
          headers: {
          ...headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })
        return res.data
    }
    app.config.globalProperties.$buyInfo = async (data) => {
        const res = await axios({
          url:`${endpoint}/${category}/transactions/detail`,
          method: 'POST',
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
