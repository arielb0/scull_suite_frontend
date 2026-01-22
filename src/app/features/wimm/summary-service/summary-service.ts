import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { SummaryModel } from '../summary-model';
import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  static readonly url = `${environment.url}wimm/summary/`
  private apiRestService = inject(ApiRestService)

  private summariesSubject = new BehaviorSubject<SummaryModel[]>([])
  summarys$ = this.summariesSubject.asObservable()  

  list(id: number): Observable<SummaryModel[]> {
    return this.apiRestService.read<SummaryModel[]>(`${SummaryService.url}${id}/`).pipe(
      tap(response => {
        this.summariesSubject.next(response)
      })
    ) as Observable<SummaryModel[]>
  }

}

