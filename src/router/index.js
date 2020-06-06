import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/views/Login'
import UserSide from "@/components/home/user/UserSide"
import Head from "@/components/home/Head"
import AdminIndex from "@/components/home/admin/AdminIndex"
import UserIndex from "@/components/home/user/UserIndex"

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user/side',
      name: 'UserSide',
      component: UserSide
    },
    {
          path: '/head',
          name: 'Head',
          component: Head
    },
    {
            path: '/dish',
            name: 'dish',
            component: () => import('../components/views/user/UserDish.vue'),
            meta: { title: '菜单' }
    },
    {
            path: '/order',
            name: 'order',
            component: () => import('../components/views/user/UserOrder.vue'),
            meta: { title: '订单' }
    },
    {
            path: '/cart',
            name: 'cart',
            component: () => import('../components/views/user/UserCart.vue'),
            meta: { title: '购物车' }
    },
    {
            path: '/info',
            name: 'info',
            component: () => import('../components/views/user/UserDeliveryInfo.vue'),
            meta: { title: '配送信息' }
    },
    {
            path: '/dishAdmin',
            name: 'dishAdmin',
            component: () => import('../components/views/admin/AdminDish.vue'),
            meta: { title: '菜单' }
    },
    {
            path: '/orderAdmin',
            name: 'orderAdmin',
            component: () => import('../components/views/admin/AdminOrder.vue'),
            meta: { title: '订单' }
    },
    {
      path: '/indexAdmin',
      name: 'indexAdmin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/indexUser',
      name: 'indexUser',
      component: UserIndex,
      meta: {
        requireAuth: true
      }
    },
  ]
})

