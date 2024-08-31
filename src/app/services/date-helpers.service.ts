import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelpersService {
  constructor() {}

  formatDate(date: Date | string) {
    const unformattedDate = new Date(date);
    if (!unformattedDate) {
      return date;
    }

    return unformattedDate.toDateString();
  }
}
