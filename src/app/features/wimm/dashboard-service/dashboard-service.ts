import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';
import { DashboardModel} from '../dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  static readonly url = `${environment.url}wimm/dashboard`
  private apiRestService = inject(ApiRestService)

  private dashboardSubject = new BehaviorSubject<DashboardModel | null>(null)
  dashboard$ = this.dashboardSubject.asObservable()
  
  read(): Observable<undefined | DashboardModel> {
    return this.apiRestService.read<DashboardModel>(DashboardService.url).pipe(
      tap((response) => {
        this.dashboardSubject.next(response as DashboardModel)
      })
    )
  }

}

