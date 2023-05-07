import {defineConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{
            find: '@',
            replacement: resolve(__dirname, './src/')
        }, {
            find: 'business-components',
            replacement: resolve(__dirname, './src/business-components/')
        }, {
            find: 'common',
            replacement: resolve(__dirname, './src/common/')
        }, {
            find: 'components',
            replacement: resolve(__dirname, './src/components/')
        }, {
            find: 'hooks',
            replacement: resolve(__dirname, './src/hooks/')
        }, {
            find: 'services',
            replacement: resolve(__dirname, './src/services/')
        }, {
            find: 'store',
            replacement: resolve(__dirname, './src/store/')
        }, {
            find: 'utils',
            replacement: resolve(__dirname, './src/utils/')
        }]
    },
    server: {
        port: 3000,
        host: true
    },
    preview: {
        port: 3000,
        host: true
    }
});
