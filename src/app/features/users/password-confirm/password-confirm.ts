import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user-service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { map, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-confirm',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './password-confirm.html',
  styleUrl: './password-confirm.scss'
})
export class PasswordConfirm {

  userService = inject(UserService)
  route = inject(ActivatedRoute)
  _snackBar = inject(MatSnackBar)
  router = inject(Router)

  passwordConfirmForm = new FormGroup({
    newPassword: new FormControl()
  })

  submitPasswordConfirmation() {

    this.route.paramMap.pipe(
      map(params => ({
        uid: params.get('uid'), 
        token: params.get('token')
      })),
      switchMap(values => this.userService.resetPasswordConfirm(
        values.uid ?? '',
        values.token ?? '',
        this.passwordConfirmForm.controls.newPassword.value ?? ''
      ))
    ).subscribe({
      next: () => this.router.navigate(['/users/me']),
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
  }

}
