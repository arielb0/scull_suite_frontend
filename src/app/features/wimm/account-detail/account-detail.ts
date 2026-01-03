import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs';
import { MatListModule } from '@angular/material/list';

import { AccountModel } from '../account-model';
import { AccountService } from '../account-service/account-service';
import { AccountActions } from '../account-actions/account-actions';
import { AuthService } from '../../auth/auth-service/auth-service';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-detail',
  imports: [MatListModule, AccountActions, LoadingSpinner],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.scss'
})

export class AccountDetail {
  route: ActivatedRoute = inject(ActivatedRoute)
  authService = inject(AuthService)
  _snackBar: MatSnackBar = inject(MatSnackBar)
  accountService = inject(AccountService)
  account: AccountModel | undefined = undefined  

  constructor() {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.accountService.read(id)),
      tap((account) => this.account = account)
    ).subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
  }

}