<<<<<<< Updated upstream
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import ssr from 'vite-plugin-ssr/plugin';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // ssr(),
    compression({
      algorithms: ['gzip'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
      threshold: 1024,
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?v=1`;
              },
            },
          },
        ],
      },
>>>>>>> Stashed changes
    }),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$ /, /\.(gz)$/],
      threshold: 1024,
<<<<<<< Updated upstream
=======
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$ /, /\.(gz)$/],
      threshold: 1024,
>>>>>>> Stashed changes
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
<<<<<<< Updated upstream
    assetsDir: "Assets",
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  // Performance optimizations
  esbuild: {
    drop: ['console', 'debugger'],
  },
  // CSS optimizations
  css: {
    devSourcemap: false,
  },
  // Enable SSR for SSG
  // ssr: {
  //   target: 'node'
  // },
});
=======
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'thank-you': resolve(__dirname, 'src/pages/ThankYou.tsx'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@/components/ui'],
        },
        chunkSizeWarningLimit: 1000,
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    css: {
      devSourcemap: false,
    },
    // Enable SSG
    ssr: true,
    outDir: 'dist',
  },
  // SSG Configuration
  ssr: {
    noExternal: ['react-router-dom'],
  },
})
>>>>>>> Stashed changes
