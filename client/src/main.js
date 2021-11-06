import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import Axios from 'axios'
import vueScrollTo from 'vue-scrollto'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.prototype.$http = Axios
Vue.use(vueScrollTo)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  iconfont: 'mdi',
  render: h => h(App)
}).$mount('#app')
