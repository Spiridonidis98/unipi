import { Component } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent {

  selectedView: string = 'personalInfo'

  changeView(type: string) {
    this.selectedView = type;
  }
}
