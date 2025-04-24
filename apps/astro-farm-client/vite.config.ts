/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'

const manifest: Partial<ManifestOptions> = {
    theme_color: '#4B009A',
    background_color: '#4B009A',
    icons: [
        { purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
        { purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' },
    ],
    orientation: 'portrait-primary',
    display: 'standalone',
    lang: 'en-GB',
    name: 'Astro Farm',
    short_name: 'Astro Farm',
    description: 'This is Astro Farm game',
}

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/astro-farm-client',

    server: {
        port: 4200,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:3333',
                changeOrigin: true,
            },
        },
    },

    preview: {
        port: 4300,
        host: 'localhost',
    },

    plugins: [
        react(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        svgr(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
            manifest,
        }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    build: {
        outDir: '../../dist/apps/astro-farm-client',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
})
