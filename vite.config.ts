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
    }),
    compression({
      algorithms: ['brotliCompress'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
      threshold: 1024,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
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
