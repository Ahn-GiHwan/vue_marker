import axios from 'axios'

const category = 'products'

export default {
  install(app, options) {
    const { endpoint, adminHeader } = options
    app.config.globalProperties.$products = async () => {
        const res = await axios({
          url: `${endpoint}/${category}`,
          method: 'GET',
          headers: adminHeader,
        })
        console.log('products', res.data)
        return res.data        
    }
    app.config.globalProperties.$buyAll = async () => {
        const res = await axios({
          url:`${endpoint}/${category}/transactions/all`,
          method: 'GET',
          headers:adminHeader,
        })
        console.log('sellAll', res.data)
        return res.data
    }
    app.config.globalProperties.$addProducts = async (data) => {
        const res = await axios({
          url:`${endpoint}/${category}`,
          method: 'POST',
          headers: adminHeader,
          data
        })
        console.log('addProducts', res.data)
        return res.data
    }
    app.config.globalProperties.$productsPut = async (id, data) => {
        const res = await axios({
          url:`${endpoint}/${category}/${id}`,
          method: 'PUT',
          headers: adminHeader,
          data
        })
        console.log('productsPut', res.data)
        return res.data
    }
  }
}
