import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {NotificationInterface} from '../interfaces/notification.interface';
import {NotificationGroupInterface} from '../interfaces/notification-group.interface';
import {NotificationModalInterface} from '../interfaces/notification-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsDataService {

  public get hasNotifications(): boolean {
    return !!this._notificationGroupsState.length;
  }

  public notificationGroups$: Observable<NotificationGroupInterface[]>;
  public modalNotification$: Observable<NotificationModalInterface>;

  private _notificationGroupsState: NotificationGroupInterface[] = [];
  private _notificationGroups: BehaviorSubject<NotificationGroupInterface[]> =
    new BehaviorSubject<NotificationGroupInterface[]>(this._notificationGroupsState);

  private _modalNotificationState: NotificationModalInterface = null;
  private _modalNotification: BehaviorSubject<NotificationModalInterface> =
    new BehaviorSubject<NotificationModalInterface>(this._modalNotificationState);

  constructor() {
    this.notificationGroups$ = this._notificationGroups.asObservable();
    this.modalNotification$ = this._modalNotification.asObservable();
  }

  public add(notification: NotificationInterface): void {

    const groupByPosition = this._notificationGroupsState
      .find((group: NotificationGroupInterface) => group.position === notification.config.position);

    if (this.checkIfExists(groupByPosition, notification)) {
      return;
    }

    if (!groupByPosition) {
      this._notificationGroupsState.push({
        position: notification.config.position,
        notifications: [notification]
      });
    } else {
      groupByPosition.notifications.push(notification);
    }

    this._notificationGroups.next(this._notificationGroupsState);
  }

  public addModal(modalNotification: NotificationModalInterface): void {
    if (this._modalNotificationState) {
      return console.error(`You can't open more than one Notification Modal`);
    }

    this._modalNotificationState = modalNotification;
    this._modalNotification.next(this._modalNotificationState);
  }

  public removeModal(): void {
    this._modalNotificationState = null;
    this._modalNotification.next(this._modalNotificationState);
  }

  public remove(notification): void {

    const groupByPosition = this._notificationGroupsState
      .find((group: NotificationGroupInterface) => group.position === notification.config.position);

    if (!groupByPosition) {
      console.error(`Notification that you have trying to remove doesn't apply to any of position groups`);
      return;
    }

    const notificationIndex = groupByPosition.notifications.indexOf(notification);
    groupByPosition.notifications.splice(notificationIndex, 1);

    if (!groupByPosition.notifications.length) {
      this._notificationGroupsState.splice(this._notificationGroupsState.indexOf(groupByPosition), 1);
    }

    this._notificationGroups.next(this._notificationGroupsState);
  }

  private checkIfExists(group: NotificationGroupInterface, notification: NotificationInterface): boolean {

    if (!group) {
      return false;
    }

    return !!group.notifications.find((notificationItem: NotificationInterface) => {
      return notificationItem.message.title === notification.message.title && notificationItem.message.text === notification.message.text;
    });
  }
}
