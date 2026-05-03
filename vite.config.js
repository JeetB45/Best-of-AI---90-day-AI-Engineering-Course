import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@monaco-editor/react']
  },
  server: {
    port: 3000,
    open: true
  }
})
