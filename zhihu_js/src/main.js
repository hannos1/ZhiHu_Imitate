import { createApp } from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import router from './router'
import { createPinia } from 'pinia'
import './mocks/index'
import {Toast,Lazyload,Popup} from 'vant'
import 'vant/lib/index.css'
import { Icon } from 'vant'

createApp(App)
    .use(router)
    .use(Icon)
    .use(Lazyload,{
        lazyComponent: true
    })
    .use(Popup)
    .use(Toast)
    .use(createPinia())
    .mount('#app')
