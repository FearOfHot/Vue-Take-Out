import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8001'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
import "@/assets/css/index.css"
router.beforeEach((to, from, next) => {
    document.title = `杭电协同点餐系统`;
    const role = localStorage.getItem('username');
    if (!role && to.path !== '/login') {
      next('/login');
    } else if (to.path === '/') {
      next('/login')
    } else {
      next();
    }



    // if (to.meta.requireAuth) {
    //   if (store.state.user.username || store.state.admin.username) {
    //     next()
    //   } else if (to.path !== 'login') {
    //     next('/login')
    //   }
    // } else {
    //   next()
    // }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})




