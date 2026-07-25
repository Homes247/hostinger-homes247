import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
const fs = require('fs');

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const compression = require('compression');
  const server = express();
  server.use(compression());
  // const distFolder = join(process.cwd(), 'dist/angular-mobile/browser');
  const distFolder = join(__dirname, '../browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // SEO_PROPSPECTIVE_REDIRECTS
  server.get('*/expert-service', (req, res) => {
    res.redirect(301, "https://www.homes247.in");
  });
  server.get('/expertservices/floor-plans-1', (req, res) => {
    res.redirect(301, "https://www.homes247.in/expertservices/floor-plan-experts-1");
  });
  server.get('/expertservices/realestate-market-2', (req, res) => {
    res.redirect(301, "https://www.homes247.in/expertservices/market-experts-2");
  });
  server.get('/expertservices/vastu-services-3', (req, res) => {
    res.redirect(301, "https://www.homes247.in/expertservices/vastu-experts-3");
  });
  server.get('/expertservices/affordable-loans-8', (req, res) => {
    res.redirect(301, "https://www.homes247.in/expertservices/loan-services-8");
  });
  server.get('/apartments-for-sale-in-bangalore', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-bangalore-for-sale");
  });
  server.get('/apartments-for-sale-in-hyderabad', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-hyderabad-for-sale");
  });
  server.get('/apartments-for-sale-in-chennai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-chennai-for-sale");
  });
  server.get('/apartments-for-sale-in-pune', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-pune-for-sale");
  });
  server.get('/apartments-for-sale-in-kochi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kochi-for-sale");
  });
  server.get('/apartments-for-sale-in-mumbai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-mumbai-for-sale");
  });
  server.get('/apartments-for-sale-in-delhi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-delhi-for-sale");
  });
  server.get('/apartments-for-sale-in-kolkata', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kolkata-for-sale");
  });

  server.get('/flats-for-sale-in-bangalore', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-bangalore-for-sale");
  });
  server.get('/flats-for-sale-in-hyderabad', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-hyderabad-for-sale");
  });
  server.get('/flats-for-sale-in-chennai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-chennai-for-sale");
  });
  server.get('/flats-for-sale-in-pune', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-pune-for-sale");
  });
  server.get('/flats-for-sale-in-kochi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kochi-for-sale");
  });
  server.get('/flats-for-sale-in-mumbai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-mumbai-for-sale");
  });
  server.get('/flats-for-sale-in-delhi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-delhi-for-sale");
  });
  server.get('/flats-for-sale-in-kolkata', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kolkata-for-sale");
  });

  server.get('/apartments-in-bangalore', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-bangalore-for-sale");
  });
  server.get('/apartments-in-hyderabad', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-hyderabad-for-sale");
  });
  server.get('/apartments-in-chennai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-chennai-for-sale");
  });
  server.get('/apartments-in-pune', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-pune-for-sale");
  });
  server.get('/apartments-in-kochi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kochi-for-sale");
  });
  server.get('/apartments-in-mumbai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-mumbai-for-sale");
  });
  server.get('/apartments-in-delhi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-delhi-for-sale");
  });
  server.get('/apartments-in-kolkata', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kolkata-for-sale");
  });

  server.get('/flats-in-bangalore', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-bangalore-for-sale");
  });
  server.get('/flats-in-hyderabad', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-hyderabad-for-sale");
  });
  server.get('/flats-in-chennai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-chennai-for-sale");
  });
  server.get('/flats-in-pune', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-pune-for-sale");
  });
  server.get('/flats-in-kochi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kochi-for-sale");
  });
  server.get('/flats-in-mumbai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-mumbai-for-sale");
  });
  server.get('/flats-in-delhi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-delhi-for-sale");
  });
  server.get('/flats-in-kolkata', (req, res) => {
    res.redirect(301, "https://www.homes247.in/residential-flats-in-kolkata-for-sale");
  });

  server.get('/house-for-sale-in-bangalore', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-bangalore");
  });
  server.get('/house-for-sale-in-hyderabad', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-hyderabad");
  });
  server.get('/house-for-sale-in-chennai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-chennai");
  });
  server.get('/house-for-sale-in-pune', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-pune");
  });
  server.get('/house-for-sale-in-kochi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-kochi");
  });
  server.get('/house-for-sale-in-mumbai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-mumbai");
  });
  server.get('/house-for-sale-in-delhi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-delhi");
  });
  server.get('/house-for-sale-in-kolkata', (req, res) => {
    res.redirect(301, "https://www.homes247.in/home-for-sale-in-kolkata");
  });

  server.get('/villas-in-bangalore', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-bangalore");
  });
  server.get('/villas-in-hyderabad', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-hyderabad");
  });
  server.get('/villas-in-chennai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-chennai");
  });
  server.get('/villas-in-pune', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-pune");
  });
  server.get('/villas-in-kochi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-kochi");
  });
  server.get('/villas-in-mumbai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-mumbai");
  });
  server.get('/villas-in-delhi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-delhi");
  });
  server.get('/villas-in-kolkata', (req, res) => {
    res.redirect(301, "https://www.homes247.in/villas-for-sale-in-kolkata");
  });
  server.get('/plots-for-sale-in-bangalore', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-bangalore");
  });
  server.get('/plots-for-sale-in-hyderabad', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-hyderabad");
  });
  server.get('/plots-for-sale-in-chennai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-chennai");
  });
  server.get('/plots-for-sale-in-pune', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-pune");
  });
  server.get('/plots-for-sale-in-kochi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-kochi");
  });
  server.get('/plots-for-sale-in-mumbai', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-mumbai");
  });
  server.get('/plots-for-sale-in-delhi', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-delhi");
  });
  server.get('/plots-for-sale-in-kolkata', (req, res) => {
    res.redirect(301, "https://www.homes247.in/plots-in-kolkata");
  });
  server.get('/property/bangalore/samethanahalli/ranav-tranquil-haven-28773', (req, res) => {
    res.redirect(301, "https://www.homes247.in/property/bangalore/soukya-road/ranav-tranquil-haven-28773");
  });

  server.get('/property/bangalore/choodasandra/gr-swara-82668', (req, res) => {
    res.redirect(301, "https://www.homes247.in/property/bangalore/choodasandra/gr-swara-by-ranke-infra-82668");
  });

  server.get('/property/bangalore/off-sarjapur-road/poorvi-enchanting-34779', (req, res) => {
    res.redirect(301, "https://www.homes247.in");
  });
  server.get('/property/bangalore/haralur-road/poorvi-champions-heights-529', (req, res) => {
    res.redirect(301, "https://www.homes247.in");
  });
  server.get('/property/bangalore/chikkanayakanahalli/msr-passion-square-58878', (req, res) => {
    res.redirect(301, "https://www.homes247.in");
  });

  server.get('/property/lucknow/jaitikhera/dreamz-aishwarya-heights-23460', (req, res) => {
    res.redirect(301, "https://www.homes247.in/");
  });
  server.get('/lucknow/property-sale-in-jaitikhera-2721', (req, res) => {
    res.redirect(301, "https://www.homes247.in/");
  });





  // blogs


  server.get('/blogs/web-stories', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/web-stories");
  });
  server.get('/blogs/video-blogs', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/video-blogs");
  });
  server.get('/blogs/expert-opinions-on-indian-realestate-16', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/expert-opinions-on-indian-realestate-16");
  });
  server.get('/blogs/tips-for-buying-a-house-4', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/tips-for-buying-a-house-4");
  });
  server.get('/blogs/top-real-estate-news-7', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/top-real-estate-news-7");
  });
  server.get('/blogs/our-trending-blogs-1', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/our-trending-blogs-1");
  });
  server.get('/blogs/our-latest-updates-2', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/our-latest-updates-2");
  });
  server.get('/blogs/interior-design-ideas-5', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/interior-design-ideas-5");
  });
  server.get('/blogs/technology-blogs-6', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/technology-blogs-6");
  });
  server.get('/blogs/vastu-shastra-tips-8', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/vastu-shastra-tips-8");
  });
  server.get('/blogs/healthy-lifestyle-blogs-9', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/healthy-lifestyle-blogs-9");
  });
  server.get('/blogs/modern-construction-techniques-10', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/modern-construction-techniques-10");
  });
  server.get('/blogs/health-fitness-blogs-11', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/health-fitness-blogs-11");
  });
  server.get('/blogs/diy-decor-ideas-12', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/diy-decor-ideas-12");
  });
  server.get('/blogs/finance-loan-taxes-13', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/finance-loan-taxes-13");
  });
  server.get('/blogs/most-popular-news-14', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/most-popular-news-14");
  });
  server.get('/blogs/indian-realestate-articles-17', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/indian-realestate-articles-17");
  });
  server.get('/blogs/popular-indian-festivals-15', (req, res) => {
    res.redirect(301, "https://www.homes247.in/articles/popular-indian-festivals-15");
  });
  server.get('/blogs/18-shakti-peethas-1067', (req, res) => {
    res.redirect(301, "https://www.homes247.in/blogs/shakti-peethas-india-1067");
  });






  // blogs













  // SEO_PROPSPECTIVE_REDIRECTS

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  // server.get('*.*', express.static(distFolder, {
  //   maxAge: '1y'
  // }));
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
      immutable: true
    })
  );
  // server.get('*', (req, res) => {
  //   res.setHeader('Cache-Control', 'no-store, must-revalidate');
  // });

  // All regular routes use the Universal engine
 server.get('*', (req, res) => {
    res.setHeader(
      'Cache-Control',
      'no-cache, no-store, must-revalidate'
    );

    res.render(indexHtml, {
      req,
      res,
      providers: [
        { provide: REQUEST, useValue: req },
        { provide: RESPONSE, useValue: res },
      ],
    });
  });
  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4032;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
