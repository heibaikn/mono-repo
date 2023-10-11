<template>
  <div class="search" v-show="_self.show">
    <div class="ctrl-wrap" v-if="options.searchIgnoreCase">
      <div class="opear" :class="_self.ignoreCase ? '' : 'case-sensitive'"
           @click="ignoreCase">
        <svg-icon name="ignore-case">
        </svg-icon>
      </div>
    </div>
    <div class="input-wrap">
      <input ref="domInput" v-model="_self.word" v-search:func="handleKeydown"
             type="text">
      <div class="search-float ret-info" v-show="_self.word">
        <span>{{ _self.filterData.length && _self.filterIndex + 1 }}</span>/<span>{{
            _self.filterData.length
        }}</span>
      </div>
    </div>
    <div class="right">
      <span @click="prev" title="上一个(Shift+Enter)">
        <svg-icon name="arrow-upward"></svg-icon>
      </span>
      <span @click="next" title="下一个(Enter)">
        <svg-icon name="arrow-downward"></svg-icon>
      </span>
      <span @click="close" title="关闭(Escape)">
        <svg-icon name="search-close"></svg-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import vSearch from './directiveSearch';
import { NOT_IGNORE_CASE_GLAGS, IGNORE_CASE_FLAGS } from './constant';
const emit = defineEmits(['prev', 'next', 'close', 'scrollTo', 'searchWord', 'ignoreCase'])
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  options: {
    type: Object,
    default: {}
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
  switch (str) {
    case "ctrlF":
      // return e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.metaKey && e.keyCode === 70))
      return e.ctrlKey && e.key === 'f'
    case "Esc":
      return e.key === 'Escape'
    case "enter":
      return (e.shiftKey === false) && e.key === 'Enter'
    case "shiftEnter":
      return e.shiftKey && e.key === 'Enter'
    case "ctrlA":
      return e.ctrlKey && e.key === 'a'
  }
}
const handleKeydown = (e: KeyboardEvent) => {
  if (checkKeyboardKey('ctrlF', e)) {
    _self.show = true;
    setTimeout(() => {
      domInput.value.focus()
    }, 20)
    e.preventDefault();
    emit("searchWord", _self.word.trim())
  }
  if (!_self.show) return;
  if (checkKeyboardKey("Esc", e)) {
    close()
  }
  if (checkKeyboardKey("enter", e)) {
    next()
  }
  if (checkKeyboardKey("shiftEnter", e)) {
    prev()
  }
}

const searchFunc = () => {
  if (!_self.word) {
    return;
  }
  const flags = _self.ignoreCase ? IGNORE_CASE_FLAGS : NOT_IGNORE_CASE_GLAGS;
  let searched = _self.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regex = new RegExp(searched, flags)
  _self.filterData = props.data.filter((item: any) => {
    return regex.test(item.txt)
  }).map((item: any) => item.idx) as any;
  _self.filterIndex = 0
  if (_self.filterData.length) {
    _self.startIdx = _self.filterData[0]
    emit("scrollTo", _self.startIdx)
  }
}

const ignoreCase = () => {
  _self.ignoreCase = !_self.ignoreCase;
  emit("ignoreCase", _self.ignoreCase)
  searchFunc()
}

const debounce = (func: Function, delay: number) => {
  let time: number
  return () => {
    time && clearTimeout(time)
    time = setTimeout(func, delay)
  }
}

const searchFuncDebounce = debounce(searchFunc, 200)

const prev = () => {
  if (!_self.word) return;
  _self.filterIndex--
  if (_self.filterIndex < 0) {
    _self.filterIndex = _self.filterData.length - 1;
  }
  emit("scrollTo", _self.filterData[_self.filterIndex])
}
const next = () => {
  if (!_self.word) return;
  _self.filterIndex++
  if (_self.filterIndex > _self.filterData.length - 1) {
    _self.filterIndex = 0;
  }
  emit("scrollTo", _self.filterData[_self.filterIndex])
}
const close = () => {
  _self.show = false;
  emit("searchWord", '')
}
watch(() => _self.word, () => {
  searchFuncDebounce()
  emit("searchWord", _self.word.trim())
})

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



  .ctrl-wrap {
    width: 24px;
    position: relative;

    .opear {
      position: absolute;
      width: 20px;
      height: 24px;
      line-height: 24px;
      top: 0px;
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
      top: 0px;
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
      cursor: pointer;
      padding: 3px;
      margin-right: 4px;
      border-radius: 4px;
      transition: 0.25s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .svg-icon {
      font-size: 18px;
    }
  }

}
</style>