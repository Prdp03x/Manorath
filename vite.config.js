import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({ plugins: [react(), tailwindcss()], server: {
    allowedHosts: ['clear-cloud-a633d30e.tunnl.gg'],
  },  })
