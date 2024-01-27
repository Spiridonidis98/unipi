import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  listOfOptions = [

  ]
  @Output() sidebarValue: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  changeView(type: string) {
    this.sidebarValue.emit(type);
  }
}
