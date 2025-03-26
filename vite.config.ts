import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  publicDir: path.resolve(__dirname, "./public"),
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./marketing-website"),
    },
  },
  css: {
    // Ensure CSS modules are processed
    modules: {
      localsConvention: 'camelCase',
    },
    // Force Vite to process CSS modules
    preprocessorOptions: {
      css: {
        charset: false
      }
    },
    // DevSourcemap is faster for development
    devSourcemap: true
  },
  build: {
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true, // Split CSS into chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries - change less frequently
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          
          // React Router - changes occasionally
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          
          // React Query - frequently updated, keep separate
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'query';
          }
          
          // Radix UI components - only include if they exist in node_modules
          if (id.includes('node_modules/@radix-ui/')) {
            return 'ui-components';
          }
          
          // All other node_modules go in a common vendor chunk
          if (id.includes('node_modules/')) {
            return 'vendors';
          }
        }
      }
    }
  }
}));
