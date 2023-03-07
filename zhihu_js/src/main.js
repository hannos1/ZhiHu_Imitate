import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import 'lib-flexible/flexible'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
