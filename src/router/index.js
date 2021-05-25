import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Manager from '@/components/manager'
import Goods from '@/components/goods'
import GoodType from '@/components/goodType'
import Custom from '@/components/custom'
import Banner from '@/components/banner'
import OrdersList from '@/components/ordersList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager,
      meta: {
        isLogin: true
      },
      children: [
        {
          path: '/goods',
          name: Goods,
          component: Goods,
          meta: {
            isLogin: true
          },
        },
        {
          path: '/goodType',
          name: 'GoodType',
          component: GoodType,
          meta: {
            isLogin: true
          },
        },
        {
          path: '/custom',
          name: 'Custom',
          component: Custom,
          meta: {
            isLogin: true
          },
        },
        {
          path: '/banner',
          name: 'Banner',
          component: Banner,
          meta: {
            isLogin: true
          },
        },
        {
          path: '/ordersList',
          name: 'OrdersList',
          component: OrdersList,
          meta: {
            isLogin: true
          }
        }
      ]
    }
  ]
})
