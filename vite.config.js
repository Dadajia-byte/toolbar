import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: './src/main.js',
      name: 'ToolbarPlugin',
      fileName: (format) => `toolbar-plugin.${format}.js`,
    },
    rollupOptions: {
      // 确保将插件作为独立模块
      external: [],
      output: {
        globals: {},
      },
    },
  },
  sourceMap: true,
});