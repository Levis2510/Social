import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  optimizeDeps: {
    persist: true,           
    include: ['react', 'react-dom'], 
  },
  plugins: [tailwindcss(), react()],
});
