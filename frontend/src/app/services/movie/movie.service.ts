import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  loginIp='http://127.0.0.1:8080';

  //URL ---------------------------
  getMoviesURL = '/api/v1/movie';
  uploadMovieURL = '/api/v1/movie/upload';

  //URL ---------------------------
  constructor(private http: HttpClient) { }

  getAllMovies() {
    const url = this.loginIp + this.getMoviesURL;
    console.log('URL ----->');
    console.log(url);

    return new Promise( (resolve, reject) => {
      this.http.get(url).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            resolve(response.data);
          }
          else {
            reject('error');
          }
        }, error: (error) => {
          console.log(error);
          reject('error');
        }
      })
    });
  }

  uploadMovie(body: any) {
    const url = this.loginIp + this.getMoviesURL;
    console.log('URL ----->');
    console.log(url);

    return new Promise( (resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            resolve(response.data);
          }
          else {
            reject('error');
          }
        }, error: (error) => {
          console.log(error);
          reject('error');
        }
      })
    });
  }
}
