import axios from 'axios'
import auth from '~/utils/auth'
import router from './index'
import store from '~/store'

router.beforeEach(async (to) => {
  const getStorage = localStorage.getItem('token')
  const { currentUser } = store.state.user
  const { update } = store.state.account

  if (getStorage) {
    if (!currentUser) {
      console.log('guard getUser')
      console.log('12321312')
      const user = await auth()

      store.commit('user/assignState', {
        currentUser: user
      })
      const { currentUser } = store.state.user
      if (currentUser.email !== process.env.admin && to.href.includes('admin')) {
        router.push('/about')
      }
    }
    if (!update) {
      console.log('guard getAccount')
      const { totalBalance, accounts } = await myAccountInfo()
      store.commit('account/assignState', {
        totalBalance, accounts, update: true
      })
    }
  } else {
    console.log('guard isLogin')
    if (to.href.includes('about') || to.href.includes('admin')) {
      router.push('/')
    }
  }
})

async function myAccountInfo () {
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'apikey': process.env.apiKey,
      'username': process.env.username, 
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  })
  console.log('myAccountInfo', data)
  return data
}


