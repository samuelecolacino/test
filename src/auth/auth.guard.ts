// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import Keycloak from 'keycloak-js';
import { state } from "@angular/animations";
import { AuthGuardData } from 'keycloak-angular';
import { AuthService } from "./auth.service";




export const authGuard: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, authData: AuthGuardData) => Promise<boolean | undefined> = async (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot, _authData: AuthGuardData) => {

  const keycloak = inject(AuthService);
  if (!keycloak.authenticated()) {
    await keycloak.doLogin({
      redirectUri: window.location.origin + state.url
    });
  }
  return keycloak.authenticated();
};


