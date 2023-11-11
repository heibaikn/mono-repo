import { shallowRef } from 'vue-demi'
import loader from '@monaco-editor/loader'
import type { Nullable, MonacoEditor } from '../types'
export function useMonaco() {
  const monacoRef = shallowRef<Nullable<MonacoEditor>>(null)
  loader.config({
    paths: {
      vs: '/vs'
    }
  })
  // monaco mount
  const monacoLoader = loader.init()
  const unload = () => monacoLoader.cancel()

  monacoLoader
    .then((monacoInstance) => (monacoRef.value = monacoInstance))
    .catch((error) => {
      if (error?.type !== 'cancelation') {
        console.error('Monaco initialization error:', error)
      }
    })

  return {
    monacoRef,
    unload
  }
}
