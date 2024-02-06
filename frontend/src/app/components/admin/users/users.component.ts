import { Component } from '@angular/core';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: any = [];
  constructor(public data: DataService) {
    this.getAllUsers();
    if(this.data.permissions.length === 0) {
      this.data.getAllPermissions();
    }
  }

  getAllUsers() {
    this.data.getAllUsers().then( response => {
      this.users = response;
    }).catch( error => {
      alert('something error')
    })
  }

  update(user: any) {
    this.data.updateUser(user).then( (response: any) => {
      if(response === 'success') {
        this.getAllUsers();
      }
    })
  }

  deleteUser(user: any) {
    this.data.deleteUser(user).then( (response: any) => {
      if(response === 'success') {
        this.getAllUsers();
      }
    })
  }
}
