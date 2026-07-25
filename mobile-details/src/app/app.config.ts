import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration
} from '@angular/platform-browser';

import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimationsAsync(),

    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),

    provideRouter(
      routes,
      // PreloadAllModules REMOVED
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),

    provideClientHydration(
      withEventReplay(),
      withIncrementalHydration()
    ),

    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    )

  ]
};