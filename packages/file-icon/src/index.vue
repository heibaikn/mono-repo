<template>
  <component :is="SelfComponents[iconType]" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Config from './config'
import * as Svg from './components'
const SelfComponents = Svg as any
const props = defineProps({
  name: {
    type: String,
    default: 'File'
  }
})
const iconType = computed<string>(() => {
  const fileName = Config[props.name]
  if (fileName) {
    return fileName.charAt(0).toUpperCase() + fileName.slice(1)
  }
  const extendsion = props.name.split('.').pop()!
  const extendsionName = Config[extendsion]
  if (extendsionName) {
    return extendsionName.charAt(0).toUpperCase() + extendsionName.slice(1)
  }
  return 'File'
})
</script>

<style scoped lang="scss"></style>
