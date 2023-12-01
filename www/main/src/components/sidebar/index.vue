<template>
  <div class="sidebar">
    <section v-for="item in data" :key="item.id">
      <div class="text-lg font-semibold">
        <RouterLink :to="item.path"> {{ item.label }}</RouterLink>
        <!-- {{ item.label }} -->
      </div>
      <ul v-if="item.children" class="">
        <li
          v-for="childItem in item.children"
          :key="childItem.id"
          @click="handleItemClick(childItem)"
          class="pl-4"
        >
          <RouterLink :to="childItem.path"> {{ childItem.label }}</RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})
const emit = defineEmits(['event'])
console.log('props.data', props.data)

const handleItemClick = (item: any) => {
  emit('event', item)
}
// export default {
//   props: {

//   },
//   methods: {
//     handleItemClick(item) {
//       this.$;
//     },
//   },
// };
</script>

<style scoped lang="scss">
.sidebar {
  width: 200px;
}

/* 可以添加更多样式 */
</style>
