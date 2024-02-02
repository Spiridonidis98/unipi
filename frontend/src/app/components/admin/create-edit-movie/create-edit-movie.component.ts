import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../../services/helper/helper.service';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-create-edit-movie',
  templateUrl: './create-edit-movie.component.html',
  styleUrl: './create-edit-movie.component.scss'
})
export class CreateEditMovieComponent {
  @Input() movie: any;
  @ViewChild('fileUpload') fileInput: ElementRef | undefined;

  movieForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private helper: HelperService, private movieServ: MovieService) {
    this.movieForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      actors: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      writers: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      directors: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      rating: new FormControl(0, Validators.required),
      duration: new FormControl('', Validators.compose([Validators.required])),
      category: new FormControl('', Validators.required),
      // start_dt_from: new FormControl('', Validators.required),
      inactive: new FormControl(false, Validators.required),
      file: new FormControl('', Validators.required),
      fileBase64: new FormControl('')
    });
  }

  changeRating(type: string, i: number) {
    if(type === 'add') {
      this.movieForm.get('rating')?.setValue(this.movieForm.value.rating + (i + 1))
    }
    else {
      this.movieForm.get('rating')?.setValue((i + 1))
    }
  }

  checkUncheck() {
    this.movieForm.get('inactive')?.setValue(!this.movieForm.get('inactive')?.value)
  }


  //file upload --------------------------------
  getFile(event: any){
    if( event.files.length > 1){
      // alert("error");
    }
    else if ( event.files.length == 0){
      this.movieForm.controls['file'].setValue([])
    }
    else if (event.files.length == 1){
      this.movieForm.controls['file'].setValue(event.files[0])
      let data = event.files[0];
      console.log("data --->",data)
      this.getBase64(data)
    }
    else{
      // Clear the input file
      if(this.fileInput !== undefined) {
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  //file Upload
  fileUploadClick() {
    document.getElementById('fileUpload')?.click();
  }

  //Return File name --------------------
  returnFilename() {
    if(this.movieForm.controls['file'].value.name !== undefined) {
      return this.movieForm.controls['file'].value.name;
    }
  }

  // return image to base64
  getBase64(file: any) {
    let self = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      self.movieForm.get('fileBase64')?.setValue(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //upload Movie Function ----------------------------
  uploadMovie() {
    console.log(this.movieForm)
    if(this.movieForm.invalid) {
      alert('Form not completed correctly');
    }
    else {
      let formData = new FormData();
      formData.append('file', this.movieForm.controls['file'].value);
      const body = {
        name: this.movieForm.value.name,
        description: this.movieForm.value.description,
        rating: Number(this.movieForm.value.rating),
        category: this.movieForm.value.category,
        directors: this.movieForm.value.directors,
        writers: this.movieForm.value.writers,
        actors: this.movieForm.value.actors,
        imageName: this.movieForm.value.file.name,
        duration: Number(this.movieForm.value.duration),
        inactive: this.movieForm.value.inactive,
        start_dt_from: this.helper.serverFormatDate(new Date()),
        file: formData
      }

      formData.append('data', JSON.stringify(body))

      this.movieServ.uploadMovie(formData)
    }
  }
  //--------------------------------------------------
}
"Required data are missing. Check for name, description, directors, writers, actors, category, duration, rating, imageName, start_dt_from"
