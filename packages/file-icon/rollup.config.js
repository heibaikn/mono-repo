// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import vuePlugin from 'rollup-plugin-vue'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
export default [
  {
    input: 'src/index.ts', // 入口文件的路径
    output: {
      file: 'lib/index.js', // 打包后的输出文件路径
      format: 'esm', // 输出格式为 ES Module (ESM)
    },
    plugins: [
      vuePlugin({
        preprocessStyles: true,
      }),
      postcss(),
      nodeResolve(), // 解析第三方模块
      typescript(),
      commonjs(),
      terser()
    ],
  },
  {
    input: 'lib/src/index.d.ts',
    output: {
      file: 'lib/index.d.ts',
      format: 'es',
    },
    plugins: [
   
      dts({
        compilerOptions: {
          preserveSymlinks: false,
        },
      }),
    ],
  }
];
