import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  formatDate(date: string) {
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
  }
}
