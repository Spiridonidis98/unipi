import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  selectedComponent: string = 'home';
  showLoginValue: boolean = false;
  changeView(type: string) {
    this.selectedComponent = type;
  }

  showLoginFunction(type: string,$event: any) {
    switch(type) {
      case 'header': {
        this.showLoginValue = $event;
        break;
      }
      case 'login': {
        switch($event) {
          case 'cancel': {
            this.showLoginValue = false;
            break;
          }
        }
      }
    }

  }


}
