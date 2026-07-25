// import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideZoneChangeDetection } from '@angular/core';


// ✅ Enable production mode only in production builds
// if (typeof ngDevMode === 'undefined' || !ngDevMode) {
//   enableProdMode();
// }

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),
    ...appConfig.providers
  ]
});
