import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: [ 'lib' ],
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/test/**'],
      insertTypesEntry: true,
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      formats: [ 'es' ],
    },
    rollupOptions: {
      external: [ 'react', 'react/jsx-runtime' ],
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}', {
          ignore: [ 'lib/**/*.d.ts' ],
        }).map(file => [
          path.relative( 'lib', file.slice(0, file.length - path.extname(file).length) ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './lib'),
      '@demo': path.resolve(__dirname, './demo'),
      '@dist': path.resolve(__dirname, './dist')
    }
  },
});