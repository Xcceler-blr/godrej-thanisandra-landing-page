import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Memory optimization for dev server
    hmr: {
      overlay: false, // Disable error overlay to save memory
    },
  },
  plugins: [
    react(),
    compression({
      algorithms: ['gzip'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
      // Memory optimization
      threshold: 1024, // Only compress files > 1KB
    }),
    compression({
      algorithms: ['brotliCompress'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
      // Memory optimization
      threshold: 1024, // Only compress files > 1KB
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: "Assets",
    // Memory optimization
    chunkSizeWarningLimit: 1000, // Increase warning limit
    rollupOptions: {
      output: {
        // Manual chunks removed to avoid SSR external module conflicts
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `Assets/images/[name]-[hash][extname]`;
          }
          return `Assets/[name]-[hash][extname]`;
        },
        chunkFileNames: "Assets/js/[name]-[hash].js",
        entryFileNames: "Assets/js/[name]-[hash].js",
      },
    },
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
    // Memory optimization
    reportCompressedSize: false, // Disable size reporting to save memory
  },
  optimizeDeps: {
    // Memory optimization
    exclude: ['@radix-ui/react-icons'], // Exclude heavy icon packages
  },
  ssgOptions: {
    script: 'async',
    crittersOptions: {
      reduceInlineStyles: false,
    },
  },
  // Memory optimization
  define: {
    __DEV__: mode === 'development',
  },
  // Cache optimization
  cacheDir: '.vite',
}));
