import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/views/Login'
import A from "@/components/views/A"
import Side from "@/components/home/Side"
import Head from "@/components/home/Head"

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // 下面都是固定的写法
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/a',
      name: 'A',
      component: A
    },
    {
      path: '/side',
      name: 'Side',
      component: Side
    },
    {
      path: '/head',
      name: 'Head',
      component: Head
    },
    {
      path: '/home',
      meta:{ title: '自诉文件' },
      children: [
        {
          path: '/table',
          component: () => import('../components/views/Table.vue'),
          meta: { title: '菜单' }
        },
        {
          path: '/order',
          component: () => import('../components/views/Order.vue'),
          meta: { title: '订单' }
        },
      ]
    }
  ]
})

