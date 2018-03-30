// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'

// 自定的组件
import VIcon from './components/VIcon'
import globalUI from './components'

Vue.use(globalUI)
Vue.component('v-icon', VIcon)

// style
import 'normalize.css'
import './style/app.scss'
import './assets/icon/iconfont'

import Api from './common/api'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype._Api = Api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
