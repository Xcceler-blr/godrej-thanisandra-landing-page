import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    compression({
      algorithms: ['gzip'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    compression({
      algorithms: ['brotliCompress'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: "Assets",
    rollupOptions: {
      output: {
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
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  ssgOptions: {
    script: 'async',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    onFinished() {
      // Remove problematic preload links
      return {
        transformIndexHtml: {
          enforce: 'post',
          transform(html: string) {
            return html.replace(
              /<link rel="preload" href="data:application\/octet-stream[^>]*>/g,
              ''
            );
          },
        },
      };
    },
  },
}));
