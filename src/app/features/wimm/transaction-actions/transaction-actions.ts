import { Component, inject, input } from '@angular/core';
import { TransactionModel } from '../transaction-model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransactionDelete } from '../transaction-delete/transaction-delete';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-actions',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './transaction-actions.html',
  styleUrl: './transaction-actions.scss',
})
export class TransactionActions {

  transaction = input.required<TransactionModel>()
  dialog = inject(MatDialog)

  openDialog(id: number) {
    let dialogRef = this.dialog.open(TransactionDelete, {data: {id: id}})
  }

}
