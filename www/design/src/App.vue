<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/virtual-list">虚拟列表</RouterLink>
      <RouterLink to="/workflow">流程工具</RouterLink>
    </nav>
  </header>
  <RouterView class="router-view" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.router-view {
  flex: 1;
}


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
