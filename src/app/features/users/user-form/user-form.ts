import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../user-service/user-service';
import { StorageService } from '../../../core/storage-service/storage-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm {
  route: ActivatedRoute = inject(ActivatedRoute)
  userService: UserService = inject(UserService)
  storageService: StorageService = inject(StorageService)
  _snackBar: MatSnackBar = inject(MatSnackBar)

  userForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })  
    
  submitUser() {
    this.userService.create({
      username: this.userForm.value.username ?? '',
      email: this.userForm.value.email ?? '',
      password: this.userForm.value.password ?? ''
    }).subscribe({
      complete: () => this._snackBar.open('Registration successful. Check your email inbox for instructions to activate your account', 'Done'),
      error: (err) => this._snackBar.open(JSON.stringify(err), 'Done')
    })    
  } 
}
