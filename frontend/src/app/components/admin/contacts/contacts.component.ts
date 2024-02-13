import { Component } from '@angular/core';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contacts: any = [];
  constructor(public data: DataService) {
    this.getAllContacts();
    if(this.data.permissions.length === 0) {
      this.data.getAllPermissions();
    }
  }

  getAllContacts() {
    this.data.getContacts().then( response => {
      this.contacts = response;
    }).catch( error => {
      alert('something error')
    })
  }

  deleteContact(contact: any) {
    this.data.deleteContact(contact).then( (response: any) => {
      if(response === 'success') {
        this.getAllContacts();
      }
    })
  }
}
