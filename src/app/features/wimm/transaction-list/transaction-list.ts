import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAccordion } from '@angular/material/expansion'
import { map, tap, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TransactionService } from '../transaction-service/transaction-service';
import { TransactionModel } from '../transaction-model';
import { AccountService } from '../account-service/account-service';
import { AccountModel } from '../account-model';
import { TransactionExpansion } from '../transaction-expansion/transaction-expansion';
import { ConfigurationService } from '../configuration-service/configuration-service';
import { ConfigurationModel } from '../configuration-model';

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionExpansion, RouterLink, MatIconModule, MatButtonModule, MatAccordion, 
    CurrencyPipe, ReactiveFormsModule, MatInputModule, AsyncPipe],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss'
})
export class TransactionList {

  transactionService = inject(TransactionService)
  transactions$: Observable<TransactionModel[]> = this.transactionService.transactions$
  filteredTransactions$: Observable<TransactionModel[]> = this.transactionService.transactions$
  
  accountService = inject(AccountService)
  accounts$: Observable<AccountModel[]> = this.accountService.accounts$

  configurationService = inject(ConfigurationService)
  configuration: ConfigurationModel | null = null

  _snackBar: MatSnackBar = inject(MatSnackBar)

  searchInput: FormControl<string | null> = new FormControl<string>('')
  filter$: BehaviorSubject<string | null> = new BehaviorSubject(this.searchInput.value)

  constructor() {
    this.configurationService.read().pipe(
      tap((response) => {
        if (response) {
          this.configuration = response
        }
      })
    ).subscribe({
      error: (err) => console.log(err)
    })

    this.transactionService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })

    this.filteredTransactions$ = combineLatest([this.transactions$, this.filter$]).pipe(
      map(([transactions, filter]) => {
        if (filter === '') {
          return transactions
        } else {
          return transactions.filter((transaction) => transaction.keywords?.toLowerCase().includes(filter ?? ''))
        }        
      })
    )

    this.accountService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })

  }

  setFilter(event: Event) {
    this.filter$.next(this.searchInput.value)
  }

}
