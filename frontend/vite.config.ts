import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 8000,
    },
  },
  optimizeDeps: {
    include: ['@mui/material', 'react-router-dom', 'react-router'],
  },
});
