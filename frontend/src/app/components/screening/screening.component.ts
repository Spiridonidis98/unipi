import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { HelperService } from '../../services/helper/helper.service';

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

  constructor(private movieServ: MovieService, public helper: HelperService) {

  }

  ngOnInit(): void {
    this.getAuditorium();
    this.getScreening(new Date());
    const elemStart = document.getElementById('reservationDatePicker');
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
      this.calendarDate.setDate(new Date());
    }
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
    this.movieServ.addReservation(body)
  }
  //-----------------------------------

}
