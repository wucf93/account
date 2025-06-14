import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      manifest: {
        "name": "account-pwa",
        "short_name": "account-pwa",
        "description": "记账",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#ffffff",
        "lang": "en",
        "scope": "/",
        "icons": [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "pwa-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "pwa-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "pwa-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "pwa-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })],
})