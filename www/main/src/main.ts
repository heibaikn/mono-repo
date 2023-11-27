import './assets/main.css'
import 'tailwindcss/tailwind.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import { PiniaDevtools } from '@pinia/devtools'
import startQianKun from './micro-apps'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const init = async () => {
  await app.mount('#app')
  startQianKun()
}
init()
