import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';
import { ConfigurationModel} from '../configuration-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  static readonly url = `${environment.url}wimm/configuration`
  private apiRestService = inject(ApiRestService)

  private configurationSubject = new BehaviorSubject<ConfigurationModel | null>(null)
  configuration$ = this.configurationSubject.asObservable()
  
  read(): Observable<undefined | ConfigurationModel> {
    return this.apiRestService.read<ConfigurationModel>(ConfigurationService.url).pipe(
      tap((response) => {
        this.configurationSubject.next(response as ConfigurationModel)
      })
    )
  }

  constructor() {
    this.read().subscribe({
      error: (err) => console.log(`Error loading configuration: ${err}`)
    })
  }

  update(item: ConfigurationModel): Observable<ConfigurationModel> {
      return this.apiRestService.update<ConfigurationModel, ConfigurationModel>(ConfigurationService.url, item).pipe(
        tap(response => {
          this.configurationSubject.next(response as ConfigurationModel)
        })
      )
    }

}

