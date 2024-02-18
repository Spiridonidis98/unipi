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
      id: 'users',
      img: 'assets/imgs/header/person.svg',
      descr: 'admin.users'
    },
    {
      id: 'screening',
      img: 'assets/imgs/header/play.svg',
      descr: 'sidebar.screening'
    },
    {
      id: 'contact',
      img: 'assets/imgs/general/mail.svg',
      descr: 'sidebar.contact'
    }
  ]

  changeView(id: string){
    this.selectedAdminOption = id;
  }
}
