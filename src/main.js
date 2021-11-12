import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

import '~/routes/guards'
import App from '~/App.vue'
import Loader from '~/components/Loader'
import router from '~/routes'
import store from '~/store'
import { user, account, goods, goodsMaster } from '~/plugins'

import './style/style.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const endpoint = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api'

const headers =  {
    'content-type': 'application/json',
    'apikey': process.env.apiKey,
    'username': process.env.username,
  }

const adminHeader = {
  'content-type': 'application/json',
  'apikey': process.env.apiKey,
  'username': process.env.username,
  masterKey : process.env.masterKey
}

createApp(App)
  .use(user, {endpoint, headers})
  .use(account, {endpoint, headers})
  .use(goods, {endpoint, headers})
  .use(goodsMaster, {endpoint, headers, adminHeader})
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .component('Loader', Loader)
  .mount('#app')
