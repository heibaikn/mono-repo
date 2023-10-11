import { parse } from 'node-html-parser'
class UnityToHtml {
  rgbToHex(rgbStr: string) {
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(rgbStr)) {
      let aColor = rgbStr.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = rgbStr;
      }
      return strHex;
    } else if (reg.test(rgbStr)) {
      let aNum = rgbStr.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return rgbStr;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
      }
    }
    return rgbStr;
  }
  replaceEscapedChars(text: string) {
    //定义需要替换的字符实体映射表
    const map: Record<string,string> = {
      '&amp;': '&',
      '&middot;': '.',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&nbsp;': ''
    }
    //替换转义字符
    return text.replace(/(&amp;|&middot;|&lt;|&gt;|&quot;|&#39;|&nbsp;)/g, (match) => map[match])
  }
  convertRichTextToAnsi(richText: string): string {
    const root = parse(richText)
    const allSpanDoms = root.querySelectorAll('span')
    if (allSpanDoms && allSpanDoms.length > 0) {
      allSpanDoms.forEach((ele) => {
        const fontSize = ele.rawAttrs.match(/style=\"font-size:\s*(\d+)px;{0,1}\"/)
        const fontColor = ele.rawAttrs.match(/style=\"color:\s*(.+?);{0,1}\"/)
        if (fontSize && fontSize.length > 0) {
          ele.rawTagName = 'size'
          ele.setAttribute('$$property$$', fontSize[1])
          ele.removeAttribute('style')
        }
        if (fontColor && fontColor.length > 0) {
          ele.rawTagName = 'color'
          ele.setAttribute('$$property$$', this.rgbToHex(fontColor[1]))
          ele.removeAttribute('style')
        }
      })
    }
    const replaceStr = root.toString().replace(/\s+\$\$property\$\$=\"(.*?)\"/g, '=$1')
    const resStr = replaceStr.replace(/<p>/g, '').replace(/<\/p>/g, '\\n').replace(/<br>/g, '\\n')
    return this.replaceEscapedChars(resStr)
  }
  replaceNestedColorTags(str: string) {
    if (!str.match(/<color=\s*(.*?)>(.*?)<\/color>/g)) {
      return str
    }
    while (/<color[^>]*>([^<]*(?:(?!<\/?color)<[^<]*)*)<\/color>/i.test(str)) {
      str = str.replace(/<color=\s*(.*?)>(.*?)<\/color>/g, '<span style="color:$1">$2</span>')
    }
    return str
  }
  replaceNestedSizeTags(str: string) {
    if (!str.match(/<size=\s*(.*?)>(.*?)<\/size>/g)) {
      return str
    }
    while (/<size[^>]*>([^<]*(?:(?!<\/?size)<[^<]*)*)<\/size>/i.test(str)) {
      str = str.replace(/<size=\s*(.*?)>(.*?)<\/size>/g, '<span style="font-size:$1px">$2</span>')
    }
    return str
  }
  replaceNestedNTags(str: string) {
    const regex = /(.*?)\\n/g; // 匹配换行符前的所有字符
    if (!str.match(/\\n/g)) {
      return str
    }
    str = str.replace(regex, "<p>$1</p>")
    return str
  }
  convertUnityToHtml(ansiText: string): string | undefined {
    let colorResult = this.replaceNestedColorTags(ansiText)
    let sizeResult = this.replaceNestedSizeTags(colorResult)
    let allResult = this.replaceNestedNTags(sizeResult)
    return allResult
  }
}

export default new UnityToHtml()