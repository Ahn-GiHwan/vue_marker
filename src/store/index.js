import { createStore } from 'vuex'
import user from './user'
import account from './account'
import goods from './goods'
import alert from './alert'
import buyList from './buyList'
import admin from './admin'

export default createStore({
  modules: {
    user,
    account,
    goods,
    alert,
    buyList,
    admin
  },
})
