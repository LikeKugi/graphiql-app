/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { coverageConfigDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/graphiql-app/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '~', replacement: fileURLToPath(new URL('./', import.meta.url)) },
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      all: false,
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './tests/unit/coverage',
      include: ['src/**'],
      exclude: [...coverageConfigDefaults.exclude, 'src/main.tsx', 'src/**/*.d.ts', 'src/**/*.types.ts'],
    },
    css: false,
  },
});
