import './assets/main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import App from './App.vue'
import routes from './router'
import { Utils } from '@heibaimono/helper';
console.log(Utils.random());
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
  instance.use(ElementPlus)
  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app")
  instance.mount(c)
}
function storeTest(props: any) {
  const { globalState, changeData } = props.useGlobalStore()
  changeData('markup', 1)
  // changeData('userInfo', { name: 'kn' })
  // setTimeout(() => {
  // console.log(globalState);
  // }, 100)
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