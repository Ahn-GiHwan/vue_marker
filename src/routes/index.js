import { createRouter, createWebHistory } from 'vue-router'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'
import GoodsInfo from './goods/GoodsInfo'

import About from './user/About.vue'

import UpdateUser from './user/update/UpdateUser'
import DisplayName from './user/update/DisplayName'
import Password from './user/update/Password'
import ProfileImg from './user/update/ProfileImg'

import MyAccount from './user/account/MyAccount'
import AddAccount from './user/account/AddAccount'
import InputAccount from './user/account/InputAccount'

import MyBuyList from './user/buyList/MyBuyList'
import ReservationList from './user/buyList/ReservationList'
import BuyList from './user/buyList/BuyList'
import CancelList from './user/buyList/CancelList'

import Admin from './admin/Admin'
import GoodsList from './admin/goodsList/GoodsList'
import AdminSellListNav from './admin/sellList/SellListNav'
import AllSellList from './admin/sellList/AllSellList'
import AdminReservationList from './admin/sellList/ReservationList'
import AdminSellList from './admin/sellList/SellList'
import AdminCancelList from './admin/sellList/CancelList'
import AddGoods from './admin/AddGoods/AddGoods'
import AdminGoodsInfo from './admin/goodsList/GoodsUpdate.vue'

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
              path: 'addaccount/:code',
              name: 'inputaccount',
              component: InputAccount
            }
          ]
        },
        {
          path: 'mybuylist',
          component: MyBuyList,
          redirect: { name: 'reservationlist' },
          children: [
            {
              path: 'reservationlist',
              name: 'reservationlist',
              component: ReservationList
            },
            {
              path: 'buylist',
              name: 'buylist',
              component: BuyList
            },
            {
              path: 'cancellist',
              name: 'cancellist',
              component: CancelList
            }
          ]
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
          component: AdminSellListNav,
          redirect: { name: 'allList' },
          children: [
            {
              path: 'allList',
              name: 'allList',
              component: AllSellList
            },
            {
              path: 'reservationList',
              component: AdminReservationList
            },
            {
              path: 'sellList',
              component: AdminSellList
            },
            {
              path: 'cancelList',
              component: AdminCancelList
            }
          ]
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
