import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAccordion } from '@angular/material/expansion'

import { TransactionService } from '../transaction-service/transaction-service';
import { TransactionModel } from '../transaction-model';
import { AccountService } from '../account-service/account-service';
import { AccountModel } from '../account-model';
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TransactionExpansion } from '../transaction-expansion/transaction-expansion';
import { ConfigurationService } from '../configuration-service/configuration-service';
import { ConfigurationModel } from '../configuration-model';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionExpansion, RouterLink, MatIconModule, MatButtonModule, MatAccordion, CurrencyPipe, ReactiveFormsModule, MatInputModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss'
})
export class TransactionList {

  transactionService = inject(TransactionService)
  transactions$: Observable<TransactionModel[]> = this.transactionService.transactions$
  transactions: TransactionModel[] = []
  filteredTransactions: TransactionModel[] = []
  
  accountService = inject(AccountService)
  accounts$: Observable<AccountModel[]> = this.accountService.accounts$

  configurationService = inject(ConfigurationService)
  configuration: ConfigurationModel | null = null

  _snackBar: MatSnackBar = inject(MatSnackBar)

  searchInput: FormControl<string | null> = new FormControl<string>('')

  constructor() {

    this.configurationService.configuration$.subscribe({
      next: (response) => this.configuration = response as ConfigurationModel
    })

    this.transactionService.list().subscribe({
      next: (response) => this.transactions = this.filteredTransactions = response,
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')

    })

    this.accountService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })

  }

  applyFilter(event: Event) {
    let filterValue = this.searchInput.value

    if (filterValue == '') {
      this.filteredTransactions = this.transactions
    } else {
      this.filteredTransactions = this.transactions.filter((transaction) => {
        return transaction.keywords?.toLowerCase().includes(filterValue ?? '')
      })
    }
  }

}
