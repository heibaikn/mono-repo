import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from 'vite-plugin-qiankun'
import commonjs from '@rollup/plugin-commonjs'
// useDevMode 开启时与热更新插件冲突,使用变量切换
const useDevMode = true
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    qiankun('design', { useDevMode }),
    commonjs({ requireReturnsDefault: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    // include: [
    //   '@heibaimono/form-v3'
    // ]
  },
  server: {
    host: '0.0.0.0',
    port: 7202,
    cors: true
  },
  base: '/child/design',
  build: {
    outDir: '../../dist/child/design' // 设置打包输出目录
  }
})
