import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';
import { ApiMessageModel } from '../../../core/apiMessageModel';
import { BudgetModel } from '../budget-model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  static readonly url = `${environment.url}wimm/apply-budget`
  private apiRestService = inject(ApiRestService)
  
  apply(budget: BudgetModel): Observable<ApiMessageModel> {
    return this.apiRestService.create<BudgetModel, ApiMessageModel>(BudgetService.url, budget)
  }

}
