import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { NotificationModalInterface } from '../../interfaces/notification-modal.interface';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'exp-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnDestroy {

  @Input() public modalNotification: NotificationModalInterface;

  @ViewChild('modalContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  private isConfirmed: boolean;

  constructor(
    ) { }

  public initNotificationModal(): void {

    // this.notificationService.createModal(this.container, this.componentRef);
    // this.container.clear();
    // const factory = this.resolver.resolveComponentFactory(NotificationModalComponent);
    // this.componentRef = this.container.createComponent(factory);
    //
    // this.componentRef.instance.parentRef = this.componentRef;
  }

  public hideNotificationModal(): void {
    // TODO first step: implement methods here
    // TODO next step: call service with implementation of this method


  }

  public confirm(): void {
    this.isConfirmed = true;
  }

  public dismiss(): void {
    this.isConfirmed = false;
  }

  public ngOnDestroy(): void {
    this.modalNotification.confirm$.next(this.isConfirmed);
  }

}
