<template>
  <div v-show="_self.show" class="search">
    <div v-if="options.searchIgnoreCase" class="ctrl-wrap">
      <div
        class="opear svg-icon"
        :class="_self.ignoreCase ? '' : 'case-sensitive'"
        @click="ignoreCase">
        <svg-ignore />
      </div>
    </div>
    <div class="input-wrap">
      <input ref="domInput" v-model="_self.word" v-search:func="handleKeydown" type="text" />
      <div v-show="_self.word" class="search-float ret-info">
        <span>{{ _self.filterData.length && _self.filterIndex + 1 }}</span>
        /
        <span>{{ _self.filterData.length }}</span>
      </div>
    </div>
    <div class="right">
      <span title="上一个(Shift+Enter)" @click="prev">
        <div class="svg-icon">
          <svg-up />
        </div>
      </span>
      <span title="下一个(Enter)" @click="next">
        <div class="svg-icon">
          <svg-down />
        </div>
      </span>
      <span title="关闭(Escape)" @click="close">
        <div class="svg-icon">
          <svg-close />
        </div>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import vSearch from './directiveSearch'
import { IGNORE_CASE_FLAGS, NOT_IGNORE_CASE_GLAGS } from './constant'
import SvgClose from './icon/close.vue'
import SvgDown from './icon/arrow-downward.vue'
import SvgUp from './icon/arrow-upward.vue'
import SvgIgnore from './icon/ignore-case.vue'
const emit = defineEmits(['prev', 'next', 'close', 'scrollTo', 'searchWord', 'ignoreCase'])

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  options: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const domInput = ref()
// console.log("data search", data);
const _self = reactive({
  word: '',
  startIdx: 0,
  filterIndex: 0,
  filterData: [],
  flag: false,
  show: false,
  ignoreCase: true
})
const checkKeyboardKey = (str: string, e: any) => {
  console.log(str, '~~~~~', e)
  switch (str) {
    case 'ctrlF':
      // return e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.metaKey && e.keyCode === 70))
      return (e.ctrlKey || e.metaKey) && e.key === 'f'
    case 'Esc':
      return e.key === 'Escape'
    case 'enter':
      return e.shiftKey === false && e.key === 'Enter'
    case 'shiftEnter':
      return e.shiftKey && e.key === 'Enter'
    case 'ctrlA':
      return (e.ctrlKey || e.metaKey) && e.key === 'a'
  }
}
const handleKeydown = (e: KeyboardEvent) => {
  if (checkKeyboardKey('ctrlF', e)) {
    _self.show = true
    setTimeout(() => {
      domInput.value.focus()
    }, 20)
    e.preventDefault()
    emit('searchWord', _self.word.trim())
  }
  if (!_self.show) return
  if (checkKeyboardKey('Esc', e)) {
    close()
  }
  if (checkKeyboardKey('enter', e)) {
    next()
  }
  if (checkKeyboardKey('shiftEnter', e)) {
    prev()
  }
}

const searchFunc = () => {
  if (!_self.word) {
    return
  }
  const flags = _self.ignoreCase ? IGNORE_CASE_FLAGS : NOT_IGNORE_CASE_GLAGS
  /* eslint-disable */
  const searched = _self.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '$&')
  /* eslint-enable */
  const regex = new RegExp(searched, flags)
  _self.filterData = props.data
    .filter((item: any) => {
      return regex.test(item.txt)
    })
    .map((item: any) => item.idx) as any
  _self.filterIndex = 0
  if (_self.filterData.length) {
    _self.startIdx = _self.filterData[0]
    emit('scrollTo', _self.startIdx)
  }
}

const ignoreCase = () => {
  _self.ignoreCase = !_self.ignoreCase
  emit('ignoreCase', _self.ignoreCase)
  searchFunc()
}

const debounce = (func: () => void, delay: number) => {
  let time: number
  return () => {
    time && clearTimeout(time)
    time = setTimeout(func, delay)
  }
}

const searchFuncDebounce = debounce(searchFunc, 200)

const prev = () => {
  if (!_self.word) return
  _self.filterIndex--
  if (_self.filterIndex < 0) {
    _self.filterIndex = _self.filterData.length - 1
  }
  emit('scrollTo', _self.filterData[_self.filterIndex])
}
const next = () => {
  if (!_self.word) return
  _self.filterIndex++
  if (_self.filterIndex > _self.filterData.length - 1) {
    _self.filterIndex = 0
  }
  emit('scrollTo', _self.filterData[_self.filterIndex])
}
const close = () => {
  _self.show = false
  emit('searchWord', '')
}
watch(
  () => _self.word,
  () => {
    searchFuncDebounce()
    emit('searchWord', _self.word.trim())
  }
)
</script>

<style scoped lang="scss">
.search {
  display: flex;
  position: fixed;
  right: 20px;
  margin-top: 10px;
  border-left: 3px solid rgb(75, 75, 76);
  border-radius: 4px;
  background: rgb(75, 75, 76);
  padding: 5px 5px 5px 5px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.22), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    font-size: 14px;
    vertical-align: middle;

    :deep() {
      svg {
        width: 1em;
        height: 1em;
      }
    }
  }

  .ctrl-wrap {
    width: 24px;
    position: relative;

    .opear {
      position: absolute;
      width: 20px;
      height: 24px;
      line-height: 24px;
      top: 5px;
      padding: 0px 3px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .case-sensitive {
      background-color: rgba(255, 255, 255, 0.25);
    }
  }

  .input-wrap {
    position: relative;

    input {
      width: 200px;
      height: 24px;
      border: none;
      outline: none;
      padding: 2px 5px;
      // padding-left: 20px;
      margin-right: 5px;
      transition: 0.25s;
      background-color: rgb(105, 105, 105);
      color: white;
      font-size: 12px;
    }

    .ret-info {
      position: absolute;
      right: 5px;
      top: 5px;
      padding: 0px 8px;
      background-color: rgb(105, 105, 105);
    }
  }

  .search-float {
    height: 24px;
    line-height: 24px;
    color: white;
  }

  .right {
    display: flex;
    width: 60px;
    justify-content: space-around;
    align-items: center;
    margin-right: 8px;
    margin-left: 12px;

    span {
      // position: relative;
      // width: 20px;
      // height: 24px;
      // line-height: 24px;
      // top: 5px;
      // padding: 0px 3px;
      // border-radius: 4px;
      // cursor: pointer;
      // &:hover {
      //   background-color: rgba(255, 255, 255, 0.1);
      // }
      cursor: pointer;
      padding: 3px;
      margin-right: 4px;
      border-radius: 4px;
      transition: 0.25s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
