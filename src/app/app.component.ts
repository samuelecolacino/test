import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrl: 'app.component.css'
})
export class AppComponent {
}
