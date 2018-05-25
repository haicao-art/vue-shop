// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './utils/permission'
import './config/rem'

Vue.use(require('vue-wechat-title'))

import { Toast, Dialog, Lazyload } from 'vant';
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Lazyload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
