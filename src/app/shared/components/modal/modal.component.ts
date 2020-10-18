import { Component, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'exp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

  @Input() trailerPath;
  @Input() filmTitle;
  @Input() parentRef;

  public closeModal(): void {
    this.parentRef.destroy();
    this.parentRef = null;
  }
}
