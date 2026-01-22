import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { getProxyOptions } from 'frappe-ui/src/utils/vite-dev-server'
import { webserver_port } from '../../../sites/common_site_config.json'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/assets/drheal_frontend/'
    : '/',
  plugins: [vue()],
  server: {
    port: 8081,
    proxy: getProxyOptions({ port: webserver_port }),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: `../${path.basename(path.resolve('..'))}/public/frontend`,
    emptyOutDir: true,
    target: 'es2015',

    // ✅ Split CSS per component for faster LCP
    cssCodeSplit: true,

    // ✅ Minify JS and CSS aggressively
    minify: 'esbuild',

    // ✅ Reduce sourcemap size in production
    sourcemap: false,
  },
  optimizeDeps: {
    include: [
      'frappe-ui > feather-icons',
      'showdown',
      'engine.io-client',
      'debug',
    ],
    esbuildOptions: {
      target: 'esnext', // handle async generators
    },
  },
})
