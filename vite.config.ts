import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './src',  // Root directory of your project
    build: {
        outDir: '../dist', // Directory to output build files
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.ts'), // Set entry point
            },
        },
    },
});
