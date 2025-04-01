import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { RouterLink } from "@angular/router";

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

}
