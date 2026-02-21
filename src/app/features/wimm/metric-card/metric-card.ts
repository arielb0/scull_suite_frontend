import { Component, inject, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AccountService } from '../account-service/account-service';

@Component({
  selector: 'app-metric-card',
  imports: [MatCardModule],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.scss',
})
export class MetricCard {

  metricName: InputSignal<string> = input.required()
  metricValue: InputSignal<string | number | null> = input.required()
  color: InputSignal<number> = input.required()
  accountService = inject(AccountService)
  
}
