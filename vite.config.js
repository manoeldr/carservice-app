import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: null,
    includeAssets: ['icons/*.png', 'fotos/*'],
    manifest: {
      name: 'Car Service', short_name: 'Car Service',
      description: 'Serviços automotivos próximos de você.',
      lang: 'pt-BR', theme_color: '#DC2B2F', background_color: '#ffffff',
      display: 'standalone', start_url: './', scope: './', id: './',
      icons: [
        { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: { globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,webp,svg,woff2}'], cleanupOutdatedCaches: true },
  })],
  base: './',
});
