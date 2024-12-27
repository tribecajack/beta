import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://api.ultra.markets',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          // Rewrite /api/rates to /protocolRates
          return path.replace(/^\/api\/rates/, '/protocolRates');
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            const target = process.env.VITE_API_URL || 'https://api.ultra.markets';
            const fullUrl = new URL(proxyReq.path, target).toString();
            console.log('Proxy Request Details:', {
              originalUrl: req.url,
              proxyPath: proxyReq.path,
              fullUrl: fullUrl,
              target: target
            });
          });
        }
      }
    }
  },
});
