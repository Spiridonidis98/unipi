import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../../../services/movie/movie.service';
import { HelperService } from '../../../../services/helper/helper.service';

@Component({
  selector: 'app-create-screening',
  templateUrl: './create-screening.component.html',
  styleUrl: './create-screening.component.scss'
})
export class CreateScreeningComponent {

  @Output() update: EventEmitter<Boolean> = new EventEmitter();

  screeningForm = new FormGroup({
    screening_dt: new FormControl('', Validators.required),
    screening_time: new FormControl('', Validators.required),
    auditorium: new FormControl<any>(null, Validators.required),
    movie: new FormControl<any>(null, Validators.required),

  })

  movieList: any = [];
  auditoriumList: any = [];

  timeList = ['17:00', '20:00', '23:00'];
  minDate: Date = new Date();
  constructor(private movieServ: MovieService, private helper: HelperService) {

  }


  ngOnInit() {
    this.getMovies();
    this.getAuditorium();
  }

  //getting all movies --------------------------------------------
  getMovies() {
    this.movieServ.getAllMovies('all').then( (response: any) => {
      this.movieList = response;
    });
  }
  //getting all movies --------------------------------------------

  //Get Auditorium ------------------------------------------------
  getAuditorium() {
    this.movieServ.getAuditorium().then( (response: any) => {
      this.auditoriumList = response;
    });
  }
  //Get Auditorium ------------------------------------------------

  //Add screening -------------------------------------------------
  addScreening() {
    if(this.screeningForm.invalid) {
      this.helper.presentAlert('warning', 'alert.warning', 'alert.invalidForm', false)
    }
    else {
      const body = {
        screening_dt: this.helper.serverFormatDate(this.screeningForm.value.screening_dt) + ' ' + this.screeningForm.value.screening_time,
        movie_id: this.screeningForm.value.movie?._id,
        auditorium_id: this.screeningForm.value.auditorium._id
      }

      this.movieServ.addNewScreening(body).then( (response: any) => {
        if(response === 'success') {
          this.update.emit(true)
        }
      })
    }
  }
  //Add screening -------------------------------------------------

  cancel() {
    this.update.emit(false)
  }
}
