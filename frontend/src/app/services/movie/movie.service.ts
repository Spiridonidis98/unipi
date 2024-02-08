import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  loginIp='http://127.0.0.1:8080';

  //URL ---------------------------
  getMoviesURL = '/api/v1/movie';
  uploadMovieURL = '/api/v1/movie/upload';

  getScreeningURL = '/api/v1/screening';

  getAuditoriumURL = '/api/v1/auditorium';

  //URL ---------------------------
  constructor(private http: HttpClient, private helper: HelperService) { }

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
            response.data.map( (m:any) => m.photoURL = this.loginIp + m.imageName )
            for(let movie of response.data) {

            }
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

  getScreening(screening_dt: Date, movie_id: string) {
    const url = this.loginIp + this.getScreeningURL + '?screening_dt=' + this.helper.serverFormatDate(new Date(screening_dt)) + '&movie_id=' + movie_id;

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
        }, error: ( error => {
          console.log(error);
          reject('error');
        })
      })
    });
  }

  getAuditorium() {
    const url = this.loginIp + this.getAuditoriumURL;

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
        },error: (error: any) => {
          console.log(error);
          reject('error');
        }
      });
    });
  }
}
