import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = process.cwd();

export default defineConfig({
    build: {
        emptyOutDir: true,
        sourcemap: true,
        target: 'es2020',
        rolldownOptions: {
            output: {
                exports: 'named',
            },
        },
        lib: {
            entry: {
                index: resolve(root, 'src/index.ts'),
                browser: resolve(root, 'src/browser.ts'),
                legacy: resolve(root, 'src/legacy.ts'),
            },
            formats: ['es', 'cjs'],
            fileName: (format, entryName) =>
                `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
    },
});
