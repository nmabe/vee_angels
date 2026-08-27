import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild }) => {
  return {
    define: {
      'process.env': {}
    },
    base: '/',
    build: {
      emptyOutDir: true,
      minify: !isSsrBuild,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('lucide')) return 'vendor-icons';
            return 'vendor-libs'; // Splits everything else cleanly
          }
        }
        },
        onwarn(warning, warn) {
          // Suppress "Module level directives cause errors when bundled" warnings
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return
          }
          // Let Rollup handle all other normal warnings
          warn(warning)
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
   //     'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom')
      }
    },
    ssr: {
      noExternal: ['@unhead/react', 'unhead'],
    },
    server: {
      host: '127.0.0.1', // Forces Vite dev server to use IPv4 loopback
    hmr: {
      host: '127.0.0.1', // Forces WebSocket client to use IPv4 loopback
      protocol: 'ws',
    }
    },
    optimizeDeps: {
      // REMOVED 'noDiscovery: true' to fix the Fast Refresh bug
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-redux',
        'use-sync-external-store/with-selector',
        'cookie',
        'set-cookie-parser',
        'react-paginate',
        'react-js-search',
        'embla-carousel-react',
        'embla-carousel-fade'
      ]
    }
  }
})
