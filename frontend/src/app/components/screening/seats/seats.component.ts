import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss'
})
export class SeatsComponent {
  @Input() chosenScreening: any = null
  @Output() seatEmmiter: EventEmitter<any> = new EventEmitter();

  selectedSeats: any = [];

  reservedSeats: any = [];
  constructor(public helper: HelperService, private movieServ: MovieService) {}

  ngOnInit() {
    this.getReservedSeats();
  }

  //here we get the data for the specific reservevation to see which seats are available
  getReservedSeats() {
    this.movieServ.getReservation(this.chosenScreening.screening.screening_dt, this.chosenScreening.movie._id, this.chosenScreening.auditoriumInfo._id).then((response: any) => {
      this.reservedSeats = response;
    }).catch( error => {
      this.reservedSeats = [];
    });
  }


  //here we select or we remove a seat
  selectSeat(row: any, seat: any) {
    const filtered = this.selectedSeats.filter((a: any) => {
      return a.row === row && a.seat === seat
    });

    if(filtered.length === 0 ) {
      let temp = {
        row,
        seat
      }

      this.selectedSeats.push(temp);
    }
    else {
      const index = this.selectedSeats.indexOf(filtered[0]);
      this.selectedSeats.splice(index, 1)
    }

    this.seatEmmiter.emit(this.selectedSeats);
  }

  //check if selected in order to show yellow border
  checkIfSelected(row: any, seat: any) {
    const filtered = this.selectedSeats.filter((a: any) => {
      return a.row === row && a.seat === seat
    });
    return filtered.length > 0 ? true : false;
  }

  //check if reserved
  checkIfReserved(row: any, seat: any) {
    for(let reserved of this.reservedSeats) {
      for(let s of reserved.seat) {
        if(s.split('')[0] === row && Number(s.split('')[1]) === Number(seat)) {
          return true;
        }
        else if (reserved  === this.reservedSeats[this.reservedSeats.length - 1] && s === reserved.seat[reserved.seat.length - 1]) {
          return false;
        }
      }
    }
    return false;
  }


}
