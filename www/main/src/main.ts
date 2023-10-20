import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import microApps from './config/micro-apps';
import App from './App.vue'
import router from './router'
import { registerMicroApps, start, initGlobalState, setDefaultMountApp } from 'qiankun';

const app = createApp(App)

app.use(createPinia())
app.use(router)
console.log(microApps, "microApps");
registerMicroApps(microApps,
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
  },
)
const startQianKun = () => {
  console.log('Vue应用程序成功挂载到DOM元素#app上了！');

  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    name: 'main',
  });
  // setGlobalState({
  //   ignore: 'master',
  //   user: {
  //     name: 'master',
  //   },
  // });
  onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

  start({
    prefetch: false,
    sandbox: {
      strictStyleIsolation: false,
      experimentalStyleIsolation: false
    }
  })
}
const init = async () => {
  await app.mount('#app')
  startQianKun()
}
init()






