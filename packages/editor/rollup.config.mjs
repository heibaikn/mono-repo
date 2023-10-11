import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild'
import vuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'

const commonPlugins = [
  vuePlugin({
    preprocessStyles: true,
  }),
  postcss(),
  nodeResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  commonjs(),
  esbuild({
    include: /\.[jt]sx?$/,
    exclude: /node_modules/,
    sourceMap: false,
    target: 'ESNext',
  }),
]

const external = ['@monaco-editor/loader', 'vue', 'vue-demi', /node_modules/]
const globalsForUMD = {
  '@monaco-editor/loader': 'monaco_loader',
  'vue-demi': 'VueDemi',
  vue: 'Vue',
}

export default [
  {
    input: 'src/index.ts',
    // external,
    output: {
      exports: 'named',
      dir: 'lib/es/',
      format: 'esm',
    },
    plugins: [...commonPlugins,terser()],
    // plugins: [...commonPlugins],
  },
  {
    input: 'src/index.ts',
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
  },
  // {
  //   input: 'src/index.ts',
  //   external,
  //   output: {
  //     exports: 'named',
  //     dir: 'lib/cjs/',
  //     format: 'cjs',
  //   },
  //   plugins: commonPlugins,
  // },
  // {
  //   input: 'src/index.ts',
  //   external,
  //   output: {
  //     exports: 'named',
  //     file: 'lib/umd/monaco-vue.js',
  //     format: 'umd',
  //     globals: globalsForUMD,
  //     name: 'monaco_vue',
  //   },
  //   plugins: commonPlugins,
  // },
  // {
  //   input: 'src/index.ts',
  //   external,
  //   output: {
  //     exports: 'named',
  //     file: 'lib/umd/monaco-vue.min.js',
  //     format: 'umd',
  //     globals: globalsForUMD,
  //     name: 'monaco_vue',
  //   },
  //   plugins: [
  //     ...commonPlugins,
  //     terser({
  //       mangle: false,
  //     }),
  //   ],
  // },
]
