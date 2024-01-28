import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

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

  constructor(private formBuilder: FormBuilder, private data: DataService){
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

  //Here we will perform the login Action
  loginAction() {
    if(this.loginForm.invalid) {
      alert('Form is invalid')
    }
    else {
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this.data.login(body).then( response => {
        console.log(response);
      }).catch( error => {
        console.log(error)
      })
    }
  }

}
