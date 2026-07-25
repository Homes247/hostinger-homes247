import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [


   {
    path: 'homes-elite',
    renderMode: RenderMode.Server
  },
   {
    path: 'userauth/profile/:id',
    renderMode: RenderMode.Server
  },
   {
    path: 'subscription-plan-management',
    renderMode: RenderMode.Server
  },
   {
    path: 'active-properties',
    renderMode: RenderMode.Server
  },
   {
    path: 'my-preferences',
    renderMode: RenderMode.Server
  },
];
