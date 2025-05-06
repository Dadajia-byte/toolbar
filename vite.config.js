import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    jsxFactory: 'createVNode', // JSX工厂函数
    jsxFragment: 'Fragment', // JSX片段
  },
  build: {
    assetsInlineLimit: 0, // 禁用资源内联
    cssCodeSplit: true, // 启用 CSS 代码拆分
    lib: {
      entry: './src/main.js',
      iframeToast: './src/modules/feedback/iframeToast/index.tsx',
      name: 'Shortcut',
      fileName: (format) => `[name].${format}.js`,
      formats: ['es', 'umd'],
    },
    name: 'Shortcut',
    fileName: (format) => `[name].${format}.js`,
    rollupOptions: {
      // 确保将插件作为独立模块
      external: [],
      output: {
        globals: {},
      },
    },
  },
  // sourceMap: true,
});