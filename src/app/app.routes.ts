import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PeopleComponent } from './people/page/people.component';

export const tabRoutes: Routes = [
  {
    title: 'People',
    component: PeopleComponent,
    path: 'people',
  },
  {
    title: 'About',
    component: AboutComponent,
    path: 'about',
  },
];

export const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  ...tabRoutes,
];
