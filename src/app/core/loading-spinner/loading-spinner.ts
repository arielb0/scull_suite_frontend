import { Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [MatProgressSpinner],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner {
  loadingMessage = input.required<string>()
  showNoDataMessage = false

  constructor() {
    setInterval(() => this.showNoDataMessage = true, 6000)
  }

}
