import { Component } from '@angular/core';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  language = 'el';
  languages = [
    {
      descr: 'header.greek',
      id: "el"
    },
    {
      descr: 'header.english',
      id: "en"
    }
  ]
  isLoading = false;
  constructor(private helper: HelperService) {
    setTimeout(() => {
      this.isLoading = true;

    }, 1000)
    this.language = 'el';
  }

  ngAfterViewInit() {

  }

  changeLang() {
    this.helper.changeLanguage(this.language)
  }
}
