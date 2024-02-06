import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() movieInfoEmitter: EventEmitter<any> = new EventEmitter();
  movies: any = [];
  constructor(private movieServ: MovieService) { }

  ngOnInit(): void {
    this.movieServ.getAllMovies('active').then( (response: any) => {
      this.movies = response;
    }).catch( error => {
      this.movies = [];
    })
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }

  openInfoModal(movie: any) {
    this.movieInfoEmitter.emit(movie)
  }

}
