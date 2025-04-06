
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: [
      '9c1f047b-b1da-49af-a329-039c50e21971.lovableproject.com'
    ]
  }
});
