import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateCSPHeader } from './security.config.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'security-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Content Security Policy
          res.setHeader('Content-Security-Policy', generateCSPHeader());

          // Prevent MIME type sniffing
          res.setHeader('X-Content-Type-Options', 'nosniff');

          // Prevent clickjacking
          res.setHeader('X-Frame-Options', 'DENY');

          // XSS Protection (legacy browsers)
          res.setHeader('X-XSS-Protection', '1; mode=block');

          // Referrer Policy
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

          // Permissions Policy
          res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

          next();
        });
      }
    }
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    },
    headers: {
      'Content-Security-Policy': generateCSPHeader(),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    }
  }
})
