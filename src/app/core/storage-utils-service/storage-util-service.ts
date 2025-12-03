import { inject, Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageUtilService {
  storageService = inject(StorageService)

  deleteStorageItems() {
      this.storageService.delete('refresh_token')
      this.storageService.delete('access_token')
      this.storageService.delete('user_name')
      this.storageService.delete('user_id')
  }
}
