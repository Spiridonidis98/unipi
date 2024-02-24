import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  showLoginValue: boolean = false;
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


  //Local Storage Implementation -----------------------
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
  //Local Storage Implementation -----------------------

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

  //alerter Functionality ----------------
  presentAlert(type: any, title: string, message: string, question: boolean) {
    return new Promise( resolve => {
      Swal.fire({
        title: this.translate.instant(title),
        text: this.translate.instant(message),
        icon: type,
        showConfirmButton: true,
        confirmButtonText: this.translate.instant('alert.ok'),
        confirmButtonColor: '#1640A9',
        cancelButtonText: this.translate.instant('alert.cancel'),
        showCancelButton: question,
        allowOutsideClick: question,
        allowEscapeKey: question,
        reverseButtons: true,
        showClass: {
          popup: 'swal2-show',
          backdrop: 'swal2-backdrop-show',
          icon: 'swal2-icon-show'
        },
        hideClass: {
          popup: 'swal2-hide',
          backdrop: 'swal2-backdrop-hide',
          icon: 'swal2-icon-hide'
        }
      }).then( response => {
        console.log(response)
        resolve(response)
      })
    })

  }
  //alerter Functionality ----------------

  //present toaster ----------------------
  presentToaster(type: any, title: string, message: string, question: boolean) {
    Swal.fire({
      timer: 3000,
      toast: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      position: 'top-end',
      timerProgressBar: true,
      title: this.translate.instant(title),
      text: this.translate.instant(message),
      icon: type,
      showConfirmButton: true,
      confirmButtonText: this.translate.instant('alert.ok'),
      confirmButtonColor: '#1640A9',
      cancelButtonText: this.translate.instant('alert.cancel'),
      showCancelButton: question,
      reverseButtons: true,
      showClass: {
        popup: 'swal2-show',
        backdrop: 'swal2-backdrop-show',
        icon: 'swal2-icon-show'
      },
      hideClass: {
        popup: 'swal2-hide',
        backdrop: 'swal2-backdrop-hide',
        icon: 'swal2-icon-hide'
      }
    }).then( response => {
      console.log(response)
    })
  }
  //--------------------------------------

}
