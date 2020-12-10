import { Injectable, ApplicationRef, ComponentFactoryResolver,
  ComponentRef, Injector, Renderer2, RendererFactory2
} from '@angular/core';

import { NotificationInterface } from '../interfaces/notification.interface';
import { NotificationTypeEnum } from '../enum/notification-type.enum';
import { ToastComponent } from '../toast.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {  // is service create methods to 'show' and 'hide' toast, with config

  private renderer: Renderer2;
  componentRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private resolver: ComponentFactoryResolver,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public showToast(toastContainer, config): void {
    console.log('showToast');

    toastContainer.clear();
    const factory = this.resolver.resolveComponentFactory(ToastComponent);
    this.componentRef = toastContainer.createComponent(factory);

    this.componentRef.instance.notification = config;
  }

  public removeToast(notification: NotificationInterface): void {
    console.log('removeToast');
  }
}
