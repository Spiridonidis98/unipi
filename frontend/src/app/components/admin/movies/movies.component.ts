import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movieInfo: any = null;
  showCreateEditMovie: Boolean = false;

  movies: any = [];

  constructor(private movieServ: MovieService, private helper: HelperService) {
    this.getAllMovies();
  }

  //Fetch All Movies -------------------------
  getAllMovies() {
    this.movieServ.getAllMovies('all').then( (response: any) => {
      this.movies = response;
    }).catch( error => {
      this.movies = [];
    })
  }
  //------------------------------------------

  createEditMovie(option: any) {
    this.movieInfo = option;
    this.showCreateEditMovie = true;
  }

  deleteMovie(movie: any) {
    this.helper.presentAlert('question', 'alert.deleteQuestion', 'alert.deleteMovieQuestion', true).then((alert: any) => {
      if(alert.isConfirmed) {
        this.movieServ.deleteMovie(movie).then( (response: any) => {
          if(response === 'success') {
            this.getAllMovies();
          }
        });
      }
    });
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }

  //Here we catch the emit value for create or edit movies
  updateAction(event: any) {
    this.movieInfo = null;
    this.showCreateEditMovie = false;
    if(event) {
      this.getAllMovies();
    }
  }
}
