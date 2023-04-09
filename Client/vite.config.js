import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { Server } from 'node:http';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 3001,
        proxy: {
            '/user': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
            '/film': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
            '/booking': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
            '/admin': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
            '/bookedseat': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
});
