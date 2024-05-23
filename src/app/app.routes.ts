import { Routes } from '@angular/router';
import { PeopleComponent } from './people/page/people.component';

export const tabRoutes: Routes = [
  {
    title: 'People',
    component: PeopleComponent,
    path: 'people',
  },
];

export const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  ...tabRoutes,
];
