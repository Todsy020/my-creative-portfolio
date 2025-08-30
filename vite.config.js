import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // essentiel pour que les assets dans public/ soient accessibles à la racine
  build: {
    outDir: 'dist', // dossier de build attendu par Vercel
    assetsDir: 'assets', // optionnel, pour organiser les fichiers statiques
  },
});
22;
