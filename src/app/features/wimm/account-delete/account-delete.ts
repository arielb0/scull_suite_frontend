import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AccountService } from '../account-service/account-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-delete',
  imports: [MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent],
  templateUrl: './account-delete.html',
  styleUrl: './account-delete.scss',
})
export class AccountDelete {
  accountService = inject(AccountService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  _snackBar = inject(MatSnackBar)
  data = inject(MAT_DIALOG_DATA)
  dialog = inject(MatDialog)

  deleteAccount(id: number) {
    this.accountService.delete(id).subscribe({
      complete: () => {
        const matDialogRef = this.dialog.closeAll()
      },
      error: (err: HttpErrorResponse) => {
        this._snackBar.open(err.message, 'Done')
      }
    })
  }

}
