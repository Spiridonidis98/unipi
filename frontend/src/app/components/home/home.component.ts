import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies = [
    {
      title: 'Poor things',
      descr: 'Το Poor Things είναι ταινία επιστημονικής φαντασίας του 2023 σε σκηνοθεσία από τον Γιώργο Λάνθιμο από σενάριο του Τόνι ΜακΝαμάρα. Βασίζεται στο μυθιστόρημα του 1993 Χαμένα Κορμιά, και πρωταγωνιστεί η Έμα Στόουν μαζί με τους Μαρκ Ράφαλο, Γουίλεμ Νταφόε, Ράμι Γιούσεφ, Κρίστοφερ Άμποτ, και Τζέροντ Καρμάικλ',
      duration: '140 min',
      img: '../../../assets/imgs/movies/POOR\ THINGS.jpg',
      rating: 5,
    },
    {
      title: 'Movie Title',
      descr: 'some Movie description',
      duration: '140 min',
      img: '../../../assets/imgs/movies/POOR\ THINGS.jpg',
      rating: 4
    },
    {
      title: 'Poor things',
      descr: 'some Movie description',
      duration: '140 min',
      img: '../../../assets/imgs/movies/POOR\ THINGS.jpg',
      rating: 3
    },
    {
      title: 'Movie Title',
      descr: 'some Movie description',
      duration: '140 min',
      img: '../../../assets/imgs/movies/POOR\ THINGS.jpg',
      rating: 2
    },
    {
      title: 'Poor things',
      descr: 'some Movie description',
      duration: '140 min',
      img: '../../../assets/imgs/movies/POOR\ THINGS.jpg',
      rating: 1
    },
    {
      title: 'Movie Title',
      descr: 'some Movie description',
      duration: '140 min',
      img: '../../../assets/imgs/movies/THE IRON CLAW.jpg',
      rating: 5
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }
}
