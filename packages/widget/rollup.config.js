// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'
import vuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
export default {
  input: 'index.ts', // 入口文件的路径
  output: {
    file: 'dist/index.js', // 打包后的输出文件路径
    format: 'esm' // 输出格式为 ES Module (ESM)
  },
  plugins: [
    vuePlugin({
      preprocessStyles: true
    }),
    postcss(),
    nodeResolve(), // 解析第三方模块
    typescript(),
    commonjs()
    // terser()
  ]
}
