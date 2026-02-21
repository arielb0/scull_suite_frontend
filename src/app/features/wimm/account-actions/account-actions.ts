import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AccountModel } from '../account-model';
import { AccountDelete } from '../account-delete/account-delete';

@Component({
  selector: 'app-account-actions',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './account-actions.html',
  styleUrl: './account-actions.scss',
})
export class AccountActions {

  account = input.required<AccountModel>()
  dialog = inject(MatDialog)

  openDialog(id: number) {
    let dialogRef = this.dialog.open(AccountDelete, {data: {id: id}})
  }

}
