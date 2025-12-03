import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ApiRestService } from '../api-rest-service/api-rest-service';
import { JwtAccessTokenModel } from '../../features/auth/jwt-access-token-model';
import { StorageService } from '../storage-service/storage-service';
import { StorageUtilService } from '../storage-utils-service/storage-util-service';
import { AuthService } from '../../features/auth/auth-service/auth-service';
import { JwtRefreshTokenModel } from '../../features/auth/jwt-refresh-token-model';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const apiRestService = inject(ApiRestService)
  const storageService = inject(StorageService)
  const storageUtilService = inject(StorageUtilService)
  const router = inject(Router)
  const loginRoute = ['/auth/login']

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manage global errors (500, 401, 403)
      if (error.status == 401) {

        if (storageService.read('refresh_token')) {
         
          apiRestService.create<JwtRefreshTokenModel, JwtAccessTokenModel>(`${AuthService.url}jwt/refresh`, {refresh: storageService.read('refresh_token') as string}).subscribe({
            
            next: (response: Object) => {
              storageService.update('access_token', (response as JwtAccessTokenModel).access)
            },

            error: (error: HttpErrorResponse) => {
              if (error.status == 401) {
                storageUtilService.deleteStorageItems()
              }

              router.navigate(loginRoute)
            },
          })                  
        } else {
          storageUtilService.deleteStorageItems()
          router.navigate(loginRoute)
        }
      }
      return throwError(() => error)
    })
  );
};