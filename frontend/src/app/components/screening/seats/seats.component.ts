import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss'
})
export class SeatsComponent {
  @Input() chosenScreening: any = null
  @Output() seatEmmiter: EventEmitter<any> = new EventEmitter();

  selectedSeats: any = [];
  constructor(public helper: HelperService) {}

  ngOnInit() {
    console.log(this.chosenScreening);
  }

  //here we select or we remove a seat
  selectSeat(row: any, seat: any) {
    console.log(row, seat)
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

}
