import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public translate: TranslateService) { }

  formatDate(date: string) {
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
  }

  changeLanguage(option: string) {
    this.translate.use(option);
  }
}
