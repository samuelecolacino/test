import { Routes } from '@angular/router';
import { authGuard } from "./auth/auth.guard";
import { HomeComponent } from "./app/home/home.component";
import { ProtectedComponent } from "./app/protected/protected.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
