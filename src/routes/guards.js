import auth from '~/utils/auth'
import router from './index'
import store from '~/store'

router.beforeEach(async to => {
  // console.log(to)
  
  try {
    const user = await auth()

    store.commit('user/assignState', {
      currentUser: user
    })
  } catch (error) {
    const title = error.response.data
    // alert(title)
  }
})


