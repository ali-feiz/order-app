import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      styles: {
        configFile: "src/assets/styles/settings.scss",
      },
      autoImport: true,
    }),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      testConfig: fileURLToPath(new URL("./testConfig.ts", import.meta.url)),
    },
  },
  server: {
    port: 7000,
    open: false,
  },
});
