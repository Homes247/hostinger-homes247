// ─── Zone.js Patch Flags ────────────────────────────────────────────────────
// Must be set BEFORE zone.js is imported (angular.json loads this file first).
// Disabling unused Zone patches reduces the long-task duration of zone.js init.

// Not used in Angular apps — safe to disable
(globalThis as any).__Zone_disable_requestAnimationFrame = true;
(globalThis as any).__Zone_disable_on_property = true;        // onclick/onload etc.
(globalThis as any).__Zone_disable_geolocation = true;
(globalThis as any).__Zone_disable_FileReader = true;

// Keep enabled — Angular change detection depends on these
(globalThis as any).__Zone_disable_XHR = false;               // HttpClient
(globalThis as any).__Zone_disable_timers = false;            // setTimeout/setInterval
(globalThis as any).__Zone_disable_EventTarget = false;       // click, input, etc.
(globalThis as any).__Zone_disable_MutationObserver = false;  // DOM change tracking
(globalThis as any).__Zone_disable_IntersectionObserver = false; // lazy load triggers

// ─── Additional safe disables for a real-estate listing page ────────────────
// These APIs are not used by Angular or homes247 listing page
(globalThis as any).__Zone_disable_customElements = true;     // Web Components API
(globalThis as any).__Zone_disable_canvas = true;             // <canvas> not used
(globalThis as any).__Zone_disable_MessagePort = true;        // MessageChannel/Worker
(globalThis as any).__Zone_disable_IE_check = true;           // No IE support needed

// ─── No other imports needed ─────────────────────────────────────────────────
// zone.js is already declared in angular.json polyfills array.
// reflect-metadata is NOT needed for Angular 17+ Ivy (do not import it).
// @angular/localize is NOT needed unless i18n is used.