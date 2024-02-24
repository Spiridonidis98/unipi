import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent {
  screenHeight: number = 0;
  screenWidth:number = 0;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  @Output() showMovieInfo: EventEmitter<any> = new EventEmitter();
  @Input() movie: any;
  constructor() {
    this.getScreenSize();
  }

  closeModal(type: string) {
    let event: any = null;
    if(type === 'reserve') {
      event = {
        type: 'reserve',
        value: this.movie
      }
    }
    else {
      event = {
        type: 'close',
        value: false
      }
    }
    this.showMovieInfo.emit(event);
  }

  ngOnInit(): void {
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }
}
