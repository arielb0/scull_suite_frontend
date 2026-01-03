import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatetimeService {

  localToUtc(localDateTime: string): string {
    return new Date(localDateTime).toISOString()
  }

  getISODate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  utcToLocal(utcDateTime: string): string {
    const utcDateTimeObject = new Date(utcDateTime)
    const localDateTime = new Date(utcDateTimeObject.getTime() - utcDateTimeObject.getTimezoneOffset() * 6000)
    return this.getISODate(localDateTime)
  }
  
}
