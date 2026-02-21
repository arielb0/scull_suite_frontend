import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../transaction-service/transaction-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction-delete',
  imports: [MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent],
  templateUrl: './transaction-delete.html',
  styleUrl: './transaction-delete.scss',
})
export class TransactionDelete {
  transactionService = inject(TransactionService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  _snackBar = inject(MatSnackBar)
  data = inject(MAT_DIALOG_DATA)
  dialog = inject(MatDialog)

  deleteTransaction(id: number) {
    this.transactionService.delete(id).subscribe({
      complete: () => {
        const matDialogRef = this.dialog.closeAll()
      },
      error: (err: HttpErrorResponse) => {
        this._snackBar.open(err.message, 'Done', {duration: 3000})
      }
    })
  }

}
