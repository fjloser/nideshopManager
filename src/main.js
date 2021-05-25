// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
// import Promise from 'es6-promise'
// Promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import ajax from '@/api/request'
import '@/assets/css/app.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ajax = ajax

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
// })