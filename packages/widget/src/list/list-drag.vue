<template>
  <div class="com-main">
    <el-row class="com-header">
      <el-col v-for="col in options.fields" :span="col.span" class="col">
        {{ col.label }}
      </el-col>
    </el-row>
    <draggable v-model="options.data" v-bind="self.dragOptions">
      <template #item="{ element, index }">
        <div>
          <slot :element="element" :index="index"></slot>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import draggable from "vuedraggable";
// import OptionsItem from './select-edit-item.vue';
const props = defineProps({
  options: {
    type: Object,
    default: {
      fields: [],
      data: [],
      dragOptions: {},
    },
  },
});
const self = reactive({
  dragOptions: {
    animation: 300,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
    handle: ".drag-move",
    itemKey: "id",
  },
});
onMounted(() => {
  Object.assign(self.dragOptions, props.options.dragOptions);
});
</script>

<style scoped lang="scss">
$unit: calc(100 / 48);
$n: 48;

.com-main {
  .com-header {
    display: flex;
    flex-wrap: nowrap;
    padding: 8px 24px;
    color: rgba(0, 0, 0, 0.44);
    font-size: 12px;
    font-weight: 600;
    margin-right: 8px;

    .col:last-child {
      display: flex;
      justify-content: flex-end;
      padding-right: 24px !important;
    }
  }

  :deep() {
    @for $i from 1 through $n {
      .el-col-#{$i} {
        max-width: (calc(100% / 48) * $i);
        flex: 0 0 (calc(100% / 48) * $i);
      }
    }
  }

  :deep(.item-row) {
    min-height: 46px;
    padding: 0 24px;
    color: rgba(0, 0, 0, 0.84);
    font-size: 13px;
    margin-left: 0 !important;
    margin-right: 0 !important;

    > div {
      padding: 8px 24px;
      display: flex;
      align-content: flex-start;
      justify-content: flex-start;
      align-items: center;
    }

    .end {
      display: flex;
      justify-content: flex-end;
      padding-right: 24px !important;
    }

    .text {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.66);
      display: flex;
      justify-content: center;

      &.additional:hover {
        border-bottom: 1px solid rgba(0, 0, 0, 0.86);
      }
    }
  }
}
</style>
