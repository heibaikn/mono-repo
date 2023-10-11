declare const formatTime: (date: string, format?: string) => any;
declare const formatFromDate: (date: any, format?: string) => any;
declare const formatFromNow: (offset?: number, format?: string) => any;

declare const downloadFile: (data: any, filename: string, mime?: string, bom?: string) => void;

declare const obtainNotificationStyle: (msg: string, type?: string) => {
    title: string;
    message: string;
    position: string;
    type: string;
};

declare class GtcUtils {
    throttle(fn: Function, timeout: number): (...args: any) => void;
    debounce(fn: Function, timeout: number): (...args: any) => void;
}
declare const _default$1: GtcUtils;

declare class UnityToHtml {
    rgbToHex(rgbStr: string): string;
    replaceEscapedChars(text: string): string;
    convertRichTextToAnsi(richText: string): string;
    replaceNestedColorTags(str: string): string;
    replaceNestedSizeTags(str: string): string;
    replaceNestedNTags(str: string): string;
    convertUnityToHtml(ansiText: string): string | undefined;
}
declare const _default: UnityToHtml;

export { downloadFile, formatFromDate, formatFromNow, formatTime, _default$1 as gtcUtils, obtainNotificationStyle, _default as unityHtmlConverter };
