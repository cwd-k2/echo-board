import path from 'path';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src/shared'),
      '@': path.resolve(__dirname, 'src/frontend'),
      '%': path.resolve(__dirname, 'src/pseudo-backend'),
    },
  },
});
