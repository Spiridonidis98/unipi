import { Component, Input } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  @Input() screening: any = null;
  @Input() seats: any = [];
  @Input() reservation: any = null;

  constructor(public helper: HelperService) {}

  ngOnInit() {
    console.log(this.screening)
  }
}
