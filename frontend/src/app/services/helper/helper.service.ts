import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public translate: TranslateService) { }

  formatDate(date: any) {
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en');
  }

  serverFormatDate(date: any, andTime?: Boolean) {
    return andTime ? formatDate(new Date(date), 'yyyy-MM-dd HH:mm', 'en') : formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  formatTime(date: any) {
    return formatDate(new Date(date), 'HH:mm', 'en');
  }


  changeLanguage(option: string) {
    this.translate.use(option);
  }

  async setItemToLocalStorage(type: string, data: any) {
    await localStorage.setItem(type, JSON.stringify(data))
  }

  async getItemFromLocalStorage(type: string) {
    const data = await localStorage.getItem(type);
    return data ? JSON.parse(data) : null;
  }

  async removeItemFromLocalStorage(type: string) {
    await localStorage.removeItem(type);
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }

  //return number value ------------------
  returnNumber(value: number) {
    return isNaN(value) ? 0 : Number(value)
  }
  //return number value ------------------

}
