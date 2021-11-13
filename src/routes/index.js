import { createRouter, createWebHistory } from 'vue-router'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'

import About from './user/About.vue'
import UpdateUser from './user/update/UpdateUser'
import DisplayName from './user/update/DisplayName'
import Password from './user/update/Password'
import ProfileImg from './user/update/ProfileImg'
import MyAccount from './user/MyAccount'
import AddAccount from './user/AddAccount'
import MySellList from './user/MySellList'

import GoodsInfo from './goods/GoodsInfo'

import Admin from './admin/Admin'
import GoodsList from './admin/GoodsList'
import SellList from './admin/SellList'
import AddGoods from './admin/AddGoods'
import AdminGoodsInfo from './admin/GoodsUpdate.vue'

import InputAccount from './account/InputAccount'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About,
      redirect: { name: 'update' },
      children: [
        {
          path: 'update',
          name: 'update',
          component: UpdateUser,
          redirect: { name: 'displayname' },
          children: [
            { path: 'displayname', name: 'displayname', component: DisplayName },
            { path: 'password', component: Password },
            { path: 'profileimg', component: ProfileImg },
          ]
        },
        {
          path: 'myaccount',
          component: MyAccount,
          children: [
            {
              path: 'addaccount',
              component: AddAccount,
            },
            {
              path: 'inputaccount',
              name: 'inputaccount',
              component: InputAccount
            }
          ]
        },
        {
          path: 'myselllist',
          component: MySellList
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      redirect: { name: 'goodslist' },
      children: [
        {
          path: 'goodslist',
          name: 'goodslist',
          component: GoodsList,
        },
        {
          path: 'selllist',
          component: SellList
        },
        {
          path: 'addGoods',
          component: AddGoods
        },
        {
          path: '/admin/goods/:id',
          name: 'admingoodsinfo',
          component: AdminGoodsInfo
        },
      ]
    },
    {
      path: '/login',
      component: LogIn
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/goods/:id',
      name: 'goodsInfo',
      component: GoodsInfo
    },
  ]
})
