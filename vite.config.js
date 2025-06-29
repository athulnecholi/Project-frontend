import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build:{outDir: 'dist', // this must match what Render expects
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // 👈 match your backend port
    },
  },
});
