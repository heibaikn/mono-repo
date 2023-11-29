<template>
  <div id="form-v3">
    <VFormDesigner ref="vfDesignerRef" :global-dsv="globalDsv" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'formV3',
  data() {
    return {
      //全局数据源变量
      globalDsv: {
        testApiHost: 'http://www.test.com/api',
        testPort: 8080
      }
    }
  },
  computed: {
    //
  },
  methods: {
    doTest() {
      let fieldList = this.$refs.vfDesignerRef.getFieldWidgets(null, true)
      console.log('test', fieldList)
    }
  }
}
</script>

<style lang="scss">
#form-v3 {
  height: 100%;
}
</style>
