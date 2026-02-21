import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { AccountService } from '../account-service/account-service';
import { AccountModel } from '../account-model';
import { BudgetService } from '../budget-service/budget-service';

@Component({
  selector: 'app-budget-form',
  imports: [ReactiveFormsModule, MatSelectModule, MatButtonModule],
  templateUrl: './budget-form.html',
  styleUrl: './budget-form.scss',
})
export class BudgetForm {

  budgetService = inject(BudgetService)

  accountsService = inject(AccountService)
  accounts: AccountModel[] = []

  router = inject(Router)

  budgetForm = new FormGroup({
    sourceAccount: new FormControl<number>(0)
  })

  _matSnackBar = inject(MatSnackBar)
 
  constructor() {
    this.accountsService.list().subscribe({
      next: (response) => this.accounts = response
    })
  }

  applyBudget() {
    this.budgetService.apply({
      source_account: this.budgetForm.value.sourceAccount ?? 0
    }).subscribe({
      error: (err: HttpErrorResponse) => this._matSnackBar.open(err.message, 'Done', {duration: 3000}),
      complete: () => this.router.navigate(['/wimm/transactions'])
    })
  }
}
