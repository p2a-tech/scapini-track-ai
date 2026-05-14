import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.svg', 'icon-512.svg', 'apple-touch-icon.svg'],
      manifest: {
        name: 'Scapini Track AI',
        short_name: 'Scapini Track',
        description: 'TMS inteligente da Scapini Transportes — rastreamento por etapas, IA preditiva, portal do cliente e app do motorista.',
        theme_color: '#1f365c',
        background_color: '#f6f7f9',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/home',
        lang: 'pt-BR',
        categories: ['business', 'productivity', 'logistics'],
        icons: [
          { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: '/icon-maskable.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Operação', short_name: 'Operação', description: 'Dashboard TMS', url: '/operacao/dashboard' },
          { name: 'Portal do Cliente', short_name: 'Cliente', description: 'Dashboard do cliente', url: '/cliente/dashboard' },
          { name: 'App do Motorista', short_name: 'Motorista', description: 'Início do motorista', url: '/motorista/inicio' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'recharts': ['recharts'],
          'lucide': ['lucide-react'],
          'leaflet': ['leaflet', 'react-leaflet'],
        },
      },
    },
  },
})
