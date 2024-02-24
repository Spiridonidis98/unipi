import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent {
  @Output() sidebarValue: EventEmitter<string> = new EventEmitter();
  selectedView: string = 'personalInfo';

  constructor(private data: DataService, private helper: HelperService) {}

  changeView(type: string) {
    this.selectedView = type;
  }

  //here we perform the logout action
  logout() {
    this.data.user = null;
    this.helper.removeItemFromLocalStorage('user')
    this.sidebarValue.emit('home');
  }
}
