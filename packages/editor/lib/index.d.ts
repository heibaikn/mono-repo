import loader from '@monaco-editor/loader';
export { default as loader } from '@monaco-editor/loader';
import * as vue_demi from 'vue-demi';
import { PropType, ShallowRef } from 'vue-demi';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
export { monacoEditor };
import * as monaco from 'monaco-editor';

type Nullable<T> = T | null;
type MonacoEditor = typeof monacoEditor;

interface EditorProps {
    defaultValue?: string;
    defaultPath?: string;
    defaultLanguage?: string;
    value?: string;
    language?: string;
    path?: string;
    theme: 'light' | string;
    line?: number;
    options: monacoEditor.editor.IStandaloneEditorConstructionOptions;
    overrideServices: monacoEditor.editor.IEditorOverrideServices;
    saveViewState: boolean;
    width: number | string;
    height: number | string;
    className?: string;
}
interface VueMonacoEditorEmitsOptions {
    'update:value': (value: string | undefined) => void;
    beforeMount: (monaco: MonacoEditor) => void;
    mount: (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: MonacoEditor) => void;
    change: (value: string | undefined, event: monacoEditor.editor.IModelContentChangedEvent) => void;
    validate: (markers: monacoEditor.editor.IMarker[]) => void;
}
declare const _default: vue_demi.DefineComponent<{
    defaultValue: StringConstructor;
    defaultPath: StringConstructor;
    defaultLanguage: StringConstructor;
    value: StringConstructor;
    language: StringConstructor;
    path: StringConstructor;
    theme: {
        type: StringConstructor;
        default: string;
    };
    line: NumberConstructor;
    options: {
        type: PropType<monacoEditor.editor.IStandaloneEditorConstructionOptions>;
        default: () => {};
    };
    overrideServices: {
        type: PropType<monacoEditor.editor.IEditorOverrideServices>;
        default: () => {};
    };
    saveViewState: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<string | number>;
        default: string;
    };
    height: {
        type: PropType<string | number>;
        default: string;
    };
    className: StringConstructor;
}, {
    containerRef: ShallowRef<Nullable<HTMLElement>>;
    isEditorReady: vue_demi.ComputedRef<boolean>;
    wrapperStyle: vue_demi.ComputedRef<{
        width: string | number;
        height: string | number;
        display: string;
        position: string;
        textAlign: string;
    }>;
    containerStyle: vue_demi.ComputedRef<{
        display?: string | undefined;
        width: string;
    }>;
}, unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, ("update:value" | "beforeMount" | "mount" | "change" | "validate")[], "update:value" | "beforeMount" | "mount" | "change" | "validate", vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{
    defaultValue: StringConstructor;
    defaultPath: StringConstructor;
    defaultLanguage: StringConstructor;
    value: StringConstructor;
    language: StringConstructor;
    path: StringConstructor;
    theme: {
        type: StringConstructor;
        default: string;
    };
    line: NumberConstructor;
    options: {
        type: PropType<monacoEditor.editor.IStandaloneEditorConstructionOptions>;
        default: () => {};
    };
    overrideServices: {
        type: PropType<monacoEditor.editor.IEditorOverrideServices>;
        default: () => {};
    };
    saveViewState: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<string | number>;
        default: string;
    };
    height: {
        type: PropType<string | number>;
        default: string;
    };
    className: StringConstructor;
}>> & {
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onBeforeMount?: ((...args: any[]) => any) | undefined;
    onMount?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onValidate?: ((...args: any[]) => any) | undefined;
}, {
    theme: string;
    options: monacoEditor.editor.IStandaloneEditorConstructionOptions;
    overrideServices: monacoEditor.editor.IEditorOverrideServices;
    saveViewState: boolean;
    width: string | number;
    height: string | number;
}, {}>;

type Options = Parameters<typeof loader.config>[0];
declare function install(app: any, options?: Options): void;

declare function useMonaco(): {
    monacoRef: vue_demi.ShallowRef<Nullable<typeof monaco>>;
    unload: () => void;
};

export { EditorProps, VueMonacoEditorEmitsOptions, _default as default, install, useMonaco };
