import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { searchPchome, getProductDetail, translateText } from './lib/pchome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = Number(process.env.PORT || 3456);
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

async function serveStatic(pathname, res) {
  let relPath = pathname === '/' ? '/index.html' : pathname;
  relPath = path.normalize(relPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(PUBLIC_DIR, relPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error('Not a file');
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' || ext === '.js' ? 'no-cache' : 'public, max-age=3600',
    });
    res.end(content);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
}

function getLanAddresses() {
  const nets = os.networkInterfaces();
  const addrs = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        addrs.push(net.address);
      }
    }
  }
  return addrs;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if (url.pathname === '/api/health') {
      return sendJson(res, 200, { ok: true, runtime: 'node' });
    }
    if (url.pathname === '/api/search') {
      const result = await searchPchome(url);
      return sendJson(res, result.status, result.body);
    }
    if (url.pathname.startsWith('/api/product/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/product/'.length));
      const result = await getProductDetail(id);
      return sendJson(res, result.status, result.body);
    }
    if (url.pathname === '/api/translate') {
      const result = await translateText(url);
      return sendJson(res, result.status, result.body);
    }

    return await serveStatic(url.pathname, res);
  } catch (err) {
    console.error('[server error]', err);
    if (!res.headersSent) {
      sendJson(res, 500, { error: err?.message || 'Internal server error' });
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`\nPChome 24h EN Helper is running!`);
  console.log(`  Local:   http://localhost:${PORT}`);
  for (const ip of getLanAddresses()) {
    console.log(`  iPhone:  http://${ip}:${PORT}  (open in Safari on the same Wi-Fi)`);
  }
  console.log(`\nTip: On iPhone Safari, tap Share -> "Add to Home Screen" for the full app experience.\n`);
});
