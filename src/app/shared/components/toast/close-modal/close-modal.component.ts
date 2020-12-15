import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { NotificationInterface } from '../interfaces/notification.interface';

@Component({
  selector: 'exp-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.scss']
})
export class CloseModalComponent implements OnInit {

  @Input() public modalConfig: NotificationInterface;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  public ngOnInit(): void {
  }

  public close(): void {
    this.renderer.addClass(this.el.nativeElement.children[0], 'exp-modal-destroy');
  }

  public acceptHide(): void {
    console.log(this.modalConfig, this.modalConfig.confirm$.subscribe);

    this.modalConfig.confirm$.subscribe((confirmed: boolean) => {
      console.log('confirmed: ', confirmed);

      if (confirmed) {
        // hide film forever
        console.log('HIDE');
      }
    });
  }
}
