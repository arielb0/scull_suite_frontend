import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../auth-service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  authService = inject(AuthService)
  router = inject(Router)
  _snackBar = inject(MatSnackBar)

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
        this.router.navigate(['/'])
      },
      error: (err) => this._snackBar.open(JSON.stringify(err), 'Done')
    })
    
  }

}
