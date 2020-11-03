import { Subject } from 'rxjs';

import { NotificationModalContentInterface } from './notification-modal-content.interface';
import { NotificationModalConfigInterface } from './notification-modal-config.interface';

export interface NotificationModalInterface {
  content: NotificationModalContentInterface;
  config?: NotificationModalConfigInterface;
  confirm$: Subject<boolean>;
}
