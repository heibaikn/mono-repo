import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper";

// const app = createApp(App)

// app.mount('#app')


let instance: any;
let router: any;
let history: any;

function render(props: any) {
  const { container } = props;
  instance = createApp(App)
  instance.use(createPinia())
  history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/design' : '/');
  router = createRouter({
    history,
    routes,
  });
  instance.use(router)
  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app")
  instance.mount(c)
}
function storeTest(props: any) {
  // props.onGlobalStateChange &&
  //   props.onGlobalStateChange(
  //     (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
  //     true,
  //   );
  const { globalState, changeData } = props.useGlobalStore()
  changeData('markup', 123)
  changeData('userInfo', { name: 'kn' })
  setTimeout(() => {
    console.log("test start", props);
    console.log(globalState);
  }, 100)
}

renderWithQiankun({
  mount(props) {
    console.log("vue3sub mount");
    storeTest(props);
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("vue3sub unmount");
    instance.unmount();
  },
  update(props: any) {
    console.log("vue3sub update");
    console.log(props)
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}