<template>
  <div ref="root" class="vue3-virtual-list-container" @scroll.passive="handleScroll">
    <virtual-list-search
      v-if="realOption.search"
      :data="props.data"
      :options="realOption"
      @scrollTo="innerScrollTo"
      @searchWord="searchWord"
      @ignoreCase="ignoreCaseChange" />
    <div
      ref="domList"
      class="vue3-virtual-list-scroll"
      :style="realOption.virtual ? `height: ${scrollHeight}px;padding-top: ${paddingTop}px` : ''">
      <div
        v-for="item in pool"
        :key="item[dataKey]"
        :class="`v-${item[dataKey]} list-item-container ${
          item[dataKey] === realOption.highlightLine ? 'heightligth' : ''
        }`"
        :style="`min-height: ${itemSize}px`">
        <slot
          :item="item"
          :ansi="(txt) => ansiFunc(txt, item)"
          :class-name="className"
          :index="item._index" />
      </div>
    </div>
    <div v-if="_self.appendLoading" class="loading-widget is-loading">
      <svg-loading />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import ansi2Html from 'ansi-to-html'
import { IGNORE_CASE_FLAGS, NOT_IGNORE_CASE_GLAGS } from './constant'
import VirtualListSearch from './virtualListSearch.vue'
import SvgLoading from './loading.vue'
import type { PropType } from 'vue'
export interface Options {
  dataKey: string
  itemSize: number
  poolBuffer: number
  start: number
  virtual: boolean
  highlightString: string
  highlightLine: number | undefined
  search: boolean
  searchBuffer: number
  searchIgnoreCase: boolean
}
type ListData = Record<string, any>[]

const props = defineProps({
  data: {
    type: Array as PropType<ListData>,
    default: () => []
  },
  options: {
    type: Object as PropType<Options>,
    default: () => {
      return {}
    }
  }
})
const className = {
  index: 'cell-index',
  log: 'txt'
}
const realOption = computed(() => {
  return Object.assign(
    {
      dataKey: 'id',
      itemSize: 16,
      poolBuffer: 10,
      highlightString: '',
      highlightLine: true,
      virtual: false,
      search: false,
      searchBuffer: 0,
      searchIgnoreCase: false
    },
    props.options
  ) as Options
})

const { poolBuffer, itemSize, dataKey } = toRefs(realOption.value)
// console.log(poolBuffer, itemSize, dataKey,toRefs);
const root = ref<HTMLElement | null>(null)
const domList = ref<HTMLElement | null>(null)
const pool = ref<any[]>([])
const scrollHeight = ref()
let containerHeight = 0
let numberViewportItem = 0
const paddingTop = ref(0)
let isScrollBusy = false
let range: number[] = reactive([])
const _self = reactive({
  searchWord: '',
  ignoreCase: true,
  appendLoading: false
})

const ignoreCaseChange = (val: boolean) => {
  _self.ignoreCase = val
}
const isHighligth = (searched: string, line: number) => {
  if (![searched].includes('')) {
    return true
  }
  if (realOption.value.highlightString && line === realOption.value.highlightLine) {
    return true
  }
  return false
}
// const ansiFunc = (txt: string, searched: string = _self.searchWord, line = -1) => {
const ansiFunc = (txt: string, item: any) => {
  if (!txt) return txt
  const ansiImpl = new ansi2Html()
  const searched = _self.searchWord || realOption.value.highlightString
  const val = searched.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // eslint-disable-line
  let txtRes = txt
  const highlight = isHighligth(_self.searchWord, item[realOption.value.dataKey])
  if (highlight) {
    const flags = _self.ignoreCase ? IGNORE_CASE_FLAGS : NOT_IGNORE_CASE_GLAGS
    const regex = new RegExp(val, `${flags}g`)
    txtRes = txt.replace(
      regex,
      '<span style="color: rgba(51, 51, 51);background-color: rgb(255, 255, 85);">$&</span>'
    )
  }
  return ansiImpl.toHtml(txtRes)
}

const generatePoolDate = () => {
  pool.value = props.data.slice(range[0], range[1]).map((v: any, i) => {
    return { ...v, _index: range[0] + i }
  })
}

const handleScroll = (event: any) => {
  event.stopPropagation()
  if (!root.value) return
  if (!realOption.value.virtual) return
  if (isScrollBusy) return

  isScrollBusy = true

  requestAnimationFrame(() => {
    isScrollBusy = false
    if (!root.value) return
    range[0] = Math.floor(root.value.scrollTop / itemSize.value) - Math.floor(poolBuffer.value / 2)
    range[0] = Math.max(range[0], 0)
    range[1] = range[0] + Math.floor(root.value.clientHeight / itemSize.value) + poolBuffer.value

    paddingTop.value = range[0] * itemSize.value
    // if (range[1] > props.data.length) {
    //   let h = calcExtraHeight(range[1] - props.data.length)
    //   range[1] = props.data.length;
    //   paddingTop.value -= h;
    // }
    range[1] = Math.min(range[1], props.data.length)
    generatePoolDate()
    // console.log('scroll~~~~~~~', scrollHeight.value, paddingTop.value, containerHeight);
  })
}

const init = (idx = 0, refresh = true) => {
  if (!root.value) return
  containerHeight = root.value.clientHeight
  const dataLen = props.data.length
  scrollHeight.value = dataLen * itemSize.value + Math.ceil(containerHeight / 3)
  numberViewportItem = Math.ceil(containerHeight / itemSize.value)
  const itemLen = numberViewportItem + poolBuffer.value
  const totalLines = numberViewportItem + poolBuffer.value + idx
  if (!realOption.value.virtual) {
    range = [idx, dataLen]
  } else {
    if (idx + itemLen > dataLen) {
      range = [Math.ceil(idx - numberViewportItem / 1.5), dataLen]
    } else {
      range = [idx, totalLines]
    }
  }
  if (refresh) {
    generatePoolDate()
    paddingTop.value = range[0] * itemSize.value
    root.value.scrollTop = paddingTop.value
  }
  // console.log(containerHeight,scrollHeight.value);
}
const innerScrollTo = (idx: number) => {
  scrollTo(idx, false)
}
const scrollTo = (idx: number, _outer = true) => {
  realOption.value.highlightLine = idx
  // if (outer) {
  //   _self.searchWord = realOption.highlightString;
  // }
  let line = idx - realOption.value.searchBuffer
  line < 0 && (line = 0)
  init(line)
}

const searchWord = (word: string) => {
  _self.searchWord = word
  generatePoolDate()
}

const append = async (appendData: any[], config: any = { loading: true }) => {
  _self.appendLoading = !!config.loading
  if (!appendData.length) return
  const isBottom = scrollHeight.value < paddingTop.value + containerHeight * 2
  props.data.push(...appendData) // eslint-disable-line
  init(appendData[0].idx, false)
  if (isBottom) {
    await nextTick()
    domList.value?.scrollIntoView({ block: 'end' })
  }
}

onMounted(() => {
  init()
})

const unwatch = watch(
  () => props.data,
  (cData) => {
    scrollHeight.value = cData.length * itemSize.value
    init()
    unwatch()
  }
)

watch(itemSize, (cItemSize) => {
  scrollHeight.value = props.data.length * cItemSize
})

defineExpose({
  append,
  scrollTo
})
</script>

<style scoped lang="scss">
.vue3-virtual-list-container {
  width: 100%;
  height: 100%;
  height: 100vh;
  min-width: 1000px;
  min-height: 100px;
  background-color: rgb(51, 51, 51);
  color: #f5f5f5;
  font-size: 12px;
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New', monospace;
  // transform: translate(1px);
  overflow: auto;
}

/* .vue3-virtual-list-main {
  padding: 12px 0px;
} */

.vue3-virtual-list-scroll {
  box-sizing: border-box;
}

.loading-widget {
  position: fixed;
  bottom: 20px;
  left: 320px;
  width: 18px;
  height: 18px;
  animation: rotating 2s linear infinite;
  color: rgba(255, 255, 255, 1);

  .icon-loading {
    width: 18px;
    height: 18px;
  }
}

.heightligth {
  background-color: #e3e4e23b;

  :deep(.cell-index) {
    span {
      color: #fff;
    }
  }
}

.list-item-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow: hidden;

  &:hover {
    background-color: rgb(68, 68, 68);

    :deep(.cell-index) {
      span {
        color: #fff;
      }
    }
  }

  :deep() {
    > div {
      flex: 1;
      text-align: left;
      margin: 0 12px;
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
      text-align: left;
    }

    .cell-index {
      flex: none;
      width: 50px;
      color: rgb(119, 119, 119);
      user-select: none;

      span:hover {
        color: rgb(245, 245, 245);
      }
    }

    .txt {
      max-height: 44px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: pre-wrap;
    }
  }
}
</style>
