export default {
  mounted(el: HTMLInputElement, binding: any) {
    window.addEventListener('keydown', binding.value, false)
  },
  beforeUnmount(
    el: HTMLInputElement,
    binding: { value: (this: Window, ev: KeyboardEvent) => any }
  ) {
    console.log('v-search beforeUnmount')
    window.removeEventListener('keydown', binding.value, false)
  }
}
