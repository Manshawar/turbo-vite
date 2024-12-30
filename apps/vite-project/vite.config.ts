import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import cdn from "vite-plugin-cdn-import";

const pathSrc = path.resolve(__dirname, "src");


export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1/',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '')
        }
      },

    }
  },
  resolve: {
    alias: {
      "@": pathSrc,
    },

    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  plugins: [
    Vue(),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
    cdn({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: `https://unpkg.com/vue@3.5.13/dist/vue.global.prod.js`,
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.5.0/dist/vue-router.global.js'
        },
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus@2.9.1/dist/index.full.js',
          css: 'https://unpkg.com/element-plus@2.9.1/dist/index.css'
        },
        {
          name: '@element-plus/icons-vue',
          var: 'ElementPlusIconsVue', // 根据main.js中定义的来
          path: 'https://unpkg.com/@element-plus/icons-vue@2.3.1/dist/index.iife.min.js'
        },
      ]
    }),
  ],
});
