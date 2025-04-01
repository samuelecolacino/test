import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Keycloak from 'keycloak-js';
import { AuthGuardData } from 'keycloak-angular';

export const authGuard: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, authData: AuthGuardData) => Promise<boolean | undefined> = async (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot, _authData: AuthGuardData) => {
  const keycloak = inject(Keycloak);
  if (!keycloak.authenticated) {
    await keycloak.login();
  }
  return keycloak.authenticated;
};


