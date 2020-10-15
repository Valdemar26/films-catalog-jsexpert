import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'exp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  @Input() trailerPath;
  @Input() filmTitle;

  constructor(
    private sanitizer: DomSanitizer
  ) {
      this.sanitizer.bypassSecurityTrustResourceUrl(this.trailerPath);
  }

  ngOnInit(): void {
  }

  public dismiss(): void {}

  public closeModal(): void {

  }
}
