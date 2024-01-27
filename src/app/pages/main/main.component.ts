import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  selectedComponent: string = 'home';

  changeView(type: string) {
    this.selectedComponent = type;
  }
}
