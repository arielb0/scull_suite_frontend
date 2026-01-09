import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountCard } from '../account-card/account-card';
import { AccountService } from '../account-service/account-service';
import { AccountModel } from '../account-model';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [AccountCard, AsyncPipe, LoadingSpinner, MatIconModule, MatButton, RouterLink],
  templateUrl: './account-list.html',
  styleUrl: './account-list.scss'
})
export class AccountList {

  accountService = inject(AccountService)
  accounts$: Observable<AccountModel[]> = this.accountService.accounts$
  _snackBar: MatSnackBar = inject(MatSnackBar)

  constructor() {
    this.accountService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
  }

}
