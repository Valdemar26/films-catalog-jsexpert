import {
  Inject, Injectable, ApplicationRef, ComponentFactoryResolver,
  ComponentRef, Injector, Renderer2, RendererFactory2
} from '@angular/core';

import {NotificationInterface} from '../interfaces/notification.interface';
import {ToastComponent} from '../toast.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {  // is service create methods to 'show' and 'hide' toast, with config

  public get overlayCreated(): boolean {
    return !!this.overlayInstance;
  }

  private renderer: Renderer2;
  private overlayInstance: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public showToast(): void {
    console.log('showToast');
    // TODO generate dynamic toast

  }

  public removeToast(notification: NotificationInterface): void {

  }

  // public showNotification(message: NotificationContentInterface, configuration?: NotificationToastConfigInterface): NotificationInterface {
  //   if (!this.overlayCreated) {
  //     this.attachOverlay();
  //   }
  //
  //   const config = this.getConfig(configuration);
  //   const destroy$ = new Subject<boolean>();
  //   const notification: NotificationInterface = {message, config, destroy$};
  //
  //   this._dataService.add(notification);
  //
  //   return notification;
  // }
  //
  // public showNotificationModal(
  //   content: NotificationModalContentInterface,
  //   configuration?: NotificationModalConfigInterface): NotificationModalInterface {
  //
  //   if (!this.overlayCreated) {
  //     this.attachOverlay();
  //   }
  //
  //   const config: NotificationModalConfigInterface = this.getModalNotificationConfig(configuration);
  //   const confirm$ = new Subject<boolean>();
  //   const modalNotification: NotificationModalInterface = {content, config, confirm$};
  //
  //   this._dataService.addModal(modalNotification);
  //
  //   return modalNotification;
  // }
  //
  // public hideNotification(notification: NotificationInterface): void {
  //   this._dataService.remove(notification);
  //   notification = null;
  // }
  //
  // public hideNotificationModal(): void {
  //   this._dataService.removeModal();
  // }

  private attachOverlay(): void {


    // this.overlayInstance = this.componentFactoryResolver.resolveComponentFactory(ToastComponent);

    // this._applicationRef.attachView(this._overlayInstance.hostView);
    //
    // const domElement = (this._overlayInstance.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    //
    // this._renderer.appendChild(this._document.body, domElement);
  }

  // private getModalNotificationConfig = (config: NotificationModalConfigInterface): NotificationModalConfigInterface => ({
  //   backdropDismiss: (config && config.backdropDismiss) || true,
  //   closeButton: (config && config.closeButton) || true
  // })

  // private getConfig = (config: NotificationToastConfigInterface): NotificationToastConfigInterface => ({
  //   duration: (config && config.duration) || this._notificationConfig.toastConfig.duration || 6000,
  //   position: (config && config.position) || this._notificationConfig.toastConfig.position || NotificationPositionEnum.Top,
  //   notificationType: (config && config.notificationType) ||
  //     this._notificationConfig.toastConfig.notificationType ||
  //     NotificationTypeEnum.Info,
  //   icon: (config && config.icon) || this._notificationConfig.toastConfig.icon || null,
  //   closeButton: (config && config.closeButton) || this._notificationConfig.toastConfig.closeButton || null,
  //   actionButton: (config && config.actionButton) || this._notificationConfig.toastConfig.actionButton || null,
  //   keepOnHover: (config && config.keepOnHover) || this._notificationConfig.toastConfig.keepOnHover || false,
  //   maxStackSize: (config && config.maxStackSize) || this._notificationConfig.maxStackSize || Infinity,
  //   hideOnClick: (config && config.hideOnClick) || this._notificationConfig.toastConfig.hideOnClick || false,
  // })
}
