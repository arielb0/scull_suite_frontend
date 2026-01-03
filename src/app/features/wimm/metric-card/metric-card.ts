import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  imports: [MatCardModule],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.scss',
})
export class MetricCard {

  metricName: InputSignal<string> = input.required()
  metricValue: InputSignal<string | number | null> = input.required()

}
