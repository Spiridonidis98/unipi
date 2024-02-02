import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  selectedAdminOption = 'movies'
  adminOption = [
    {
      id: 'movies',
      img: 'assets/imgs/header/play.svg',
      descr: 'admin.movies'
    },
    {
      id: 'comingSoon',
      img: 'assets/imgs/header/play.svg',
      descr: 'sidebar.comingSoon'
    },
    {
      id: 'contact',
      img: 'assets/imgs/general/mail.svg',
      descr: 'sidebar.contact'
    },
    {
      id: 'admin',
      img: 'assets/imgs/header/settings.svg',
      descr: 'sidebar.admin'
    }
  ]

  changeView(id: string){
    this.selectedAdminOption = id;
  }
}
