import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    },
    admin: {
      username: window.localStorage.getItem('admin' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('admin' || '[]')).username
    }
  },
  mutations: {
    userLogin (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    adminLogin (state, admin) {
      state.admin = admin
      window.localStorage.setItem('admin', JSON.stringify(admin))
    }
  }
})
