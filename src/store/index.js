import { createStore } from 'vuex'
import user from './user'
import account from './account'
import goods from './goods'
import alert from './alert'

export default createStore({
  modules: {
    user,
    account,
    goods,
    alert
  },
})
