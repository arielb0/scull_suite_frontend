import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, RetryConfig } from 'rxjs';
import { retry, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  private http = inject(HttpClient)
  private timeoutValue: number = 10000
  private retryConfig: RetryConfig = {count: 2, delay: 2000}

  create<typeInput, typeOutput>(url: string, data: typeInput): Observable<typeOutput> {
    return this.http.post(url, data).pipe(timeout(this.timeoutValue), retry(this.retryConfig)) as Observable<typeOutput>
  }

  read<Type>(url: string): Observable<Type> {
    return this.http.get(url).pipe(timeout(this.timeoutValue), retry(this.retryConfig)) as Observable<Type>
  }

  update<typeInput, typeOutput>(url: string, data: typeInput): Observable<typeOutput> {
    return this.http.put(url, data).pipe(timeout(this.timeoutValue), retry(this.retryConfig)) as Observable<typeOutput>
  }

  delete<Type>(url: string): Observable<Type> {
    return this.http.delete(url).pipe(timeout(this.timeoutValue), retry(this.retryConfig)) as Observable<Type>
  }

  deleteWithBody<Type>(url: string, data: Object): Observable<Type> {
    return this.http.request('DELETE', url, {
      body: data
    }).pipe(timeout(this.timeoutValue), retry(this.retryConfig)) as Observable<Type>
  }

}
