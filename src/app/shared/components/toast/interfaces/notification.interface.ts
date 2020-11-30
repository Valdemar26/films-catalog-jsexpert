import {Subject} from 'rxjs';

import {NotificationToastConfigInterface} from './notification-toast-config.interface';
import {NotificationContentInterface} from './notification-content.interface';

export interface NotificationInterface {
  message: NotificationContentInterface;
  config: NotificationToastConfigInterface;
  destroy$: Subject<boolean>;
}
