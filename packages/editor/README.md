## Props & Events & slots

| Name | Type | Default | Description | remark |
| --- | --- | --- | --- | --- |
| defaultValue | `string` |  | default value of the current model |  |
| defaultLanguage | `string` |  | default language of the current model | languages supported by `monaco-editor` [view here](https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages) |
| defaultPath | `string` |  | default path of the current model | `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))` |
| value | `string` |  | value of the current model, can use `v-model:value` | `v-model:value` |
| language | `string` |  | language of the current model | languages supported by `monaco-editor` [view here](https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages) |
| path | `string` |  | path to the current model |  |
| theme | `light` \| `vs-dark` | `light` | theme of the `monaco-editor` | `monaco.editor.defineTheme(...)` |
| line | `number` |  | number of lines to jump to |  |
| options | `object` | `{}` | [IStandaloneEditorConstructionOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html) |  |
| overrideServices | `object` | `{}` | [IEditorOverrideServices](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditorOverrideServices.html) |  |
| saveViewState | `boolean` | `true` | save the view state of the model (scroll position, etc.) after model changes | a unique `path` needs to be configured for each model |
| width | `number` \| `string` | `100%` | container width |  |
| height | `number` \| `string` | `100%` | container height |  |
| className | `string` |  | container class name |  |
| onBeforeMount | `(monaco: Monaco) => void` |  | execute before the editor instance is created |  |
| onMount | `(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void` |  | execute after the editor instance has been created |  |
| onChange | `(value: string \| undefined, event: monaco.editor.IModelContentChangedEvent) => void` |  | execute when  the changed value change |  |
| onValidate | `(markers: monaco.editor.IMarker[]) => void` |  | execute when a syntax error occurs | `monaco-editor` supports syntax-checked languages [view here](https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages) |
| `#defalut` | `slot` | `'loading...'` | loading status | when loading files from CDN, displaying the loading status will be more friendly |


## example



##

fork from [https://github.com/imguolao/monaco-vue](https://github.com/imguolao/monaco-vue)