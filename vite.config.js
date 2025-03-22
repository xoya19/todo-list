import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/todo-list/', // Use repo name as base path
  plugins: [react()],
});