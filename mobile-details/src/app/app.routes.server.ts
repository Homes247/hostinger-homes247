import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
 
  { path: 'listings/:individualproperty', renderMode: RenderMode.Server },
  { path: 'rentals/:bhk-:propertytype-for-rent-in-:locality-:cityname-:propname-:id', renderMode: RenderMode.Server },
  { path: 'pgd/:pg-for-rent-in-cityname-:id', renderMode: RenderMode.Server },
  { path: 'cld/:commercial-properties-for-sale_rent-in-:cityname-:typeid-:id', renderMode: RenderMode.Server },
  { path: 'login', renderMode: RenderMode.Server },




];