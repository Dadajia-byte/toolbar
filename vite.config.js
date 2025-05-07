import { defineConfig } from 'vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    lib: {
      entry: './src/main.js',
      name: 'v-shortcut',
      fileName: (format) => `v-shortcut.${format}.js`,
    },
    rollupOptions: {
      plugins: [
        visualizer({
          filename: 'dist/stats.html', // 输出的分析文件
          open: true, // 构建完成后自动打开浏览器
        }),
      ],
    },
  },
  // sourceMap: true,
});