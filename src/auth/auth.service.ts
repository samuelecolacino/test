import { effect, inject, Injectable, signal } from '@angular/core';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, typeEventArgs, ReadyArgs } from 'keycloak-angular';
import Keycloak, { KeycloakLoginOptions, KeycloakLogoutOptions } from 'keycloak-js';
import { UserInfo } from './user-info';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak = inject(Keycloak);
  authenticated = signal(false);
  userInfo = signal<UserInfo | undefined>(undefined);

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(async () => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated.set(typeEventArgs<ReadyArgs>(keycloakEvent.args));
        if (this.authenticated()) {
          await this.keycloak.loadUserInfo();
          const userInfo = (this.keycloak.userInfo) as unknown as UserInfo;
          userInfo.token = this.keycloak.token || "";
          this.userInfo.set( userInfo);
          console.log(this.keycloak.userInfo);
        }
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated.set(false)
        this.userInfo.set(undefined);
      }

    });
  }

  private async initKeycloak() {
    const authenticated = this.keycloak.authenticated ?? await this.keycloak.init({ onLoad: 'check-sso' });
    this.authenticated.set(authenticated);
    if (authenticated) {
      await this.loadUserInfo();
    }
  }

  private async loadUserInfo() {
    const userInfo = (await this.keycloak.loadUserInfo()) as unknown as UserInfo;
    userInfo.token = this.keycloak.token || '';
    this.userInfo.set(userInfo);
  }

  async doLogin(options?: KeycloakLoginOptions) {
    await this.keycloak.login(options);
    await this.initKeycloak();
  }

  async doLogout(options?: KeycloakLogoutOptions) {
    await this.keycloak.logout(options);
    this.authenticated.set(false);
    this.userInfo.set(undefined);
  }

  isMemberOfRole(...roles: string[]): boolean {
    return roles.some(role => this.keycloak.hasResourceRole(role));
  }
}
