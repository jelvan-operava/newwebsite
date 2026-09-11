import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and form bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount backend API routes under /api
app.use('/api', apiRouter);

// Serve public static assets (images, icons, etc.)
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages from the /pages directory with clean URL and extension support
app.use(express.static(path.join(__dirname, 'pages'), {
  extensions: ['html', 'htm']
}));
app.use('/pages', express.static(path.join(__dirname, 'pages'), {
  extensions: ['html', 'htm']
}));

// Root route explicitly serves pages/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Fallback to index.html for any unmatched page route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OPERAVA server running on http://0.0.0.0:${PORT}`);
});

