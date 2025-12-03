import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user-service/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-username-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './username-form.html',
  styleUrl: './username-form.scss'
})
export class UsernameForm {

  userService = inject(UserService)
  _snackBar = inject(MatSnackBar)
  router = inject(Router)

  usernameForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  submitUsername() {

    this.userService.changeUsername(
      this.usernameForm.controls.username.value ?? '',
      this.usernameForm.controls.password.value ?? '',
    ).subscribe({
      complete: () => this.router.navigate(['/users/me']),
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })

  }
}
