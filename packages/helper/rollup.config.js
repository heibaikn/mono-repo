// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
export default [{
  input: 'index.ts', // 入口文件的路径
  output: {
    file: 'dist/index.js', // 打包后的输出文件路径
    format: 'esm', // 输出格式为 ES Module (ESM)
  },
  plugins: [
    nodeResolve(), // 解析第三方模块
    typescript(),
    commonjs(),
    // esbuild({
    //   include: /\.[jt]sx?$/,
    //   exclude: /node_modules/,
    //   sourceMap: false,
    //   target: 'ESNext',
    // }),
    terser()
  ],
},
{
  input: 'index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [
    dts({
      compilerOptions: {
        preserveSymlinks: false,
      },
    }),
  ],
},
]


