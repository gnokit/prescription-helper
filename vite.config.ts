import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/prescription-helper/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/prescription-helper/index.html'
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: '處方小幫手',
        short_name: '處方小幫手',
        description: '藥物管理與追蹤應用程式',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/prescription-helper/',
        start_url: '/prescription-helper/',
        lang: 'zh-TW',
        dir: 'ltr',
        icons: [
          {
            src: './app-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './app-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['medical', 'health', 'productivity']
      },
      injectRegister: 'auto'
    })
  ]
});
