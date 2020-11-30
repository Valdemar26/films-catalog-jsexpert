import { Injectable, ApplicationRef, ComponentFactoryResolver,
  ComponentRef, Injector, Renderer2, RendererFactory2
} from '@angular/core';

import {NotificationInterface} from '../interfaces/notification.interface';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {  // is service create methods to 'show' and 'hide' toast, with config

  private renderer: Renderer2;
  private overlayInstance: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public showToast(): void {
    console.log('showToast');
    // TODO generate dynamic toast

  }

  public removeToast(notification: NotificationInterface): void {

  }
}
