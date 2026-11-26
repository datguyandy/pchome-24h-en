import { searchPchome, getProductDetail, translateText } from './lib/pchome.mjs';

function jsonResponse(payload, status = 200, cacheSeconds = 0) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': cacheSeconds > 0 ? `public, max-age=${cacheSeconds}` : 'no-store',
  };
  return new Response(JSON.stringify(payload), { status, headers });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const ai = env.AI;

    try {
      if (url.pathname === '/api/health') {
        return jsonResponse({ ok: true, runtime: 'cloudflare-workers', ai: Boolean(ai) });
      }

      if (
        request.method === 'GET' &&
        (url.pathname === '/api/search' ||
          url.pathname.startsWith('/api/product/') ||
          url.pathname === '/api/translate')
      ) {
        const cache = caches.default;
        const cacheKey = new Request(url.toString(), { method: 'GET' });
        const cached = await cache.match(cacheKey);
        if (cached) return cached;

        let result;
        let ttl = 0;

        if (url.pathname === '/api/search') {
          result = await searchPchome(url, { ai });
          ttl = result.status === 200 ? 600 : 0;
        } else if (url.pathname.startsWith('/api/product/')) {
          const id = decodeURIComponent(url.pathname.slice('/api/product/'.length));
          result = await getProductDetail(id, { ai });
          ttl = result.status === 200 ? 120 : 0;
        } else {
          result = await translateText(url, { ai });
          ttl = result.status === 200 ? 600 : 0;
        }

        const resp = jsonResponse(result.body, result.status, ttl);
        if (ttl > 0 && ctx?.waitUntil) {
          ctx.waitUntil(cache.put(cacheKey, resp.clone()));
        }
        return resp;
      }

      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }

      return new Response('Not Found', { status: 404 });
    } catch (err) {
      return jsonResponse({ error: err?.message || 'Internal server error' }, 500);
    }
  },
};
