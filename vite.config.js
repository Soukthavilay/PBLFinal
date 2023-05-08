import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    commonjsOptions: {
      esmExternals: true 
    },
  },
  proxy: {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,      
      ws: true,
  }
})
