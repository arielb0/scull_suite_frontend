import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  create(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  read(key: string): string | null {
    return localStorage.getItem(key)
  }

  update(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  delete(key: string): void {
    localStorage.removeItem(key)
  }
  
}
