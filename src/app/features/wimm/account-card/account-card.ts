import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AccountModel } from '../account-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccountDelete } from '../account-delete/account-delete';
import { AuthService } from '../../auth/auth-service/auth-service';
import { AccountActions } from '../account-actions/account-actions';

@Component({
  selector: 'app-account-card',
  imports: [MatCardModule, MatButtonModule, AccountActions],
  templateUrl: './account-card.html',
  styleUrl: './account-card.scss'
})
export class AccountCard {
  dialog = inject(MatDialog)  
  account = input.required<AccountModel>()
  authService = inject(AuthService)
  router = inject(Router)

  openDialog(id: number) {
    const dialogRef = this.dialog.open(AccountDelete, {data: {id: id}})
  }

  goToAccountDetail(id: number) {
    this.router.navigate(['/wimm/accounts/', id])
  }

}
