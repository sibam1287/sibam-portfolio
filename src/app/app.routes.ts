import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'project/:id', 
    loadComponent: () => import('./pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
  },
  { 
    path: 'not-found', 
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: 'not-found' }
];
