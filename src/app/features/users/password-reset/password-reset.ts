import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user-service/user-service';
import { ResetForm } from '../reset-form/reset-form';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  imports: [ResetForm],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss'
})
export class PasswordReset {
  userService = inject(UserService)
  _snackBar: MatSnackBar = inject(MatSnackBar)

  submitRequest(email: string) {
    
    this.userService.resetPassword(email).subscribe({
      complete: () => this._snackBar.open('Check your email to complete password reset process', 'Done'),
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
    
  }
}
