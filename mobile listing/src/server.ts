  import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
} from '@angular/ssr/node';

import express from 'express';
import compression from 'compression';
import { join, extname } from 'node:path';
import { readdirSync, statSync } from 'node:fs';

const app = express();
const angularApp = new AngularNodeAppEngine();
const browserDistFolder = join(import.meta.dirname, '../browser');

// =============================
// ✅ SSR In-Memory Cache
// All pages are listing pages — single TTL is correct
// =============================
const ssrCache = new Map<string, { html: string; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes for all pages

// =============================
// ✅ Preconnect Origins
// Max 4 — browser warns above this
// Order matters: most critical for LCP first
// dns-prefetch fallbacks for older browsers are in index.html
// =============================
const PRECONNECT_ORIGINS = [
  'https://img.homes247.in',                // #1 — LCP property images
  'https://d1zt14hr2k4poi.cloudfront.net', // #2 — static banners / icons        
  'https://fonts.googleapis.com',          // #3 — Google Fonts CSS
  'https://fonts.gstatic.com',             // #4 — Google Fonts woff2 files
];

// Never preload these — lazy loaded on purpose
const SKIP_CHUNKS = ['sweetalert2', 'footer', 'brochure', 'browser','HV5M2Q7J'];

// =============================
// ✅ Build Link Header — runs ONCE at startup
// Chunk filenames are stable per deployment (output hashing)
// =============================
function buildLinkHeader(): string {
  const links: string[] = [];

  // 1. Preconnects — fired before HTML is parsed, fastest hint possible
  for (const origin of PRECONNECT_ORIGINS) {
    links.push(`<${origin}>; rel=preconnect; crossorigin`);
  }

  try {
    const files = readdirSync(browserDistFolder);

    // 2. Critical JS — polyfills MUST come before main
    const polyfillsFile = files.find(f => f.startsWith('polyfills-') && f.endsWith('.js'));
    const mainFile = files.find(f => f.startsWith('main-') && f.endsWith('.js'));

    if (polyfillsFile) links.push(`</${polyfillsFile}>; rel=modulepreload; crossorigin`);
    if (mainFile) links.push(`</${mainFile}>; rel=modulepreload; crossorigin`);

    // 3. Tiny shared chunks only
    //    - Skip all lazy route chunks (they load on demand)
    //    - Skip large chunks (don't compete with LCP image bandwidth)
    //    - Sort ascending (smallest first) and cap at 3
    const tinyChunks = files
      .filter(f =>
        f.startsWith('chunk-') &&
        f.endsWith('.js') &&
        !SKIP_CHUNKS.some(skip => f.includes(skip))
      )
      .map(f => ({
        name: f,
        size: (() => { try { return statSync(join(browserDistFolder, f)).size; } catch { return 0; } })(),
      }))
      .filter(f => f.size > 0 && f.size < 15_000)  // under 15 KB
      .sort((a, b) => a.size - b.size)              // ascending — smallest first
      .slice(0, 3);                                  // max 3 chunks

    for (const chunk of tinyChunks) {
      links.push(`</${chunk.name}>; rel=modulepreload; crossorigin`);
    }

  } catch (err) {
    // console.warn('[buildLinkHeader] Could not read dist folder:', err);
  }

  return links.join(', ');
}

// Computed once at startup — stable per deployment
const LINK_HEADER = buildLinkHeader();

// =============================
// ✅ Shared send helper
// =============================
function sendWithHeaders(
  res: express.Response,
  html: string,
  cacheStatus: 'HIT' | 'MISS',
): void {
  res.setHeader('X-Cache', cacheStatus);
  res.setHeader('Cache-Control', 'no-cache');
  if (LINK_HEADER) res.setHeader('Link', LINK_HEADER);
  res.send(html);
}

// =============================
// ✅ Trust proxy (required behind nginx / load balancer / cloud)
// =============================
app.set('trust proxy', true);

// =============================
// ✅ Gzip compression
// level 6 = best speed/size balance
// threshold 1024 = skip tiny responses that compression would expand
// =============================
app.use(compression({ level: 6, threshold: 1024 }));

// =============================
// ✅ Security headers
// =============================
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  next();
});

// =============================
// ✅ Cache-Control + connection headers
// Hashed assets (JS/CSS/images) — 1 year immutable, never re-downloaded
// HTML — always revalidate, never stale
// =============================
app.use((req, res, next) => {
  const ext = extname(req.url);

  if (ext.match(/\.(png|jpg|jpeg|webp|avif|svg|gif|woff|woff2|ttf|otf|js|css)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (ext === '.html' || ext === '') {
    res.setHeader('Cache-Control', 'no-cache');
  }

  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=5, max=1000');
  res.setHeader('Vary', 'Accept-Encoding');
  next();
});

// =============================
// ✅ Serve static files from browser dist
// maxAge 1y + immutable = browser never re-requests hashed filenames
// index: false — Angular SSR handles the root, not express.static
// =============================
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    immutable: true,
    etag: true,
    lastModified: true,
    index: false,
  })
);

// =============================
// ✅ Angular SSR handler with cache + LCP image injection
// =============================
app.use((req, res, next) => {
  const cacheKey = req.url;
  const cached = ssrCache.get(cacheKey);

  // ─── Cache HIT — serve immediately, no render needed ───
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return sendWithHeaders(res, cached.html, 'HIT');
  }

  // ─── Cache MISS — render via Angular SSR engine ───
  angularApp
    .handle(req)
    .then(async response => {
      if (!response) return next();

      const html = await response.text();

      // ✅ LCP image preload injection
      // After SSR renders the page, find the first above-fold property image
      // from img.homes247.in and inject a <link rel="preload" fetchpriority="high">
      // into <head> — this tells the browser to start fetching the LCP image
      // as early as possible, before Angular JS even executes.
      let finalHtml = html;
      try {
        const imgMatch = html.match(
          /src="(https:\/\/img\.homes247\.in\/[^"]+\.(?:jpg|avif|webp|jpeg|png)[^"]*)"/i
        );
        if (imgMatch?.[1]) {
          const imageUrl = imgMatch[1].replace(/&amp;/g, '&');
          const preloadTag = `<link rel="preload" as="image" href="${imageUrl}" fetchpriority="high">`;
          finalHtml = html.replace('</head>', `${preloadTag}</head>`);
          // console.log('✅ LCP preload injected:', imageUrl);
        } else {
          // console.log('ℹ️  No homes247 image found in SSR HTML for:', req.url);
        }
      } catch (e) {
        // console.error('[LCP inject] Error:', e);
      }

      // Store final HTML in cache
      ssrCache.set(cacheKey, { html: finalHtml, timestamp: Date.now() });

      // Forward Angular's response headers
      // Skip encoding + cache headers — we manage those ourselves
      response.headers.forEach((value, key) => {
        if (!['content-encoding', 'transfer-encoding', 'cache-control'].includes(key.toLowerCase())) {
          res.setHeader(key, value);
        }
      });

      sendWithHeaders(res, finalHtml, 'MISS');
    })
    .catch(next);
});

// =============================
// ✅ Start server
// 0.0.0.0 binds to all interfaces (required for Docker / cloud deployments)
// =============================
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4030;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`✅ Angular SSR running on http://localhost:${port}`);
  });
}

// if (isMainModule(import.meta.url) || process.env['pm_id']) {

//   const port = Number(process.env['PORT']) || 4003;

//   const host = '0.0.0.0';

//   app.listen(port, host, () => {

//     console.log(`✅ Angular SSR running on:`);
//     console.log(`   Local:   http://localhost:${port}`);
//     console.log(`   Network: http://192.168.0.185:${port}`);

//   });

// }

export const reqHandler = createNodeRequestHandler(app);