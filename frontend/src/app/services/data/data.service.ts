import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loginIp='http://127.0.0.1:8081';
  //URLS ---------------------------------------
  userLogin = '/api/v1/user/login';
  //--------------------------------------------


  constructor(private http: HttpClient) { }


  //here we will perform the login with the given data
  login(body: any) {
    const url = this.loginIp + this.userLogin;
    console.log('URL ----->');
    console.log(url);

    console.log('BODY ---->');
    console.log(body)

    return new Promise( (resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (response: any) => {
          console.log(response);
          if(Number(response.status) === 200) {
            resolve(response.data);
          }
        }, error: (error: any) => {
          console.log(error)
          reject('error');
        }
      })
    });
  }
}
