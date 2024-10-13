import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Esto permite que Vite acepte conexiones desde cualquier IP
    port: 4173,  // Esto asegura que el servidor escuche en el puerto 4173
  },
});
