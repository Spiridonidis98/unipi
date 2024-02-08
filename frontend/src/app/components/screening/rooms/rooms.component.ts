import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {

  @Input() screenings: any = [];

  chosen: any = null;

  @Output() roomEmmiter: EventEmitter<any> = new EventEmitter();

  constructor(public helper: HelperService) {}

  chooseRoom(room: any) {
    this.chosen = room;
    this.roomEmmiter.emit(room);
  }
}
