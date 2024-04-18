import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  include: ['react-router-dom'],
  plugins: [react()],
})
