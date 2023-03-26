import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import 'lib-flexible/flexible'
import router from './router'
import { createPinia } from 'pinia'
import './mocks/index'
import {Toast} from 'vant'
import 'vant/lib/index.css'
// import 'element3/lib/theme-chalk/index.css'
// import {
//     ElIcon
// } from 'element3'

createApp(App)
    .use(router)
    .use(Toast)
    .use(createPinia())
    .mount('#app')
