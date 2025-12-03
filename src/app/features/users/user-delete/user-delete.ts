import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user-service/user-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule ,FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/auth-service/auth-service';

@Component({
  selector: 'app-delete',
  imports: [ReactiveFormsModule, MatDialogContent, MatDialogActions, MatButtonModule, MatInputModule],
  templateUrl: './user-delete.html',
  styleUrl: './user-delete.scss'
})
export class UserDelete {
  readonly dialogRef = inject(MatDialogRef<UserDelete>)
  userService = inject(UserService)
  authService = inject(AuthService)
  router = inject(Router)
  _snackBar = inject(MatSnackBar)
  
  deleteConfirmationForm = new FormGroup({
    password: new FormControl('')
  })

  closeDialog() {
    this.dialogRef.close()
  }

  deleteUser() {
    this.userService.delete(this.deleteConfirmationForm.controls.password.value ?? '').subscribe({
      complete: () => {
        this.dialogRef.close()
        this.authService.logout()
        this.router.navigate(['/'])
      } ,
      error: (err) => this._snackBar.open(JSON.stringify(err), 'Done')
    })
  }
}
