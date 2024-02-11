import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { HelperService } from '../../services/helper/helper.service';
import { DataService } from '../../services/data/data.service';

declare var Datepicker: any;
@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrl: './screening.component.scss'
})
export class ScreeningComponent {
  @Output() reservationEmitter: EventEmitter<any> = new EventEmitter();

  @Input() reservation: any = null

  calendarDate: any;

  auditoriums: any = []; //available rooms
  screenings: any  = []; // available screenings

  stepperIndex = 1;

  chosenScreening: any = null; // selected screening
  chosenSeats: any = []; // selected seats

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.settingDatePickers();
  }
  screenHeight: number = 0;
  screenWidth:number = 0;

  constructor(private movieServ: MovieService, public helper: HelperService, private data: DataService) {
    this.getScreenSize();
  }

  //here we setting datePickers ------------------------
  settingDatePickers () {
    setTimeout(() => {
      if(this.calendarDate) {
        this.calendarDate.destroy();
      }
      const elemStart = document.getElementById('reservationDatePicker');
      if(elemStart) {
        let event = new Event('changeDate');
        elemStart?.dispatchEvent(event);
        console.log(elemStart)
        this.calendarDate = new Datepicker(elemStart, {
          // options here
          format: 'dd/mm/yyyy',
          todayHighlight: true,
          language: 'el',
          todayBtn: true,
          minDate: new Date()
        });
        this.calendarDate.show();

        if(this.calendarDate) {
          if(this.chosenScreening) {
            this.calendarDate.setDate(new Date(this.chosenScreening.screening.screening_dt))
          }
          else {
            this.calendarDate.setDate(new Date());
          }
        }
      }

      const elemStart2 = document.getElementById('reservationDatePicker2');
      if(elemStart2) {
        let event = new Event('changeDate');
        elemStart2?.dispatchEvent(event);
        console.log(elemStart)
        this.calendarDate = new Datepicker(elemStart2, {
          // options here
          format: 'dd/mm/yyyy',
          todayHighlight: true,
          language: 'el',
          todayBtn: true,
          minDate: new Date()
        });
        this.calendarDate.show();


        if(this.calendarDate) {
          if(this.chosenScreening) {
            this.calendarDate.setDate(new Date(this.chosenScreening.screening.screening_dt))
          }
          else {
            this.calendarDate.setDate(new Date());
          }
        }
      }
    }, 300);
  }
  //here we setting datePickers ------------------------

  ngOnInit(): void {
    this.getAuditorium();
    this.getScreening(new Date());
    this.settingDatePickers();


  }


  changeDate() {
    if(this.calendarDate) {
      this.getScreening(this.calendarDate.getDate());
    }
  }
  getScreening(date: Date) {
    this.movieServ.getScreening(date, this.reservation._id).then( (response: any) => {
      console.log(response);
      this.screenings = response;
    }).catch( error => {
      console.log(error);
      this.screenings = [];
    })
  }

  getAuditorium() {
    this.movieServ.getAuditorium().then( response => {
      this.auditoriums = response;
    }).catch( error => {
      this.auditoriums = [];
    });
  }
  closeModal(value: string) {
    this.reservationEmitter.emit(value);
  }

  //stepper functionality --------------------------------
  changeStepper(direction: string) {
    this.settingDatePickers();
    switch(direction) {
      case 'prev':
        this.stepperIndex--;
        if(this.stepperIndex === 1 ) {
          this.chosenScreening = null;
        }
        if(this.stepperIndex === 2 ) {
          this.chosenSeats = [];
        }
      break;
      case 'next':
        if(this.stepperIndex === 1 && !this.chosenScreening) {
          alert('chose a screening');
        }
        else if(this.stepperIndex === 2 && this.chosenSeats.length === 0) {
          alert('choose seatings');
        }
        else {
          this.stepperIndex++;
        }
      break;
    }
  }
  //stepper functionality --------------------------------


  //choose screening -----------------
  choseScreening(event: any) {
    this.chosenScreening = event;
  }
  //choose screening -----------------

  //Choose seats ---------------------
  choseSeats(event: any) {
    this.chosenSeats = event;
  }
  //Choose seats ---------------------


  //reservation Action ----------------
  reservationAction() {

    if(!this.data.user) {
      this.helper.presentAlert('question', 'alert.question', 'Δεν είστε συνδεδεμένος/η. Θέλετε να συνδεθείτε για να συνεχίσετε με την κρατήση σας;', true).then( (questionResponse: any) => {
        console.log(questionResponse)
        if(questionResponse.isConfirmed) {
          console.log('im here')
          this.helper.showLoginValue = true;
        }
      })
    }
    else {
      let body = {
        movie_id: this.chosenScreening.movie._id,
        auditorium_id: this.chosenScreening.auditoriumInfo._id,
        reservation_dt: this.helper.serverFormatDate(this.chosenScreening.screening.screening_dt) + ' ' + this.helper.formatTime(this.chosenScreening.screening.screening_dt),
        row: [],
        seat: []
      }
      let row: any = []
      let seat: any = [];
      for(let s of this.chosenSeats) {
        seat.push(s.row + s.seat)
      }
      body.seat = seat;

      console.log(body)
      this.movieServ.addReservation(body).then( response => {
        if(response === 'success') {
          this.closeModal('cancel');
        }
      })
    }

  }
  //-----------------------------------

}
