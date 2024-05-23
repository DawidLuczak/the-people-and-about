import { Routes } from '@angular/router';

export const tabRoutes: Routes = [];

export const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  ...tabRoutes,
];
