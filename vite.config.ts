import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { home: resolve('index.html'), gallery: resolve('galeria.html'), terms: resolve('termos.html') },
    },
  },
});
