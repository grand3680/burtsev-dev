import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['framer-motion', 'gsap'],
          apollo: ['@apollo/client', 'graphql']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.FRONTEND_PORT ?? 5173)
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.FRONTEND_PORT ?? 5173)
  }
})
