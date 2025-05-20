import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LaunchComponent } from './components/launch/launch.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login-form/login-form.component').then(m => m.LoginFormComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'calculator',
        loadComponent: () => import('./calculator/calculator.component').then(m => m.CalculatorComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'launch',
        component: LaunchComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
