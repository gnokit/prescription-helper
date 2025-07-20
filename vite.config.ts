import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/prescription-helper/',
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
