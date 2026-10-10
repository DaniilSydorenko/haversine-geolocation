import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        emptyOutDir: false,
        sourcemap: true,
        target: 'es2020',
        lib: {
            entry: resolve(process.cwd(), 'src/index.ts'),
            name: 'HaversineGeolocation',
            formats: ['umd'],
            fileName: () => 'build.js',
        },
    },
});
