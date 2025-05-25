import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // When deploying under https://chillsahil.io/color-light-simulator/
  base: '/color-light-simulator/',

  plugins: [
    react(),
  ],

  // (any other custom config you already had…)
})
