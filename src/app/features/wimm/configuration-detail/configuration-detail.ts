import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfigurationService } from '../configuration-service/configuration-service';
import { ConfigurationModel } from '../configuration-model';

@Component({
  selector: 'app-configuration-detail',
  imports: [MatButtonModule, MatIcon, RouterLink, MatListModule, MatCardModule],
  templateUrl: './configuration-detail.html',
  styleUrl: './configuration-detail.scss',
})
export class ConfigurationDetail {

  configurationService = inject(ConfigurationService)
  configuration: ConfigurationModel | null = null

  _snackBar = inject(MatSnackBar)

  constructor() {
    this.configurationService.configuration$.subscribe({
      next: (response) => {
        this.configuration = response
      },
      error: (err) => this._snackBar.open(err.message, 'Done', {duration: 3000})
    })
  }

}
