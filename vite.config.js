import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  //a supp ptet
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // autoriser ton domaine ngrok
    allowedHosts: ['620e93e2d3a9.ngrok-free.app', 'localhost'],
  },
});
