import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/views/Login'
import A from "@/components/views/A"

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
    }
  ]
})

