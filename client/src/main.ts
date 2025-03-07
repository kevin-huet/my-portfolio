import { createApp } from 'vue'
import App from './app.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import Vue3Transitions from 'vue3-transitions'
import {createPinia, Pinia} from "pinia";
const pinia: Pinia = createPinia()


loadFonts()

createApp(App)
  .use(vuetify)
    .use(Vue3Transitions)
    .use(pinia)
  .mount('#app')
