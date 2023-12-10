<template>
  <div id="formV3">
    <div>
      <el-button @click="doTest">切换</el-button>
    </div>
    <VFormDesigner ref="vfDesignerRef" v-model="self.data1" :options="self.data" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import VFormDesigner from './components/form-designer/index.vue'
import data from './data.js'
const self = reactive({
  options: {
    ...data,
    ignoreCache: true,
    globalDsv: {
      testApiHost: 'http://www.test.com/api',
      testPort: 8080
    }
  },
  data,
  data1: {}
})
const vfDesignerRef = ref()
const doTest = () => {
  let fieldList = vfDesignerRef.value.getFieldWidgets(null, true)
  console.log('test', fieldList)
  console.log(self.data1)
}
</script>

<style lang="scss">
#formV3 {
  height: 100%;
}
</style>
