import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink, Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AuthService } from '../../auth/auth-service/auth-service';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-recipe-layout',
  imports: [RouterOutlet, RouterLink, MatToolbar, MatButtonModule, MatIcon
    , MatMenuModule, RouterLinkWithHref, MatSidenavModule, MatListModule],
  templateUrl: './recipe-layout.html',
  styleUrl: './recipe-layout.scss'
})
export class RecipeLayout {

  authService = inject(AuthService)
  router = inject(Router)

  sidebarOpened: boolean;

  constructor() {
    this.sidebarOpened = false
  }

  logoutAction() {
    this.authService.logout()
     this.router.navigate(['/'])
  }
}
