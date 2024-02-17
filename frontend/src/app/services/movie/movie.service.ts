import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from '../helper/helper.service';
import { DataService } from '../data/data.service';

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

  reservationURL = '/api/v1/reservation';

  //URL ---------------------------
  constructor(private http: HttpClient, private helper: HelperService, private data: DataService) { }

  //here we get all movie info
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
            resolve(response.data);
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.getMoviesError', false)

            reject('error');
          }
        }, error: (error) => {
          this.helper.presentAlert('error', 'alert.warning', 'alert.getMoviesError', false)
          console.log(error);
          reject('error');
        }
      })
    });
  }

  //here we upload movie image and info
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
            this.helper.presentToaster('success', 'alert.success', 'alert.uploadMovieSuccess', false);
            resolve('success');
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.uploadMovieError', false);
            reject('error');
          }
        }, error: (error) => {
          this.helper.presentAlert('error', 'alert.warning', 'alert.uploadMovieError', false);
          console.log(error);
          reject('error');
        }
      })
    });
  }

  //here we upload movie info
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
            this.helper.presentToaster('success', 'alert.success', 'alert.uploadMovieSuccess', false);
            resolve('success');
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.uploadMovieError', false);
            reject('error');
          }
        }, error: (error) => {
          this.helper.presentAlert('error', 'alert.warning', 'alert.uploadMovieError', false);
          console.log(error);
          reject('error');
        }
      })
    });
  }

  //here we get the screening for a specific date and specific movie
  getScreening(screening_dt?: Date, movie_id?: string) {

    let url = this.loginIp + this.getScreeningURL;

    if(screening_dt) {
      url += '?screening_dt=' + this.helper.serverFormatDate(new Date(screening_dt))
    }
    if(movie_id) {
      url += '&movie_id=' + movie_id
    }

    console.log(url);

    return new Promise( (resolve, reject) => {
      this.http.get(url).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            resolve(response.data);
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.screeningError', false);
            reject('error');
          }
        }, error: ( error => {
          this.helper.presentAlert('error', 'alert.warning', 'alert.screeningError', false);
          console.log(error);
          reject('error');
        })
      })
    });
  }

  //here we will add new screenings -----------------
  addNewScreening(body: any) {
    const url = this.loginIp + this.getScreeningURL;
    console.log(url);

    console.log(body);

    return new Promise( (resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (response: any) => {
          if(response.status === 200) {
            this.helper.presentToaster('success', 'alert.success', 'alert.newScreeningSuccess', false);
            resolve('success');
          }
          else {
            this.helper.presentToaster('error', 'alert.warning', 'alert.newScreeningError', false);
            reject('error');
          }
        },error: error => {
            this.helper.presentToaster('error', 'alert.warning', 'alert.newScreeningError', false);
            reject('error');
        }
      })
    })
  }
  //here we will add new screenings -----------------

  //here we do the api call to get all auditoria info
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
            this.helper.presentAlert('error', 'alert.warning', 'alert.auditoriumError', false);
            reject('error');
          }
        },error: (error: any) => {
          console.log(error);
          this.helper.presentAlert('error', 'alert.warning', 'alert.auditoriumError', false);
          reject('error');
        }
      });
    });
  }

  getReservation(reservation_dt: any, movie_id: string, auditorium_id: string) {
    const url = this.loginIp + this.reservationURL + '/active?reservation_dt=' + this.helper.serverFormatDate(reservation_dt, true) + '&movie_id=' + movie_id + '&auditorium_id=' + auditorium_id;
    console.log(url);

    return new Promise( (resolve, reject) => {
      this.http.get(url).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            resolve(response.data);
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.reseservationError', false);
            reject('error');
          }
        }, error: (error: any) => {
          this.helper.presentAlert('error', 'alert.warning', 'alert.reseservationError', false);
          console.log(error);
          reject('error');
        }
      })

    });
  }

  //get Reservation By Id -----------------------------------------------
  getReservationById(_id: string) {
    const url = this.loginIp + this.reservationURL + '/id/' + _id;

    return new Promise( (resolve, reject) => {
      this.http.get(url).subscribe({
        next: (response: any) => {
          if(response.status === 200) {
            resolve(response.data);
          }
          else {
            reject('error');
          }
        }, error: (error: any) => {
          reject('error')
        }
      })
    });
  }
  //get Reservation By Id -----------------------------------------------


  //here we add new reservation -----------------------------------------
  addReservation(reservation: any) {
    const url = this.loginIp + this.reservationURL;
    console.log('URL ----->', url);

    const body = {
      reservation_email: this.data.user.email,
      auditorium_id : reservation.auditorium_id,
      row: reservation.row,
      seat: reservation.seat,
      movie_id: reservation.movie_id,
      reservation_dt : this.helper.serverFormatDate(reservation.reservation_dt, true),
    }

    return new Promise( (resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            this.helper.presentAlert('success', 'alert.success', 'alert.newReservationSuccess', false);
            resolve(response.data);
          }
          else {
            this.helper.presentAlert('success', 'alert.success', 'alert.newReservationError', false);
            reject('error');
          }
        }, error: (error => {
          console.log(error);
          this.helper.presentAlert('success', 'alert.success', 'alert.newReservationError', false);
          reject('error')
        })
      })
    })
  }
  //here we add new reservation -----------------------------------------

}
