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

  getAllMovies(inactive: String) {

    let url = this.loginIp + this.getMoviesURL;
    if(inactive === 'active') {
      url += '?inactive=false'
    }
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
    console.log(body)
    return new Promise( (resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            resolve('success');
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

  uploadMovieInfo(body: any) {
    const url = this.loginIp + this.uploadMovieURL;
    console.log('URL ----->');
    console.log(url);

    console.log(body)

    return new Promise( (resolve, reject) => {
      this.http.patch(url, body).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            resolve('success');
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
