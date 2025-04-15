import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://can-ee-draws.onrender.com',
        changeOrigin: true,
        secure: false, // you can set this to true if the target uses a valid SSL certificate
      },
    },
  },
})