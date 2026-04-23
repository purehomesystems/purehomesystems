import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers that support ES modules natively.
    // Avoids emitting legacy polyfills that add bundle weight.
    target: 'es2020',

    // Strip legal comments from vendor chunks to reduce bundle size
    // without affecting functionality.
    rollupOptions: {
      output: {
        // Split large vendor chunks so the initial JS download is smaller.
        // react-dom is the heaviest single dependency (~130KB gzipped);
        // splitting it into its own chunk allows the browser to cache it
        // independently from app code that changes more frequently.
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
        },
      },
    },
  },

  // Remove legalComments from esbuild output to trim bundle size
  esbuild: {
    legalComments: 'none',
  },
})
