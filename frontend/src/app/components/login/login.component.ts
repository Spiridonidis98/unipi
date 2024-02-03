import { Component, EventEmitter, Output } from '@angular/core';
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
      phone: new FormControl('', Validators.required)
    });
  }

  //Perform google Login ----------------------------------
  performGoogleLogin() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
      if(user.provider === 'GOOGLE') {
        this.data.checkIfEmailExists(user.email).then( response => {
          if(response === 'signup') {
            const body = {
              name: user.firstName ? user.lastName : "Google User" ,
              lastname: user.lastName ? user.lastName : "Google User" ,
              email: user.email,
              phone: null,
              password: user.id,
              googleId: user.id,
              roles: [1],
              type: 2
            };
            this.signUpAction(body);
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
      const body = {
        name: this.registerForm.value.name,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
        roles: [1],
        type: 1
      };
      this.signUpAction(body);
    }
  }
  //manual signup -------------------------------

  //here we will perform the signup functionality
  signUpAction(body: any) {
    this.data.signUp(body).then( (response: any) => {
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
          const body = {
            name: user.firstName,
            lastname: user.lastName,
            email: user.email,
            phone: null,
            password: user.id,
            facebookId: user.id,
            roles: [1],
            type: 3
          };
          this.signUpAction(body);
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
}
