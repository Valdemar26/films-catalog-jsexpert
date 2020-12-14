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
    console.log('modalConfig: ', this.modalConfig);
  }

  public close(): void {
    this.renderer.addClass(this.el.nativeElement.children[0], 'exp-modal-destroy');
  }

  public acceptHide(): void {
    console.log('accept');
  }
}
