<template>
  <div ref="domRef">
    <!-- eslint-disable -->
    <pre>
## vue-router生命周期   
第一次触发时
1. 导航被触发。在失活的组件里调用 `beforeRouteLeave` 守卫 父先子后。
2. 调用全局的 `beforeEach` 守卫。
3. ??在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
4. 在路由配置里调用 `beforeEnter`。解析异步路由组件。
5. 在被激活的组件里调用 `beforeRouteEnter`。
6. 调用全局的 `beforeResolve` 守卫(2.5+)。导航被确认。
7. 调用全局的 `afterEach` 钩子。触发 DOM 更新。
8. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。
    </pre>
    <hr />
    <pre>
## vue生命周期      
### 1. 进入过程
- 父组件：`setup` `onBeforeMount`
- 子组件：`setup` `onBeforeMount` `onMounted`
- 父组件：`onMounted`
    </pre>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      @click="self.count++"
    >
      点击 +
    </button>
    <br />{{ self.count }}
    <br />
    <child :count="self.count"></child>

    <pre>
### 2. 更新过程（如果有数据变化）：
- 父组件：`onBeforeUpdate`
- 子组件：`onBeforeUpdate` `onUpdated`
- 父组件： `onUpdated`（父组件）

### 3. 销毁过程：
- 父组件：`onBeforeUnmount`（父组件和子组件都会执行）
- 子组件：`onBeforeUnmount`  `onUnmounted`
- 父组件：`onUnmounted`
    </pre>
    <hr />
    <pre>
### vue3生命周期钩子执行顺序：

### pageA销毁过程：

- 父组件：`onBeforeRouteLeave`
- 子组件：`onBeforeRouteLeave`
- 第一次路由：`beforeEach` `beforeEnter`
- pageB组件：`beforeRouteEnter`    //此处pageB 开始加载
- 第一次路由： `beforeResolve` `afterEach`
- 父组件： `onBeforeUnmount`
- 子组件：`onBeforeUnmount`

### pageB进入：

- 父组件：`setup` `onBeforeMount`
- 子组件：`setup` `onBeforeMount`
- 父组件：`beforeRouteEnter.next回调`
- pageA子组件： `onUnmounted`
- pageA父组件：`onUnmounted`
- 子组件： `onMounted`
- 父组件：`onMounted`
- 第二次路由执行：`beforeEach`
- 路由 父组件：`onBeforeRouteUpdate`
- 路由 子组件：`onBeforeRouteUpdate`
- 路由：`beforeResolve` `afterEach`

### 更新过程（如果有数据变化）：

- 父组件：`onBeforeUpdate`
- 子组件：`onBeforeUpdate` `onUpdated`
- 父组件： `onUpdated`

###
<!-- eslint-enable -->
</pre>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref
} from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import Child from './child.vue'
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    console.log(new URL(import.meta.url).pathname, 'route beforeRouteEnter')
    next((e) => {
      console.log('route beforeRouteEnter next callback')
    })
  },
  components: {
    Child
  },
  name: 'lifecycle-parent',
  setup() {
    console.log(new URL(import.meta.url).pathname, 'pageB setup~~~~~~~~~~~~~~~~~~~')
    const self = reactive({
      txt: 'parent',
      count: 0
    })
    console.log(self.txt, '：page setup')
    onBeforeMount(() => {
      console.log(self.txt, '：onBeforeMount')
    })
    onMounted(() => {
      console.log(self.txt, '：onMounted')
    })
    onBeforeUpdate(() => {
      console.log(self.txt, '：onBeforeUpdate')
    })
    onUpdated(() => {
      console.log(self.txt, '：onUpdated')
    })
    onBeforeUnmount(() => {
      console.log(self.txt, '：onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log(self.txt, '：onUnmounted')
    })
    onBeforeRouteUpdate(() => {
      console.log('route', self.txt, '：onBeforeRouteUpdate')
    })
    onBeforeRouteLeave(() => {
      console.log('route', self.txt, '：onBeforeRouteLeave')
    })
    return {
      self
    }
  }
})
</script>

<style lang="scss" scoped></style>
