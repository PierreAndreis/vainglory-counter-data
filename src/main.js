// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue    from 'vue'
import App    from './App'
import router from './router'
import store  from './store'

/* Vue Components */
import Buefy  from 'buefy'
import 'buefy/lib/buefy.css'
import './assets/styles/style.css'

/* External components*/
import vgApi  from './modules/api_interface'

/* Vue imports */
Vue.use(Buefy)

/* Exporting globals */
Vue.prototype.vgApi = vgApi

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el        : '#app',
  router,
  store,
  components: { App },
  template  : '<App/>'
})
