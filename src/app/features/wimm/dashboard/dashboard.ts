import { Component, inject } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { DashboardService } from '../dashboard-service/dashboard-service';
import { DashboardModel } from '../dashboard-model';
import { ConfigurationService } from '../configuration-service/configuration-service';
import { ConfigurationModel } from '../configuration-model';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';
import { MetricCard } from '../metric-card/metric-card';
import { SummaryChart } from '../summary-chart/summary-chart';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, PercentPipe, MatCardModule, MatListModule,
    LoadingSpinner, MetricCard, RouterLink, MatButtonModule, SummaryChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  dashboardService = inject(DashboardService)
  dashboard: DashboardModel | undefined = undefined

  configurationService: ConfigurationService = inject(ConfigurationService)
  configuration: ConfigurationModel | null = null

  _snackBar: MatSnackBar = inject(MatSnackBar)
  
  constructor() {
    
    this.configurationService.read().pipe(
      tap((response) => {
        if (response) {
          this.configuration = response
        }
      })
    ).subscribe({
      error: (err) => console.log(err)
    })

    this.dashboardService.read().pipe(
      tap((response) => {
        if (response) {
          this.dashboard = response
        }
      })
    ).subscribe({
      error: (err) => this._snackBar.open(err.message, 'Done', {duration: 3000})
    })
  }

}
