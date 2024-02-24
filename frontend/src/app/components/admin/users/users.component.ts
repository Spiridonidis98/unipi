import { Component } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: any = [];
  constructor(public data: DataService, private helper: HelperService) {
    this.getAllUsers();
    if(this.data.permissions.length === 0) {
      this.data.getAllPermissions();
    }
  }

  getAllUsers() {
    this.data.getAllUsers().then( response => {
      this.users = response;
    }).catch( error => {
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
    this.helper.presentAlert('question', 'alert.deleteQuestion', 'alert.deleteUserQuestion', true).then((alert: any) => {
      if(alert.isConfirmed) {
        this.data.deleteUser(user).then( (response: any) => {
          if(response === 'success') {
            this.getAllUsers();
          }
        });
      }
    });
  }
}
