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
  userPermissionsURL = '/api/v1/user/permissions'
  //--------------------------------------------

  //GLOBAL DATA --------------------------------
  user:any = null;
  permissions: any = [];
  //GLOBAL DATA --------------------------------

  constructor(private http: HttpClient, private helper: HelperService) {
  }

  //Delete user ---------------------------------------
  deleteUser(user: any) {
    const url = this.loginIp + this.userEmailURL + user.email;

    return new Promise( (resolve, reject) => {
      this.http.delete(url).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            this.helper.presentToaster('success', 'alert.success', 'alert.userDeleted', false)
            resolve('success');
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.userDeletedError', false)
            reject('error');
          }
        }, error: (error => {
          this.helper.presentAlert('error', 'alert.warning', 'alert.userDeletedError', false)
          console.log(error);
          reject('error');
        })
      })
    })
  }
  //Delete user ---------------------------------------
  //Update User ---------------------------------------
  updateUser(user: any) {
    const url = this.loginIp + this.userEmailURL;
    console.log(url);

    console.log(user);
    return new Promise( (resolve, reject ) => {
      this.http.patch(url, user).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            this.helper.presentToaster('success', 'alert.success', 'alert.userUpdated', false)
            resolve('success');
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.userUpdatedError', false)
            reject('error');
          }
        }, error: (error) => {
          console.log(error);
          this.helper.presentAlert('error', 'alert.warning', 'alert.userUpdatedError', false)
          reject('error')
        }
      })
    });
  }
  //Update User ---------------------------------------

  //Get all permissions -------------------------------
  getAllPermissions() {
    const url = this.loginIp + this.userPermissionsURL;
    console.log(url)
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log(response)
        if(response.status === 200) {
          this.permissions = response.data;
        }
      }, error: (error) => {
        console.log(error);
        this.permissions = [];
      }
    })
  }
  //Get all permissions -------------------------------

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
            this.helper.presentToaster('success', 'alert.success', 'alert.loginSuccess', false)

            resolve(response.data);
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.loginError', false)
            this.helper.removeItemFromLocalStorage('user');
            reject('error');
          }
        }, error: (error: any) => {
          console.log(error)
          this.helper.presentAlert('error', 'alert.warning', 'alert.loginError', false)
          this.helper.removeItemFromLocalStorage('user');
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
            this.helper.presentToaster('success', 'alert.success', 'alert.signSuccess', false)

            resolve(response.data);
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.signError', false)
            reject('error');
          }
        }, error: (error: any) => {
          console.log(error);
          this.helper.presentAlert('error', 'alert.warning', 'alert.signError', false)

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

  //here we will fetch all users -----------------------
  getAllUsers() {
    const url = this.loginIp + this.userEmailURL;
    console.log('URL ---->');
    console.log(url);

    return new Promise( (resolve, reject) => {
      this.http.get(url).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.status === 200) {
            resolve(response.data);
          }
          else {
            this.helper.presentAlert('error', 'alert.warning', 'alert.getUsersError', false)

            reject('error');
          }
        }, error: (error => {
          console.log(error);
          this.helper.presentAlert('error', 'alert.warning', 'alert.getUsersError', false)
          reject('error');
        })
      });
    });
  }
  //here we will fetch all users -----------------------

}
