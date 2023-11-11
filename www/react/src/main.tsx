import React from 'react'
import ReactDOM from 'react-dom/client'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import App from './App'
import type { Root } from 'react-dom/client'
import './index.css'
let root: Root

function render(props: any) {
  const { container } = props
  root = ReactDOM.createRoot(
    container ? container.querySelector('#root') : document.querySelector('#root')
  )
  console.log(root, 'root')
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

function storeTest(props: any) {
  // props.onGlobalStateChange &&
  //   props.onGlobalStateChange(
  //     (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
  //     true,
  //   );
  const { globalState, changeData } = props.useGlobalStore()
  changeData('markup', 22)
  changeData('userInfo', { name: 'kn1234' })
  setTimeout(() => {
    console.log('test start', props)
    console.log(globalState)
  }, 100)
}

renderWithQiankun({
  mount(props) {
    console.log('react18 mount')
    storeTest(props)
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount() {
    console.log('react18 unmount')
    root.unmount()
  },
  update(props: any) {
    console.log('react18 update')
    console.log(props)
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
