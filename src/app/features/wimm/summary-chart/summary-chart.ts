import { Component, inject, input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import { SummaryService } from '../summary-service/summary-service';

@Component({
  selector: 'app-summary-chart',
  imports: [BaseChartDirective],
  templateUrl: './summary-chart.html',
  styleUrl: './summary-chart.scss',
})
export class SummaryChart {
  accountName = input.required<string>()
  accountId = input.required<number>()
  summaryService: SummaryService = inject(SummaryService)
  chartType: ChartType = 'line'
  datasets: ChartConfiguration['data'] = {
    datasets: [{
      label: '',
      data: []
    },    
    ],
    labels: []
  }

  ngOnInit() {

    this.summaryService.list(this.accountId()).subscribe({
      next: (response) => {
        
        let label = this.accountName()
        let data: number[] = []
        let labels: string[] = []

        response.forEach((summaryModel) => {
          data.push(summaryModel.amount)
          labels.push(summaryModel.timestamp.slice(0, 7))
        })

        this.datasets = {
          datasets: [{
            label: label,
            data: data
          },    
          ],
          labels: labels
        }
      }
    })
  }

}
