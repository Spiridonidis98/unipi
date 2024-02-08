import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent {
  @Output() showMovieInfo: EventEmitter<any> = new EventEmitter();
  @Input() movie: any;
  constructor() {}

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
    console.log(this.movie)
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }
}
