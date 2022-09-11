import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // <-- this object is added
    port: 3000,
    hmr: {
      clientPort: 7021,
    },
  },
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src'),
      'vue-i18n' : 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
  plugins: [vue(), vueJsx(), vueI18n()],
});
