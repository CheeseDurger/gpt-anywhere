import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: { 
         additionalData: `@"./app/modal/modal.scss";` 
     },
    },
  },
  build: {
    outDir: "../dist/content",
    emptyOutDir: true,
    rollupOptions: {
      // input: "./content.ts",
      input: "./app/modal/modal.html",
      // output: {
      //   entryFileNames: "[name].js",
      // },
    },
  },
  plugins: [],
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('../01-shared', import.meta.url))
  //   }
  // }
});
