import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public translate: TranslateService) { }

  formatDate(date: any) {
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
  }

  serverFormatDate(date: any) {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en')

  }

  changeLanguage(option: string) {
    this.translate.use(option);
  }
}
