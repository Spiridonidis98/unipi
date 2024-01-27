import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  @Output() showLoginEmitter: EventEmitter<string> = new EventEmitter();

  closeModal(mode: string) {
    this.showLoginEmitter.emit(mode);
  }
}
