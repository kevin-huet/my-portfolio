import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue3Transitions from 'vue3-transitions'
loadFonts()

createApp(App)
  .use(vuetify)
    .use(Vue3Transitions)
  .mount('#app')
