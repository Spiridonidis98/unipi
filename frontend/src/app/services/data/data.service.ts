import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loginIp='http://127.0.0.1:8080';
  //URLS ---------------------------------------
  userLoginURL = '/api/v1/user/login';
  userSignUpURL = '/api/v1/user/signup';
  userEmailURL = '/api/v1/user/';
  //--------------------------------------------

  //GLOBAL DATA --------------------------------
  user:any = null;
  //GLOBAL DATA --------------------------------

  constructor(private http: HttpClient, private helper: HelperService) { }


  //here we will perform the login with the given data
  login(body: any) {
    const url = this.loginIp + this.userLoginURL;
    console.log('URL ----->');
    console.log(url);

    console.log('BODY ---->');
    console.log(body)

    return new Promise( (resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (response: any) => {
          console.log(response);
          if(Number(response.status) === 200) {
            this.user = response.data;
            this.helper.setItemToLocalStorage('user', body);
            resolve(response.data);
          }
          else {
            reject('error');
          }
        }, error: (error: any) => {
          console.log(error)
          reject('error');
        }
      })
    });
  }

  //here we will perform the signup with the given data
  signUp(body: any, email: string) {
    const url = this.loginIp + this.userSignUpURL + '/' + email;
    console.log('URL ---->');
    console.log(url);

    console.log('BODY ---->');
    console.log(body);

    return new Promise( (resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (response: any) => {
          console.log(response);
          if(Number(response.status) === 200) {
            resolve(response.data);
          }
          else {
            reject('error');
          }
        }, error: (error: any) => {
          console.log(error);
          reject('error');
        }
      })
    });
  }

  //here we will check if a user with same email exists
  checkIfEmailExists(email: string) {
    const url = this.loginIp + this.userEmailURL + email;
    console.log('URL ---->');
    console.log(url)
    return new Promise( (resolve, reject) => {
      this.http.get(url).subscribe({
        next: (response: any) => {
          console.log(response);
          if(Number(response.status) === 200 && Number(response.data) === 0) {
            resolve('signup');
          }
          else {
            resolve('login');
          }
        }, error: (error: any) => {
          console.log(error);
          reject('stop');
        }
      });
    });
  }
}
