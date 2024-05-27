import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './utils/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'loading-app',
    loadComponent: () => import('./pages/loading-app/loading-app.page').then(m => m.LoadingAppPage),
    canActivate: [publicGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
