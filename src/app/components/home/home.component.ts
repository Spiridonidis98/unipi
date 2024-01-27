import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies = [
    {
      title: 'Movie Title',
      descr: 'some Movie description',
      duration: '140 min',
      img: 'assets/imgs/film.svg'
    },
    {
      title: 'Movie Title',
      descr: 'some Movie description',
      duration: '140 min',
      img: 'assets/imgs/film.svg'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
