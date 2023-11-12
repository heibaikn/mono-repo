<template>
  <div class="com-main" :class="options.showPage && 'has-page'">
    <el-row class="com-header">
      <el-col v-for="(col, key) in options.fields" :key="key" :span="col.span" class="col">
        {{ col.label }}
      </el-col>
    </el-row>
    <div class="com-list">
      <template v-for="(item, index) in options.data" :key="index">
        <slot :element="item" :index="index" />
      </template>
    </div>
    <div v-if="options.showPage" class="com-pagination">
      <el-pagination
        v-bind="pageInfo"
        v-model:current-page="self.pageNum"
        v-model:page-size="self.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const emits = defineEmits(['pageEvent'])
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        fields: [],
        data: [],
        showPage: false,
        pagination: {}
      }
    }
  }
})
const self = reactive({
  pageNum: 1,
  pageSize: 50
})
const pageInfo = computed(() => {
  return Object.assign(
    {
      hideOnSinglePage: false,
      defaultPageSize: 50,
      background: true,
      layout: 'total, prev, pager, next',
      total: 0
    },
    props.options.pagination
  )
})
const debounce = (fn: () => void, timeout: number) => {
  let timer: any = 0
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}
const debouncePageChange = debounce(() => {
  emits('pageEvent', {
    pageNum: self.pageNum,
    pageSize: self.pageSize
  })
}, 200)
const handleSizeChange = (val: number) => {
  debouncePageChange()
}
const handleCurrentChange = (val: number) => {
  debouncePageChange()
}
const init = () => {
  if (props.options.showPage) {
    self.pageNum = props.options.pagination.pageNum || 1
    self.pageSize = props.options.pagination.pageSize || 50
  }
}
init()
</script>

<style scoped lang="scss">
$unit: calc(100 / 48);
$n: 48;

.com-main {
  width: 100%;
  height: 100%;

  .com-header {
    display: flex;
    flex-wrap: nowrap;
    padding: 8px 0px;
    color: rgba(0, 0, 0, 0.44);
    font-size: 12px;
    font-weight: 600;
    margin-right: 8px;

    .col:last-child {
      display: flex;
      justify-content: flex-end;
      padding-right: 24px !important;
    }

    .col {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .com-list {
    height: calc(100% - 32px);
    overflow-y: scroll;
  }

  :deep() {
    @for $i from 1 through $n {
      .el-col-#{$i} {
        max-width: (calc(100% / 48) * $i);
        flex: 0 0 (calc(100% / 48) * $i);
      }
    }

    .el-pagination__sizes {
      width: 100px;
    }
  }

  :deep(.item-row) {
    min-height: 46px;
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

.com-main.has-page {
  .com-list {
    height: calc(100% - 70px);
    padding-bottom: 10px;
  }
}
</style>
