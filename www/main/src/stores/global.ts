import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { initGlobalState } from 'qiankun';
import { merge } from 'lodash';
const { onGlobalStateChange, setGlobalState } = initGlobalState({});

export const useGlobalStore = defineStore('global', () => {
  const globalState = reactive({
    env: '',
    userInfo: {},
    markup: ""
  }) as any

  const onGlobalChange = onGlobalStateChange
  const changeData = (key: string, value: any) => {
    let realValue
    if (globalState[key]) {
      globalState[key] = merge(globalState[key], value)
    } else {
      globalState[key] = value
    }
    setGlobalState({ [key]: globalState[key] })
  }

  return { globalState, changeData, onGlobalChange }
})
