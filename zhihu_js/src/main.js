import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import 'lib-flexible/flexible'
import router from './router'
import { createPinia } from 'pinia'
import 'element3/lib/theme-chalk/index.css'
import {
    ElIcon
} from 'element3'

createApp(App)
    .use(ElIcon)
    .use(router)
    .use(createPinia())
    .mount('#app')
