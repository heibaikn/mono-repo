import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'
const useDevMode = true
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react(),
    qiankun('react', { useDevMode })
  ],
  server: {
    host: '0.0.0.0',
    port: 7203,
    cors: true
  },
  base: '/child/react',
  build: {
    outDir: '../../dist/child/react' // 设置打包输出目录
  }
})
