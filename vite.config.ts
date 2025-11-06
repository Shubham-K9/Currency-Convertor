import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),       // ✅ Enables React JSX/TSX support
    tailwindcss(), // ✅ Enables Tailwind CSS
  ],
})
