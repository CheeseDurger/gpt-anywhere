import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/options",
  build: {
    outDir: "../dist/options",
    emptyOutDir: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': fileURLToPath(new URL('../01-shared', import.meta.url))
    }
  }
})
