import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { enableProdMode } from '@angular/core';

// ✅ Enable production mode only in production builds
if (typeof ngDevMode === 'undefined' || !ngDevMode) {
  enableProdMode();
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
