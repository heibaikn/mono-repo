<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
const func = ()=>{
  let a ="";
  a.join()
}
</script>

<template>
  <main>
    <img src="http://127.0.0.1:7200/child/react/vite.svg" class="logo" alt="Vite logo">
    <button @click="func">错误</button>
    <TheWelcome />
  </main>
</template>
