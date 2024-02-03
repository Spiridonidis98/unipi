import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  @Output() showLoginEmitter: EventEmitter<string> = new EventEmitter();
  @ViewChild('userImage') fileInput: ElementRef | undefined;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginOrRegister: string = 'login';

  constructor(private formBuilder: FormBuilder, private data: DataService, private socialAuthService: SocialAuthService){
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      isPasswordShown: new FormControl(false)
    });

    this.registerForm = this.formBuilder.group({
      email: new FormControl('',Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      isPasswordShown: new FormControl(false),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      isConfirmPasswordShown: new FormControl(false),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      photo: new FormControl(''),
      fileBase64: new FormControl('')
    });
  }

  //Perform google Login ----------------------------------
  performGoogleLogin() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
      if(user.provider === 'GOOGLE') {
        this.data.checkIfEmailExists(user.email).then( response => {
          if(response === 'signup') {
            let formData = new FormData();
            formData.append('photo', '');

            const body = {
              name: user.firstName ? user.lastName : "Google User" ,
              lastname: user.lastName ? user.lastName : "Google User" ,
              email: user.email,
              phone: null,
              password: user.id,
              googleId: user.id,
              roles: [1],
              type: 2,
              photo: user.photoUrl
            };

            formData.append('data', JSON.stringify(body))
            this.signUpAction(formData, body.email);
          }
          else if( response === 'login') {
            const body = {
              email: user.email,
              password: user.id,
            }

            this.loginAction(body);
          }
        });
      }

    });
  }
  //-------------------------------------------------------

  ngOnInit() {
    this.performGoogleLogin();
  }

  closeModal(mode: string) {
    this.showLoginEmitter.emit(mode);
  }

  //Here we will change the view according to login or register value
  changeToLoginRegister(type: string) {
    this.loginOrRegister = type;
  }


  //Here we will show or hide the password
  viewHidePassword(form: FormGroup, field: string) {{
       form.get(field)?.setValue(!form.get(field)?.value)
    }
  }

  //Here we check if a field is valid or not
  checkIfFieldIsValid(form: FormGroup, field: string) {
    if(form.get(field)?.invalid && !form.get(field)?.pristine) {
      return false;
    }
    return true;
  }

  //manual login ------------------------
  manualLogin() {
    if(this.loginForm.invalid) {
      alert('Form is invalid')
    }
    else {
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.loginAction(body);
    }
  }
  //manual login ------------------------

  //Here we will perform the login Action
  loginAction(body: any) {
    this.data.login(body).then( response => {
      console.log(response);
      this.closeModal('cancel');
    }).catch( error => {
      console.log(error);
      alert('Couldnt login')
    })
  }

  //here we will check if password and confirm password fields have matched values
  checkPasswordConfirmPassword() {
    if(this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      return true;
    }
    return false;
  }


  //manual signup -------------------------------
  manualSignUp () {
    if(this.registerForm.invalid || !this.checkPasswordConfirmPassword()) {
      alert('Register form not fully completed');
    }
    else {
      let formData = new FormData()
      formData.append('photo', this.registerForm.value.photo)
      const body = {
        name: this.registerForm.value.name,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
        roles: [1],
        type: 1
      };
      formData.append('data', JSON.stringify(body))
      this.signUpAction(formData, body.email);
    }
  }
  //manual signup -------------------------------

  //here we will perform the signup functionality
  signUpAction(body: any, email: string) {
    this.data.signUp(body, email).then( (response: any) => {
      console.log(response);
      alert('Sign up successful');
      const loginBody = {
        email: response.email,
        password: response.password
      }
      this.loginAction(loginBody);

    }).catch(error => {
      console.log(error);
      alert('Something went wrong');
    })
  }

  //login with facebook --------------
  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
      this.data.checkIfEmailExists(user.email).then( response => {
        if(response === 'signup') {
          let formData = new FormData();
          formData.append('photo', '');
          const body = {
            name: user.firstName ? user.firstName : "Facebook User",
            lastname: user.lastName ? user.lastName : "Facebook User" ,
            email: user.email,
            phone: null,
            password: user.id,
            facebookId: user.id,
            roles: [1],
            type: 3
          };
          formData.append('data', JSON.stringify(body))
          this.signUpAction(formData, body.email);
        }
        else if( response === 'login') {
          const body = {
            email: user.email,
            password: user.id,
          }

          this.loginAction(body);
        }
      });
    });
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }

  //file upload --------------------------------
  getFile(event: any){
    if( event.files.length > 1){
      // alert("error");
    }
    else if ( event.files.length == 0){
      this.registerForm.controls['photo'].setValue([])
    }
    else if (event.files.length == 1){
      this.registerForm.controls['photo'].setValue(event.files[0])
      let data = event.files[0];
      console.log("data --->",data)
      this.getBase64(data);
    }
    else{
      // Clear the input file
      if(this.fileInput !== undefined) {
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  //file Upload
  fileUploadClick() {
    document.getElementById('userImage')?.click();
  }

    // return image to base64
    getBase64(file: any) {
      let self = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        self.registerForm.get('fileBase64')?.setValue(reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
}
