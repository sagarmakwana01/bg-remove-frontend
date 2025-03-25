import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allow external access
    port: process.env.PORT || 10000, // Use Render's PORT
    strictPort: true,
    cors: true,
  },
  preview: {
    port: process.env.PORT || 10000,
    allowedHosts: ["bg-remove-ays8.onrender.com"] // Allow your Render host
  }
});