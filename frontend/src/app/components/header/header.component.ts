import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { HelperService } from '../../services/helper/helper.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  screenHeight: number = 0;
  screenWidth:number = 0;
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
  ];
  headerOptions = [
    {
      id: 'home',
      img: 'assets/imgs/header/play.svg',
      descr: 'sidebar.playingNow'
    },
    {
      id: 'comingSoon',
      img: 'assets/imgs/header/play.svg',
      descr: 'sidebar.comingSoon'
    },
    {
      id: 'contact',
      img: 'assets/imgs/general/mail.svg',
      descr: 'sidebar.contact'
    },
    {
      id: 'admin',
      img: 'assets/imgs/header/settings.svg',
      descr: 'sidebar.admin'
    },

  ]
  @Output() sidebarValue: EventEmitter<string> = new EventEmitter();
  isLoading = false;
  @Output() showLoginEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private helper: HelperService, public data: DataService) {
    this.getScreenSize();
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

  showLogin() {
    console.log(this.screenWidth)
    this.showLoginEmitter.emit(true)
  }

  changeView(idView: string) {
    this.sidebarValue.emit(idView);
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }
}
