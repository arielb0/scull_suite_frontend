import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, switchMap } from 'rxjs';

import { AccountModel } from '../account-model';
import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  static readonly url = `${environment.url}wimm/accounts/`
  private apiRestService = inject(ApiRestService)

  private accountsSubject = new BehaviorSubject<AccountModel[]>([])
  accounts$ = this.accountsSubject.asObservable()
  
  create(item: AccountModel): Observable<AccountModel> {
   return this.apiRestService.create<AccountModel, AccountModel>(AccountService.url, item).pipe(
    tap((response) => {

    })
   ) as Observable<AccountModel>
  }

  private updateObservable(Account: AccountModel) {
    const currentStatus = this.accountsSubject.value
    const index = currentStatus.findIndex(item => item.id == Account.id)

    if (index === -1) {
        this.accountsSubject.next(currentStatus.concat(Account))
    } else {
      currentStatus[index] = Account
      this.accountsSubject.next(currentStatus)
    }
  }
  
  read(id: number): Observable<undefined | AccountModel> {
    return this.apiRestService.read<AccountModel>(`${AccountService.url}${id}/`).pipe(
      tap((response) => {       
        this.updateObservable(response as AccountModel)
      }),
      switchMap(() => this.accounts$.pipe(
        map(Accounts => Accounts.find((Account) => Account.id == id))
      ))
    )
  }

  update(item: AccountModel): Observable<AccountModel> {
    return this.apiRestService.update<AccountModel, AccountModel>(`${AccountService.url}${item.id}/`, item).pipe(
      tap(response => {
        this.updateObservable(response)
      })
    )
  }

  delete(id: number): Observable<Object> {
    return this.apiRestService.delete<AccountModel>(`${AccountService.url}${id}/`).pipe(
      tap(response => {        
        const currentStatus = this.accountsSubject.value        
        this.accountsSubject.next(currentStatus.filter(Account => Account.id !== id))
      })
    ) as Observable<Object>
  }

  list(): Observable<AccountModel[]> {
    return this.apiRestService.read<AccountModel[]>(AccountService.url).pipe(
      tap(response => {
        this.accountsSubject.next(response)
      })
    ) as Observable<AccountModel[]>
  }

}
