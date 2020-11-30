import {
  Inject, Injectable, ApplicationRef, ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef, Injector, Renderer2, RendererFactory2
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {Subject} from 'rxjs';

import {NotificationsOverlayComponent} from '../components/notifications-overlay/notifications-overlay.component';
import {NotificationToastConfigInterface} from '../interfaces/notification-toast-config.interface';
import {NotificationsDataService} from './notifications-data.service';
import {NotificationInterface} from '../interfaces/notification.interface';
import {NotificationPositionEnum} from '../enum/notification-position.enum';
import {NotificationTypeEnum} from '../enum/notification-type.enum';
import {NotificationContentInterface} from '../interfaces/notification-content.interface';
import {NotificationGlobalConfigInterface} from '../interfaces/notification-global-config.interface';
import {NotificationModalConfigInterface} from '../interfaces/notification-modal-config.interface';
import {NotificationModalInterface} from '../interfaces/notification-modal.interface';
import {NotificationModalContentInterface} from '../interfaces/notification-modal-content.interface';

import {NotificationConfig} from '../tokens/notification-config.token';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public get overlayCreated(): boolean {
    return !!this._overlayInstance;
  }

  private _renderer: Renderer2;
  private _overlayInstance: ComponentRef<NotificationsOverlayComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef,
    private _injector: Injector,
    private _rendererFactory: RendererFactory2,
    private _dataService: NotificationsDataService,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(NotificationConfig) private _notificationConfig: NotificationGlobalConfigInterface
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  public showNotification(message: NotificationContentInterface, configuration?: NotificationToastConfigInterface): NotificationInterface {
    if (!this.overlayCreated) {
      this.attachOverlay();
    }

    const config = this.getConfig(configuration);
    const destroy$ = new Subject<boolean>();
    const notification: NotificationInterface = {message, config, destroy$};

    this._dataService.add(notification);

    return notification;
  }

  public showNotificationModal(
    content: NotificationModalContentInterface,
    configuration?: NotificationModalConfigInterface): NotificationModalInterface {

    if (!this.overlayCreated) {
      this.attachOverlay();
    }

    const config: NotificationModalConfigInterface = this.getModalNotificationConfig(configuration);
    const confirm$ = new Subject<boolean>();
    const modalNotification: NotificationModalInterface = {content, config, confirm$};

    this._dataService.addModal(modalNotification);

    return modalNotification;
  }

  public hideNotification(notification: NotificationInterface): void {
    this._dataService.remove(notification);
    notification = null;
  }

  public hideNotificationModal(): void {
    this._dataService.removeModal();
  }

  private attachOverlay(): void {

    this._overlayInstance = this._componentFactoryResolver.resolveComponentFactory(NotificationsOverlayComponent)
      .create(this._injector);

    this._applicationRef.attachView(this._overlayInstance.hostView);

    const domElement = (this._overlayInstance.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this._renderer.appendChild(this._document.body, domElement);
  }

  private getModalNotificationConfig = (config: NotificationModalConfigInterface): NotificationModalConfigInterface => ({
    backdropDismiss: (config && config.backdropDismiss) || true,
    closeButton: (config && config.closeButton) || true
  })

  private getConfig = (config: NotificationToastConfigInterface): NotificationToastConfigInterface => ({
    duration: (config && config.duration) || this._notificationConfig.toastConfig.duration || 6000,
    position: (config && config.position) || this._notificationConfig.toastConfig.position || NotificationPositionEnum.Top,
    notificationType: (config && config.notificationType) ||
      this._notificationConfig.toastConfig.notificationType ||
      NotificationTypeEnum.Info,
    icon: (config && config.icon) || this._notificationConfig.toastConfig.icon || null,
    closeButton: (config && config.closeButton) || this._notificationConfig.toastConfig.closeButton || null,
    actionButton: (config && config.actionButton) || this._notificationConfig.toastConfig.actionButton || null,
    keepOnHover: (config && config.keepOnHover) || this._notificationConfig.toastConfig.keepOnHover || false,
    maxStackSize: (config && config.maxStackSize) || this._notificationConfig.maxStackSize || Infinity,
    hideOnClick: (config && config.hideOnClick) || this._notificationConfig.toastConfig.hideOnClick || false,
  })
}
