import axios from 'axios'

import draggable from 'vuedraggable'
import VFormDesigner from '@/components/form-designer/index.vue'
import VFormRender from '@/components/form-render/index.vue'
// import draggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js'
import { registerIcon } from '@/utils/el-icons'
import 'virtual:svg-icons-register'
import '@/iconfont/iconfont.css'

import ContainerWidgets from '@/components/form-designer/form-widget/container-widget/index'
import ContainerItems from '@/components/form-render/container-item/index'

import { addDirective } from '@/utils/directive'
import { installI18n } from '@/utils/i18n'
import { loadExtension } from '@/extension/extension-loader'

VFormDesigner.install = function (app) {
  addDirective(app)
  installI18n(app)
  loadExtension(app)

  app.use(ContainerWidgets)
  app.use(ContainerItems)

  registerIcon(app)
  app.component('draggable', draggable)
  app.component(VFormDesigner.name, VFormDesigner)
}

VFormRender.install = function (app) {
  installI18n(app)
  loadExtension(app)
  app.use(ContainerItems)

  registerIcon(app)
  app.component(VFormRender.name, VFormRender)
}

const components = [VFormDesigner, VFormRender]

const install = (app) => {
  addDirective(app)
  installI18n(app)
  loadExtension(app)
  console.log('hello,world')

  app.use(ContainerWidgets)
  app.use(ContainerItems)

  registerIcon(app)
  app.component('draggable', draggable)

  components.forEach((component) => {
    app.component(component.name, component)
  })
  // window.axios = axios
}

export default {
  install,
  VFormDesigner,
  VFormRender
}
