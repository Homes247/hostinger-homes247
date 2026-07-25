// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { filter, switchMap, take } from 'rxjs/operators';

// import { TokenStoreService } from './auth.service';
// import { BACKEND_CONFIGS } from './backend-config';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private tokenStore: TokenStoreService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     // ❌ Never intercept token APIs
//     if (req.url.includes('/proxy/tokendbgs')) {
//       return next.handle(req);
//     }

//     // 🔍 Find matching backend config (ONLY selected APIs)
//     const cfg = BACKEND_CONFIGS.find(c =>
//       c.key === 'MBGS' && c.apiPattern.test(req.url)
//     );

//     // 👉 If request is NOT a protected DBGS API → pass through
//     if (!cfg) {
//       return next.handle(req);
//     }

//     // 👉 Try to get token
//     const token = this.tokenStore.getToken(cfg.key);

//     // ✅ Token already available → attach & continue
//     if (token) {
//       return next.handle(
//         req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${token}`
//           }
//         })
//       );
//     }

//     // ⏳ Token not ready → WAIT (do NOT cancel)
//     return this.tokenStore.waitForToken().pipe(
//       filter(ready => ready),
//       take(1),
//       switchMap(() => {
//         const freshToken = this.tokenStore.getToken(cfg.key);
//         return next.handle(
//           req.clone({
//             setHeaders: {
//               Authorization: `Bearer ${freshToken}`
//             }
//           })
//         );
//       })
//     );
//   }
// }