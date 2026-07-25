// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, timeout } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { TokenStoreService } from './auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthInitService {

//   constructor(
//     private http: HttpClient,
//     private tokenStore: TokenStoreService
//   ) {}

//   init(): () => Promise<void> {
//     return () =>
//       this.http.get<any>('https://dbgs.homes247.in/proxy/tokendbgs', {
//         withCredentials: true
//       })
//       .pipe(
//         timeout(3000),          // ⏱ max 3 seconds
//         catchError(err => {
//           console.warn('Token API failed / timed out', err);
//           return of(null);      // ✅ allow app to load
//         })
//       )
//       .toPromise()
//       .then(res => {
//         if (res?.access_token) {
//           this.tokenStore.setToken('DBGS', res.access_token);
//         }
//       });
//   }
// }