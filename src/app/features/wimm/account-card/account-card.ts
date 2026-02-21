import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from "@angular/material/list";
import { MatIcon } from '@angular/material/icon';
import { PercentPipe } from '@angular/common';

import { AccountService } from '../account-service/account-service';
import { AccountModel } from '../account-model';
import { AccountDelete } from '../account-delete/account-delete';
import { AuthService } from '../../auth/auth-service/auth-service';
import { AccountActions } from '../account-actions/account-actions';
import { ConfigurationModel } from '../configuration-model';

@Component({
  selector: 'app-account-card',
  imports: [MatCardModule, MatButtonModule, AccountActions, MatListModule, MatIcon, PercentPipe],
  templateUrl: './account-card.html',
  styleUrl: './account-card.scss'
})
export class AccountCard {
  dialog = inject(MatDialog)  
  account = input.required<AccountModel>()
  amount = input.required<string | null>()
  authService = inject(AuthService)
  router = inject(Router)
  accountService = inject(AccountService)
  configuration: ConfigurationModel | null = null

  openDialog(id: number) {
    const dialogRef = this.dialog.open(AccountDelete, {data: {id: id}})
  }

  goToAccountDetail(id: number) {
    this.router.navigate(['/wimm/accounts/', id])
  }

}
