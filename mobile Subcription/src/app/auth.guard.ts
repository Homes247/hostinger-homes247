// src/app/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loginID = localStorage.getItem('loginID');

  if (loginID) {
    return true;
  }

  const returnUrl = encodeURIComponent(window.location.origin + '/' + state.url);
  window.location.href = `https://www.homes247.in/login?returnUrl=${returnUrl}`;
  return false;

  



};  