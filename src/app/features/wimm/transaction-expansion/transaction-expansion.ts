import { Component, inject, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionModel } from '../transaction-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDelete } from '../transaction-delete/transaction-delete';
import { AuthService } from '../../auth/auth-service/auth-service';
import { TransactionActions } from '../transaction-actions/transaction-actions';
import { AccountService } from '../account-service/account-service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-transaction-expansion',
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, TransactionActions, MatIconModule, MatListModule],
  templateUrl: './transaction-expansion.html',
  styleUrl: './transaction-expansion.scss'
})
export class TransactionExpansion {
  dialog = inject(MatDialog)
  transaction = input.required<TransactionModel>()
  amount = input.required<string | null>()
  authService = inject(AuthService)
  router = inject(Router)
  
  accountService = inject(AccountService)
  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(TransactionDelete, {data: {id: id}})
  }

  goToTransactionDetail(id: number) {
    this.router.navigate(['/wimm/transactions/', id])
  }
}
