import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['e253-2405-201-3046-f012-e96e-5fe1-d4e3-a59a.ngrok-free.app']
  }
})
