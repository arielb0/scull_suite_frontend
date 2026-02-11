import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatetimeService {

  /**
   * Return date 
   */
  getLocalDateISOString(date: Date): string {
    
    const year = date.getFullYear().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
     
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }
  
  getUTCDate(localDate: string): string {
    return new Date(localDate).toISOString()
  }
  
}
