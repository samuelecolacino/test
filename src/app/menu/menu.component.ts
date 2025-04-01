import { Component, inject } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-menu',
  imports: [
    MatToolbar,
    MatIcon,
    RouterLink,
    MatIconButton,
    MatButton,
  ],
  templateUrl: 'menu.component.html',
  standalone: true,
  styleUrl: 'menu.component.css'
})
export class MenuComponent {
  private readonly router = inject(Router);
  private readonly keycloak = inject(Keycloak);
  private readonly authService = inject(AuthService);
  protected readonly authenticated = this.authService.authenticated;
  protected readonly userInfo = this.authService.userInfo;

  async doLogout() {
    await this.router.navigate(['/']);
    await this.keycloak.logout();
  }

  doLogin() {
    this.keycloak.login().finally()
  }
}
