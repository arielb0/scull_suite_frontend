import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../storage-service/storage-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService)

  if (storageService.read('access_token')) {
      const modifiedRequest = req.clone({    
      headers: req.headers.set('Authorization', `Bearer ${storageService.read('access_token')}`)
    })
    return next(modifiedRequest);
  }
  return next(req)
};
