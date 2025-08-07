import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/advanced-ecomm/', // ✅ matches your GitHub repo name exactly
});
