import { Component, inject } from '@angular/core';
import { UserService } from '../user-service/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetForm } from '../reset-form/reset-form';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-reactivate',
  imports: [ResetForm],
  templateUrl: './user-reactivate.html',
  styleUrl: './user-reactivate.scss'
})
export class UserReactivate {

  userService = inject(UserService)
  _snackBar: MatSnackBar = inject(MatSnackBar)

  submitRequest(email: string) {
    
    this.userService.reActivate(email).subscribe({
      complete: () => this._snackBar.open('Check your email to complete activation process', 'Done'),
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
    
  }

}
