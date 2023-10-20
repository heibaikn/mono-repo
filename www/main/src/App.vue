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
    <div id="subapp"></div>
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const self = reactive({
  
})


</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding: 16px;

  .sidebar {
    width: 200px;
  }
}
</style>
