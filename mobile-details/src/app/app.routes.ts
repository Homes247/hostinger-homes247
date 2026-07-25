import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: 'listings/:individualproperty',
    loadComponent: () =>
      import('./individual-detail/individual-detail').then((m) => m.IndividualDetailsComponent),
  },
  {
    path: 'rentals/:bhk-:propertytype-for-rent-in-:locality-:cityname-:propname-:id',
    loadComponent: () => import('./rentdetails/rentdetails').then((m) => m.Rentdetails),
  },
  {
    path: 'pgd/:pg-for-rent-in-cityname-:id',
    loadComponent: () => import('./pg-details/pg-details').then((m) => m.PgDetailsComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login-otp/login-otp').then((m) => m.LoginComponent),
  },
  {
    path: 'cld/:commercial-properties-for-sale_rent-in-:cityname-:typeid-:id',
    loadComponent: () =>
      import('./commercial-details/commercial-details').then((m) => m.CommercialDetailsComponent),
  },
];
