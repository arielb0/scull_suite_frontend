import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, switchMap } from 'rxjs';

import { TransactionModel } from '../transaction-model';
import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  static readonly url = `${environment.url}wimm/transactions/`
  private apiRestService = inject(ApiRestService)

  private transactionsSubject = new BehaviorSubject<TransactionModel[]>([])
  transactions$ = this.transactionsSubject.asObservable()
  
  create(item: TransactionModel): Observable<TransactionModel> {
   return this.apiRestService.create<TransactionModel, TransactionModel>(TransactionService.url, item).pipe(
    tap((response) => {

    })
   ) as Observable<TransactionModel>
  }

  private updateObservable(Transaction: TransactionModel) {
    const currentStatus = this.transactionsSubject.value
    const index = currentStatus.findIndex(item => item.id == Transaction.id)

    if (index === -1) {
        this.transactionsSubject.next(currentStatus.concat(Transaction))
    } else {
      currentStatus[index] = Transaction
      this.transactionsSubject.next(currentStatus)
    }
  }
  
  read(id: number): Observable<undefined | TransactionModel> {
    return this.apiRestService.read<TransactionModel>(`${TransactionService.url}${id}/`).pipe(
      tap((response) => {       
        this.updateObservable(response as TransactionModel)
      }),
      switchMap(() => this.transactions$.pipe(
        map(Transactions => Transactions.find((Transaction) => Transaction.id == id))
      ))
    )
  }

  update(item: TransactionModel): Observable<TransactionModel> {
    return this.apiRestService.update<TransactionModel, TransactionModel>(`${TransactionService.url}${item.id}/`, item).pipe(
      tap(response => {
        this.updateObservable(response)
      })
    )
  }

  delete(id: number): Observable<Object> {
    return this.apiRestService.delete<TransactionModel>(`${TransactionService.url}${id}/`).pipe(
      tap(response => {        
        const currentStatus = this.transactionsSubject.value        
        this.transactionsSubject.next(currentStatus.filter(Transaction => Transaction.id !== id))
      })
    ) as Observable<Object>
  }

  list(): Observable<TransactionModel[]> {
    return this.apiRestService.read<TransactionModel[]>(TransactionService.url).pipe(
      tap(response => {
        this.transactionsSubject.next(response)
      })
    ) as Observable<TransactionModel[]>
  }

}
