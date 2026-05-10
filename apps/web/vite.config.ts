import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@raven/web': path.resolve(__dirname, './src'),
      '@raven/api': path.resolve(__dirname, '../api/src'),
    },
  },
})
