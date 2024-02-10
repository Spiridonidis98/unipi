import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';
import { HelperService } from '../../../services/helper/helper.service';
import { FormGroup, FormControl } from '@angular/forms';
declare var Datepicker: any;

@Component({
  selector: 'app-admin-screening',
  templateUrl: './admin-screening.component.html',
  styleUrl: './admin-screening.component.scss'
})
export class AdminScreeningComponent {

  screenings: any = [];
  showNewScreening: boolean = false;
  //filters ------------
  movieFilter: string = '';

  range = new FormGroup({
    screening_dt_from: new FormControl<Date | null>(null),
    screening_dt_to: new FormControl<Date | null>(null),
  });
  //filters ------------
  constructor(private movieServ: MovieService, public helper: HelperService) {
    this.range.controls.screening_dt_from.disable();
    this.range.controls.screening_dt_to.disable();

  }

  ngOnInit() {
    this.getScreenings();
  }

  getScreenings() {
    this.movieServ.getScreening().then( response => {
      this.screenings = response;
      for(let screening of this.screenings) {
        this.movieServ.getReservation(screening.screening.screening_dt, screening.movie._id, screening.auditoriumInfo._id).then((response2: any) => {
          screening['reservedSeats'] = response2;
          this.formatScreeningReservedSeats(screening);
        console.log(response);
        }).catch( error => {
          screening['reservedSeats'] = [];
        });
      }
    });
  }

  //here we format the reserved seats vs total seats
  formatScreeningReservedSeats(screening: any) {
    let totalSeats = 0;
    let reserved = 0;
    for(let seat of screening.auditoriumInfo.seats) {
      totalSeats += Number(seat);
    }
    for(let res of screening.reservedSeats) {
      reserved += res.seat.length;
    }

    screening['reservationSeatsAndTotal'] = reserved + ' / ' + totalSeats;
  }

  //filtering function ------------------------------------
  filterScreening() {
    return this.screenings.filter( (scr: any) => {

      if(this.range.value.screening_dt_from) {
        return scr.movie.name.toLocaleLowerCase().includes(this.movieFilter.toLocaleLowerCase()) && new Date(scr.screening.screening_dt).getTime() > new Date(this.range.value.screening_dt_from).getTime();
      }

      if(this.range.value.screening_dt_from && this.range.value.screening_dt_to) {
        return scr.movie.name.toLocaleLowerCase().includes(this.movieFilter.toLocaleLowerCase()) && new Date(scr.screening.screening_dt).getTime() > new Date(this.range.value.screening_dt_from).getTime() && new Date(scr.screening.screening_dt).getTime() < new Date(this.range.value.screening_dt_to).getTime();
      }
      else {
        return scr.movie.name.toLocaleLowerCase().includes(this.movieFilter.toLocaleLowerCase())
      }

    })
  }
  //filtering function ------------------------------------

  //Show create new Screening -----------------------------
  createNewScreening() {
    this.showNewScreening = true;
  }
  //Show create new Screening -----------------------------

  catchCreateEvent(event: Boolean) {
    if(event) {
      this.getScreenings();
    }
    this.showNewScreening = false;
  }
}
