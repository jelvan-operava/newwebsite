import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Security headers middleware
app.use((req, res, next) => {
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: https://images.unsplash.com; " +
    "connect-src 'self'; " +
    "frame-ancestors 'self' https://*.run.app https://ai.studio https://*.ai.studio https://*.google.com https://*.googleusercontent.com; " +
    "object-src 'none'; " +
    "base-uri 'self';"
  );

  // General Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // HSTS on HTTPS connections
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
});

// Middleware for parsing JSON and form bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Service Worker endpoint with appropriate headers
app.get(['/sw.js', '/service-worker.js'], (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'public', 'sw.js'));
});

// Mount backend API routes under /api
app.use('/api', apiRouter);

// Serve public static assets with controlled caching
app.use('/public', express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    }
  }
}));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d'
}));

// Serve HTML pages from the /pages directory with clean URL and extension support
app.use(express.static(path.join(__dirname, 'pages'), {
  extensions: ['html', 'htm'],
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  }
}));
app.use('/pages', express.static(path.join(__dirname, 'pages'), {
  extensions: ['html', 'htm'],
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  }
}));

// Root route explicitly serves pages/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Clean route for service detail pages
app.get(['/service-detail', '/service/:slug'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'service-detail.html'));
});

// Fallback to index.html for any unmatched page route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OPERAVA server running on http://0.0.0.0:${PORT}`);
});

