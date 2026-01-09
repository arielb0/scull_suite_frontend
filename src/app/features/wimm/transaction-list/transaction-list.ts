import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TransactionCard } from '../transaction-card/transaction-card';
import { TransactionService } from '../transaction-service/transaction-service';
import { TransactionModel } from '../transaction-model';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';
import { AccountService } from '../account-service/account-service';
import { AccountModel } from '../account-model';
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-list',
  imports: [TransactionCard, AsyncPipe, LoadingSpinner, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss'
})
export class TransactionList {

  transactionService = inject(TransactionService)
  transactions$: Observable<TransactionModel[]> = this.transactionService.transactions$

  accountService = inject(AccountService)
  accounts$: Observable<AccountModel[]> = this.accountService.accounts$

  _snackBar: MatSnackBar = inject(MatSnackBar)

  constructor() {
    this.transactionService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })

    this.accountService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
  }  

}
