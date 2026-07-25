import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'userauth/profile/:id', loadComponent: () => import('./profile/profile').then((m) => m.Profile)
    },

    {
        path: 'homes-elite', loadComponent: () => import('./homes-elite/homes-elite').then((m) => m.HomesEliteComponent)
    },
    {
        path: 'subscription-plan-management', loadComponent: () => import('./subscription-plan-management/subscription-plan-management').then((m) => m.SubscriptionPlanManagement)
    },
    {
        path: 'active-properties', loadComponent: () => import('./active-properties/active-properties').then((m) => m.ActiveProperties)
    },
    {
        path: 'my-preferences', loadComponent: () => import('./my-preferences/my-preferences').then((m) => m.MyPreferences)
    },

];
