<template>
  <div class="wrap">
    <div class="sidebar">
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/design">design-Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/react">react-Home</RouterLink>
        </li>
      </ul>
    </div>
    <div class="main" :class="globalState.env !== 'main' && 'hidden'">
      <RouterView />
    </div>
    <div id="subapp" :class="globalState.env === 'main' && 'hidden'"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import { useGlobalStore } from '@/stores/global';

const { isMain, globalState, changeData } = useGlobalStore()
console.log(isMain, "isMain", globalState);
const self = reactive({

})
setTimeout(() => {
  changeData('markup', 11)
}, 3000)

</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding: 16px;
  height: 100vh;

  .sidebar {
    width: 200px;
  }

  .main,
  #subapp {
    flex: 1;
  }

  .hidden {
    display: none;
  }
}
</style>
