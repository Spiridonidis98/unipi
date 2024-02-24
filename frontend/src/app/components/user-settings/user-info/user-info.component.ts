import { Component } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  userInfo: FormGroup;
  constructor(public data: DataService, private formBuilder: FormBuilder, private helper: HelperService) {
    this.userInfo = this.formBuilder.group({
      name: new FormControl(this.data.user.name, Validators.required),
      lastname: new FormControl(this.data.user.lastname, Validators.required),
      email: new FormControl(this.data.user.email, Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$')])),
      phone: new FormControl(this.data.user.phone, Validators.required),
    })
    this.userInfo.get('email')?.disable();
  }


  updateUserInfo() {
    if(this.userInfo.invalid) {
      this.helper.presentAlert('warning', 'alert.warning', 'alert.invalidForm', false)
    }
    else {
      const user = {
        _id: this.data.user._id,
        email: this.data.user.email,
        facebookId: this.data.user.facebookId,
        googleId: this.data.user.googleId,
        lastname: this.userInfo.value.lastname,
        name: this.userInfo.value.name,
        password: this.data.user.password,
        roles: this.data.user.roles,
        type: this.data.user.type,
        phone: this.userInfo.value.phone
      }
      this.data.updateUser(user).then( (response: any) => {
        this.data.user.name = this.userInfo.value.name;
        this.data.user.lastname = this.userInfo.value.lastname;
        this.data.user.phone = this.userInfo.value.phone;

      })
    }
  }
}
