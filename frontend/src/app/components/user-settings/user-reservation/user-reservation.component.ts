import { Component } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';
import { MovieService } from '../../../services/movie/movie.service';
import { DataService } from '../../../services/data/data.service';
import { PrintService } from '../../../services/print/print.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrl: './user-reservation.component.scss'
})
export class UserReservationComponent {
  reservations: any = [];
  constructor(public helper: HelperService, private print: PrintService,
    private movieServ: MovieService, private data: DataService) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.movieServ.getReservationByUserEmail(this.data.user.email).then(response => {
      this.reservations = response;
      this.reservations = this.reservations.sort( (a: any,b: any) => {
        return new Date(b.reservation.reservation_dt).getTime() - new Date(a.reservation.reservation_dt).getTime()
      })
    })
  }

  //here we will check if delete must be shown. Delete button must be shown if reservation_dt >= today
  checkIfDeleteMustShown(date: any) {
    return new Date(date).getTime() > new Date().getTime();
  }

  //print specific reservation -----------------------
  printReservation(reservation: any) {
    this.print.generatePDF(this.data.user, reservation.reservation);
  }
  //print specific reservation -----------------------

  //delete specifir reservation -----------------------
  deleteReservation(reservation_id: string) {
    this.helper.presentAlert('question', 'alerter.question', 'alerter.deleteSpecificReservation', true).then( (response: any) => {
      if(response.isConfirmed) {
        this.movieServ.deleteReservation(reservation_id).then(() => {
          this.getReservations();
        })
      }
    })

  }
  //delete specifir reservation -----------------------

}
