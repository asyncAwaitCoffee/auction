import './assets/main.css'
import router from '@/router'
import Inresection from '@/directives/Inresection.js'
import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'


const app = createApp(App)

app.directive(Inresection.name, Inresection)

app
    .use(router)
    .use(store)

app.mount('#app')
