import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable, switchMap, tap } from 'rxjs';

import { AccountService } from '../account-service/account-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormButton } from '../../../core/form-button/form-button';
import { AccountModel } from '../account-model';

@Component({
  selector: 'app-account-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckbox, FormButton],
  templateUrl: './account-form.html',
  styleUrl: './account-form.scss'
})
export class AccountForm {
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  accountService: AccountService = inject(AccountService)
  _snackBar: MatSnackBar = inject(MatSnackBar)
  isUpdate: boolean = false
    
  accountForm = new FormGroup({
    name: new FormControl<string>(''),
    goal_description: new FormControl<string>(''),
    goal_amount: new FormControl<number>(0),
    budget_percentage: new FormControl<number>(0),
    include_on_summary_section: new FormControl<boolean>(false),
    include_on_total_amount: new FormControl<boolean>(false),
    color: new FormControl<number>(0)
  })  

  constructor() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (id) {
          return this.accountService.read(Number(id)).pipe(
            tap(account => {
              if (account) {
                  this.isUpdate = true
                  this.accountForm.controls.name.setValue(account.name)
                  this.accountForm.controls.goal_description.setValue(account.goal_description)
                  this.accountForm.controls.goal_amount.setValue(account.goal_amount)
                  this.accountForm.controls.budget_percentage.setValue(Number((account.budget_percentage * 100).toPrecision(3)))
                  this.accountForm.controls.include_on_summary_section.setValue(account.include_on_summary_section)
                  this.accountForm.controls.include_on_total_amount.setValue(account.include_on_total_amount)
                  this.accountForm.controls.color.setValue(account.color)
              }
            })
          )
        }
        return new Observable()
      })
    ).subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.message, 'Done', {duration: 3000}) 
    })
    
  }  

  completeCallback() {
    this.router.navigate(['/wimm/accounts'])
  }

  errorCallback(err: HttpErrorResponse) {
    this._snackBar.open(err.message, 'Done')
  }

  setFormData(): AccountModel {

    return { name: this.accountForm.value.name ?? '',
    goal_description: this.accountForm.value.goal_description ?? '',
    goal_amount: Number(this.accountForm.value.goal_amount) ?? 0,
    budget_percentage: Number(((this.accountForm.value.budget_percentage ?? 0) / 100).toPrecision(3)),
    include_on_summary_section: this.accountForm.value.include_on_summary_section ?? false,
    include_on_total_amount: this.accountForm.value.include_on_total_amount ?? false,
    color: this.accountForm.value.color ?? 0 }

  }

  submitAccount() {    
    
    if (this.route.snapshot.params['id']) {
      
      this.accountService.update(
        Object.assign(this.setFormData(), {id: this.route.snapshot.params['id']})
     ).subscribe({
        complete: () => this.completeCallback(),
        error: (err: HttpErrorResponse) => this.errorCallback(err)
      })
    } else {
      this.accountService.create(
      this.setFormData()
     ).subscribe({
        complete: () => this.completeCallback(),
        error: (err: HttpErrorResponse) => this.errorCallback(err)
      })
    }
  }
}
