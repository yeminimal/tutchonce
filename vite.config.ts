import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or whatever plugin you're using

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '9c1f047b-b1da-49af-a329-039c50e21971.lovableproject.com'
    ]
  }
});
