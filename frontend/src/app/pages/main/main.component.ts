import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showHideMovieInfoValue = false; // hides or shows movie info modal
  movieInfo: any; //holds movie info to show to modal
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
  //Functions for Movie Info ----------------------
  showHideMovieInfo(value: boolean) {
    this.showHideMovieInfoValue = value;
  }

  openInfoModal(movie: any) {
    this.movieInfo = movie;
    this.showHideMovieInfo(true);
  }
  //Functions for Movie Info ----------------------

}
