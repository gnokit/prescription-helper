import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/prescription-helper/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
