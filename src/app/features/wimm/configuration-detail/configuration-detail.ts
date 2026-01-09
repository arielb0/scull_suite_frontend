import { Component, inject } from '@angular/core';
import { ConfigurationService } from '../configuration-service/configuration-service';
import { ConfigurationModel } from '../configuration-model';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-configuration-detail',
  imports: [MatButtonModule, MatIcon, RouterLink],
  templateUrl: './configuration-detail.html',
  styleUrl: './configuration-detail.scss',
})
export class ConfigurationDetail {

  configurationService = inject(ConfigurationService)
  configuration: ConfigurationModel | null = null

  constructor() {
    this.configurationService.configuration$.subscribe({
      next: (response) => {
        this.configuration = response
      }
    })
  }

}
