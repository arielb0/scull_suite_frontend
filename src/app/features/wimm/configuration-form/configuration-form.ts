import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';

import { ConfigurationService } from '../configuration-service/configuration-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { FormButton } from '../../../core/form-button/form-button';

@Component({
  selector: 'app-configuration-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, FormButton],
  templateUrl: './configuration-form.html',
  styleUrl: './configuration-form.scss'
})
export class ConfigurationForm {
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  configurationService: ConfigurationService = inject(ConfigurationService)
  _snackBar: MatSnackBar = inject(MatSnackBar)
  
  configurationForm = new FormGroup({
    currency: new FormControl<string>(''),
    currency_display: new FormControl<string>(''),
    locale: new FormControl<string>(''),
  })

  isUpdate: boolean = false

  constructor() {
    this.configurationService.read().pipe(
      tap(configuration => {
        if (configuration) {
            this.isUpdate = true
            this.configurationForm.controls.currency.setValue(configuration.currency)
            this.configurationForm.controls.currency_display.setValue(configuration.currency_display)
            this.configurationForm.controls.locale.setValue(configuration.locale)
        }
      })
    ).subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.message, 'Done') 
    })
  }

  completeCallback() {
    this.router.navigate(['/wimm/configuration/detail'])
  }

  errorCallback(err: HttpErrorResponse) {
    this._snackBar.open(err.statusText, 'Done')
  }

  submitConfiguration() {
    this.configurationService.update({
      currency: this.configurationForm.value.currency ?? '',
      currency_display: this.configurationForm.value.currency_display ?? '',
      locale: this.configurationForm.value.locale ?? '',
    }).subscribe({
      complete: () => this.completeCallback(),
      error: (err: HttpErrorResponse) => this.errorCallback(err)
    })
  }

}
