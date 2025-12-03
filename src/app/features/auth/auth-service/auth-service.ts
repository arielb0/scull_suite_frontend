import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthModel } from '../auth-model';
import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';
import { JwtPairTokenModel } from '../jwt-pair-token-model';
import { StorageService } from '../../../core/storage-service/storage-service';
import { StorageUtilService } from '../../../core/storage-utils-service/storage-util-service';
import { UserService } from '../../users/user-service/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly url = `${environment.url}auth/`
  private apiRestService = inject(ApiRestService)
  private storageService = inject(StorageService)
  private storageUtilService = inject(StorageUtilService)

  private isJwtPairTokenModel(object: any): object is JwtPairTokenModel {
    return (
      typeof object === 'object' &&
      object !== null &&
      typeof object.refresh === 'string' &&
      typeof object.access === 'string'
    );
  }

  isUserLogged(): boolean {
    return this.storageService.read('user_name') !== null
  }

  getUsername(): string | null {
    return this.storageService.read('user_name')
  }

  getUserId(): number | null{
    if (this.storageService.read('user_id') !== null) {
      return Number(this.storageService.read('user_id'))
    }    
    return null
  }

  login(item: AuthModel): Observable<Object | JwtPairTokenModel> {
   
    return this.apiRestService.create<AuthModel, Object | JwtPairTokenModel>(`${AuthService.url}jwt/create`, item).pipe(
      tap({
        next: (response) => {
          if (this.isJwtPairTokenModel(response)) {
            this.storageService.create('refresh_token', response.refresh)
            this.storageService.create('access_token', response.access)
            this.storageService.create('user_name', item.username)
            
            this.apiRestService.read(`${UserService.url}me/`).subscribe({
              
              next: (response: any) => {
                if (typeof response == 'object'
                  && response !== null 
                  && typeof response.email === 'string'
                  && typeof response.id == 'number'
                  && typeof response.username == 'string') {

                    this.storageService.create('user_id', response.id)

                  }
              }
            })
          }
        }
      })
      
      
    ) as Observable<Object | JwtPairTokenModel>
  }

  logout(): void {
    this.storageUtilService.deleteStorageItems()
  }

}
