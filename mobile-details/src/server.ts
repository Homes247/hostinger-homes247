import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import compression from 'compression';
import { join, extname } from 'node:path';

const app = express();

const angularApp = new AngularNodeAppEngine();

const browserDistFolder = join(import.meta.dirname, '../browser');


// ✅ Trust proxy (important for CDN, Cloudflare, nginx)
app.set('trust proxy', true);


// ✅ Maximum compression (gzip + brotli automatically in Node 20)
app.use(
  compression({
    level: 9,
    threshold: 0,
  })
);


// ✅ Aggressive caching middleware
app.use((req, res, next) => {

  const ext = extname(req.url);

  // Images cache (1 year)
  if (ext.match(/\.(png|jpg|jpeg|webp|avif|svg|gif)$/)) {

    res.setHeader(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );

  }

  // JS & CSS cache (1 year)
  else if (ext.match(/\.(js|css)$/)) {

    res.setHeader(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );

  }

  // Fonts cache (1 year)
  else if (ext.match(/\.(woff|woff2|ttf|otf)$/)) {

    res.setHeader(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );

  }

  // HTML cache (no cache for SSR HTML)
  else if (ext === '.html') {

    res.setHeader(
      'Cache-Control',
      'no-cache, no-store, must-revalidate'
    );

  }

  // Performance headers
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=5, max=1000');
  res.setHeader('Vary', 'Accept-Encoding');

  next();
});


// ✅ Static files serving (optimized)
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    immutable: true,
    etag: true,
    lastModified: true,
    index: false,
  })
);


// ✅ Angular SSR handler
app.use((req, res, next) => {

  angularApp
    .handle(req)
    .then(response =>
      response
        ? writeResponseToNodeResponse(response, res)
        : next()
    )
    .catch(next);

});


// ✅ Start server
if (isMainModule(import.meta.url) || process.env['pm_id']) {

  const port = process.env['PORT'] || 4031;

  app.listen(port, () => {

    console.log(`✅ Angular SSR running on http://localhost:${port}`);

  });

}

// if (isMainModule(import.meta.url) || process.env['pm_id']) {

//   const port = Number(process.env['PORT']) || 4000;

//   const host = '0.0.0.0';

//   app.listen(port, host, () => {

//     console.log(`✅ Angular SSR running on:`);
//     console.log(`   Local:   http://localhost:${port}`);
//     console.log(`   Network: http://192.168.0.175:${port}`);

//   });

// }


// ✅ Export handler
export const reqHandler = createNodeRequestHandler(app);
