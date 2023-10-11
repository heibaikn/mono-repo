class GtcUtils {
  throttle(fn: Function, timeout: number) {
    let timer: number | NodeJS.Timeout = 0;
    return (...args: any) => {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = 0;
        }, timeout);
      }
    }
  }
  debounce(fn: Function, timeout: number) {
    let timer: any = 0;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    };
  }
}

export default new GtcUtils()