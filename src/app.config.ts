import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withDebugTracing } from "@angular/router";
import { provideKeycloak, withAutoRefreshToken, AutoRefreshTokenService, UserActivityService } from 'keycloak-angular';
import { routes } from "./app.routes";

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'http://localhost:38081/',
      realm: 'dev',
      clientId: 'client-app'
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withDebugTracing()),
  ],
};
