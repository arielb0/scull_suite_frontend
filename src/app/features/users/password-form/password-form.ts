import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserService } from '../user-service/user-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './password-form.html',
  styleUrl: './password-form.scss'
})
export class PasswordForm {

  userService = inject(UserService)
  router = inject(Router)
  _snackBar = inject(MatSnackBar)

  passwordForm = new FormGroup({
    newPassword: new FormControl(''),
    currentPassword: new FormControl('')
  })

  submitPassword() {
    this.userService.changePassword(
      this.passwordForm.controls.newPassword.value ?? '',
      this.passwordForm.controls.currentPassword.value ?? ''
    ).subscribe({
      complete: () => {
        this.router.navigate(['/users/me'])
      },
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
  }

}
