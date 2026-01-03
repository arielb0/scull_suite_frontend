import { Component, inject, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionModel } from '../transaction-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDelete } from '../transaction-delete/transaction-delete';
import { AuthService } from '../../auth/auth-service/auth-service';
import { TransactionActions } from '../transaction-actions/transaction-actions';
import { AccountModel } from '../account-model';
import { Observable } from 'rxjs';
import { AccountService } from '../account-service/account-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-card',
  imports: [MatCardModule, MatButtonModule, TransactionActions, AsyncPipe],
  templateUrl: './transaction-card.html',
  styleUrl: './transaction-card.scss'
})
export class TransactionCard {
  dialog = inject(MatDialog)
  transaction = input.required<TransactionModel>()
  authService = inject(AuthService)
  router = inject(Router)
  
  accountService = inject(AccountService)
  sourceAccount$: Observable<AccountModel | undefined> = new Observable(undefined)
  destinationAccount$: Observable<AccountModel | undefined> = new Observable(undefined)

  ngOnInit() {
    this.sourceAccount$ = this.accountService.read(this.transaction().source_account ?? 0)
    this.destinationAccount$ = this.accountService.read(this.transaction().destination_account ?? 0)
  }
  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(TransactionDelete, {data: {id: id}})
  }

  goToTransactionDetail(id: number) {
    this.router.navigate(['/wimm/transactions/', id])
  }

  getTransactionTitle(transaction: InputSignal<TransactionModel>):string {
    if (transaction().description.length < 16) {
      return transaction().description
    }
    return `${transaction().description.slice(0, 16)}...`
  } 

}
