import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'

// Import global styles
import 'ant-design-vue/dist/reset.css'
import './index.css'
import './App.css'
import './components/styles/todoList.css'
import './components/styles/layout.css'
import './views/styles/login.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(VueQueryPlugin)

app.mount('#app')

