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
  showLoginValue: boolean = false;
  showContact: Boolean = false;
  constructor(private helper: HelperService, private data: DataService) {
    // this.checkIfUserLoggedIn();

  }

  async checkIfUserLoggedIn() {
    const user = await this.helper.getItemFromLocalStorage('user');
    if(user) {
      this.data.login(user);
    }
  }
  changeView(type: string) {
    if(type === 'contact') {
      this.showContact = true;
    }
    else {
      this.selectedComponent = type;
    }
  }

  showContactFunction() {
    console.log('sajfdhsjfsjfhjsdf');
    this.showContact = false;
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
