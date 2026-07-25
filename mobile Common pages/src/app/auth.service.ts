// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class TokenStoreService {

//   private tokens = new Map<string, string>();
//   private tokenReady$ = new BehaviorSubject<boolean>(false);

//   private loading = false; // 🔒 lock

//   setToken(key: string, token: string) {
//     this.tokens.set(key, token);
//     this.loading = false;
//     this.tokenReady$.next(true);
//   }

//   getToken(key: string): string | undefined {
//     return this.tokens.get(key);
//   }

//   isLoading(): boolean {
//     return this.loading;
//   }

//   startLoading() {
//     this.loading = true;
//   }

//   waitForToken() {
//     return this.tokenReady$.asObservable();
//   }
// }