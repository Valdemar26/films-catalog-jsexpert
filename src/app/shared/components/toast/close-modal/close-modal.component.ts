import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationInterface } from '../interfaces/notification.interface';

@Component({
  selector: 'exp-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.scss']
})
export class CloseModalComponent implements OnInit {

  @Input() public modalConfig: NotificationInterface;
  @Input() public filteredFilmId: number;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) { }

  public ngOnInit(): void {
  }

  public close(): void {
    this.renderer.addClass(this.el.nativeElement.children[0], 'exp-modal-destroy');
  }

  public acceptHide(): void {

    const hiddenFilms = [];
    hiddenFilms.push(this.filteredFilmId);

    localStorage.setItem('filteredFilmsId', JSON.stringify(hiddenFilms));

    this.close();
    this.router.navigate(['/main']);

    // this.modalConfig.confirm$.subscribe((confirmed: boolean) => {
    //   console.log('confirmed: ', confirmed);
    //
    //   if (confirmed) {
    //     // hide film forever
    //     console.log('HIDE');
    //     localStorage.setItem('filteredFilmsId', JSON.stringify(this.filteredFilmId));
    //   }
    // });
  }
}
