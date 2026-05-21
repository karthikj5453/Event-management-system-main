import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Brotli compression for modern browsers - ~30-40% size reduction
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    // Gzip fallback for older browser support
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Extract vendor packages into separate chunks for better caching
          if (id.includes('node_modules')) {
            // React core libraries in their own chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            // Animation library in separate chunk
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            // Icon library in separate chunk
            if (id.includes('lucide-react')) {
              return 'vendor-icons'
            }
            // All other utilities
            return 'vendor-other'
          }
        },
      },
    },
    // Optimize JavaScript output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
