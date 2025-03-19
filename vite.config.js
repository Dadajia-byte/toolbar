import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: './src/main.js',
      name: 'RightToolbarPlugin',
      fileName: (format) => `right-toolbar-plugin.${format}.js`,
    },
    rollupOptions: {
      // 确保将插件作为独立模块
      external: [],
      output: {
        globals: {},
      },
    },
  },
});