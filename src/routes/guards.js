import auth from '~/utils/auth'
import router from './index'
import store from '~/store'
import { getMyAccountInfo, getAbleBanks} from '~/utils/accountFetch'

router.beforeEach(async (to) => {
  const getStorage = localStorage.getItem('token')
  const { currentUser } = store.state.user
  const { update } = store.state.account

  if (getStorage) {
    if (!currentUser) {
      console.log('guard getUser')
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
      await Promise.all([getMyAccountInfo(), getAbleBanks()]).then(async (value) => {
        console.log('value',value)
        const { totalBalance, accounts, } = value[0]
        store.commit('account/assignState', {
          totalBalance, accounts, ableBanks: value[1] ,update: true
        })
      })
    }
    if (to.href.includes('login') || to.href.includes('signup')) {
      router.push('/')
    }
  } else {
    console.log('guard isLogin')
    if (to.href.includes('about') || to.href.includes('admin')) {
      router.push('/')
    }
  }
})



