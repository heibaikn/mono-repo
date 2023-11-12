class MonoUtils {
  throttle(fn: () => void, timeout: number) {
    let timer: number | NodeJS.Timeout = 0
    return (...args: any) => {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args)
          timer = 0
        }, timeout)
      }
    }
  }
  debounce(fn: () => void, timeout: number) {
    let timer: any = 0
    return (...args: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, timeout)
    }
  }
  random(n = 4) {
    return Array.from({ length: n }, () => 0)
      .map((v) => Math.ceil(Math.random() * 36).toString(36))
      .join('')
  }
}

export default new MonoUtils()
