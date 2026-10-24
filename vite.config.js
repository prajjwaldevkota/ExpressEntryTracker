import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from "tailwindcss";
import { API_USER_AGENT, DRAW_API_ORIGIN, NOC_API_ORIGIN } from "./shared/api-config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      "/api/nocs": { target: NOC_API_ORIGIN, changeOrigin: true, headers: { "User-Agent": API_USER_AGENT } },
      "/api": {
        target: DRAW_API_ORIGIN,
        changeOrigin: true,
        headers: { "User-Agent": API_USER_AGENT },
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          animations: ['framer-motion'],
          icons: ['react-icons', 'lucide-react'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
})
