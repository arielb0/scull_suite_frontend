import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { TransactionService } from '../transaction-service/transaction-service';
import { FormButton } from '../../../core/form-button/form-button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '../account-service/account-service';
import { AccountModel } from '../account-model';
import { DatetimeService } from '../../../core/datetime-service/datetime-service';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, AsyncPipe, FormButton],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss'
})
export class TransactionForm {
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  transactionService: TransactionService = inject(TransactionService)
  accountService: AccountService = inject(AccountService)
  accounts$: Observable<AccountModel[]> = this.accountService.accounts$
  _snackBar: MatSnackBar = inject(MatSnackBar)
  datetimeService: DatetimeService = inject(DatetimeService)  
  
  transactionForm = new FormGroup({
    timestamp: new FormControl<string>(this.datetimeService.getLocalDateISOString(new Date())),
    amount: new FormControl<number>(0),
    source_account: new FormControl<number>(0),
    destination_account: new FormControl<number>(0),
    description: new FormControl<string>('')
  })

  isUpdate: boolean = false

  constructor() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (id) {
          return this.transactionService.read(Number(id)).pipe(
            tap(transaction => {
              if (transaction) {
                  console.log(`This is the date returned from server (UTC): ${transaction.timestamp}`)
                  console.log(`This is the date returned from server converted to local: ${(new Date(transaction.timestamp)).toString()}`)
                  console.log(`This is the date retuned from server, converted to local and ISO format ${this.datetimeService.getLocalDateISOString(new Date(transaction.timestamp))}`)

                  this.isUpdate = true
                  this.transactionForm.controls.timestamp.setValue(this.datetimeService
                    .getLocalDateISOString(new Date(transaction.timestamp)))
                  this.transactionForm.controls.amount.setValue(transaction.amount)
                  this.transactionForm.controls.source_account.setValue(transaction.source_account)
                  this.transactionForm.controls.destination_account.setValue(transaction.destination_account)
                  this.transactionForm.controls.description.setValue(transaction.description)
              }
            })
          )
        }
        return new Observable()
      })
    ).subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.message, 'Done')
    })

    this.accountService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.message, 'Done')
    })
    
  }  

  completeCallback() {
    this.router.navigate(['/wimm/transactions'])
  }

  errorCallback(err: HttpErrorResponse) {
    this._snackBar.open(err.statusText, 'Done')
  }

  submitTransaction() {    
    
    if (this.route.snapshot.params['id']) {
      
      this.transactionService.update({
        id: this.route.snapshot.params['id'],
        timestamp: this.datetimeService.getUTCDate(this.transactionForm.value.timestamp ?? ''), // Submit date using new Date(dateVariable).toISOString()
        amount: this.transactionForm.value.amount ?? 0,
        source_account: Number(this.transactionForm.value.source_account) ?? 0,
        destination_account: Number(this.transactionForm.value.destination_account) ?? 0,
        description: this.transactionForm.value.description ?? '',
      }).subscribe({
        complete: () => this.completeCallback(),
        error: (err: HttpErrorResponse) => this.errorCallback(err)
      })
    } else {
      this.transactionService.create({
        timestamp: this.datetimeService.getUTCDate(this.transactionForm.value.timestamp ?? ''),
        amount: this.transactionForm.value.amount ?? 0,
        source_account: Number(this.transactionForm.value.source_account) ?? 0,
        destination_account: Number(this.transactionForm.value.destination_account) ?? 0,
        description: this.transactionForm.value.description ?? '',
      }).subscribe({
        complete: () => this.completeCallback(),
        error: (err: HttpErrorResponse) => this.errorCallback(err)
      })
    }
  }
}
