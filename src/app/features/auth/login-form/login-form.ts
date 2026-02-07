import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../auth-service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from "@angular/material/card";
import { StorageService } from '../../../core/storage-service/storage-service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatCardModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  authService = inject(AuthService)
  router = inject(Router)
  _snackBar = inject(MatSnackBar)
  storageService: StorageService = inject(StorageService)

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  submitLogin() {
    this.authService.login({
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    }).subscribe({
      complete: () => {
        this.router.navigate([this.storageService.read('redirect_to')])
        this.storageService.delete('redirect_to')
      },
      error: (err) => this._snackBar.open(JSON.stringify(err), 'Done')
    })
    
  }

}
