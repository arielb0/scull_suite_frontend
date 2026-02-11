import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
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
import { DatetimeService } from '../../../core/datetime-service/datetime-service';

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
  datetimeService: DatetimeService = inject(DatetimeService)
  localDate: Signal<string> = computed(() => 'hello')

  ngOnInit() {
    this.sourceAccount$ = this.accountService.read(this.transaction().source_account ?? 0)
    this.destinationAccount$ = this.accountService.read(this.transaction().destination_account ?? 0)
    this.localDate = computed(() => {
      return 'hello' //new Date(this.transaction().timestamp).toString()
    })
  }
  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(TransactionDelete, {data: {id: id}})
  }

  goToTransactionDetail(id: number) {
    this.router.navigate(['/wimm/transactions/', id])
  }
  

}
