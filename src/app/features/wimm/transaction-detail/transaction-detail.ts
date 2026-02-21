import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, first } from 'rxjs';
import { MatListModule } from '@angular/material/list';

import { TransactionModel } from '../transaction-model';
import { TransactionService } from '../transaction-service/transaction-service';
import { TransactionActions } from '../transaction-actions/transaction-actions';
import { AuthService } from '../../auth/auth-service/auth-service';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountModel } from '../account-model';
import { AccountService } from '../account-service/account-service';

@Component({
  selector: 'app-transaction-detail',
  imports: [MatListModule, TransactionActions, LoadingSpinner],
  templateUrl: './transaction-detail.html',
  styleUrl: './transaction-detail.scss'
})

export class TransactionDetail {
  route: ActivatedRoute = inject(ActivatedRoute)
  authService = inject(AuthService)
  _snackBar: MatSnackBar = inject(MatSnackBar)
  transactionService = inject(TransactionService)
  transaction: TransactionModel | undefined = undefined
  accountService = inject(AccountService)
  sourceAccount: AccountModel | undefined = undefined
  destinationAccount: AccountModel | undefined = undefined

  constructor() {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.transactionService.read(id)),
      tap((transaction) => this.transaction = transaction),
      switchMap(() => this.accountService.read(this.transaction?.source_account ?? 0).pipe(first())),
      tap((sourceAccount) => this.sourceAccount = sourceAccount),
      switchMap(() => this.accountService.read(this.transaction?.destination_account ?? 0)),
      tap((destinationAccount) => this.destinationAccount = destinationAccount)
    ).subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.message, 'Done', {duration: 3000})
    })
  }

}