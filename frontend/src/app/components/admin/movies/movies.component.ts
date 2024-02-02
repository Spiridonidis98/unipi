import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movieInfo: any = null;
  showCreateEditMovie: Boolean = false
  createEditMovie(option: any) {
    this.movieInfo = option;
    this.showCreateEditMovie = true;
  }
}
