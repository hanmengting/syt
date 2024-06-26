import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入node提供的内置模块path:可以获取绝对路径
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'/syt/',
  // src文件夹配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 配置代理跨域
  server: {
    proxy: {
      "/api": {
        target: "http://syt.atguigu.cn",
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // 设置chunk大小警告阈值为1000kb
    
  }
});
