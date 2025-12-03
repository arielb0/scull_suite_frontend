import { Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth-service/auth-service';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLink, MatToolbar, MatButtonModule, MatIcon
    , MatMenuModule, MatSidenavModule, MatListModule

  ],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss'
})
export class UserLayout {

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
