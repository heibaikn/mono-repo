import { reactive } from 'vue'
import * as draggable from 'vuedraggable'
const install = (Vue) => {
  const self = reactive({
    aa: 1
  })
  console.log(self)
  console.log('hello,world')
  Vue.component('draggable', draggable)
  Vue.component('hello', '<div>hello</dev>')
}
export default { install }
