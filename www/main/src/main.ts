import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { registerMicroApps, start, initGlobalState, setDefaultMountApp } from 'qiankun';

const app = createApp(App)

app.use(createPinia())
app.use(router)

registerMicroApps([
  {
    name: 'design',
    entry: '//localhost:7202',
    container: '#subapp',
    activeRule: '/design',
  },
],
  {
    beforeLoad: (app) => {
      console.log('before load', app.name)
      return Promise.resolve()
    },
    beforeMount: (app) => {
      console.log('beforeMount', app.name)
      return Promise.resolve()
    },
    afterMount: (app) => {
      console.log('afterMount', app.name)
      return Promise.resolve()
    },
    beforeUnmount: (app) => {
      console.log('beforeUnmount', app.name)
      return Promise.resolve()
    },
    afterUnmount: (app) => {
      console.log('beforeUnmount', app.name)
      return Promise.resolve()
    },
    // beforeMount: [(app) => console.log('before mount', app.name)],
  },
)
const startQianKun = () => {
  console.log('Vue应用程序成功挂载到DOM元素#app上了！');
  setDefaultMountApp('/vue3');
  start({
    prefetch: false,
    sandbox: {
      strictStyleIsolation: false,
      experimentalStyleIsolation: false
    }
  })
}
await app.mount('#app')

startQianKun()



