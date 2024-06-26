import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent {
  @Output() showContactEmitter: EventEmitter<string> = new EventEmitter();
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private data: DataService){
    this.contactForm = this.formBuilder.group({
      email: new FormControl('',Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$')])),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  closeModal(mode: string) {
    this.showContactEmitter.emit(mode);
  }

  //Here we check if a field is valid or not
  checkIfFieldIsValid(form: FormGroup, field: string) {
    if(form.get(field)?.invalid && !form.get(field)?.pristine) {
      return false;
    }
    return true;
  }

  //submit contact form data
  submitData() {
    if(this.contactForm.invalid) {
      alert('Form is invalid')
    }
    else {
      const body = {
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      }
      this.addContact(body);
    }
  }

  //Add contact to database
  addContact(body: any) {

    this.data.addContact(body).then( response => {
      this.closeModal('cancel');
    }).catch( error => {
      alert("Couldn't send message")
    })
  }
}
