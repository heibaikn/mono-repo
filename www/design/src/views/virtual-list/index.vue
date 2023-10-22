<template>
  <div class="virtual-list">
    <virtual-list
                  class="list-container"
                  ref="virtualTable"
                  :options="_self.options"
                  :data="_self.logData">
      <template v-slot="{ item, ansi, className }">
        <div class="log-no" :class="className.index">
          <span>{{ item.idx + 1 }}</span>
        </div>
        <div :class="className.log" :title="item.txt" v-html="ansi(item.txt)"></div>
      </template>
    </virtual-list>
  </div>
</template>

<script setup lang="ts">
import VirtualList from '@mono/virtual-list'
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import MonoConfig, { Project } from "@mono/config";
const host = MonoConfig.getHostBase(Project.Design, import.meta.env.MODE);
// import logsStr from './a.txt';
// console.log(logsStr);
const route = useRoute()
const _self = reactive<any>({
  options: {
    dataKey: 'idx',
    // poolBuffer: 30,
    virtual: true,
    search: true,
    // searchBuffer: 10,
    // highlightLine: false,
    searchIgnoreCase: true
  }
})
// _self.options
const virtualTable = ref<any>()
const scrollToLine = () => {
  _self.options.highlightLine = false
  if (!!route.query.line) {
    let line = route.query.line as string
    _self.options.highlightLine = +line - 1
    _self.options.highlightString = decodeURIComponent(route.query.searchStr as string)
    // realOption.highlightString
    setTimeout(() => {
      virtualTable.value?.scrollTo(+line - 1)
    }, 300)
  }
}
const fetchApiCiLogs = async () => {
  // let res = new Array(10000).fill(1).join('\n')
  let res = await fetch(`${host}a.txt`)
  let txt = await res.text()
  console.log(txt);
  const lines = 0
  let handleTexts = txt.split(/\r\n|\r|\n/g).map((log: string, idx: number) => {
    return {
      idx: lines + idx,
      txt: log
    }
  }) as any
  _self.logData = handleTexts
  scrollToLine()
  // if (_self.logData.length) {
  //   handleTexts.length && virtualTable.value?.append(handleTexts, { loading: false })
  // } else {
  //   _self.logData = handleTexts
  //   _self.logDataLoading = false
  //   scrollToLine()
  // }
  // _self.logDataFetchFlag = false
}
onMounted(() => {
  fetchApiCiLogs()
})

</script>

<style lang="scss" scoped>
.virtual-list {
  padding-right: 0 !important;

  .list-container {
    height: calc(100vh - 88px);

    .log-no {
      margin-left: 24px;
    }
  }
}
</style>