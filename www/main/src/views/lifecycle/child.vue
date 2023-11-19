<template>
  <div>child: {{ count }}</div>
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
  reactive
} from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next((e) => {
      console.log('route child beforeRouteEnter')
    })
  },
  props: ['count'],
  name: 'lifecycle-child',
  setup(props) {
    const self = reactive({
      txt: 'child'
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
  }
})
</script>

<style lang="scss" scoped></style>
