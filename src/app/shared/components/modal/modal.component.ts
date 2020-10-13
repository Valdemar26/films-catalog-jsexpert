import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'exp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public dismiss(): void {}

}
