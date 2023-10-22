import { useGlobalStore } from "@/stores/global";
import { registerMicroApps, start } from "qiankun";
import appsConfig from "./config";

const startQianKun = () => {
  console.log('Vue应用程序成功挂载到DOM元素#app上了！');
  console.log("microConfig", appsConfig);
  const {  changeData, onGlobalChange } = useGlobalStore()
  appsConfig.map(item => {
    item.props = {
      useGlobalStore
    }
    return item
  })
  registerMicroApps(appsConfig,
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
        changeData('env', app.name)
        console.log('afterMount', app.name)
        return Promise.resolve()
      },
      beforeUnmount: (app) => {
        console.log('beforeUnmount', app.name)
        return Promise.resolve()
      },
      afterUnmount: (app) => {
        changeData('env', 'main')

        console.log('beforeUnmount', app.name)
        return Promise.resolve()
      },
    },
  )
  onGlobalChange((value, prev) => {
    console.log('[onGlobalStateChange - master]:', value, '\n prev:', prev)
  
  });
  changeData('env', 'main')
  changeData('userInfo', {
    name: 'heibaikn',
    'u_id': 10008
  })
  start({
    prefetch: false,
    sandbox: {
      strictStyleIsolation: false,
      experimentalStyleIsolation: false
    }
  })
}
export default startQianKun