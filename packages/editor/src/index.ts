import loader from '@monaco-editor/loader'
import VueMonacoEditor from './components/Editor'

export type { EditorProps, VueMonacoEditorEmitsOptions } from './components/Editor'
export * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
export { install } from './install'
export { useMonaco } from './hooks'
export { loader }

export default VueMonacoEditor
