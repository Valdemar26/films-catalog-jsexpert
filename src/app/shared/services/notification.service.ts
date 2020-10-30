import {ComponentFactoryResolver, Injectable} from '@angular/core';

import {Subject} from 'rxjs';

import {NotificationModalContentInterface} from '../interfaces/notification-modal-content.interface';
import {NotificationModalConfigInterface} from '../interfaces/notification-modal-config.interface';
import {NotificationModalInterface} from '../interfaces/notification-modal.interface';

import {ModalComponent} from '../components/modal/modal.component';
import {NotificationModalComponent} from '../components/notification-modal/notification-modal.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }


  // public initModal(): void {
  //   this.notificationModal.initNotificationModal();
  // }


  // public createModal(container, componentRef): void {
  //   console.log('create modal');

    // this.showNotificationModal(
    //   {title: 'Abmelden', text: 'Möchten Sie sich abmelden?'}).confirm$.subscribe((confirmed: boolean) => {
    //   if (confirmed) {
    //     console.log('CONFIRMED!');
    //     this.cdr.detectChanges();
    //   }
    // });
  // }


  //
  // public removeModal(): void {
  //   console.log('remove modal');
  // }
  //
  // public showNotificationModal(
  //   content?: NotificationModalContentInterface,
  //   configuration?: NotificationModalConfigInterface): NotificationModalInterface {
  //
  //   return;
  //
  //   this.container.clear();
  //   const factory = this.resolver.resolveComponentFactory(ModalComponent);
  //   this.componentRef = this.container.createComponent(factory);
  //
  //   this.componentRef.instance.parentRef = this.componentRef;
  //
  //   if (!this.overlayCreated) {
  //     this.attachOverlay();
  //   }
  //
  //   const config: NotificationModalConfigInterface = this.getModalNotificationConfig(configuration);
  //   const confirm$ = new Subject<boolean>();
  //
  //   const modalNotification: NotificationModalInterface = {content, config, confirm$};
  //
  //   this._dataService.addModal(modalNotification);
  //
  //   return modalNotification;
  // }
}
