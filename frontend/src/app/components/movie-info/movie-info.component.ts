import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent {
  @Output() showMovieInfo: EventEmitter<string> = new EventEmitter();
  @Input() movie: any;
  constructor() {}

  closeModal(type: string) {
    this.showMovieInfo.emit(type);
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
