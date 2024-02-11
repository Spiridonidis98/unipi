import { Component } from '@angular/core';
import { HelperService } from '../../services/helper/helper.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showHideMovieInfoValue = false; // hides or shows movie info modal
  movieInfo: any; //holds movie info to show to modal
  selectedComponent: string = 'home';

  showHideReservationValue: boolean = false;
  reservationInfo: any = null;
  constructor(public helper: HelperService, private data: DataService) {

    setTimeout(() => {
      this.checkIfUserLoggedIn();
    }, 200)

  }

  async checkIfUserLoggedIn() {
    const user = await this.helper.getItemFromLocalStorage('user');
    if(user) {
      this.data.login(user);
    }
  }
  changeView(type: string) {
    this.selectedComponent = type;
  }

  showLoginFunction(type: string,$event: any) {
    switch(type) {
      case 'header': {
        this.helper.showLoginValue = $event;
        break;
      }
      case 'login': {
        switch($event) {
          case 'cancel': {
            this.helper.showLoginValue = false;
            break;
          }
        }
      }
    }

  }
  //Functions for Movie Info ----------------------
  showHideMovieInfo(event: any) {
    if(event.type === 'close' ) {
      this.showHideMovieInfoValue = event.value;
    }
    else {
      this.reservationInfo = event.value;
      this.showHideReservation(true);
    }
  }

  openInfoModal(movie: any) {
    console.log(movie)
    this.movieInfo = movie;
    this.showHideMovieInfoValue = true;
  }
  //Functions for Movie Info ----------------------

  //functions for reservation ---------------------
  showHideReservation(event: any) {
    this.showHideReservationValue = event;
  }
  //functions for reservation ---------------------


}
