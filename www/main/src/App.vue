<template>
  <div class="wrap">
    <SideBar class="sidebar" :data="self.data" />
    <div class="main" :class="globalState.env !== 'main' && 'hidden'">
      <RouterView />
    </div>
    <div id="subapp" :class="globalState.env === 'main' && 'hidden'" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/sidebar/index.vue'
import { useGlobalStore } from '@/stores/global'
const { globalState, changeData } = useGlobalStore()
const self = reactive({
  data: [
    {
      label: '首页',
      path: '/',
      children: [
        {
          label: '生命钩子',
          path: '/lifecycle'
        },
        {
          label: '生命钩子-参照组',
          path: '/lifecycle-toggle'
        },
        {
          label: 'about',
          path: '/about'
        }
      ]
    },
    {
      label: '功能',
      path: '/design',
      children: [
        {
          label: '虚拟列表',
          path: '/design/virtual-list'
        },
        {
          label: '表单引擎',
          path: '/design/form-v3'
        },
        {
          label: '工作流',
          path: '/design/workflow'
        }
      ]
    },
    {
      label: 'react',
      path: '/react'
      // children: [

      // ]
    }
  ]
})
setTimeout(() => {
  changeData('markup', 11)
}, 3000)

const aa = {
  a: 1
}
// console.log('object', aa)
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding: 16px 0 16px 16px;
  height: 100vh;
  width: 100vw;
  min-width: 1440px;
  .sidebar {
    width: 200px !important;
    flex-basis: 200px;
    flex-grow: 0;
  }

  .main,
  #subapp {
    flex-basis: 800px;
    flex-grow: 1;
  }

  :deep(#subapp) {
    > div {
      height: 100%;
      // position: relative;
      // top: 0;
      // bottom: 0;
    }
  }

  .hidden {
    display: none;
  }
}
</style>
