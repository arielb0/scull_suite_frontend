import { Component } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-account-chart',
  imports: [BaseChartDirective],
  templateUrl: './account-chart.html',
  styleUrl: './account-chart.scss',
})
export class AccountChart {

  /**
  accountData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [10, 1, 7], // Get from backend
        label: 'Series A',
      }
    ],
    labels: [1, 2, 3] // Get from backend
  }  */

  accountData: ChartConfiguration['data'] = {
    datasets: [{
      data: [{x: 10, y: 20}]      
    }],
    labels: ['2025']
  }

  lineChartType: ChartType = 'line'

}
