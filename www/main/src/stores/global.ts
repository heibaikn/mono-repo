import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { initGlobalState } from 'qiankun'
import { merge } from 'lodash'
const { onGlobalStateChange, setGlobalState } = initGlobalState({})

export const useGlobalStore = defineStore('global', () => {
  const globalState = reactive({
    env: '',
    userInfo: {},
    markup: ''
  }) as any
  const testVal = ref('')
  const isMain = computed(() => {
    console.log(globalState.env, globalState.env == 'main')
    return globalState.env == 'main'
  })
  const onGlobalChange = onGlobalStateChange
  const changeData = (key: string, value: any) => {
    if (typeof globalState[key] === 'object') {
      globalState[key] = merge(globalState[key], value)
    } else {
      globalState[key] = value
    }
    setGlobalState({ [key]: value })
  }

  return { globalState, changeData, onGlobalChange, isMain, testVal }
})
