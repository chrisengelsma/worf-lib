import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [ react() ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: [ 'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}' ],
    setupFiles: path.resolve(__dirname, './tests/setup.ts')

  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './lib'),
      '@demo': path.resolve(__dirname, './demo'),
      '@dist': path.resolve(__dirname, './dist')
    }
  },
});