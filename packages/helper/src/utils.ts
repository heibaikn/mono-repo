class MonoUtils {
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
  random(n = 4){
    return new Array(n).fill(0).map(v => (Math.ceil(Math.random() * 36)).toString(36)).join()
  }
}

export default new MonoUtils()