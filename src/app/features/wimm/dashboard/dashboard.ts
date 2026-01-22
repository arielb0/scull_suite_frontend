import { Component, inject } from '@angular/core';
import { DashboardService } from '../dashboard-service/dashboard-service';
import { DashboardModel } from '../dashboard-model';
import { tap } from 'rxjs';
import { ConfigurationService } from '../configuration-service/configuration-service';
import { ConfigurationModel } from '../configuration-model';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';
import { MetricCard } from '../metric-card/metric-card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SummaryChart } from '../summary-chart/summary-chart';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, MatCardModule, MatListModule,
    LoadingSpinner, MetricCard, RouterLink, MatButtonModule, SummaryChart, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  dashboardService = inject(DashboardService)
  dashboard: DashboardModel | undefined = undefined

  configurationService: ConfigurationService = inject(ConfigurationService)
  configuration: ConfigurationModel | null = null 
  
  constructor() {
    this.configurationService.configuration$.subscribe({
      next: (response) => this.configuration = response as ConfigurationModel
    })

    this.dashboardService.read().pipe(
      tap((response) => {
        if (response) {
          this.dashboard = response
        }
      })
    ).subscribe({
      error: (err) => console.log(err)
    })
  }

}
