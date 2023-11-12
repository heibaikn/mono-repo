<template>
  <div>
    <Cirular class="icon" />
  </div>
</template>

<script setup lang="ts">
import Cirular from '../svg/cirular.vue'
</script>

<style scoped lang="scss">
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}
.icon {
  width: 40px;
  height: 40px;
  animation: loading-rotate 1.5s linear infinite;
}
</style>
